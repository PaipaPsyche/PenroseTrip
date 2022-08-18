var id_counter=1





class particle{
  constructor(x,y,type,sym=1,cancreate=false){
    this.pos = createVector(x,y)
    this.vel = p5.Vector.random2D();
    this.type = type;
    this.sym = 1
    this.time=0

    //rhoton can create pair
    this.can_create=cancreate


    this.last_interact={
      "over_n":[],
      "n":[],
      "d":[]
    }

    this.active = true;
    this.properties =this.get_properties()
    if(sym==-1){
      this.anti()
    }
    this.properties.mode =1e8;
    if(this.type=="rhoton"){
      this.properties.mode = 10**random(3,8)
    }
    this.properties.r_r = this.properties.r*(1+sim.int_r*Math.abs(this.properties.q))
    this.properties.r_n = this.properties.r*(1+sim.int_n*Math.abs(this.properties.c))

    this.serial_id = id_counter
    id_counter = id_counter+1;

    particle_atts[this.type].discovered[(this.sym+1)/2]=true
  }
  get_properties(){
    let prop = {}
    Object.assign(prop, particle_atts[this.type])
    prop.c = prop.c*sim.dc
    prop.q = prop.q*sim.dq

    return prop
  }

  anti(){
    this.sym = -this.sym
    this.properties.c = (this.properties.c+2)%4
    this.properties.q = -this.properties.q
  }


  give_name(){
    let name= ""
    if(this.sym==-1){
      name+="anti"
    }
    return name+this.type
  }
  check_case(p){
    if(this.type!="rhoton" && p.type==this.type && p.sym!=this.sym) {
      this.active = false;
      p.active = false;
      //if(this.type=="rhoton"){continue}
      //  console.log("Anihilation")
      //  console.log("  ",this.give_name())
      //  console.log("  ",p.give_name())

      let tot_c = (p.properties.c+this.properties.c)%4
      //console.log(tot_c,this.give_name(),this.properties.c,p.give_name(),p.properties.c)
      let mom = this.give_momentum().copy().add(p.give_momentum())
      let  opt = tot_c==2?[["rhoton",-1]]:[["rhoton",1]]
      let tote = this.give_energy()+p.give_energy()
      pl1.create(opt,tote,mom,this.pos.x,this.pos.y,3*particle_atts["nuon"].r,true)
      add_reaction([[this.type,this.sym],[p.type,p.sym]],opt,"anihilation",update_discovered())
    }else if(Object.keys(allowed_interactions_n).includes(this.give_name()+"-"+p.give_name())){
      let entry = allowed_interactions_n[this.give_name()+"-"+p.give_name()]
      //console.log(entry)
      if(random()<entry.proba){
        //console.log("a")
        this.active = false;
        p.active = false;
        let mom = this.give_momentum().copy().add(p.give_momentum())
        let  opt = chooseWeighted(entry.final)
        let tote = this.give_energy()+p.give_energy()
        pl1.create([opt],tote,mom,this.pos.x,this.pos.y,this.properties.r_n,true)
        add_reaction([[this.type,this.sym],[p.type,p.sym]],[opt],"reaction",update_discovered())
      }

    }
  }



  decay(){
    //  console.log("Decay ", this.give_name())
    if(Object.keys(decay_modes).includes(this.give_name())){
      let entry = decay_modes[this.give_name()]

      //console.log(entry)
      //console.log("a")
      this.active = false;

      let mom = this.give_momentum().copy()
      let  opt = chooseWeighted(entry.final)
      let tote = this.give_energy()
      pl1.create(opt,tote,mom,this.pos.x,this.pos.y,1.2*this.properties.r_n)
      add_reaction([[this.type,this.sym]],opt,"decay",update_discovered())



    }
  }


