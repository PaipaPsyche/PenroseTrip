var sim = {
  dt: 1e-23 , //1s
  dx: 1e-15, //1fm
  dq:1,
  dc:1,
  c : 5e8, // m/s
  int_r:50,
  int_n:3,
  ticks:17,
  const_r:1e36,
  const_n:1e35,
  step_interact:1,
  bounded:"walls",
  tags:1,
  lines:1,
  display_mode:1,
  display_sym:1,
  v_th:0.8,
  absorption:1,
  abs_rate:0.1,
  n_reactions:35,
  unlocked:false,
  discovered:{
    total : 0,
    disc : 0
  }
}

let time =0;
let clickables =[];
var particles =[];
let reactions=[];
function setup(){
  W = windowWidth;
  H = windowHeight;

  createCanvas(W,H);
  frameRate(30)
  make_buttons(930,350)
  pl1 = new plane(20,20,H-40,H-40,170,170)
  //pl1.add_particle(new particle(220,230,"pluson"))
  //pl1.add_particle(new particle(250,290,"anurion"))
  //pl1.add_particle(new particle(350,300,"nuon",1))
  //pl1.add_particle(new particle(100,150,"glion",  -1))
  //pl1.add_particle(new particle(200,200,"anurion",1))
  //pl1.add_particle(new particle(220,260,"rhoton"))
  //pl1.add_particle(new particle(100,200,"vuon"))
  //pl1.add_particle(new particle(260,190,"rhoton"))

}
function update_discovered(){
  let tot = 0
  let disc = 0
  for (let part of Object.keys(particle_atts)){
    for(let d of particle_atts[part].discovered){
      tot=tot+1
      disc = disc+int(d)
    }
  }
  sim.discovered.total = tot

  let prev_disc = sim.discovered.disc
  sim.discovered.disc = disc

  if(prev_disc != disc){
    return true
  }
  return false
}
//format [type,sym]
function add_reaction(parts_in,parts_out,type,disc){
  let txt = []
  let antis = "¯"
  let col_arr = [255,255,255]
  if(type=="decay" && parts_in.length==1){
    let part = particle_atts[parts_in[0][0]]
    let text = part.id
    text =parts_in[0][1]==-1?text+antis:text
    let col  = part.colors.normal;
    if(parts_in[0][1]==-1){col = part.colors.anti}
    txt.push([text,col])
  }else if(type=="reaction" || type == "anihilation" ){
    for(let i=0;i<parts_in.length;i++){
      let part = particle_atts[parts_in[i][0]]
      let text = part.id
      text = parts_in[i][1]==-1?text+antis:text
      let col  = part.colors.normal;
      if(parts_in[i][1]==-1){col = part.colors.anti}
      txt.push([text,col])
      if(i!=parts_in.length-1){
        txt.push([" ",col_arr])
        txt.push(["+",col_arr])
        txt.push([" ",col_arr])
        }
      }
    }

    txt.push([" ",col_arr])
    txt.push(["➝",col_arr])
    txt.push([" ",col_arr])

  for(let i=0;i<parts_out.length;i++){
    let part = particle_atts[parts_out[i][0]]
    let text = part.id
    text = parts_out[i][1]==-1?text+antis:text
    let col  = part.colors.normal;
    if(parts_out[i][1]==-1){col = part.colors.anti}
    txt.push([text,col])
    if(i!=parts_out.length-1){
      txt.push([" ",col_arr])
      txt.push(["+",col_arr])
      txt.push([" ",col_arr])
      }
    }



  if(reactions.length==sim.n_reactions){
    reactions.shift();
  }
  let t_stamp = round(time*sim.dt/10e-21,3)+" zs"
  reactions.push([txt,type,disc,t_stamp])
}

// Define function used to find weights.
function chooseWeighted(opts) {

  // get sum of all the weights.
  var sum = 0;
  for(var i = 0; i < opts.length; i++) {
   sum += opts[i].weight
  }

  // now pick a random number between 0 and the sum of the weights
  var ran = random(sum);

  // loop through all the options until you find a weight that is greater
  // or equal to the random number. Subtract weight from random num every time.
  for( var i = 0; i < opts.length; i++){

    var opt = opts[i];

    if(opt.weight >= ran) {
      return opt.value;
    }

    ran -= opt.weight;
  }
}
function containsSome(array1, array2){
  return array2.some(elem => array1.includes(elem))
}
function containsOnly(array1, array2){
  return array2.every(elem => array1.includes(elem))
}
function give_counts(arr){
  var counts = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return counts
}

function mouseClicked(){
  //console.log(pl1.check_pair_cases())
  if(mouseX<pl1.pos.x+pl1.size.x && mouseX>pl1.pos.x && mouseY<pl1.pos.y+pl1.size.y && mouseY>pl1.pos.y && pl1.check_pair_cases().length>0){
    let pair_ = random(pl1.check_pair_cases())

  pl1.create([[pair_,-1],[pair_,1]],1e75,createVector(0,0),mouseX,mouseY,40)
  }
  //["rhoton",-1],["rhoton",1],["rhoton",-1],["rhoton",1]
}

function plane_add(pl,part,x,y){
 let  particle_ = new particle(x-pl.pos.x,y-pl.pos.y,part[0],part[1])

  pl.add_particle(particle_)
}

