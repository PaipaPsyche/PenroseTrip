function dft(signal){
  let  N = signal.length;
  let X = [];
  for(let k =0;k<N;k++){
    let re = 0;
    let im = 0;
    for(let n = 0;n<N;n++){
      let theta = n*TWO_PI*k/N;
      re += signal[n]*cos(theta);
      im -= signal[n]*sin(theta);
    }
    re = re/N;
    im = im/N;

    let freq = k;
    let amp = sqrt(re*re + im*im);
    let phase = atan2(im,re);

    X[k] = {re, im, amp, freq, phase};
  }
  return X;
}

function path_to_xy(path){
  let x = [];
  let y = [];
  for(let i = 0;i<path.length;i++){
    x[i]=path[i][0]
    y[i]=path[i][1]
  }
  return [x,y];
}

function xy_to_path(xy){
  let p = [];
  for(let i = 0;i<xy.length;i++){
    p[i] = [xy[0][i],xy[1][i]];
  }
  return p;
}


function draw_epicycles(x,y,r,rot,fourier){

let N = int(fourier.length*slider_nfreq.value());
  for(let i = 0; i < N; i++){
    let xprev = x;
    let yprev = y;
    push();
    let radius  = r*fourier[i].amp;
    let phase  = fourier[i].phase;
    let freq  = fourier[i].freq;
    x += radius * cos(freq * time + phase + rot);
    y += radius * sin(freq * time + phase + rot); //updating new origin position

    stroke(255, 100);
    noFill();
    strokeWeight(1);
    ellipse(xprev, yprev, radius * 2);
    stroke(255);
    strokeWeight(2);
    line(xprev, yprev, x, y);
    pop();
  }
  return createVector(x,y);
}


function draw_chart(x,y,w,h,orientation,fourier){

  let delta = 20;
  let mod_freq_disp = 10;
  push()
  fill(0);
  noStroke()
  rect(x,y,w,h);
  let N = int(fourier.length*slider_nfreq.value());
  let fontw = N>150?6:7;
  mod_freq_disp = N>250?50:10;
  strokeWeight(2);
  if(orientation=="h"){

    let ddx = (w-20)/N;
    for(let i=0;i<N;i++){
      let n_amp = map(Math.log10(fourier[i].amp+1),0,Math.log10(2),0,h-delta);
      let color = [map(fourier[i].phase,-PI,PI,255,0),20,map(fourier[i].phase,-PI,PI,0,255)];


      if(i%mod_freq_disp==0){
        noStroke()
        fill(255);
        textAlign(CENTER,CENTER);
        textSize(fontw);
        text(i,x+10+i*ddx,y+h-10)
      }

      if(sin(fourier[i].freq * time + fourier[i].phase)>0.95){
        stroke(255);
        point(x+10+i*ddx,y+h-delta-n_amp-5)
      }
      stroke(color);
      line(x+10+i*ddx,y+h-delta,x+10+i*ddx,y+h-delta-n_amp);
    }

    stroke(255);
    strokeWeight(1)
    line(x+8,y+h-delta,x+w-8,y+h-delta)
  }


  else if(orientation=="v"){

    let ddx = (h-20)/N;
    for(let i=0;i<N;i++){
      let n_amp = map(Math.log10(fourier[i].amp+1),0,Math.log10(2),0,w-delta);
      let color = [map(fourier[i].phase,-PI,PI,255,0),20,map(fourier[i].phase,-PI,PI,0,255)];

      if(i%mod_freq_disp==0){

        noStroke()
        fill(255);
        textAlign(LEFT,CENTER);
        textSize(fontw);
        text(i,x,y+10+i*ddx)
      }
      if(sin(fourier[i].freq * time + fourier[i].phase)>0.95){
        stroke(255);
        point(x + delta + n_amp +5 ,y+10+i*ddx)
      }
      stroke(color);
      line(x+delta,y+10+i*ddx,x+delta+n_amp,y+10+i*ddx);
    }

    stroke(255);
    strokeWeight(1)
    line(x+delta-1,y+8,x+delta-1,y+h-8)



  }

  pop()

}

function draw_fourier_device(x,y,w,r,fx,fy,fxfreq,fyfreq){
  // center
  push()
  fill(0);
  rectMode(CENTER,CENTER);
  rect(w/2 + x-50,w/2 + y-50,w/2-50,w/2-50);
  pop()

  draw_chart(x+w/4-25,y+3*w/4-50,w/2-50,100,"h",fxfreq)
  draw_chart(x+25,y+w/4-25,100,w/2-50,"v",fyfreq)

  push();
  stroke(255);
  strokeWeight(0.5);
  let vx = draw_epicycles(w/2 + x-50, w/12+y,r, 0, fx);
  let vy = draw_epicycles(w/12+x+3*w/4, w / 2 + y-50,r, HALF_PI, fy);
  let v = createVector(vx.x, vy.y);
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  strokeWeight(2);
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
endShape();

//beginShape();
stroke(255,0,0);
strokeWeight(1);
//noFill();
for (let i = 0; i < data.length; i++) {
  point((w/4 -25 +x)+(w/2 - 50)*(data[i][0]+1)/2, (w/4 -25 +y)+(w/2 - 50)*(data[i][1]+1)/2);
}
//endShape();


pop();
}
