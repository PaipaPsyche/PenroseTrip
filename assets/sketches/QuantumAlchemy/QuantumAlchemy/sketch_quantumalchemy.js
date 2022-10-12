var sim = {
  dt: 1e-23 , //1s
  dx: 1e-15, //1fm
  dq:1,
  dc:1,
  c : 5e8, // m/s
  int_r:60, //50
  int_n:3, //3
  ticks:15,
  const_r:1e36,
  const_n:1e35,
  step_interact:1,
  bounded:"walls",
  keymode:"shoot",
  shootcount:1,
  shootrandom:true,
  shootdirection:0,
  shootstatic:true,
  fieldactive:false,
  fielddirection:0,
  fieldmagnitude:0,
  fieldrange:[31,40],
  tags:0,
  lines:0,
  groups:1,
  display_mode:1,
  display_sym:1,
  v_th:0.95,
  absorption:1,
  abs_rate:0.1,
  n_reactions:100,
  unlocked:false,
  activesources:true,
  brownian_motion:false,
  bound_absorb_radiation:false,
  bound_absorb_matter:false,
  stop:false,
  cursor:true,
  discovered:{
    total : 0,
    disc : 0
  }
}

let interf = {
  w_phenomena: 380,
  margin:20,
  proportions:[0,0,0],
  proportions_but:[0,0],
  particle_lim:150,
  onlynewreactions:false

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
function search_attributes_particle(name){
  return [name.replace("anti",""),name.startsWith("anti")?-1:1]
}
function give_p_color(p){
  p = search_attributes_particle(p)
  let particle = p[0]
  let sym = p[1]
  let atts_=particle_atts[particle]
  return sym==1?atts_.colors.normal:atts_.colors.anti
}
function give_counts(particle_arr){
  var counts = {
    nu_charge:0,
    rho_charge:0,
    mass:0
  };
  for (var i = 0; i < particle_arr.length; i++) {
    var part = particle_arr[i];
    counts[part] = counts[part] ? counts[part] + 1 : 1;

    let atts_ = search_attributes_particle(part)
    let sym_ = atts_[1]
    let name_ = atts_[0]

    let rho_charge = sym_==-1?-particle_atts[name_].q :particle_atts[name_].q
    let nu_charge = sym_==-1?(particle_atts[name_].c + 2)%4:particle_atts[name_].c
    let mass_ = particle_atts[name_].m

    counts.nu_charge = counts.nu_charge+nu_charge
    counts.rho_charge = counts.rho_charge+rho_charge
    counts.mass = counts.mass+mass_


  }

  return counts
}



function mouse_in_plane(pl){
  if(mouseX<pl.pos.x+pl.size.x && mouseX>pl.pos.x && mouseY<pl.pos.y+pl.size.y && mouseY>pl.pos.y ){
    return true
  }
  return false
}



function mouseClicked(){
  //console.log(pl1.check_pair_cases())
  if(mouse_in_plane(pl1) && pl1.check_pair_cases().length>0){
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

  if(keyCode==ENTER){
    console.log("a");
    sim.stop = !sim.stop
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
  if(mouse_in_plane(pl1)){
    for(let part of Object.keys(particle_atts)){
      if(key == particle_atts[part].key.toLowerCase() && (sim.unlocked==true || particle_atts[part].discovered[(sim.display_sym+1)/2])){
        if(sim.keymode=="shoot"){
          for(let ii=0;ii<sim.shootcount;ii++){


            if(sim.shootstatic){
              plane_add(pl1,[part,sim.display_sym],mouseX,mouseY)
            }else{
              let newdir = createVector(1,0)

              if (sim.shootrandom){
                  newdir.rotate(2*PI*random())
              }else{newdir.rotate(sim.shootdirection)}
              newdir.normalize().setMag(1e75)
              pl1.create([[part,sim.display_sym]],1e75,newdir,mouseX-pl1.pos.x,mouseY-pl1.pos.y,5)
            }



          }
        }else if (sim.keymode =="source") {
        part[0],part[1]
          let srce = new particle_source(mouseX-pl1.pos.x,mouseY-pl1.pos.y,part,sim.shootcount,direction=sim.shootdirection,israndom=sim.shootrandom)
        }



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


}




function make_buttons(x,y){


  // TOGGLE VECS

  let but_w = 0.1*(interf.proportions_but[0]-interf.proportions[1])

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
  butt_toggroups.color = "#00AA00"
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
  butt_togbrown.text = "cursor"
  butt_togbrown.textSize = 12 ;
  butt_togbrown.textColor = "#FFFFFF";
  butt_togbrown.color = "#00AA00"
  butt_togbrown.onPress = function(){

    if(sim.cursor==false){
      sim.cursor =true ;
      butt_togbrown.color = "#00AA00"
    }else{
      sim.cursor = false;
      butt_togbrown.color = "#222222"
    }
  }
  clickables.push(butt_togbrown);


  butt_togabsorb = new Clickable();
  butt_togabsorb.locate(x+2*interf.margin + but_w + 10,y+90)
  butt_togabsorb.resize(but_w,16);
  butt_togabsorb.text = "Radiation"
  butt_togabsorb.textSize = 12 ;
  butt_togabsorb.textColor = "#FFFFFF";
  butt_togabsorb.color = "#222222"
  butt_togabsorb.onPress = function(){

    if(sim.bound_absorb_radiation==false){
      sim.bound_absorb_radiation =true ;
      butt_togabsorb.color = "#FF2200"
    }else{
      sim.bound_absorb_radiation = false;
      butt_togabsorb.color = "#222222"
    }
  }
  clickables.push(butt_togabsorb);


  butt_togabsorb_matter = new Clickable();
  butt_togabsorb_matter.locate(x+2*interf.margin + but_w + 10,y+70)
  butt_togabsorb_matter.resize(but_w,16);
  butt_togabsorb_matter.text = "Matter"
  butt_togabsorb_matter.textSize = 12 ;
  butt_togabsorb_matter.textColor = "#FFFFFF";
  butt_togabsorb_matter.color = "#222222"
  butt_togabsorb_matter.onPress = function(){

    if(sim.bound_absorb_matter==false){
      sim.bound_absorb_matter =true ;
      butt_togabsorb_matter.color = "#FF2200"
    }else{
      sim.bound_absorb_matter = false;
      butt_togabsorb_matter.color = "#222222"
    }
  }
  clickables.push(butt_togabsorb_matter);

  butt_tograndomshoot = new Clickable();
  butt_tograndomshoot.locate(x+2*interf.margin + but_w + 10,y+290)
  butt_tograndomshoot.resize(but_w,16);
  butt_tograndomshoot.text = "random"
  butt_tograndomshoot.textSize = 12 ;
  butt_tograndomshoot.textColor = "#FFFFFF";
  butt_tograndomshoot.color = "#FF2200"
  butt_tograndomshoot.onPress = function(){

    if(sim.shootrandom==false){
      sim.shootrandom =true ;
      butt_tograndomshoot.color = "#FF2200"
    }else{
      sim.shootrandom = false;
      butt_tograndomshoot.color = "#222222"
    }
  }
  clickables.push(butt_tograndomshoot);


  butt_togstaticshoot = new Clickable();
  butt_togstaticshoot.locate(x+2*interf.margin + but_w + 10,y+310)
  butt_togstaticshoot.resize(but_w,16);
  butt_togstaticshoot.text = "static"
  butt_togstaticshoot.textSize = 12 ;
  butt_togstaticshoot.textColor = "#FFFFFF";
  butt_togstaticshoot.color = "#FF2200"
  butt_togstaticshoot.onPress = function(){

    if(sim.shootstatic==false){
      sim.shootstatic =true ;
      butt_togstaticshoot.color = "#FF2200"
    }else{
      sim.shootstatic = false;
      butt_togstaticshoot.color = "#222222"
    }
  }
  clickables.push(butt_togstaticshoot);


  butt__togfieldactive = new Clickable();
  butt__togfieldactive.locate(x+2*interf.margin ,y+290)
  butt__togfieldactive.resize(but_w,16);
  butt__togfieldactive.text = "active"
  butt__togfieldactive.textSize = 12 ;
  butt__togfieldactive.textColor = "#FFFFFF";
  butt__togfieldactive.color = "#222222"
  butt__togfieldactive.onPress = function(){

    if(sim.fieldactive==false){
      sim.fieldactive =true ;
      butt__togfieldactive.color = "#00AA00"
    }else{
      sim.fieldactive = false;
      butt__togfieldactive.color = "#222222"
    }
  }
  clickables.push(butt__togfieldactive);




  butt_onlynewreactions = new Clickable();
  butt_onlynewreactions.locate(windowWidth-2*interf.margin - but_w - 45,interf.margin )
  butt_onlynewreactions.resize(but_w,16);
  butt_onlynewreactions.text = "only new"
  butt_onlynewreactions.textSize = 12 ;
  butt_onlynewreactions.textColor = "#FFFFFF";
  butt_onlynewreactions.color = "#222222"
  butt_onlynewreactions.onPress = function(){

    if(interf.onlynewreactions==false){
      interf.onlynewreactions =true ;
      butt_onlynewreactions.color = "#FF2200"
    }else{
      interf.onlynewreactions = false;
      butt_onlynewreactions.color = "#222222"
    }
  }
  clickables.push(butt_onlynewreactions);

  butt_resetevents = new Clickable();
  butt_resetevents.locate(windowWidth-2*interf.margin - 40,interf.margin )
  butt_resetevents.resize(but_w-10,16);
  butt_resetevents.text = "reset"
  butt_resetevents.textSize = 12 ;
  butt_resetevents.textColor = "#FFFFFF";
  butt_resetevents.color = "#AA0000"
  butt_resetevents.onPress = function(){
    reactions=[]
    time=0
    }

  clickables.push(butt_resetevents);

  butt_clean = new Clickable();
  butt_clean.locate(x+2*interf.margin,windowHeight-50)
  butt_clean.resize(2*but_w,20);
  butt_clean.text = "Delete ALL"
  butt_clean.textSize = 15 ;
  butt_clean.textColor = "#FFFFFF";
  butt_clean.color = "#AA0000"
  butt_clean.onPress = function(){
    pl1.particles=[]
    pl1.sources=[]
  }
  clickables.push(butt_clean);




    butt_cleansources = new Clickable();
    butt_cleansources.locate(x+2*interf.margin,windowHeight-80)
    butt_cleansources.resize(2*but_w,20);
    butt_cleansources.text = "Delete sources"
    butt_cleansources.textSize = 15 ;
    butt_cleansources.textColor = "#FFFFFF";
    butt_cleansources.color = "#AA0000"
    butt_cleansources.onPress = function(){
      pl1.sources=[]
    }
    clickables.push(butt_cleansources);





  // butt_reset = new Clickable();
  // butt_reset.locate(x+2*interf.margin,windowHeight-80)
  // butt_reset.resize(2*but_w,20);
  // butt_reset.text = "Reset events"
  // butt_reset.textSize = 15 ;
  // butt_reset.textColor = "#FFFFFF";
  // butt_reset.color = "#AA0000"
  // butt_reset.onPress = function(){
  //
  // }
  // clickables.push(butt_reset);

  butt_delsources = new Clickable();
  butt_delsources.locate(x+2*interf.margin,windowHeight-110)
  butt_delsources.resize(2*but_w,20);
  butt_delsources.text = "Pause sources"
  butt_delsources.textSize = 15 ;
  butt_delsources.textColor = "#FFFFFF";
  butt_delsources.color = "#222222"
  butt_delsources.onPress = function(){
      if(sim.activesources==false){
        sim.activesources =true ;
        butt_delsources.color = "#222222"
      }else{
        sim.activesources = false;
        butt_delsources.color = "#FF2200"
      }
  }
  clickables.push(butt_delsources);


  //
  // butt_reset = new Clickable();
  // butt_reset.locate(x+2*interf.margin,windowHeight-80)
  // butt_reset.resize(2*but_w,20);
  // butt_reset.text = "Reset"
  // butt_reset.textSize = 15 ;
  // butt_reset.textColor = "#FFFFFF";
  // butt_reset.color = "#AA0000"
  // butt_reset.onPress = function(){
  //   reactions=[]
  //   time=0
  // }
  // clickables.push(butt_reset);







  select_bound = createSelect();
  select_bound.style("height","25px")
  select_bound.position(x+2*interf.margin,y+80)
  select_bound.option("walls")
  select_bound.option("open")
  select_bound.option("periodic")
  select_bound.selected("walls")
  select_bound.changed(function(){
    sim.bounded = select_bound.value()
  })



  select_keymode = createSelect();
  select_keymode.style("height","25px")
  select_keymode.position(x+2*interf.margin + but_w + 10,y+160)
  select_keymode.option("shoot")
  select_keymode.option("source")
  select_keymode.selected("shoot")
  select_keymode.changed(function(){
    sim.keymode = select_keymode.value()
  })
  slider_shootcount = createSlider(1,10,1,1);
  slider_shootcount.position(x+2*interf.margin + but_w + 10,y+200);
  slider_shootcount.style("width","50px")
  slider_shootcount.style("height","2px")
  slider_shootcount.input(function(){sim.shootcount=slider_shootcount.value()})

  slider_time = createSlider(21.5,24.5,-Math.log10(sim.dt),0.1);
  slider_time.position(x+45,y+150);
  slider_time.style("width","50px")
  slider_time.style("height","2px")
  slider_time.input(function(){sim.dt=10**(map(slider_time.value(),22,24,-23.1,-22.9))})

  slider_angle = createSlider(0,2*PI,0,2*PI/16);
  slider_angle.position(x+2*interf.margin + but_w + 30,y+280);
  slider_angle.style("width","50px")
  slider_angle.style("height","2px")
  slider_angle.input(function(){sim.shootdirection=slider_angle.value()})


  slider_fielddirection = createSlider(0,2*PI,0,2*PI/16);
  slider_fielddirection.position(x+2*interf.margin+10,y+280);
  slider_fielddirection.style("width","50px")
  slider_fielddirection.style("height","2px")
  slider_fielddirection.input(function(){sim.fielddirection=slider_fielddirection.value()})



  slider_fieldmagnitude = createSlider(0,1,0,0.005);
  slider_fieldmagnitude.position(x-10,y+240);
  slider_fieldmagnitude.style("width","80px")
  slider_fieldmagnitude.style("height","2px")
  slider_fieldmagnitude.style("transform", "rotate(-90deg)");
  slider_fieldmagnitude.input(function(){sim.fieldmagnitude=slider_fieldmagnitude.value()})


  //slider.style("transform", "rotate(-90deg)");







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
  textAlign(LEFT)
  text("Display settings",interf.proportions_but[0],interf.proportions_but[1]-15)
  text("Boundaries",interf.proportions_but[0],interf.proportions_but[1]+55)
  text("Speed",interf.proportions_but[0],interf.proportions_but[1]+125)
  text("ρ - Field",interf.proportions_but[0]-10,interf.proportions_but[1]+185)
  text(sim.keymode,interf.proportions_but[0]+80,interf.proportions_but[1]+125)
  text(sim.shootcount,interf.proportions_but[0]+145,interf.proportions_but[1]+195)
  push()
  let c_col = 255
  if(sim.shootrandom){c_col=55}
  fill(c_col)
  textSize(12)
  text(round(map(sim.shootdirection,0,2*PI,0,360))+"°",interf.proportions_but[0]+145,interf.proportions_but[1]+235)


  push()
  noFill()
  // SHOOT
  let x_circ = interf.proportions_but[0]+110
  let y_circ = interf.proportions_but[1]+235
  let r_circ = 25

  stroke(55)
  circle(x_circ,y_circ,2*r_circ)

  stroke(255)

  let x2circ = x_circ+r_circ*Math.cos(sim.shootdirection)
  let y2circ = y_circ+r_circ*Math.sin(sim.shootdirection)
  line(x_circ,y_circ,x2circ,y2circ)
  circle(x2circ,y2circ,5)

 // FIELD
  x_circ = interf.proportions_but[0]+25
  y_circ = interf.proportions_but[1]+235
  r_circ = 25

  stroke(55)
  circle(x_circ,y_circ,2*r_circ)
  line(x_circ,y_circ,x_circ+r_circ*Math.cos(sim.fielddirection),y_circ+r_circ*Math.sin(sim.fielddirection))


  stroke(255)

  x2circ = x_circ+sim.fieldmagnitude*r_circ*Math.cos(sim.fielddirection)
  y2circ = y_circ+sim.fieldmagnitude*r_circ*Math.sin(sim.fielddirection)
  line(x_circ,y_circ,x2circ,y2circ)
  circle(x2circ,y2circ,5)



  pop()

  c_col = 55
  if(sim.fieldactive){c_col=255}
  fill(c_col)
  text(round(map(sim.fielddirection,0,2*PI,0,360))+"°",interf.proportions_but[0]+55,interf.proportions_but[1]+235)


  pop()


  push()
  fill(255,0,0)
  circle(interf.proportions_but[0],interf.proportions_but[1],5)
  pop()

  // textSize(10)
  //text("slower         faster",interf.proportions_but[0],interf.proportions_but[1]+135)

  textSize(11)
  textAlign(LEFT)
  text("Absorb",interf.proportions_but[0]+100,interf.proportions_but[1]+55)

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
