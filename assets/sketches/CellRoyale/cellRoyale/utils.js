
//BUTTONS
function make_select_monitor(s,x,y){
  s.style("height","18px")
  s.position(x,y);
  s.option('health');
  s.option('score');
  s.option('shield');
  s.option('energy');
  s.option('mass');
  s.option('food');
  s.option('dirt');
  s.option('preys');
  s.option('cycles');
  s.option('id');
  s.option('dad');
  s.option('mom');

  s.option('none');
}


function make_buttons(xo,yo){


  slider_nfood = createSlider(0,1200,atts.simulation.n_food,10);
  slider_nfood.position(xo+90,yo+55);
  slider_nfood.style("width","80px")
  slider_nfood.style("height","2px")



  slider_minfood = createSlider(0,1200,atts.simulation.min_food,10);
  slider_minfood.position(xo+90,yo+75);
  slider_minfood.style("width","80px")
  slider_minfood.style("height","2px")



  slider_viscosity = createSlider(0,5,atts.simulation.viscosity,0.1);
  slider_viscosity.position(xo+90,yo+95);
  slider_viscosity.style("width","80px")
  slider_viscosity.style("height","2px")



  slider_maxt = createSlider(0,1500,atts.simulation.auto.n_time,50);
  slider_maxt.position(xo+90,yo+260);
  slider_maxt.style("width","80px")
  slider_maxt.style("height","2px")

  slider_ncells = createSlider(0,150,atts.simulation.auto.n_cells,5);
  slider_ncells.position(xo+90,yo+280);
  slider_ncells.style("width","80px")
  slider_ncells.style("height","2px")

  //selections
  select_scoring = createSelect();
  select_scoring.style("height","18px")
  select_scoring.position(xo+95,yo+115);
  select_scoring.option('eat');
  select_scoring.option('food');
  select_scoring.option('size');
  select_scoring.option('cycles');
  select_scoring.option('time');
  select_scoring.option('hunting');
  select_scoring.option('berserk');
  select_scoring.option('die');
  select_scoring.option('pick');
  select_scoring.option('poop');
  select_scoring.selected('eat');
  select_scoring.changed(function(){
    atts.simulation.breeding.score_method = select_scoring.value()
  });



  select_m1 = createSelect();
  make_select_monitor(select_m1,xo+10,yo+185);
  select_m1.selected("none")
  select_m1.changed(function(){
    atts.display.monitor.m1[0] = select_m1.value()
  });

  select_m2 = createSelect();
  make_select_monitor(select_m2,xo+10,yo+205);
  select_m2.selected("score")
  select_m2.changed(function(){
    atts.display.monitor.m2[0] = select_m2.value()
  });


  select_m3 = createSelect();
  make_select_monitor(select_m3,xo+100,yo+185);
  select_m3.selected("food")
  select_m3.changed(function(){
    atts.display.monitor.m3[0] = select_m3.value()
  });

  select_m4 = createSelect();
  make_select_monitor(select_m4,xo+100,yo+205);
  select_m4.selected("none")
  select_m4.changed(function(){
    atts.display.monitor.m4[0] = select_m4.value()
  });



  //NEXT GEN BUTT
  butt_ng = new Clickable();
  butt_ng.locate(xo,yo)
  butt_ng.resize(90,15);
  butt_ng.text = "Next Generation"
  butt_ng.textSize = 11 ;
  butt_ng.textColor = "#FFFFFF";
  butt_ng.color = "#FF7000"
  butt_ng.onPress = function(){
  next_generation();
  }
  clickables.push(butt_ng);

  // DEL ALL AGENTS
  butt_rmitem = new Clickable();
  butt_rmitem.locate(xo,yo+20)
  butt_rmitem.resize(90,15);
  butt_rmitem.text = "Remove items"
  butt_rmitem.textSize = 11 ;
  butt_rmitem.textColor = "#FFFFFF";
  butt_rmitem.color = "#3333FF"
  butt_rmitem.onPress = function(){
  agents = [];
  }
  clickables.push(butt_rmitem);



  // TOGGLE VECS
  butt_togvecs = new Clickable();
  butt_togvecs.locate(xo+90,yo)
  butt_togvecs.resize(90,15);
  butt_togvecs.text = "Toggle vectors"
  butt_togvecs.textSize = 11 ;
  butt_togvecs.textColor = "#FFFFFF";
  butt_togvecs.color = "#FF3333"
  butt_togvecs.onPress = function(){
  atts.display.show_cell_vec = 1-atts.display.show_cell_vec;
    if(atts.display.show_cell_vec==1){
      butt_togvecs.color = "#FF3333"
    }else{
      butt_togvecs.color = "#00CC00"
    }
  }
  clickables.push(butt_togvecs);


  // RESET AUTOEXP
  butt_resetauto = new Clickable();
  butt_resetauto.locate(xo+145,400);
  butt_resetauto.resize(45,15);
  butt_resetauto.text = "RESET"
  butt_resetauto.textSize = 11 ;
  butt_resetauto.textColor = "#FFFFFF";
  butt_resetauto.color = "#505050"
  butt_resetauto.onPress = function(){
    if(atts.simulation.auto.active==1){

      T=1;
      atts.display.genetic.m1 = null;
      atts.display.genetic.m2 = null;
      atts.display.genetic.m3 = null;
      atts.display.genetic.m4 = null;
      genetic_display_sel = null;
      cells = [];
      actual_pool=[];
      gen  = 1;
      last_performance = 0;
      g_cont = 0;
      agents = [];
      set_agents("food",atts.simulation.n_food);
      random_n_cells(atts.simulation.auto.n_cells);

    }

  }
  clickables.push(butt_resetauto);

  // TOGGLE AUTO
  butt_togauto = new Clickable();
  butt_togauto.locate(xo,400)
  butt_togauto.resize(140,15);
  butt_togauto.text = "Enable auto-experiments"
  butt_togauto.textSize = 11 ;
  butt_togauto.textColor = "#FFFFFF";
  butt_togauto.color = "#00CC00"
  butt_togauto.onPress = function(){
  atts.simulation.auto.active = 1-atts.simulation.auto.active;
    if(atts.simulation.auto.active==1){
      butt_togauto.color = "#FF3333"
      butt_togauto.text = "Disable auto-experiments"
      butt_resetauto.color = "#FF7000"

    }else{
      butt_togauto.color = "#00CC00"
      butt_togauto.text = "Enable auto-experiments"
      butt_resetauto.color = "#505050"
    }
  }
  clickables.push(butt_togauto);



  // hide monitors
  butt_hide_m = new Clickable();
  butt_hide_m.locate(xo+90,yo+20)
  butt_hide_m.resize(90,15);
  butt_hide_m.text = "Clear monitors"
  butt_hide_m.textSize = 11 ;
  butt_hide_m.textColor = "#FFFFFF";
  butt_hide_m.color = "#3333FF"
  butt_hide_m.onPress = function(){
    atts.display.genetic.m1= null;
    atts.display.genetic.m2= null;
    atts.display.genetic.m3= null;
    atts.display.genetic.m4= null;
    genetic_display_sel = null;
  }
  clickables.push(butt_hide_m);

}

