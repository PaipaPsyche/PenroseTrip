
var action_costs = {  //[ [boudaries action made],[boundaries cost]] used to map [0,1]
   "digest":[[0,10],[0,5]],
   "move":[[0,2],[0,10]],
   "sense":[[0,500],[0,5]],
   "shield":[[0,1],[0,5]],
   "waste":[[0,1],[0,5]]
}

class cell{
  constructor(x,y){

    this.genes = new genes();
    //position & moveement mechanics
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);


    // nutrition mechanics
    this.mass = atts.simulation.cell.min_mass;
    this.savings = 0;
    this.health  = 100;
    this.energy = 100;
    this.food = 0;
    this.shield = 100;
    this.waste = 0;


    // special genes
    this.metabolic_rate = int(map(this.genes.dna["metabolism"],0,1,1,atts.simulation.cell.max_metab));
    this.sense = int(map(this.genes.dna["sense"],0,1,action_costs["sense"][0][0],action_costs["sense"][0][1]))

    //cell death
    this.eaten = 0;
    this.exploded = 0;

    //cell experience

    this.time = 0;
    this.cycles = 0;
    this.preys = 0;
    this.taken = 0;
    this.dirt =  0;


    //paint

  }

//UTIL

    put(obj,style,mult){
      let new_pos = this.pos.copy()
      let velcopy = this.vel.copy()
      if(style=="back"){
        new_pos.sub(velcopy.setMag(this.mass*atts.simulation.cell.radius_mult*mult));
      }
      else if(style=="forward"){
        new_pos.add(velcopy.setMag(this.mass*atts.simulation.cell.radius_mult*mult));
      }
      else if(style=="random"){
        let new_vec = createVector(random(-1,1),random(-1,1));
        new_vec.setMag(this.mass*atts.simulation.cell.radius_mult*mult)
        new_pos.add(new_vec);

      }

      obj.pos = new_pos.copy();

      return obj
    }

    explode(){
      if(this.exploded==0){

        for(let i=0;i<this.mass*atts.simulation.cell.food_per_mass;i++){
          agents.push(this.put(new agent(0,0,"food"),"random",2+randomGaussian()));
        }
        for(let i=0;i<this.dirt+int(this.waste)*atts.simulation.cell.food_per_mass;i++){
          agents.push(this.put(new agent(0,0,"waste"),"random",3+randomGaussian()));
        }
        this.exploded=1;
        this.health=0;
        this.shield=0;
        this.energy=0;
      }
    }

    damage(){
      if(this.shield>0){
        this.shield = max(0,this.shield-atts.simulation.waste_damage);
      }
      else{
        this.health = max(0,this.health-atts.simulation.waste_damage);
      }
    }



  //scoring


  score(method){

    if(method == "time"){
      return this.time*(1/50);
    }else if(method=="eat"){
      return this.taken + 2*this.preys;
    }else if(method=="size"){
      return (this.mass-atts.simulation.cell.min_mass) + map(this.savings,0,100,0,1);
    }else if(method=="cycles"){
      return this.cycles;
    }else if(method=="hunting"){
      return this.preys + (this.mass-atts.simulation.cell.min_mass);
    }else if(method=="berserk"){
      return this.dirt + this.score("eat");
    }else if(method=="die"){
      //return 100/(1+log(1+this.time/10));
      return 200/(1+exp((this.time/1500)**2))
    }else if(method=="pick"){
      return this.score("eat")/(1+this.score("poop"));
    }else if(method=="poop"){
      return this.dirt;
    }else if(method=="food"){
      return this.taken;
    }
    // else if(method =="all"){
    //   let sum_consume = max(0,eat_score+size_score-this.dirt)*(1-0.5*this.eaten)
    //   return sum_consume;
    // }
  }



  // VECTORIZING
  vector_correction(vec,d,mode){
    let v = vec.copy()
    let c = 1000;
    if(mode=="inv-lineal"){
      v.setMag(c/(1+d));
    }else if(mode=="inv-sqrt"){
      v.setMag(c/((1+d)**2));
    }
    else if(mode=="const"){
      v.setMag(c);
    }

    return v;
  }


  vec_closest_cell(C){
    let closest=this.sense;
    let elem = null;
    let vec = createVector(0,0);
    for(let cl of C){
      if(cl!=this && cl.health>0 && this.pos.dist(cl.pos)<closest){
        closest = this.pos.dist(cl.pos)
        elem = cl;
        vec = cl.pos.copy()
        vec.sub(this.pos)
      }
    }


    return [elem,vec];
  }

  vec_closest_agent(A,type){
    let closest=this.sense;
    let elem = null;
    let vec = createVector(0,0);
    for(let ag of A){
      if(ag.type==type && this.pos.dist(ag.pos)<closest){
        closest = this.pos.dist(ag.pos)
        elem = ag;
        vec = ag.pos.copy()
        vec.sub(this.pos)
      }
    }

    return [elem,vec];
  }


