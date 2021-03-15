class board{
  constructor(pos,l,r=1){
    // dimensions
      this.pos = pos;
      this.width = l;
      this.mem = [];
      this.dr = details.state.dr;
      this.radius = r;

      this.color = [0,0,0];
      this.editable = true;


  }
// point creation
  in_range(){
    // is the mouse in the square area?
    if(mouseX<this.pos.x + this.width && mouseY<this.pos.y + this.width && mouseX>this.pos.x && mouseY>this.pos.y){
      return true;
    }
    else{
      return false;
    }
  }
  distance_th(x,y){
    // threshold distance from the last point recorded
    if(this.mem.length==0){
      return true;
    }else if(dist(x,y,this.mem[this.mem.length-1][0],this.mem[this.mem.length-1][1])>this.dr){
      return true;
    }
    else{return false;}
  }
  update(){

    // read data if presed mouse
    if(this.in_range() && mouseIsPressed && this.distance_th(mouseX,mouseY) && this.editable){
      this.mem[this.mem.length] = [mouseX,mouseY];
    }
  }
  //memory
  erase_board(){
    // delete memory
    this.mem = [];
  }
  give_mem(){
    // return memory
    let ret = [];
    for(let i = 0;i<this.mem.length;i++){
    ret[i] = this.gen_to_board(this.mem[i]);
    }
    return ret;
  }
  load_mem(m){
    // return memory
    this.mem=[];
    for(let i = 0;i<m.length;i++){
    this.mem[i] = this.board_to_gen(m[i]);
    }

  }
  //coordiante tranforming
  gen_to_board(c){
    return [2*(c[0]-this.pos.x)/this.width -1,2*(c[1]-this.pos.y)/this.width-1]
  }
  board_to_gen(c){
    return [(c[0]+1)*this.width/2 + this.pos.x,(c[1]+1)*this.width/2 + this.pos.y]
  }
  //painting
  paint(){

    //paint interactive board

    push();
    fill(this.color);
    stroke(this.editable==true?255:100);
    strokeWeight(2);
    translate(this.pos.x,this.pos.y);
    rect(0,0,this.width,this.width);
    pop();

    push();
    fill(255);
    stroke(255);
    strokeWeight(min(this.radius/2,1));
    for(let i = 0;i<this.mem.length;i++){
      circle(this.mem[i][0],this.mem[i][1],this.radius);
      if(i>0){

        line(this.mem[i][0],this.mem[i][1],this.mem[i-1][0],this.mem[i-1][1])
      }
    }
    //text(this.mem.length,this.pos.x,this.pos.y+this.width+15)
    pop();
  }
}


class freqPlot{
  constructor(x,y,w,h,fourier){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  paint(){
    rect(x,y,w,h);
    
  }
}
