var genetic_atts_01=["W_f","W_w","W_c","d_w","G_r","V_r","waste","sense","move","digest","metabolism","shield"]




class genes{
  constructor(){
    this.dna = {};
    this.id = {
      dad:0,
      mom:0,
      me: new_id()
    }
    this.gen  = 1;
    this.assign_gen(gen);

    this.editable = true;

    for(let i=0;i<genetic_atts_01.length;i++){
      this.dna[genetic_atts_01[i]]=random()
    }
    //this.dna["W_f"]=1;
    // this.dna["G_r"]=0;

  }

  assign_gen(n){
    this.gen =n;
  }


  parents(p1,p2,whole="no"){
    if((this.id.mom==0 || this.id.dad==0)&&this.editable){
      if(whole!="no"){
        this.id.mom = p1.id;
        this.id.dad = p2.id;
      }else{
        this.id.mom = p1.id.me;
        this.id.dad = p2.id.me;

      }
    }

  }

  correct(){
    let new_dict = {};
    for(let g of genetic_atts_01){
      if(Object.keys(this.dna).includes(g)){
        new_dict[g] = this.dna[g]
      }
    }
    this.dna = new_dict;
  }
  set_dna(dna){
    this.dna = dna;
  }


  check_compatibilty(ngenes){
    let not_in = 0;
    for(let g of Object.keys(this.dna)){
      if(Object.keys(ngenes.dna).includes(g) == false){
        not_in++;
      }
    }
    for(let g of Object.keys(ngenes.dna)){
      if(Object.keys(this.dna).includes(g) == false){
        not_in++;
      }
    }

    if(not_in==0){
      return true;
    }

    return false;

  }

  set_gene(char,val){
    for(let g of Object.keys(this.dna)){
      if(char == g){
        this.dna[char]=val
      }
    }
  }

  mutate(p){

    for(let g of Object.keys(this.dna)){

      if(random()<p){
        let nval = min(max(this.dna[char]+randomGaussian(0,0.5),0),1);
        this.dna[char]=nval;
      }
    }

  }



  add(ngenes){
    if(this.check_compatibilty(ngenes)){
      let new_dna = {}
      for(let char of Object.keys(this.dna)){
        new_dna[char] = this.dna[char]+ngenes.dna[char]
      }
      let newG = new genes();
      newG.set_dna(new_dna);
      return newG;

    }else{
      console.log("DNA set not compatible");
      let newG = new genes();
      newG.set_dna(this.dna);
      return newG;
    }
  }


  constrain(minv,maxv){

      let new_dna = {}
      for(let char of Object.keys(this.dna)){
        new_dna[char] = constrain(this.dna[char],minv,maxv)
      }
      let newG = new genes();
      newG.set_dna(new_dna);

      return newG;


  }
  mult(num){

      let new_dna = {}
      for(let char of Object.keys(this.dna)){
        new_dna[char] = this.dna[char]*num;
      }
      let newG = new genes();
      newG.set_dna(new_dna);

      return newG;

  }

  mean(ngenes){
    let new_g = this.add(ngenes)
    return new_g.mult(0.5)
  }

  switch(ngenes){
    if(this.check_compatibilty(ngenes)){
      let new_dna = {}
      for(let char of Object.keys(this.dna)){
        new_dna[char] = random([this.dna[char],ngenes.dna[char]]);
      }
      let newG = new genes();
      newG.set_dna(new_dna);
      return newG;

    }else{
      console.log("DNA set not compatible");
      let newG = new genes();
      newG.set_dna(this.dna);
      return newG;
    }
  }

  give_name(whole="no"){
    if(whole!="no"){
      return this.id.dad.me +"-"+ this.id.me +"-"+ this.id.mom.me
    }else{
      return this.id.dad +"-"+ this.id.me +"-"+ this.id.mom
    }

  }

  paint(x,y,r,frame=null,n=null){
    push()
    translate(x,y)


    if(frame){
      push()
      rectMode(CENTER);
      stroke(frame);
      fill(0,0,0,180);
      rect(0,0,2*r+10,2*r+20);
      pop();
    }



    noFill();

    //cirlce && axes

    let r_cirlce_1 = map(this.dna["sense"],0,1,8,r/3);


    //UPPER WING
    let end_gcell =  map(this.dna["W_c"],0,1,-r/2,r/2);
    let end_bcell =  map(this.dna["d_w"],0,1,-r/5,r/5);


    let end_gfood =  map(this.dna["W_f"],0,1,-r/2,r/2);
    let end_gwaste =  map(this.dna["W_w"],0,1,-r/2,r/2);

    stroke(0,255,0)
    line(0,-4*r/5,end_gcell,-4*r/5)
    line(end_gcell,-4*r/5,end_gcell,-4*r/5+end_bcell);

    stroke(0,0,255)
    line(0,-3*r/5,end_gfood,-3*r/5)

    stroke(255,0,0)
    line(0,-2*r/5,end_gwaste,-2*r/5)

    // LEFT WING
    stroke(0,255,255)
    line(-2*r/3,0,-2*r/3,map(this.dna["shield"],0,1,0,r/3))

    stroke(250,0,150)
    line(-3*r/7,0,-3*r/7,map(this.dna["move"],0,1,0,r/3))


    // RIGHT WING

    stroke(250,200,50)
    line(3*r/7,0,3*r/7,map(this.dna["digest"],0,1,0,r/3))

    stroke(250,125,0)
    line(2*r/3,0,2*r/3,map(this.dna["waste"],0,1,0,r/3))

    // LOW WING
    stroke(150,100,250)

    line(0,2*r/3,map(this.dna["G_r"],0,1,-r/2,r/2),2*r/3)
    stroke(100,250,100)
    line(0,3*r/7,map(this.dna["V_r"],0,1,-r/2,r/2),3*r/7)



    let cr = int(255*this.dna["W_w"]);
    let cg = int(255*this.dna["W_c"]);
    let cb = int(255*this.dna["W_f"]);
    stroke([cr,cg,cb]);
    circle(0,0,r_cirlce_1);
    stroke(255);
    line(0,-r_cirlce_1,0,-4*r/5); //superior axis
    line(0,r_cirlce_1,0,4*r/5); //low axis
    line(-r_cirlce_1,0,-2*r/3,0); //left axis
    line(r_cirlce_1,0,2*r/3,0); //right axis

    arc(0,0,r_cirlce_1,r_cirlce_1,0,map(this.dna["metabolism"],0,1,0,2*PI))


    push()
    let m_rate = int(map(this.dna["metabolism"],0,1,1,atts.simulation.cell.max_metab));
    rotate(map(T%m_rate,0,m_rate,0,2*PI));
    stroke(255,255,0)
    line(0,r_cirlce_1,0,r_cirlce_1*0.5);
    pop()


    if(T%m_rate==0){
      fill(255)
      circle(0,0,r_cirlce_1*0.5);
    }


    fill(255)
    noStroke()
    textSize(9);
    textAlign(CENTER,CENTER);
    text(this.give_name(),0,r+1)
    textSize(9);
    text(this.gen,-r+2,r-1)
    if(n){
      text(n,-r+2,-r+2)
    }


    rectMode(CENTER);
    noFill()
    stroke(255)
    rect(-r+2,r,16,16);
    // if(n){
    //   rect(-r+2,-r,16,16);
    // }





    pop()
  }



}
