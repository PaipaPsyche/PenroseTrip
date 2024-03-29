class plane{
  constructor(x,y,w,h,r_w,r_h){
    this.pos = createVector(x,y)
    this.size = createVector(w,h)
    this.measures = createVector(r_w,r_h)
    this.scale = createVector(w/r_w,h/r_h)
    this.c_scale = sim.c*sim.dt/sim.dx*w/r_w
    this.particles = []
    this.counts ={}
    this.sources=[]
  }

  add_particle(p){
    this.particles[this.particles.length] = p
  }
  add_source(s){
    this.sources[this.sources.length] = s
  }



  check_inter(){
    for(let p1 of this.particles){
      for(let p2 of this.particles){
        if(p1.serial_id!=p2.serial_id){
          let pos_p1 = p1.pos.copy().add(this.pos)
          let pos_p2 = p2.pos.copy().add(this.pos)
          let distance = dist(pos_p1.x,pos_p1.y,pos_p2.x,pos_p2.y)/this.scale.x
          //console.log(distance)
          if(p1.active && p2.active){
            if(distance<=p1.properties.r_r+p2.properties.r_r && p1.properties.q!=0 && p2.properties.q!=0){
              p1.interact_r(p2,distance,this);
            }

            if(distance<=(p1.properties.r+p2.properties.r) && p1.properties.q!=0  && p2.type=="rhoton" && p2.sym ==1){
              //p1.absorb(p2,this);
              p1.check_case(p2);
              if(random()<sim.absorption*sim.abs_rate){
                p1.add_momentum(p2.give_momentum().copy())
                p2.active=false
              }


            }


            else if(distance<=1+max(p1.properties.r_n,p2.properties.r_n)){ //&& p1.properties.c!=0 && p2.properties.c!=0){
              p1.interact_n(p2,distance,this);
            }
          }
        }
      }
    }
  }


  check_pair_cases(){
    let n_pairs=[]
    for(let par of Object.keys(particle_atts)){
      if(particle_atts[par].discovered[0] && particle_atts[par].discovered[1] && par!="rhoton"){
        n_pairs.push(par)
      }
    }
    return n_pairs
  }


  create(out_particles,total_k_energy,cm_momentum,x,y,r,rhoton_create=false){
    let part_array=[]
    let p_tot = createVector(0,0)
    let e_k = total_k_energy
    let m = 0
    for(let p of out_particles){
      //console.log(particle_atts[p[0]])
      if(particle_atts[p[0]].m==0){
        m = m+1//particle_atts[p[0]].mode
      }else{
        m = m+particle_atts[p[0]].m
      }

    }
    for (let p of out_particles){
      let part = p[0]
      let sym = p[1]




      let mom = p5.Vector.random2D()
      //console.log(mom)




      part_array[part_array.length]=new particle(x,y,part,sym)
      part_array[part_array.length-1].vel=createVector(0,0)

      if(rhoton_create && part=="rhoton"){
        part_array[part_array.length-1].can_create=true
      }


      if(part_array.length!=out_particles.length){
        let mmag =sqrt(2*m*total_k_energy/out_particles.length)
        //console.log(mmag)
        let p_part = mom.copy().mult(mmag)
        //  console.log("p",m,p_part,mmag)
        p_tot.add(p_part)
        part_array[part_array.length-1].add_momentum(p_part.copy().mult(1))
      }else{
        part_array[part_array.length-1].add_momentum(p_tot.copy().mult(-1))
      }
      part_array[part_array.length-1].pos.add(mom.copy().mult(r/2))
      //  circle(x+this.pos.x,y+this.pos.y,r)
      part_array[part_array.length-1].add_momentum(cm_momentum)
    }

    for(let p of part_array){
      this.add_particle(p)
    }
  }
  paint_card(type,sym,x,y,w,h){
    let idx = sym==-1?0:1
    //console.log(particle_atts[type].discovered[idx],type)
    if(!particle_atts[type].discovered[idx]){
      return
    }
    let col = sym==-1?particle_atts[type].colors.anti:particle_atts[type].colors.normal
    push()
    stroke(col)
    if(sim.display_sym!=sym && sim.display_mode==2){stroke(50)}
    fill(0,0,0,150)

    rect(x,y,w,h)
    textAlign(CENTER,CENTER)
    //title and particle
    let ad_ = sym==-1?"anti":""
    fill(col)
    if(sim.display_sym!=sym && sim.display_mode==2){fill(50)}
    noStroke()
    circle(x+w/2+randomGaussian(),y+h/3+randomGaussian(),particle_atts[type].r*this.scale.x*w/80)
    textSize(w/7)
    text((ad_+type).toUpperCase(),x+w/2,y+10)

    fill(180)
    textSize(w/6)
    if(sim.display_mode==1){
      let cnu = sym==-1?(particle_atts[type].c + 2)%4:particle_atts[type].c
      text("C𝜈       "+cnu,x+w/2,y+h-8)
    }else if(sim.display_mode==2){
      if(sim.display_sym!=sym){fill(30)}
      textSize(w/5.5)
      text("Key       "+particle_atts[type].key,x+w/2,y+h-8)
    }



    textSize(w/6)
    if(sim.display_mode==1){
      let crho = sym==-1?-particle_atts[type].q :particle_atts[type].q
      text("Cρ      "+crho, x+w/2, y+h-20)
    }else if(sim.display_mode==2){
      if(sim.display_sym!=sym){fill(30)}

    }



    fill(230)
    textSize(w/8)
    if(sim.display_mode==1){
      text("Mass  "+particle_atts[type].m.toExponential()+" eV", x+w/2, y+h-32)
    }else if(sim.display_mode==2){
      if(sim.display_sym!=sym){ fill(30)}
      ad_ = sym==-1?"¯":""
      text("Symbol      "+particle_atts[type].id+ad_, x+w/2, y+h-32)

    }

    pop()
  }


  paint_UI(xo=this.pos.x+this.size.x+interf.margin,yo=this.pos.y+interf.margin){




    //for cards
    let ww = int(interf.proportions[1]/7)//60
    let hh = int(7*ww/6)//int(interf.proportions[0]/2)/5//70
    let yy = yo-10
    let ddx = xo+3*ww+hh



    // starting ppoints
    let dx = interf.proportions[1]/2 // panel width (L-R)
    let dy = interf.margin-6
    let i = 0

    // particle count bars
    let yo2 = yy+4*hh+40//interf.proportions[0]/2
    let bars_y_bias = -dy/2+2*dy+170//120





    //sums
    let totals = {
      c:0,
      q:0,
      m:0,
      rad:0,
      antimatter:0
    }

    //cards

    fill(255,255,255,10)
    if(sim.display_sym==1){
      rect(xo-5,yy-5,3*ww+hh/2,4*hh+ww)
    }else{
      rect(ddx-5,yy-5,3*ww+hh/2,4*hh+ww)
    }

    this.paint_card("pluson",1,xo,yy,ww,hh)
    this.paint_card("glion",1,xo+ww+10,yy,ww,hh)
    this.paint_card("minon",1,xo,yy+hh+10,ww,hh)
    this.paint_card("vuon",1,xo+ww+10,yy+hh+10,ww,hh)

    this.paint_card("nuon",1,xo+2*ww+30,yy,ww,hh)
    this.paint_card("fixon",1,xo+2*ww+30,yy+hh+10,ww,hh)
    this.paint_card("rhoton",1,xo+2*ww+30,yy+2*hh+30,ww,hh)

    this.paint_card("anurion",1,xo,yy+2*hh+30,ww,hh)
    this.paint_card("jaudion",1,xo+ww+10,yy+2*hh+30,ww,hh)
    this.paint_card("anurino",1,xo,yy+3*hh+40,ww,hh)
    this.paint_card("jaudino",1,xo+ww+10,yy+3*hh+40,ww,hh)







    this.paint_card("pluson",-1,ddx,yy,ww,hh)
    this.paint_card("glion",-1,ddx+ww+10,yy,ww,hh)
    this.paint_card("minon",-1,ddx,yy+hh+10,ww,hh)
    this.paint_card("vuon",-1,ddx+ww+10,yy+hh+10,ww,hh)
    //
    this.paint_card("nuon",-1,ddx+2*ww+30,yy,ww,hh)
    this.paint_card("fixon",-1,ddx+2*ww+30,yy+hh+10,ww,hh)
    this.paint_card("rhoton",-1,ddx+2*ww+30,yy+2*hh+30,ww,hh)
    //
    this.paint_card("anurion",-1,ddx,yy+2*hh+30,ww,hh)
    this.paint_card("jaudion",-1,ddx+ww+10,yy+2*hh+30,ww,hh)
    this.paint_card("anurino",-1,ddx,yy+3*hh+40,ww,hh)
    this.paint_card("jaudino",-1,ddx+ww+10,yy+3*hh+40,ww,hh)

    textSize(12)
    fill(180)
    textAlign(LEFT)
    text("[SHIFT] to see commands",xo,interf.margin)
    text("[Q] to change between matter and antimatter",ddx-20,interf.margin)



    // particle bars


    for(let c of Object.keys(this.counts)){
      let entry = this.counts[c]
      let cnu =entry["atts"][4]
      //console.log(c,cnu)
      totals.c = totals.c + cnu*entry["counts"]
      totals.q = totals.q + entry["atts"][3]*entry["counts"]
      totals.m = totals.m + particle_atts[entry["atts"][0]].m*entry["counts"]
      totals.rad = totals.rad + int(particle_atts[entry["atts"][0]].radiation)*entry["counts"]
      if(entry["atts"][2]==-1){
        totals.antimatter = totals.antimatter+entry["counts"]
      }

      push()
      noStroke()
      let col = entry["atts"][2]==-1?particle_atts[entry["atts"][0]].colors.anti:particle_atts[entry["atts"][0]].colors.normal
      fill(col)
      textAlign(CENTER,CENTER)
      let txt = entry["atts"][1]
      textSize(11)
      text(txt,xo,yo+i*dy+yo2+bars_y_bias)
      if(entry["atts"][2]==-1){
        stroke(col)
        line(xo-3,yo+i*dy-8+yo2+bars_y_bias,xo+3,yo+i*dy-8+yo2+bars_y_bias)
        noStroke()
      }
      fill(col)

      rect(xo+10,yo+i*dy-dy/2+yo2+bars_y_bias,entry["counts"]*dx/this.particles.length,dy/2)
      textAlign(LEFT,CENTER)

      text(entry["counts"],xo+15+entry["counts"]*dx/this.particles.length,yo+i*dy+yo2-dy/4+bars_y_bias)
      pop()
      i++
    }
    // symetry

    //antimatter
    if(this.particles.length != 0){

      push()
      stroke(255)
      line(xo+dx/2,yo-dy/2+yo2+2*dy+25,xo+dx/2,yo-dy+yo2)
      let cut = 1-(totals.antimatter/this.particles.length)
      noStroke()
      fill([255,0,0])
      rect(xo,yo-dy/2+yo2,cut*dx,dy/2)
      textSize(9)
      textAlign(LEFT)
      text("MATTER",xo,yo+yo2+dy)
      fill([0,255,255])
      textAlign(RIGHT)
      text("ANTIMATTER",xo+dx,yo+yo2+dy)
      rect(xo+cut*dx,yo-dy/2+yo2,(1-cut)*dx,dy/2)
      pop()




      // radiation
      push()
      //console.log(totals.rad)
      cut = 1-(totals.rad/this.particles.length)

      fill(200,0,200)
      textSize(9)
      textAlign(LEFT)
      text("MATTER",xo,yo-dy/2+yo2+2*dy+30)
      rect(xo,yo-dy/2+yo2+dy+20,cut*dx,dy/2)

      fill([255,255,255])
      textSize(11)
      text("ρ-charge",xo,yo-dy/2+yo2+2*dy+50)
      text("𝜈-charge",xo,yo-dy/2+yo2+2*dy+70)
      text("mass",xo,yo-dy/2+yo2+2*dy+90)
      textAlign(RIGHT)
      text("RADIATION",xo+dx,yo-dy/2+yo2+2*dy+30)
      rect(xo+cut*dx,yo-dy/2+yo2+dy+20,(1-cut)*dx,dy/2)



      textSize(12)
      text(totals.q,xo+dx,yo-dy/2+yo2+2*dy+50)
      let cc=totals.c%4
      text(totals.c+" ("+["+","-"][int(cc%2==1)]+")",xo+dx,yo-dy/2+yo2+2*dy+70)
      text(totals.m.toExponential()+"eV",xo+dx,yo-dy/2+yo2+2*dy+90)


      pop()

      push()
      textSize(15)
      fill(255)
      text(this.particles.length+" PARTICLES",xo,yo+yo2+bars_y_bias-50)

      if(this.particles.length>interf.particle_lim){
        textSize(12)
        fill(255,10,10)
        text("Careful! Too many particles",xo,yo+yo2+bars_y_bias-30)
      }
      pop()
    }







    //observed phenomena


    textSize(11)
    textAlign(LEFT)
    let xx = interf.proportions[0]+interf.proportions[1]+interf.margin * 5//ddx+3*ww+40
    fill(255)
    text("OBSERVED PHENOMENA",xx,yy)
    yy=yy+17
    let r = 0
    for(let counter =0;counter<reactions.length;counter++){
      let reac = reactions[reactions.length-1-counter]

      if(interf.onlynewreactions==false ||(reac[2]==true && interf.onlynewreactions)){
      if(reac[2]==true){
        fill(255)
        circle(120+xx,yy+15*r,4)
      }
      for(let i=0;i<reac[0].length;i++){

          let col = reac[0][i][1]
          textSize(11)
          fill(col)
          text(reac[0][i][0],125+xx+i*8,yy+15*r)

      }

      textSize(10)
      let col = [255,255,255]
      let type = reac[1]
      if(type=="reaction"){col=[0,255,0]}
      if(type=="decay"){col=[255,255,0]}
      fill(col)
      text(type.toUpperCase(),xx+45,yy+15*r)
      fill(80)
      if(reac[2]==true){
        fill(255)
      }
      textSize(9)
      text(reac[3],xx,yy+15*r)
      r= r+1
    }
    }
  }
  paint(){
    push()
    fill(0)
    stroke(100)
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y)



    textAlign(CENTER,CENTER);
    let dy = this.size.y/sim.ticks
    let dry = this.measures.y/sim.ticks
    let dx = this.size.x/sim.ticks
    let drx = this.measures.x/sim.ticks
    for(let i =0;i<=sim.ticks;i++){
      stroke(255)
      line(this.pos.x-2,this.pos.x+i*dy,this.pos.x+2,this.pos.x+i*dy)
      line(this.pos.x+i*dx,this.pos.y-2,this.pos.x+i*dx,this.pos.y+2)
      noStroke()
      fill(255)
      textSize(8)
      text(round(i*dry,1),this.pos.x-12,this.pos.y+i*dy)
      text(round(i*drx,1)+" fm",this.pos.x+i*dx,this.pos.y-10)
    }
    textSize(9)
    text(round(time*sim.dt/10e-21,2)+" zeptoseconds (10e-21)",this.pos.x+50,this.pos.y+this.size.y+15)
    pop()

    if(frameCount%sim.step_interact==0 && sim.stop==false){
      this.check_inter()
    }

    let new_p = [];
    this.counts = {};
    for(let p of this.particles){

      let count = 0;
      if(p.active){
        new_p[new_p.length]=p;
        p.paint(this)
        if(!particle_atts[p.type].discovered[(p.sym+1)/2]){
          particle_atts[p.type].discovered[(p.sym+1)/2]=true
        }
        //counting
        count++
        if(Object.keys(this.counts).includes(p.give_name())){
          this.counts[p.give_name()]["counts"]=this.counts[p.give_name()]["counts"]+1
        }else{
          this.counts[p.give_name()] = {}
          this.counts[p.give_name()]["counts"] = 1
          this.counts[p.give_name()]["atts"] = [p.type,p.properties.id,p.sym,p.properties.q,p.properties.c]
        }

      }

    }

    this.particles = [];
    this.particles = new_p;

    if(sim.stop){
      push()
      fill(255)
      textSize(15)
      textAlign(LEFT,TOP)
      text("PAUSED",this.pos.x+10,this.pos.y+20)
      pop()
    }
    // PAINT CURSOR
    if(sim.cursor && mouse_in_plane(pl1)){
      push()
      fill(85)
      stroke(85)
      strokeWeight(0.5)
      line(mouseX,this.pos.y,mouseX,this.pos.y+this.size.y)
      line(this.pos.x,mouseY,this.pos.x+this.size.x,mouseY)
      fill(200,200,0)
      circle(this.pos.x,mouseY,5)
      circle(mouseX,this.pos.y,5)
      pop()
    }

    let new_sources = []
    for(let ss of this.sources){
      if(ss.active){
        ss.run()
        ss.paint()
        new_sources[new_sources.length] = ss
      }
    }
    this.sources = []
    this.sources = new_sources


    this.paint_UI()
  }
}
