let agent_effects={
  food: {
    color: [200,200,20]
  },
  waste:{
    color:[250,50,50]
  }
}


class agent{
  constructor(x,y,type){
    this.type = type;
    this.pos = createVector(x,y);
    this.eaten = 0;
  }

  paint(){
    push()
    fill(agent_effects[this.type].color)
    circle(this.pos.x,this.pos.y,1.5)
    pop()
  }
}