function keyPressed(){
  //console.log(keyCode)
  if(mouseX<pl1.pos.x+pl1.size.x && mouseX>pl1.pos.x && mouseY<pl1.pos.y+pl1.size.y && mouseY>pl1.pos.y){
    for(let part of Object.keys(particle_atts)){
      if(key == particle_atts[part].key.toLowerCase() && (sim.unlocked==true || particle_atts[part].discovered[(sim.display_sym+1)/2])){
        plane_add(pl1,[part,sim.display_sym],mouseX,mouseY)
      }
    }
    // if(key=="p"){
    //   plane_add(pl1,["pluson",sim.display_sym],mouseX,mouseY)
    //   //pl1.add_particle(new particle(mouseX-pl1.pos.x,mouseY-pl1.pos.y,"pluson"))
    // }else if(key=="m"){
    //   plane_add(pl1,["minon",sim.display_sym],mouseX,mouseY)
    // }else if(key=="g"){
    //   plane_add(pl1,["glion",sim.display_sym],mouseX,mouseY)
    // }
    // else if(key=="v"){
    //   plane_add(pl1,["vuon",sim.display_sym],mouseX,mouseY)
    // }
    // else if(key=="r"){
    //   plane_add(pl1,["rhoton",sim.display_sym],mouseX,mouseY)
    // }else if(key=="n"){
    //   plane_add(pl1,["nuon",sim.display_sym],mouseX,mouseY)
    // }else if(key=="a"){
    //   plane_add(pl1,["anurion",sim.display_sym],mouseX,mouseY)
    // }else if(key=="s"){
    //   plane_add(pl1,["anurino",sim.display_sym],mouseX,mouseY)
    // }else if(key=="j"){
    //   plane_add(pl1,["jaudion",sim.display_sym],mouseX,mouseY)
    // }else if(key=="k"){
    //   plane_add(pl1,["jaudino",sim.display_sym],mouseX,mouseY)
    // }else if(key=="f"){
    //   plane_add(pl1,["fixon",sim.display_sym],mouseX,mouseY)
    // }


  }
  if(keyCode==SHIFT){
    if(sim.display_mode==1){
      sim.display_mode = 2
    }
    else{
      sim.display_mode = 1
    }

  }
  if(key=="q"){
    //console.log("s")
    sim.display_sym=-sim.display_sym

  }

}

  function make_buttons(x,y){
  // TOGGLE VECS
  butt_togvecs = new Clickable();
  butt_togvecs.locate(x+90,y)
  butt_togvecs.resize(90,15);
  butt_togvecs.text = "Toggle Tags"
  butt_togvecs.textSize = 11 ;
  butt_togvecs.textColor = "#FFFFFF";
  butt_togvecs.color = "#00AA00"
  butt_togvecs.onPress = function(){

    if(sim.tags==0){
      sim.tags =1 ;
      butt_togvecs.color = "#00AA00"
    }else{
      sim.tags = 0;
      butt_togvecs.color = "#222222"
    }
  }
  clickables.push(butt_togvecs);


  butt_toglines = new Clickable();
  butt_toglines.locate(x+90,y+20)
  butt_toglines.resize(90,15);
  butt_toglines.text = "Toggle Lines"
  butt_toglines.textSize = 11 ;
  butt_toglines.textColor = "#FFFFFF";
  butt_toglines.color = "#00AA00"
  butt_toglines.onPress = function(){

    if(sim.lines==0){
      sim.lines =1 ;
      butt_toglines.color = "#00AA00"
    }else{
      sim.lines = 0;
      butt_toglines.color = "#222222"
    }
  }
  clickables.push(butt_toglines);

  butt_clean = new Clickable();
  butt_clean.locate(x+90,y+130)
  butt_clean.resize(90,15);
  butt_clean.text = "Clean Lab"
  butt_clean.textSize = 11 ;
  butt_clean.textColor = "#FFFFFF";
  butt_clean.color = "#AA0000"
  butt_clean.onPress = function(){
    pl1.particles=[]
  }
  clickables.push(butt_clean);



  select_bound = createSelect();
  select_bound.style("height","18px")
  select_bound.position(x+110,y+80)
  select_bound.option("walls")
  select_bound.option("absorb")
  select_bound.option("open")
  select_bound.option("periodic")
  select_bound.selected("walls")
  select_bound.changed(function(){
  sim.bounded = select_bound.value()
  })

  slider_time = createSlider(22,24,-Math.log10(sim.dt),0.1);
  slider_time.position(x+110,y+120);
  slider_time.style("width","70px")
  slider_time.style("height","2px")
  slider_time.input(function(){sim.dt=10**(map(slider_time.value(),22,24,-23.1,-22.9))})


  // slider_time = createSlider(22,24,-Math.log10(sim.dt),0.1);
  // slider_time.position(x+250,y+70);
  // slider_time.style("width","70px")
  // slider_time.style("height","2px")
  // slider_time.input(function(){sim.dt=10**(map(slider_time.value(),22,24,-23.2,-22.8))})
  //

}

function draw(){
  background(20)
  pl1.paint()
  time = time + 1;
  for(let bt of clickables){
    bt.draw();
  }


  push()
  fill(255)
  noStroke()
  textAlign(CENTER)
  text("Boundaries",1070,395)
  text("Simulation speed",1070,435)



  textSize(9)
  text("slower         faster",1070,465)
  pop()
  if(frameRate()<10){
    sim.step_interact=3
  }
  else if(frameRate()>20){
    sim.step_interact=1
  }else{
    if(frameRate()<10){
      sim.step_interact=2
    }
  }

}