function read_butt_values(){
  atts.simulation.viscosity = slider_viscosity.value();
  atts.simulation.n_food = slider_nfood.value();
  atts.simulation.min_food = slider_minfood.value();

  atts.simulation.auto.n_cells = slider_ncells.value();
  atts.simulation.auto.n_time = slider_maxt.value();
}


// AGENT & CELL MANAGEMENT
function random_agent(type){
    agents.push(new agent(random(atts.display.w),random(atts.display.h),type))
}

function set_agents(type,n){
  for(let i=0;i<n;i++){
    random_agent(type)
  }
}

function count_agents(type){
  let c = 0;
  for(let i=0;i<agents.length;i++){
    if(agents[i].type==type){
      c++;
    }
  }
  return c;
}



function score_to_copies(cl,method){
  let score = cl.score(method);
  let real_score=constrain(score,1/atts.simulation.breeding.n_offs,atts.simulation.max_score)*atts.simulation.breeding.n_offs;
  // if(method=="time"){
  //   real_score = int(score*atts.simulation.breeding.n_offs);
  // }else if(method=="size"){
  //   real_score = 1+int(map(score,atts.simulation.cell.min_mass,atts.simulation.cell.min_mass,0,atts.simulation.max_score));
  // }else if(method=="eat"){
  //   real_score = int(1+score*atts.simulation.breeding.n_offs);
  // }else if(method=="cycles"){
  //   real_score = int(score*atts.simulation.breeding.n_offs);
  // }else if(method=="all"){
  //   real_score = int(score*atts.simulation.breeding.n_offs);
  // }

  return int(real_score);
}