// DIGESING
  digest(){
    let d_food = map(this.genes.dna["digest"],0,1,action_costs["digest"][0][0],action_costs["digest"][0][1]);

    let food_taken = min(this.food,d_food);
    this.food = this.food - food_taken;

    if(this.health==100){
      this.energy += atts.simulation.cell.efficiency * food_taken*atts.simulation.food_content;
      this.waste +=food_taken;
    }else{
      this.health += atts.simulation.cell.efficiency * food_taken*atts.simulation.food_content;
      if(this.health>100){
        this.energy += this.health-100;
        this.waste +=0.5*food_taken;
        this.health=100;
        this.energy+=0.1*food_taken;

      }
    }




    let cost_waste = 0
    if(this.waste>0 && random()<2*this.genes.dna["metabolism"]){
      let val_w = this.genes.dna["waste"]*atts.simulation.food_content;
      this.waste = max(0,this.waste-val_w)
      cost_waste = map(this.genes.dna["waste"],0,1,action_costs["waste"][1][0],action_costs["waste"][1][1])
      agents.push(this.put(new agent(0,0,"waste"),"back",4))
    }
    if(this.waste>100){
      this.health -=this.genes.dna["waste"]*atts.simulation.food_content;
    }



    let cost= map(food_taken,action_costs["digest"][0][0],action_costs["digest"][0][1],action_costs["digest"][1][0],action_costs["digest"][1][1]);
    cost = cost + cost_waste;
    return cost
  }
// MOVING
  random_movement(lim){
    return createVector(randomGaussian(0,lim/2),randomGaussian(0,lim/2)).limit(lim);
  }

  genetic_movement(A,C,lim){
    let vec_food = this.vec_closest_agent(A,"food")[1];
    let vec_cell = this.vec_closest_cell(C)[1];
    let vec_waste = this.vec_closest_agent(A,"waste")[1];

    vec_food =  this.vector_correction(vec_food,vec_food.mag(),atts.simulation.cell.vectorization)
    vec_cell =  this.vector_correction(vec_cell,vec_cell.mag(),atts.simulation.cell.vectorization)
    vec_waste =  this.vector_correction(vec_waste,vec_waste.mag(),atts.simulation.cell.vectorization)

    let m_difference = 0;
    if(vec_cell.mag()>0){
      m_difference = this.mass - this.vec_closest_cell(C)[0].mass;
    }

    let food_scaler  = map(this.genes.dna["W_f"],0,1,-10,10);
    let waste_scaler  = map(this.genes.dna["W_w"],0,1,-10,10);
    let cell_scaler  = map(this.genes.dna["W_c"],0,1,-10,10);
    let mass_bias = map(this.genes.dna["d_w"],0,1,-10,10);
    cell_scaler = cell_scaler*m_difference + mass_bias



    vec_food.mult(food_scaler)
    vec_cell.mult(cell_scaler)
    vec_waste.mult(waste_scaler)


    vec_food.add(vec_waste).add(vec_cell).limit(lim)
    vec_food.mult(random(0.9,1.1))

    return  vec_food;
  }

  generate_movement(A,C,lim){
    let random_m = this.random_movement(lim);
    let genetic_m = this.genetic_movement(A,C,lim);

    let random_balance  = this.genes.dna["G_r"];

    random_m.mult(random_balance).add(genetic_m.mult(1-random_balance)).limit(atts.simulation.thrust)

    return random_m;
  }

