class simulation {
  constructor(x, y, w, h) {

    this.position = createVector(x, y)
    this.W = w;
    this.H = h;


    this.plot = new plot(atts_sim["margin"], atts_sim["margin"])
    this.poll = {
      "suceptible": 0,
      "infected": 0,
      "dead": 0,
      "cured": 0,
      "total": 0
    };



    this.changes = 1;
    this.boids = []
    let p_zero_count = 0;

    for (let i = 0; i < atts_sim["n"]; i++) {

      this.boids[i] = new boid(x, y, x + w, y + h, this.boid_atts)


      if (p_zero_count < atts_sim["p_zero"]) {
        this.boids[i].infect()
        p_zero_count++;
      }
    }

    this.adjust_density()

  }


  calculate_density(){
    var Abox = this.W * this.H;
    var Aboids = this.boids.length * (PI*atts_sim["r_boids"]**2);

    return Aboids/Abox;
  }


  adjust_density(){
    if(this.calculate_density()>atts_sim["density_th"]){
      var ideal_r = sqrt(this.W*this.H*atts_sim["density_th"]/(PI*this.boids.length))
      atts_sim["r_boids"] = ideal_r;
    }


  }

  real_obedience_rate() {
    let ans = 0;
    for (let i = 0; i < this.boids.length; i++) {
      ans += this.boids[i].obedience / this.boids.length
    }
    return ans

  }

  run(advance) {


    if (advance == 1) {
      this.poll = {
        "suceptible": 0,
        "infected": 0,
        "dead": 0,
        "cured": 0,
        "total": 0,
        "infection":{
          "most":0,
          "sum_rate":0,
          "most_rate":0

        }
      };
    }

    for (let i = 0; i < this.boids.length; i++) {

      if (this.changes > 0) {
        this.boids[i].set_posterior()
      }
      if(atts_sim["active"]==1){

      this.boids[i].evolve(this.boids);
      if (advance == 1) {
        this.boids[i].plus_day(this.poll["infected"] / this.boids.length)
      }

      if (advance == 1) {
        this.poll[this.boids[i].state["state"]]++;
        this.poll["total"]++;
        if(this.boids[i].state["state"]!="suceptible"){
          let rate =this.boids[i].state["days_infected"]>0?this.boids[i].state["infected"]/(this.boids[i].state["days_infected"]):0;
          if( this.boids[i].state["infected"]>this.poll["infection"]["most"]){
            this.poll["infection"]["most"]=this.boids[i].state["infected"];
          }
          if( rate>this.poll["infection"]["most_rate"]){
            this.poll["infection"]["most_rate"]=rate;
          }
          this.poll["infection"]["sum_rate"]+=rate;

        }
      }
    }


      this.boids[i].paint()


    }
    this.changes = 0
    if(random()<0.005){
      this.changes = 1;
    }

    if (advance == 1 && atts_sim["active"]==1) {
      atts_sim["day"]++;
      this.plot.add_day(this.poll)
    }

    push()

    if (this.poll["infected"] == 0) {
      atts_sim["ended"]=1;
      pause();
    }

    fill(255)

    // let texto_a = atts_sim["day"]+" days"
    // let texto_b  =this.poll["suceptible"] +" Healthy "+"("+(100*this.poll["suceptible"]/this.boids.length).toFixed(2)+"%)"
    // let texto_c  =this.poll["infected"] +" Infected "+"("+(100*this.poll["infected"]/this.boids.length).toFixed(2)+"%)"
    // let texto_d  =this.poll["dead"] +" Dead "+"("+(100*this.poll["dead"]/this.boids.length).toFixed(2)+"%)"
    // let texto_e  =this.poll["cured"] +" Cured "+"("+(100*this.poll["cured"]/this.boids.length).toFixed(2)+"%)"
    //
    // textSize(16);
    // text(texto_a,this.position.x,this.position.y-10)
    //
    //
    // textSize(13);
    // fill(colors["suceptible"])
    // text(texto_b,this.position.x+100,this.position.y-10)
    //
    // fill(colors["infected"])
    // text(texto_c,this.position.x+240,this.position.y-10)
    //
    // fill(colors["cured"])
    // text(texto_e,this.position.x+380,this.position.y-10)
    //
    // fill(colors["dead"])
    // text(texto_d,this.position.x+520,this.position.y-10)
    //



    strokeWeight(4)
    noFill()
    stroke(255)
    rect(this.position.x, this.position.y, this.W, this.H)
    pop()
    this.plot.paint()

  }








}
