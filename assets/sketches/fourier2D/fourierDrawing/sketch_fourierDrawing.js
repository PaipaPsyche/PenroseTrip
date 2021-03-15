// environment
var W,H;
var details={
  drawing:{
    x:20,
    y:20,
    w:500
  },
  display:{
    x:550,
    y:20,
    w:120
  },
  device:{
    x:680,
    y:20,
    w: 700,
    r:150
  },
  state:{
    dt:0,
    running:false,
    dr: 2,
    n_freq : 10
  },
  environment:{
    fps: 20
  }
}
//objects
let drawing_b,display_b;
let buttons_clkb=[];
let slider_nfreq;


//elements
let data = [];
let path = [];
let time  = 0;
let fxfy = [];
let fxfy_freq = [];

function setup(){
  W = windowWidth;
  H = windowHeight;
  createCanvas(W,H);
  drawing_b = new board(createVector(details.drawing.x,details.drawing.y),details.drawing.w);
  display_b = new board(createVector(details.display.x,details.display.y),details.display.w);
  display_b.editable=false;
  set_buttons();
  frameRate(details.environment.fps);
}

function set_buttons(){
  let butt_blank = new Clickable()
  butt_blank.locate(details.drawing.x+details.drawing.w+20,details.drawing.y+details.display.w+30);
  butt_blank.resize(details.display.w,15);
  butt_blank.text="Blank Board";
  butt_blank.color="#fbe82c";
  butt_blank.strokeWeight = 2;
  butt_blank.onPress = function(){drawing_b.erase_board()};
  buttons_clkb.push(butt_blank);



  let butt_store = new Clickable()
  butt_store.locate(details.drawing.x+details.drawing.w+20,details.drawing.y+details.display.w+50);
  butt_store.resize(details.display.w,15);
  butt_store.text="Save Board";
  butt_store.color="#2255ff";
  butt_store.strokeWeight = 2;
  butt_store.onPress = function(){save_draw()};
  buttons_clkb.push(butt_store)

  let butt_transform = new Clickable()
  butt_transform.locate(details.drawing.x+details.drawing.w+20,details.drawing.y+details.display.w+90);
  butt_transform.resize(details.display.w,15);
  butt_transform.text="Transform"
  butt_transform.color="#22ff55";
  butt_transform.strokeWeight = 2;
  butt_transform.onPress = function(){start_fourier()};
  buttons_clkb.push(butt_transform);

  let butt_reset = new Clickable()
  butt_reset.locate(details.drawing.x+details.drawing.w+20,details.drawing.y+details.display.w+110);
  butt_reset.resize(details.display.w,15);
  butt_reset.text="Reset Drawing"
  butt_reset.color="#ff6600";
  butt_reset.strokeWeight = 2;
  butt_reset.onPress = function(){reset_time();path=[]};
  buttons_clkb.push(butt_reset);

  slider_nfreq = createSlider(0,1,1,0.001);
  slider_nfreq.position(details.drawing.x,details.drawing.y+details.drawing.w+25);
  slider_nfreq.style("width","500px")
  slider_nfreq.style("height","2px")
}

function save_draw(){
  let m = drawing_b.give_mem()
  if(m.length>0){
    drawing_b.erase_board()

    display_b.load_mem(m);
  }
}

function transform_saved(sorted_amp=true){
  let path = display_b.give_mem()
  let xy = path_to_xy(path);
  let fx = dft(xy[0]);
  let fy = dft(xy[1]);

  // let ffx  =[...fx];
  // let ffy  =[...fy];
  // ffx.sort((a,b) => a.freq-b.freq)
  // ffy.sort((a,b) => a.freq-b.freq)
  //
   fxfy_freq = [fx,fy];

  if(sorted_amp){
    fx.sort((a,b) => b.amp-a.amp)
    fy.sort((a,b) => b.amp-a.amp)
  }



  return [fx,fy];
}

function start_fourier(){

if(display_b.give_mem().length>0){
  reset_time();
  path =[];
  fxfy = transform_saved();
  data = display_b.give_mem();
  //console.log(fxfy);
  details.state.running = true;
  details.state.dt =  TWO_PI / fxfy[0].length;

}

}


function reset_time(){
  time = 0;
}

function draw(){
 background(10);
 drawing_b.update();
 drawing_b.paint();
 display_b.update();
 display_b.paint();
 for(let clkb of buttons_clkb){
   clkb.draw()
}
//details.state.n_freq = slider_nfreq.value()


if(details.state.running && fxfy.length>0){
  draw_fourier_device(details.display.x+details.display.w+20,details.display.y,details.device.w,
    details.device.r,fxfy[0],fxfy[1],fxfy_freq[0],fxfy_freq[1]);
  time+=details.state.dt;
}

if(fxfy.length>0){

  push()
  fill(255);
  noStroke();
  textAlign(LEFT)
  text("Using "+int(slider_nfreq.value()*fxfy[0].length)+" main frequencies out of "+fxfy[0].length,details.drawing.x,details.drawing.y+details.drawing.w+50)
  pop()
}

if (time > TWO_PI) {
  time = 0;
  path = [];
}

// push();
// fill(255)
// textAlign(LEFT)
// text(time,40,10)
// pop();
}