//  UPDATING

  check_agents(agnts){
    let count = {}
    for(let ag of agnts){
      if(ag.pos.dist(this.pos)<=(1+this.mass*atts.simulation.cell.radius_mult)){
        ag.eaten = 1;
        if(Object.keys(count).includes(ag.type)){
          count[ag.type]++;
        }else{
          count[ag.type]=1;
        }
      }
    }
    //if(count!={}){console.log(count)}

    return count;
  }

  check_cells(clls){

    for(let cl of cells){
      if(cl!=this  && cl.pos.dist(this.pos)<=((this.mass+cl.mass)*atts.simulation.cell.radius_mult)){
        if(cl.health>0){
          let dif = this.mass - cl.mass
          if(dif>=atts.simulation.cell.mass_supremacy){
            cl.eaten=1;
            cl.health = 0;

            this.food=min(100,this.food+dif);
            this.preys++;
          }
          else if(atts.simulation.collision){
            cl.damage()
          }
        }

      }
    }
  }
  update_genes(g){
    this.genes = g;
    this.metabolic_rate = int(map(this.genes.dna["metabolism"],0,1,1,atts.simulation.cell.max_metab));
    this.sense = int(map(this.genes.dna["sense"],0,1,action_costs["sense"][0][0],action_costs["sense"][0][1]))

  }
  update_cycle(){
    if(this.time%this.metabolic_rate == 0 && this.health>0){
      this.cycles++;

      let lim_value = map(this.genes.dna["move"],0,1,action_costs["move"][0][0],action_costs["move"][0][1]);

      this.acc = this.generate_movement(agents,cells,lim_value);

      let move_cost = map(this.acc.mag(),0,lim_value,action_costs["move"][1][0],action_costs["move"][1][1]);

      let digest_cost = this.digest();
      let sense_cost = map(this.genes.dna["sense"],0,1,action_costs["sense"][1][0],action_costs["sense"][1][1])





      if(this.savings>5*this.mass && this.mass<atts.simulation.cell.max_mass){
        this.savings = 0;
        this.mass++;
        this.energy=50;
      }

      let shield_cost = 0
      if(this.energy>50 && this.shield<100){

        let dif  = 100 - this.shield;
        let val_shield = this.genes.dna["shield"]*atts.simulation.food_content;
        let scost = map(this.genes.dna["shield"],0,1,action_costs["shield"][1][0],action_costs["shield"][1][1]);
        if(dif>=val_shield){
          this.shield +=val_shield;
          shield_cost = scost;
        }else{
          this.shield = 100;
          shield_cost = map(dif/val_shield,0,1,action_costs["shield"][1][0],scost);
        }


      }


      let cost = move_cost + digest_cost + sense_cost

      // console.log("H : ",(this.health).toFixed(1))
      // console.log("E : ",(this.energy).toFixed(1))
      // console.log("F : ",(this.food).toFixed(1))
      // console.log("S : ",(this.savings).toFixed(1))
      return cost;
    }
    else{
    return 0
  }

  }
  update(ag,cl){

    let ag_count = this.check_agents(ag);
    this.check_cells(cl)
    if(ag_count.food){
      //console.log(ag_count)
      this.food=min(100,this.food+ag_count.food);
      this.taken += ag_count.food;
    }
    if(ag_count.waste){
      for(let i = 0; i<int(ag_count.waste);i++){
        this.damage()
        this.dirt++;
        this.food=min(100,atts.simulation.waste_content);
      }
    }

    let costs = this.update_cycle();
    costs = costs * atts.simulation.cell.cost_scaler
    let life_cost = atts.simulation.cell.life_cost * sqrt(this.mass);
    let total_cost = costs + life_cost;



    this.energy = this.energy - total_cost;
    if(this.energy<100){
      this.energy+=this.savings;
      let exc = max(0,this.energy-100);
      this.savings=exc;
    }
    if(this.energy<0){
      let exc = -this.energy;
      this.energy = 0;
      //autoconsume
      this.health = this.health - exc*atts.simulation.cell.autoconsume_rate;
    }



    if(this.health <=0){
      this.health=0;
    }else{
      this.time++;

      let velmag = constrain(this.vel.mag()*atts.simulation.visc_vel_coef,0,atts.simulation.cell.max_vel)
      let visc_coef = map(atts.simulation.viscosity*this.mass*velmag,0,atts.simulation.cell.max_mass*atts.simulation.cell.max_vel,1,0);


      this.vel.add(this.acc);
      this.vel.mult(visc_coef);
      this.vel.limit(atts.simulation.cell.max_vel);

      this.pos.add(this.vel);
    }


    //constrains

    if(this.energy>100){
      let extra = this.energy-100

      this.savings = min(100,this.savings + 0.5*extra*atts.simulation.cell.efficiency); //saving the extra
      this.energy = 100;
    }
    this.savings = min(this.savings,100);








    if(atts.simulation.border == "closed"){
      this.pos.x = min(max(0,this.pos.x),atts.display.w);
      this.pos.y = min(max(0,this.pos.y),atts.display.h);
    }else if(atts.simulation.border == "periodic"){
      this.pos.x = this.pos.x%atts.display.w;
      this.pos.y = this.pos.y%atts.display.h;
    }
  }