function build_pool(method){
  let new_pool = [];
  if(actual_pool.length>0){
    for(let i=0;i<2*atts.simulation.breeding.pool_variability;i++){
      new_pool.push(random(actual_pool));
    }
  }
  for(let cl of cells){
    let score =0;
    score = score_to_copies(cl,method);

    for(let i=0;i<int(score);i++){
      new_pool.push(cl.genes)
    }

  }

  // for(let i=0;i<atts.simulation.breeding.pool_variability;i++){
  //   new_pool.push(new genes());
  // }

  if(new_pool.length>atts.simulation.breeding.max_pool){
    let n_new_pool = [];
    for(let i=0;i<atts.simulation.breeding.max_pool;i++){
      let new_genes = random(new_pool)

      n_new_pool.push(new_genes);
    }
    new_pool = n_new_pool;
  }

  for(let new_genes of new_pool){
    new_genes.correct()
    new_genes.editable = false;
    //new_genes.assign_gen(gen+1);
  }



  return new_pool;

}

function breed(cl1,cl2,breed_method){
  let new_genes = new genes();
  new_genes.id.me = new_id();
  // console.log(breed_method)
  // console.log(cl1.genes.dna)
  // console.log(cl2.genes.dna)
  if(breed_method=="mean"){
    new_genes = cl1.mean(cl2);
  }
  else if(breed_method=="switch"){
    new_genes = cl1.switch(cl2);
  }
  else if(breed_method=="either"){
    new_genes.set_dna(random([cl1,cl2]).dna);
  }else if(breed_method=="crazy"){
    return breed(cl1,cl2,random(["either","mean","switch"]))
  }
// console.log(new_genes.dna)
  new_genes.parents(cl1,cl2);


  return new_genes;

}

function new_id(){
  g_cont++;
  return g_cont;
}

function cell_stats(f){
  let scores = []
  for(let cl of cells){
    scores.push(cl.score(atts.simulation.breeding.score_method));
  }
  if(f=="mean"){
    let sum  = 0
    for(let ss of scores){
      sum+=ss;
    }
    return sum/scores.length
  }else if(f=="max"){
    let m  = 0
    for(let ss of scores){
      m = ss>m? ss:m;
    }
    return m
  }else if(f=="min"){
    let m  = cell_stats("max")
    for(let ss of scores){
      m = ss<m? ss:m;
    }
    return m
  }
  else{
    return f(scores);
  }
}

function random_n_cells(n){
  let margin = 20;
  for(let i =0;i<n;i++){
    let x = random(margin,atts.display.w-margin);
    let y = random(margin,atts.display.h-margin);
    cells.push(random_new_cell(x,y));
  }
}


function random_new_cell(x=null,y=null){
  let new_cell;
  if(x!=null && y!=null){
    new_cell = new cell(x,y);
  }else{
    new_cell = new cell(mouseX,mouseY);
  }

  if(actual_pool.length!=0){
    let new_genes = breed(random(actual_pool),random(actual_pool),atts.simulation.breeding.breed_method);
    new_genes.mutate(atts.simulation.breeding.p_mut);

    new_cell.update_genes(new_genes);
    random([actual_pool])
  }
  return new_cell;

}

function next_generation(){
  genetic_display_sel=null;
  last_performance = cell_stats("mean");
  actual_pool  = build_pool(atts.simulation.breeding.score_method);
  cells = [];
  agents = [];
  set_agents("food",atts.simulation.n_food)
  T=0;
  gen++;


}

function calc_improvement(){
  let mean = cell_stats("mean");
  let delta  = sqrt(1+last_performance)/2;

  let improvement = (mean-(last_performance+delta))/(2*delta)

  if(improvement){
    return improvement/log(T+1)
  }
  else{
    return 0;
  }
  ;
}