  interact_n(p,d,pl){
    if(dist(this.pos.x,this.pos.y,p.pos.x,p.pos.y)<2*(this.properties.r+p.properties.r)){
      this.check_case(p)
      // avoiding singularity
      this.pos.add(p5.Vector.random2D())
    }


    else{
      //let radius = pl.scale.x*this.properties.r
      let f_dir = p.pos.copy().sub(this.pos.copy()).setMag(1);
      let nrm_d = d+1
      //console.log(this.properties.id,this.properties.c,p.properties.id,p.properties.c)
      let multip = [-1,1][int(this.properties.c%4!=p.properties.c%4)]
      let amp = sim.const_n*this.properties.c*p.properties.c*multip/(nrm_d**3)//(Math.sqrt(d+1))
      let log_amp = 1/(1+exp(-amp/1e34))
      //console.log(log_amp)
      if(sim.lines==1){
        push()
        stroke(0,255,255,20*(log_amp))
        line(this.pos.x+pl.pos.x,this.pos.y+pl.pos.y,p.pos.x+pl.pos.x,p.pos.y+pl.pos.y)
        pop()
      }

      amp = amp*sim.dt
      let new_mom = f_dir.copy().mult(amp)
      this.add_momentum(new_mom)
    }


  }
  interact_r(p,d,pl){
    //let radius = pl.scale.x*this.properties.r
    let f_dir = p.pos.copy().sub(this.pos).setMag(1);
    let nrm_d = d + 1//this.properties.r+p.properties.r

    let amp = -sim.const_r*this.properties.q*p.properties.q/(nrm_d**2)

    //push()
    //stroke(255,255,255,100)
    //line(this.pos.x+pl.pos.x,this.pos.y+pl.pos.y,p.pos.x+pl.pos.x,p.pos.y+pl.pos.y)
    //pop()

    amp = amp*sim.dt
    this.add_momentum(f_dir.copy().mult(amp))




    if(d<=min(this.properties.r_n,p.properties.r_n)){
      if(this.serial_id<p.serial_id){
        //if(this.properties.m<=p.properties.m &&this.serial_id<p.serial_id){
        this.last_interact["n"][this.last_interact["n"].length] =p.give_name()
        this.last_interact["d"][this.last_interact["d"].length]=d+p.properties.r/2
      }else{
        this.last_interact["over_n"][0]=p.give_name()
      }
    }
  }




  give_momentum(){
    if(this.properties.m ==0){
      return this.vel.copy().mult(this.properties.mode)
    }
    return this.vel.copy().mult(this.properties.m)
  }
  give_energy(){
    if(this.properties.m!=0){
      return sqrt(((sim.c**4)*this.properties.m**2) + ((this.give_momentum().mag()**2)*sim.c**2))
    }else{
      return this.give_momentum().mag()*sim.c

    }
  }

  add_momentum(p){
    //console.log(p)
    if(this.properties.m ==0){
      let vel_add = p.copy().mult(1/this.properties.mode)
      let fact = 1/(1+(vel_add.mag()*this.vel.mag()/(sim.c**2)))
      this.vel.add(vel_add).mult(fact);

    }
    else{
      let vel_add = p.copy().mult(1/this.properties.m)
      let coeff = 1/(1+(this.vel.mag()*vel_add.mag()/(sim.c*sim.c)))
      if(this.vel.mag()<sim.v_th*sim.c){coeff=1}
      let newvel = this.vel.copy().add(vel_add).mult(coeff);
      this.vel = newvel.copy()
    }
  }


