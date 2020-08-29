var atts={
  display:{
    w:400,
    h:400,
    framerate:40,
    show_cell_vec:1,
    long_vec : 0.4,
    monitor:{
      m1:["none",[0,255,0]],
      m2:["none",[255,255,255]],
      m3:["score",[0,255,255]],
      m4:["none",[255,155,0]]
    },
    genetic:{
      m1:null,
      m2:null,
      m3:null,
      m4:null
    }
  },
  simulation:{
    cell:{
      radius_mult :1.5,
      max_mass: 10,
      min_mass:2,
      max_vel:7,
      life_cost:0.05,
      cost_scaler:0.2,
      max_metab:250,
      efficiency:1,
      autoconsume_rate:0.5,
      mass_supremacy:1,
      vectorization:"inv-lineal",
      food_per_mass:2
    },
    breeding:{
      n_offs: 15,
      p_mut:0.01,
      score_method:"eat",
      breed_method:"crazy",
      pool_variability:10,
      max_pool:10000
    },
    border:"closed",
    thrust:0.05,
    viscosity: 0.5,
    visc_vel_coef: 5,
    food_content: 10,
    waste_content:0,
    waste_damage:5,
    collision:true,
    n_food:400,
    min_food:0,
    max_score:100
  }
};




var cells = [];
var agents = [];
var actual_pool=[];

var clickables= [];

var butt_ng,butt_rmitem,butt_togvecs,butt_hide_m;
var slider_minfood, slider_nfood, slider_viscosity;
var select_scoring, select_m1,select_m2,select_m3,select_m4;

var genetic_display_sel=null;



var gen =1;
var T = 0;
var g_cont = 0;
var last_performance = 0;




function setup(){
  atts.display.w = windowWidth;
  atts.display.h = windowHeight;
  createCanvas(atts.display.w,atts.display.h)
  set_agents("food",atts.simulation.n_food);
  make_buttons(20,110);
  frameRate(atts.display.framerate)

}


function mouseClicked(){
  let incell=false;
  for(let cl of cells){
    if(cl.click()){
      genetic_display_sel = cl;
      incell=true;
      break;
    }

  }
  // if(incell==false){
  // cells.push(random_new_cell());
  // }
}

function display_in_slot(slot){
  for(let cl of cells){
    if(cl.click()){
      if(slot == 1){
        atts.display.genetic.m1 = cl.genes;
        break;
      }
      if(slot == 2){
        atts.display.genetic.m2 = cl.genes;
        break;
      }
      if(slot == 3){
        atts.display.genetic.m3 = cl.genes;
        break;
      }
      if(slot == 4){
        atts.display.genetic.m4 = cl.genes;
        break;
      }

    }
  }
}


function keyPressed(){
  if(key=="n"){
    next_generation()
  }else if(key=="f"){
    agents.push(new agent(mouseX,mouseY,"food"))
  }else if(key=="w"){
    agents.push(new agent(mouseX,mouseY,"waste"))
  }else if(key=="c"){
    cells.push(random_new_cell());
  }else if(key=="x"){
    for(let cl of cells){
      if(cl.click()){
        cl.explode()
        break;
      }

    }
  }else if(["1","2","3","4"].includes(key)){
    display_in_slot(key)
  }
}


function draw(){
  background(0);
  read_butt_values()


  // stats
  let alive = 0;


//LOOP
  let new_ag = [];
  for(let ag of agents){
    ag.paint();
    if(ag.eaten == 0){
      new_ag.push(ag)
    }
  }
  agents = new_ag;
  if(count_agents("food")<atts.simulation.min_food){
    random_agent("food")
  }

  for(let cl of cells){
    if(cl.health>0){

      cl.update(agents,cells);
      alive++;
    }
    if(cl.eaten==0){

      cl.paint()
    }

  }

  for(let bt of clickables){
    bt.draw();
  }

  if(genetic_display_sel){
    genetic_display_sel.paint_card(190,atts.display.h-80,50,[255,255,255])//+120
    genetic_display_sel.genes.paint(70,atts.display.h-80,50,[255,255,255]);
  }

  if(atts.display.genetic.m1){
    atts.display.genetic.m1.paint(atts.display.w-190,atts.display.h-210,50,[255,255,255],1);
  }
  if(atts.display.genetic.m2){
    atts.display.genetic.m2.paint(atts.display.w-70,atts.display.h-210,50,[255,255,255],2);
  }
  if(atts.display.genetic.m3){
    atts.display.genetic.m3.paint(atts.display.w-190,atts.display.h-80,50,[255,255,255],3);
  }
  if(atts.display.genetic.m4){
    atts.display.genetic.m4.paint(atts.display.w-70,atts.display.h-80,50,[255,255,255],4);
  }


  //GUI===========================
  push()
  fill(255)
  stroke(0);
 //HEADER
  textAlign(LEFT);

  let xo  = 20;
  let xo2  = 95;
  let yo = 30;
  textSize(25);
  text("GENERATION : "+gen,xo,yo);

  textSize(15);
  text("Time : "+int(T/10),xo,yo+20);
  textSize(12);

  fill(0,255,0);
  text("Best : "+int(cell_stats("max")),xo,yo+35);

  fill(0,0,255);
  text("Mean : "+int(cell_stats("mean")),xo,yo+50);

  fill(255,0,0);
  text("worst : "+int(cell_stats("min")),xo,yo+65);

  fill(255)
  text("Total : "+cells.length,xo2,yo+35);
  text("Alive : "+alive,xo2,yo+50);
  text("Improvement : "+(calc_improvement()*100).toFixed(1)+"%",xo2,yo+65);

  //SLIDERS & LABELS

  text("Initial food",xo,yo+130);
  text("Minimum food",xo,yo+150);
  text("Viscosity",xo,yo+170);


  text(slider_nfood.value(),xo+170,yo+130);
  text(slider_minfood.value(),xo+170,yo+150);
  text(slider_viscosity.value(),xo+170,yo+170);
  text("Minimum food",xo,yo+150);
  text("Viscosity",xo,yo+170);

  text("Main goal : ",xo,yo+198);

  text("CELL INIDICATORS : ",xo,yo+225);
  text("Upper",xo,yo+245);
  text("Lower",xo+90,yo+245);





  pop()



  T+=1;
}
