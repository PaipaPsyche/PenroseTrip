class particle_source{
  constructor(x,y,type,fpc,direction=0,israndom=true,n_particles=1){
    this.pos = createVector(x,y)
    this.type = type;
    this.sym = sim.display_sym
    this.time=0
    this.active = true;
    this.properties =this.get_properties()
    this.direction = direction
    this.israndom = israndom

    this.frame = 0
    this.frame_per_cycle=int(60/map(fpc,1,10,1,20))
    this.n_particles = n_particles


    this.active = true;
    this.emitting = true;
    this.properties =this.get_properties()



  pl1.add_source(this)
  }
  get_properties(){
    let prop = {}
    Object.assign(prop, particle_atts[this.type])
    prop.c = prop.c*sim.dc
    prop.q = prop.q*sim.dq

    return prop
  }

  emission(){


    let pmodel = [this.type,this.sym]
    let rad = this.properties.r*pl1.scale.x*2
    for(let i = 0;i<this.n_particles;i++){
      let newdir = createVector(1,0)

      if (this.israndom){
          newdir.rotate(2*PI*random())
      }else{
          newdir.rotate(this.direction)
      }
      newdir.normalize().setMag(1e75)
      pl1.create([pmodel],1e75,newdir,this.pos.x,this.pos.y,rad)

    }

  }

  run(){
    this.frame++;
    if(this.frame%this.frame_per_cycle == 0 &&sim.stop==false&& this.emitting && sim.activesources && pl1.particles.length<1.5*interf.particle_lim){
      this.emission()
    }
  }

  paint(){
    let radius = pl1.scale.x*this.properties.r

    let xx = pl1.pos.x+this.pos.x
    let yy = pl1.pos.y+this.pos.y
    push()
    let col  = this.properties.colors.normal;
    if(this.sym==-1){col = this.properties.colors.anti}
    if(this.emitting==false){this.col = [90,90,90]}
    col = color(col)
    col.setAlpha(180)
    fill(col)
    rect(xx-radius/2,yy-radius/2,radius,radius)
    pop()


    push()
    textAlign(CENTER,CENTER);

    fill(255);
    if(this.emitting==false){
      fill(90)
    }
    textSize(8)
    text(this.properties.id,xx,yy-radius/2-5)
    //let beta = this.vel.mag()/sim.c;
    //let gamma  = 1/sqrt(1-(this.vel.mag()**2/sim.c**2))
    //text(round(beta,2),xx,yy+radius/2+5)
    if(this.sym==-1){
      text("_",xx,yy-radius/2-18)
    }
    pop()

  }

}