  rhoton_create(){
    let limit_m = this.give_energy()/(2*sim.c*sim.c)
    let candidates = []

    if(this.type=="rhoton" && this.can_create){


      for(let p of Object.keys(particle_atts)){
        let nu =particle_atts[p].c
        let anti_nu = (particle_atts[p].c+2)%4
        let summ = (nu+anti_nu)%4
        let pairs = pl1.check_pair_cases()
        if(particle_atts[p].m<limit_m && summ==this.properties.c && p!="rhoton" && pairs.includes(p)){
          candidates.push(p)
          console.log(p);
        }
      }

    }else{return}
    if(candidates.length!=0){
      console.log(limit_m,candidates);
      this.active = false

      let part = random(candidates)
      let k_e = this.give_energy()-(2*particle_atts[part].m*sim.c*sim.c)

      let p1 = [part,1]
      let p2 = [part,-1]

      let prad = pl1.scale.x * 5 * particle_atts[part].r

      pl1.create([p1,p2],k_e,this.give_momentum(),this.pos.x,this.pos.y,prad)
    }
  }
  move(pl){



    let radius = pl.scale.x*this.properties.r/2
    if(this.properties.m==0){
      this.vel.setMag(sim.c)
      let move = this.vel.copy().mult(sim.dt).mult(1/sim.dx);
      this.pos.add(move)
    }else{


      if(this.vel.mag()>sim.v_th*sim.c){
        let vmag = (this.give_momentum().mag()*sim.c**2)/this.give_energy()
        this.vel.setMag(vmag)
      }

      let move = this.vel.copy().mult(sim.dt).mult(1/sim.dx);
      this.pos.add(move)
    }



    // bounded


    let off_bounds = false

    if(sim.bounded=="walls"){
      if(this.pos.x+radius > pl.size.x ){
        off_bounds = true
        this.pos.x = pl.size.x-radius
        this.vel.x = -this.vel.x

      }
      if(this.pos.x-radius < 0 ){
        off_bounds = true
        this.pos.x = radius
        this.vel.x = -this.vel.x
      }
      if(this.pos.y+radius > pl.size.y ){
        off_bounds = true
        this.pos.y = pl.size.y-radius
        this.vel.y = -this.vel.y
      }
      if(this.pos.y-radius < 0 ){
        off_bounds = true
        this.pos.y = radius
        this.vel.y = -this.vel.y
      }
    }
    // open
    else if(sim.bounded=="periodic"){
      if(this.pos.x+radius > pl.size.x ){
        off_bounds = true
        this.pos.x = radius
      }
      else if(this.pos.x-radius < 0 ){
        off_bounds = true
        this.pos.x = pl.size.x-radius
      }
      if(this.pos.y+radius > pl.size.y ){
        off_bounds = true
        this.pos.y = radius
      }
      else if(this.pos.y-radius < 0 ){
        off_bounds = true
        this.pos.y = pl.size.y-radius
      }

    }else if(sim.bounded=="open"){

      if(this.pos.x+radius > pl.size.x ){
        off_bounds = true
        this.pos.x = pl.size.x-radius
        this.vel.x = -this.vel.x

      }
      else if(this.pos.x-radius < 0 ){
        off_bounds = true
        this.pos.x = radius
        this.vel.x = -this.vel.x
      }
      if(this.pos.y+radius > pl.size.y ){
        off_bounds = true
        this.pos.y = pl.size.y-radius
        this.vel.y = -this.vel.y
      }
      else if(this.pos.y-radius < 0 ){
        off_bounds = true
        this.pos.y = radius
        this.vel.y = -this.vel.y
      }
      if (off_bounds){
        this.active=false
      }
    }
    if (off_bounds && ((this.properties.radiation && sim.bound_absorb_radiation))){
      this.active=false
    }
    if (off_bounds && ((!this.properties.radiation && sim.bound_absorb_matter))){
      this.active=false
    }
  }



  group_search(xx,yy,scale){
    for(let letter of Object.keys(allowed_groups)){
      let group= allowed_groups[letter]
      let plus = group.plus
      let minus = group.minus
      let allp = plus.concat(minus)
      if( allp.includes(this.give_name()) ) {
        this.determine_group(letter,xx,yy,scale)
      }
    }
  }


  determine_group(letter,xx,yy,scale){
    let group= allowed_groups[letter]
    let only = group.exclusive

    let plus = group.plus
    let minus = group.minus
    let allp = plus.concat(minus)


    let mag = 5 +group.scale/scale
    let mag_n = group.n_scale/scale


    //console.log(only,plus,minus,mag)
    let cond1 = only?containsOnly(allp,this.last_interact["n"]):containsSome(allp,this.last_interact["n"])
    if(allp.includes(this.give_name()) && this.last_interact["over_n"].length==0 && this.last_interact["n"].length>0 && cond1){
      let cts = give_counts(this.last_interact["n"].concat(this.give_name()))

      let rho_charge = cts["rho_charge"]
      let nu_charge = cts["nu_charge"]
      let m = cts["mass"]

      for(let p of allp){
        if(!cts[p]){return}
      }
      // let c_m = cts[minus]?cts[minus]:0
      // let c_p = cts[plus]?cts[plus]:0
      //
      // if(c_m*c_p==0){return}
      // //if(plus==minus){c_m=0,c_p=c_p/2}


      push()
      noFill()

      //let t_charge =(((c_p-c_m)/(c_p+c_m))+1)/2
      let t_charge = constrain(map(rho_charge,-20,20,0,1),0,1)
      let col = 255
      if(rho_charge!=0){
        if(rho_charge>0){
          col=[255,100+155*(1-t_charge),100+155*(1-t_charge)]
        }else{
          col=[100+155*(t_charge),100+155*(t_charge),255]
        }

      }
      stroke(col)
      let r_bound =constrain(max(this.last_interact["d"])*mag,20,220)+5+mag_n*2*Math.log10(m)
      circle(xx,yy,r_bound)
      fill(200)
      noStroke()
      textAlign(CENTER,CENTER)
      //letter
      let dy = -14-r_bound/2
      textSize(16)
      text(letter,xx+8,yy+dy)
      //up number
      textSize(10)
      let txtchrg = rho_charge>0?"+"+rho_charge:rho_charge
      text(txtchrg,xx-16,yy+dy-7)
      // down number
      //text(c_m,xx-16,yy+dy+5)
      //text((-c_m)+(c_p),xx,yy+7+r_bound/2)

      for (var i = 0; i < allp.length; i++) {
        let ccol = give_p_color(allp[i])
        textSize(11)
        fill(ccol)
        text(cts[allp[i]],xx-dy+5,yy-15*(i-1))
      }




      pop()
    }
  }


