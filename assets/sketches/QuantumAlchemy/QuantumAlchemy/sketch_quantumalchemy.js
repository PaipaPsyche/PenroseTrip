var sim = {
  dt: 1e-23 , //1s
  dx: 1e-15, //1fm
  dq:1,
  dc:1,
  c : 5e8, // m/s
  int_r:50,
  int_n:5,
  ticks:15,
  const_r:1e36,
  const_n:1e35,
  step_interact:1,
  bounded:"walls",
  tags:0,
  lines:0,
  groups:0,
  display_mode:1,
  display_sym:1,
  v_th:0.8,
  absorption:1,
  abs_rate:0.1,
  n_reactions:35,
  unlocked:true,
  brownian_motion:true,
  stop:false,
  discovered:{
    total : 0,
    disc : 0
  }
}

let interf = {
  w_phenomena: 380,
  margin:20,
  proportions:[0,0,0],
  proportions_but:[0,0]

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

  let margin = interf.margin
  //heigh and width of board
  let h_p = H-2*margin
  let w_p = W-2*margin
  // size
  let vscale = 300
  let hscale = int(w_p*vscale/h_p)

  //proportion
  let plane_prop = round(h_p/W,2)
  let w_indicators = W-h_p-interf.w_phenomena-margin
  // length in pixels of 3 pannels (horizontal)
  interf.proportions = [h_p,w_indicators,interf.w_phenomena]


  //see plane.js line 229
  let but_x = 2*margin+h_p+3*int(interf.proportions[1]/7)+int(7*int(interf.proportions[1]/7)/6)
  let but_y = 4*margin+4*int(7*int(interf.proportions[1]/7)/6)+30
  interf.proportions_but= [but_x,but_y]
  make_buttons(but_x-2*margin, but_y)//(950,350)

  pl1 = new plane(margin,margin,h_p,h_p,vscale,vscale)
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

  let but_w = 0.15*(interf.proportions_but[0]-interf.proportions[1])
  console.log("z",but_w);
  butt_togvecs = new Clickable();
  butt_togvecs.locate(x+2*interf.margin,y)
  butt_togvecs.resize(but_w,18);
  butt_togvecs.text = "Tags"
  butt_togvecs.textSize = 12 ;
  butt_togvecs.textColor = "#FFFFFF";
  butt_togvecs.color = "#222222"
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
  butt_toglines.locate(x+2*interf.margin,y+20)
  butt_toglines.resize(but_w,18);
  butt_toglines.text = "Lines"
  butt_toglines.textSize = 12 ;
  butt_toglines.textColor = "#FFFFFF";
  butt_toglines.color = "#222222"
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


  butt_toggroups = new Clickable();
  butt_toggroups.locate(x+2*interf.margin + but_w + 10,y+20)
  butt_toggroups.resize(but_w,18);
  butt_toggroups.text = "Groups"
  butt_toggroups.textSize = 12 ;
  butt_toggroups.textColor = "#FFFFFF";
  butt_toggroups.color = "#222222"
  butt_toggroups.onPress = function(){

    if(sim.groups==0){
      sim.groups =1 ;
      butt_toggroups.color = "#00AA00"
    }else{
      sim.groups = 0;
      butt_toggroups.color = "#222222"
    }
  }
  clickables.push(butt_toggroups);


  butt_togbrown = new Clickable();
  butt_togbrown.locate(x+2*interf.margin + but_w + 10,y)
  butt_togbrown.resize(but_w,18);
  butt_togbrown.text = "Wiggle"
  butt_togbrown.textSize = 12 ;
  butt_togbrown.textColor = "#FFFFFF";
  butt_togbrown.color = "#00AA00"
  butt_togbrown.onPress = function(){

    if(sim.brownian_motion==false){
      sim.brownian_motion =true ;
      butt_togbrown.color = "#00AA00"
    }else{
      sim.brownian_motion = false;
      butt_togbrown.color = "#222222"
    }
  }
  clickables.push(butt_togbrown);



  butt_clean = new Clickable();
  butt_clean.locate(x+2*interf.margin,windowHeight-50)
  butt_clean.resize(2*but_w,20);
  butt_clean.text = "Clean Lab"
  butt_clean.textSize = 15 ;
  butt_clean.textColor = "#FFFFFF";
  butt_clean.color = "#AA0000"
  butt_clean.onPress = function(){
    pl1.particles=[]
  }
  clickables.push(butt_clean);


  butt_reset = new Clickable();
  butt_reset.locate(x+2*interf.margin,windowHeight-80)
  butt_reset.resize(2*but_w,20);
  butt_reset.text = "Reset events"
  butt_reset.textSize = 15 ;
  butt_reset.textColor = "#FFFFFF";
  butt_reset.color = "#AA0000"
  butt_reset.onPress = function(){
    reactions=[]
    time=0
  }
  clickables.push(butt_reset);



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

function draw_buttons(){
  for(let bt of clickables){
    bt.draw();
  }
  let textx = interf.proportions_but[0]+100
  push()
  fill(255)
  noStroke()
  textAlign(CENTER)
  text("Boundaries",textx,interf.proportions_but[1]+55)
  text("Simulation speed",textx,interf.proportions_but[1]+105)


  push()
  fill(255,0,0)
  circle(interf.proportions_but[0],interf.proportions_but[1],5)
  pop()

  textSize(9)
  text("slower         faster",textx,interf.proportions_but[1]+125)
  pop()
}

function draw(){
  background(20)
  pl1.paint()
  if(sim.stop==false){
    time = time + 1;
  }



  draw_buttons()



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