// PAINTING

  paint_vector(vec,color,mag,g_val=null){
    push()

    translate(this.pos.x,this.pos.y);
    rotate(vec.heading());
    //fill(0,2550,0,100);
    stroke(color)
    line(0,0,vec.mag()*mag,0);
    fill(color)
    beginShape()
    vertex(vec.mag()*mag,1.5)
    vertex(vec.mag()*mag,-1.5)
    if(g_val){
      let h  = g_val>0.5?2:-2;
      vertex(vec.mag()*mag+h,0)
    }else{
      vertex(vec.mag()*mag+2,0)
    }

    endShape(CLOSE)
    pop()
  }

  click(){
    if(dist(this.pos.x,this.pos.y,mouseX,mouseY)<2*atts.simulation.cell.radius_mult*this.mass){
      return true;
    }
    return false;
  }

  display(n,disp,c){
    if(disp=="none"){return;}
    let disp_val = 0;
    if(disp=="health"){
      disp_val=this.health;
    }else if(disp=="score"){
      disp_val=this.score(atts.simulation.breeding.score_method);
    }else if(disp=="energy"){
      disp_val=this.energy;
    }else if(disp=="shield"){
      disp_val=this.shield;
    }else if(disp=="mass"){
      disp_val=this.mass;
    }else if(disp=="food"){
      disp_val=this.taken;
    }else if(disp=="dirt"){
      disp_val=this.dirt;
    }else if(disp=="preys"){
      disp_val=this.preys;
    }else if(disp=="cycles"){
      disp_val=this.cycles;
    }else if(disp=="id"){
      disp_val=this.genes.id.me;
    }else if(disp=="mom"){
      disp_val=this.genes.id.mom;
    }else if(disp=="dad"){
      disp_val=this.genes.id.dad;
    }

    let xo,yo;
    if(n == 1){
      xo = 0;
      yo = -this.mass*atts.simulation.cell.radius_mult - 15;
    }else if(n==2){
      xo = 0;
      yo = -this.mass*atts.simulation.cell.radius_mult - 7;
    }else if(n == 3){
      xo = 0;
      yo = this.mass*atts.simulation.cell.radius_mult + 7;
    }else if(n==4){
      xo = 0;
      yo = this.mass*atts.simulation.cell.radius_mult + 15;
    }
    push()
    textSize(7)
    noStroke()
    if(this.health>0){fill(c)}else{fill(80)}
    text(int(disp_val),xo,yo);

    pop()
  }

  paint_card(x,y,r,frame=null){
    push()
    translate(x,y);
    if(frame){
      rectMode(CENTER);
      stroke(frame);
      fill(0,0,0,180);
      rect(0,0,2*r+10,2*r+20);
    }

    let r_c = map(this.mass,atts.simulation.cell.min_mass,atts.simulation.cell.max_mass,r*0.7,r*0.9)
    // PAINT WALL
    let c_cell =this.health<=0?80:255;
    stroke(c_cell);
    circle(0,0,r_c+3)

    //PAINT SHIELD
    strokeWeight(2);
    stroke(0,255,255);
    arc(0,0,2*r_c,2*r_c,0,0.01+map(this.shield,0,100,0,2*PI))

    //PAINT Energy
    strokeWeight(2);
    stroke(255,255,0);
    arc(0,0,0.75*r_c,0.75*r_c,0,0.01+map(this.energy,0,100,0,2*PI))

    //PAINT life
    strokeWeight(2);
    stroke(0,255,0);
    fill(0,255,0)
    arc(0,0,0.5*r_c,0.5*r_c,0,0.001+map(this.health,0,100,0,2*PI),PIE)


    //STOCKS
    fill(255,50,0)
    noStroke()
    let tt = (T/this.metabolic_rate)/2;
    text(int(this.waste),r_c*0.7*cos(tt+2*PI/3),r_c*0.7*sin(tt+2*PI/3));


    fill(155,50,250)
    noStroke()
    text(int(this.savings),r_c*0.7*cos(tt+4*PI/3),r_c*0.7*sin(tt+4*PI/3));


    fill(255,150,5)
    noStroke()
    text(int(this.food),r_c*0.7*cos(tt+2*PI),r_c*0.7*sin(tt+2*PI));

    fill(255)
    textSize(10)
    text(this.mass,-r+5,r)

    rectMode(CENTER)
    if(this.health<=0){fill(80)}
    rect(0,-r,map(this.time%this.metabolic_rate,0,this.metabolic_rate-1,0,2*r-10),5)

    noFill()
    stroke(255)
    rect(-r+5,r,15,15)
    pop()



  }

  paint(){
    //console.log(this.shield)
    if(this.exploded==0 && this.health<=0 && this.eaten==0){
      this.explode();
    }

    let close_cell = this.vec_closest_cell(cells)[1]
    let close_food = this.vec_closest_agent(agents,"food")[1]
    let close_waste = this.vec_closest_agent(agents,"waste")[1]

    if(atts.display.show_cell_vec==1 && this.health>0){

      if(close_cell.mag()!=0){
        this.paint_vector(close_cell,[0,255,0,500*abs(0.5-this.genes.dna["W_c"])],atts.display.long_vec,this.genes.dna["W_c"])
      }
      if(close_food.mag()!=0){
        this.paint_vector(close_food,[0,0,255,500*abs(0.5-this.genes.dna["W_f"])],atts.display.long_vec,this.genes.dna["W_f"])
      }
      if(close_waste.mag()!=0){
        this.paint_vector(close_waste,[255,0,0,500*abs(0.5-this.genes.dna["W_w"])],atts.display.long_vec,this.genes.dna["W_w"])      }

    }

    push()
    translate(this.pos.x,this.pos.y);
    this.display(1,atts.display.monitor.m1[0],atts.display.monitor.m1[1])
    this.display(2,atts.display.monitor.m2[0],atts.display.monitor.m2[1])
    this.display(3,atts.display.monitor.m3[0],atts.display.monitor.m3[1])
    this.display(4,atts.display.monitor.m4[0],atts.display.monitor.m4[1])
    let r_cell = atts.simulation.cell.radius_mult*this.mass
    //external circle - wall (1-0.8) variable
    let c_wall = this.health>0?255:50;
    fill(c_wall);
    stroke(0)
    strokeWeight(0.5)
    circle(0,0,r_cell*map(this.shield,0,100,0.8,1));

    if(this==genetic_display_sel){
      noFill()
      strokeWeight(2)
      stroke(255,255,0);
      circle(0,0,r_cell)
    }




    // //shield (0.2)
    // let r_s = 1.5*r_cell;
    // fill(0,0,160);
    // stroke(0)
    // strokeWeight(0.5)
    // arc(0, 0,r_s,r_s, 0,map(this.shield,0,99,0,2*PI), PIE)
    //
    //
    //
    // //energy (0.2)
    // let r_h = r_cell;
    // fill(0,125,200);
    // stroke(0)
    // strokeWeight(0.5)
    // arc(0, 0,r_h,r_h, 0,map(this.energy,0,99,0,2*PI), PIE)
    //


    //health (0.2)
    let r_e = 1.5*r_cell;
    fill(255,255,0);
    if(this.health<=0){fill(30)}
    stroke(0)
    strokeWeight(0.5)
    arc(0, 0,r_e,r_e, 0,map(this.energy,0,99,0,2*PI), PIE)




    // medium circle (0.3-0.7) const


    let c_health = map(this.health,0,100,100,255);
    fill([0,c_health,0]);
    stroke(0)
    strokeWeight(0.5)
    circle(0,0,r_cell*0.4);








    // fill(255)
    // textAlign(CENTER,CENTER)
    // textSize(7)
    // text((this.score(atts.simulation.breeding.score_method)).toFixed(0),0,r_cell+8)
    // text((this.food).toFixed(0),0,r_cell+16)
    // text((this.energy).toFixed(0),0,r_cell+24)
    // //
    // text((this.savings).toFixed(0),0,30)
    // text((this.mass).toFixed(0),0,40)
    pop()

  }
}