  paint(pl){

    if(sim.stop==false){
      this.move(pl)
      if(sim.fieldactive){
        let mom_field = createVector(1,0).rotate(sim.fielddirection)
        let fmag = 10**map(sim.fieldmagnitude,0,1,32,39)
        let amp_field = this.properties.q * sim.fieldmagnitude * fmag

        mom_field = mom_field.setMag(amp_field*sim.dt)
        console.log(mom_field);
        this.add_momentum(mom_field)
      }
    }


    let radius = pl.scale.x*this.properties.r
    let xx = pl.pos.x+this.pos.x
    let yy = pl.pos.y+this.pos.y
    push()
    let col  = this.properties.colors.normal;
    if(this.sym==-1){col = this.properties.colors.anti}
    col = color(col)
    col.setAlpha(180)
    fill(col)
    let indeter= Math.log10(1+this.properties.m*sim.dx/(sim.dt*sim.c))/4

    let cxx = xx
    let cyy = yy
    if(sim.brownian_motion){
      cxx = cxx + randomGaussian(0,indeter)
      cyy = cyy + randomGaussian(0,indeter)
    }
    circle(cxx,cyy,radius)
    pop()

    if(sim.stop==false && this.active){
    this.time = this.time+1;
    let tau  = (this.time*sim.dt/this.properties.hlt)
    tau = map(1/(1+exp(-tau)),0.5,1,0,1);
    //console.log(this.properties.id,tau)
    if(random()<tau){
      this.rhoton_create()
      if(Object.keys(decay_modes).includes(this.give_name())&&this.active){
        this.active=false
        this.decay()
    }

    }
    //frameCount%sim.step_interact==0&&
    //console.log(this.last_interact["n"],this.type,this.last_interact["over_n"].length==0 , this.last_interact["n"].length>0 )

    //this.determine_group("pluson","pluson","Φ+",20/pl.scale.x,xx,yy)
    //this.determine_group("minon","minon","Φ-",20/pl.scale.x,xx,yy)
    if(frameCount%(sim.step_interact)==0 && sim.groups==1){
      this.group_search(xx,yy,pl.scale.x)

      // this.determine_group("pluson","minon","Λ",5+5/pl.scale.x,xx,yy,true)
      // this.determine_group("pluson","vuon","Δ",5+5/pl.scale.x,xx,yy,true)
      // this.determine_group("pluson","anurion","η+",5+5/pl.scale.x,xx,yy,true)
      // this.determine_group("antianurion","antipluson","η-",5+5/pl.scale.x,xx,yy,true)
      // this.determine_group("antijaudion","antipluson","π",5+5/pl.scale.x,xx,yy,true)
      //   this.determine_group("antijaudion","minon","μ",5+5/pl.scale.x,xx,yy,true)
      // this.determine_group("antianurion","minon","Φ+",5+5/pl.scale.x,xx,yy,true)
      //   this.determine_group("antiminon","anurion","Φ-",5+5/pl.scale.x,xx,yy,true)

    }
    for(let np of Object.keys(this.last_interact)){

      this.last_interact[np]=[];
    }

  }

    if(sim.tags){
      push()
      textAlign(CENTER,CENTER);
      fill(255);
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
}
