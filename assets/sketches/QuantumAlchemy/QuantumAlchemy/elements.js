

var particle_atts ={
  "pluson":{
    id:"P",
    m:5e3, //ev
    q:2,
    c:2,
    hlt:1e-14,
    key:"P",
    discovered:[false,true],
    radiation:false,
    colors:{
      normal:[255,0,0],
      anti:[0,255,255]
    },
    r:2 //fm
  },
  "minon":{
    id:"M",
    m:1e3, //ev
    q:-1,
    c:1,
    hlt:1e-12,
    key:"M",
    discovered:[false,true],
    radiation:false,
    colors:{
      normal:[0,0,255],
      anti:[255,255,0]
    },
    r:2//fm
  },
  "glion":{
    id:"G",
    m:1e5, //ev
    q:1,
    c:1,
    hlt:5e-20,
    key:"G",
    discovered:[false,false],
    radiation:false,
    colors:{
      normal:[150,250,0],
      anti:[0,0,150]
    },
    r:6 //fm
  },
  "vuon":{
    id:"V",
    m:250e2, //ev
    q:-2,
    c:2,
    hlt:5e-20,
    key:"V",
    discovered:[false,false],
    radiation:false,
    colors:{
      normal:[0,150,150],
      anti:[150,0,0]
    },
    r:5 //fm
  },
  "anurion":{
    id:"A",
    m:1e2, //ev
    q:-1,
    c:1,
    hlt:1,
    key:"A",
    discovered:[false,false],
    radiation:false,
    colors:{
      normal:[0,250,0],
      anti:[250,0,250]
    },
    r:1 //fm
  },
  "anurino":{
    id:"a",
    m:0, //ev
    q:1,
    c:-1,
    hlt:1,
    key:"S",
    discovered:[false,false],
    radiation:true,
    colors:{
      normal:[0,150,0],
      anti:[150,0,150]
    },
    r:0.5 //fm
  },
  "jaudion":{
    id:"J",
    m:7e3, //ev
    q:-2,
    c:1,
    hlt:5e-21,
    key:"J",
    discovered:[false,false],
    radiation:false,
    colors:{
      normal:[250,50,250],
      anti:[50,250,50]
    },
    r:7 //fm
  },
  "jaudino":{
    id:"j",
    m:0, //ev
    q:2,
    c:-1,
    hlt:1,
    key:"K",
    discovered:[false,false],
    radiation:true,
    colors:{
      normal:[150,50,150],
      anti:[50,150,50]
    },
    r:0.75 //fm
  },
  "rhoton":{
    id:"R",
    m:0, //ev
    q:0,
    c:0,
    hlt:1e-10,
    key:"R",
    discovered:[false,false],
    radiation:true,
    colors:{
      normal:[250,250,250],
      anti:[250,250,250]
    },
    r:0.7 //fm
  },
  "nuon":{
    id:"N",
    m:2e4, //ev
    q:2,
    c:0,
    key:"N",
    discovered:[false,false],
    radiation:false,
    hlt:5e-22,
    colors:{
      normal:[250,150,250],
      anti:[150,250,150]
    },
    r:7 //fm
  },
  "fixon":{
    id:"F",
    m:0, //ev
    q:0,
    c:1,
    hlt:5e-20,
    key:"F",
    discovered:[false,false],
    radiation:true,
    colors:{
      normal:[200,0,100],
      anti:[0,2000,100]
    },
    r:1//fm
  }
}

let allowed_groups={
  "ɣ":{
    plus:"pluson",
    minus:"minon",
    scale:5,
    n_scale:6,
    exclusive:true
  },
  "μ":{
    plus:"antijaudion",
    minus:"minon",
    scale:6,
    n_scale:6,
    exclusive:true
  },
  "α":{
    plus:"antijaudion",
    minus:"anurion",
    scale:6,
    n_scale:6,
    exclusive:true
  },
  "Φ+":{
    plus:"antianurion",
    minus:"minon",
    scale:5,
    n_scale:5,
    exclusive:true
  },
  "Φ-":{
    plus:"antiminon",
    minus:"anurion",
    scale:5,
    n_scale:5,
    exclusive:true
  },
  "η+":{
    plus:"pluson",
    minus:"anurion",
    scale:5,
    n_scale:5,
    exclusive:false
  },
  "η-":{
    plus:"antianurion",
    minus:"antipluson",
    scale:5,
    n_scale:5,
    exclusive:true
  },
  // "Λ":{
  //   plus:"pluson",
  //   minus:"minon",
  //   scale:5,
  //   n_scale:1,
  //   exclusive:true
  // },
  // this.determine_group("pluson","minon","Λ",5+5/pl.scale.x,xx,yy,true)
  // this.determine_group("pluson","vuon","Δ",5+5/pl.scale.x,xx,yy,true)
  // this.determine_group("pluson","anurion","η+",5+5/pl.scale.x,xx,yy,true)
  // this.determine_group("antianurion","antipluson","η-",5+5/pl.scale.x,xx,yy,true)
  // this.determine_group("antijaudion","antipluson","π",5+5/pl.scale.x,xx,yy,true)
  //   this.determine_group("antijaudion","minon","μ",5+5/pl.scale.x,xx,yy,true)
  // this.determine_group("antianurion","minon","Φ+",5+5/pl.scale.x,xx,yy,true)
  //   this.determine_group("antiminon","anurion","Φ-",5+5/pl.scale.x,xx,yy,true)
}


let allowed_interactions_n = {
  "anurino-antinuon":{
    proba:0.5,
    final:[
    { value: ["anurion",1], weight: 12},

  ]
  },
  "anurino-vuon":{
    proba:0.5,
    final:[
    { value: ["anurion",1], weight: 12},
  ]
  },
  "anurion-rhoton":{
    proba:0.5,
    final:[
    { value: ["minon",1], weight: 12},
  ]
  },
  "anurino-rhoton":{
    proba:0.5,
    final:[
    { value: ["minon",-1], weight: 12},
  ]
  },
  "antianurino-rhoton":{
    proba:0.5,
    final:[
    { value: ["anurion",1], weight: 12},
  ]
  },
  "antijaudino-rhoton":{
    proba:0.5,
    final:[
    { value: ["jaudion",1], weight: 12},

  ]
  },
  "antijaudino-fixon":{
    proba:0.5,
    final:[
    { value: ["nuon",-1], weight: 12},
    { value: ["vuon",1], weight: 12}

  ]
  },
  "antiglion-antirhoton":{
    proba:0.5,
    final:[
    { value: ["anurion",1], weight: 12},

  ]
  },
  "antinuon-antiminon":{
    proba:0.5,
    final:[
    { value: ["minon",1], weight: 12},

  ]
  },
  "vuon-antiminon":{
    proba:0.5,
    final:[
    { value: ["minon",1], weight: 12},

  ]
  },
  "glion-antipluson":{
    proba:0.5,
    final:[
    { value: ["minon",1], weight: 12},

  ]
  },
  "nuon-antiglion":{
    proba:0.5,
    final:[
    { value: ["minon",-1], weight: 12},
  ]
  },
  "antiglion-antivuon":{
    proba:0.5,
    final:[
    { value: ["minon",-1], weight: 12},
  ]
  },
  "fixon-antipluson":{
    proba:0.5,
    final:[
    { value: ["jaudion",1], weight: 12},

  ]
  },
  "nuon-antivuon":{
    proba:0.5,
    final:[
    { value: ["jaudion",-1], weight: 12},

  ]
  },
  "pluson-minon":{
    proba:0.00001,
    final:[
    { value: ["minon",-1], weight: 12},

  ]
  },
  "antipluson-antiminon":{
    proba:0.1,
    final:[
    { value: ["glion",-1], weight: 12},

  ]
  },
  "pluson-antirhoton":{
    proba:0.001,
    final:[
    { value: ["fixon",-1], weight: 12},

  ]
  },

  "pluson-antiminon":{
    proba:0.0001,
    final:[
    { value: ["anurino",1], weight: 12},

  ]
  },
  "anurion-glion":{
    proba:0.5,
    final:[
    { value: ["rhoton",1], weight: 12},

  ]
  },
  "jaudion-nuon":{
    proba:0.5,
    final:[
    { value: ["fixon",1], weight: 12},

  ]
  },
  "minon-nuon":{
    proba:0.5,
    final:[
    { value: ["glion",1], weight: 12},

  ]
  },
  "jaudion-antivuon":{
    proba:0.5,
    final:[
    { value: ["fixon",1], weight: 12},

  ]
  },
  "jaudion-antivuon":{
    proba:0.5,
    final:[
    { value: ["pluson",-1], weight: 12},

  ]
  },
  "jaudino-antinuon":{
    proba:0.5,
    final:[
    { value: ["fixon",1], weight: 12},

  ]
  },
  "jaudino-vuon":{
    proba:0.5,
    final:[
    { value: ["fixon",1], weight: 12},

  ]
  },
  "anurino-antiglion":{
    proba:0.5,
    final:[
    { value: ["rhoton",-1], weight: 12},

  ]
  },
  "antijaudion-fixon":{
    proba:0.5,
    final:[
    { value: ["nuon",1], weight: 12}

  ]
  },
  "antiminon-glion":{
    proba:0.5,
    final:[
    { value: ["nuon",1], weight: 12},

  ]
},"antinuon-antiminon":{
    proba:0.5,
    final:[
    { value: ["minon",1], weight: 12},

  ]
  },
  "anurion-antianurino":{
    proba:0.5,
    final:[
    { value: ["nuon",-1], weight: 12},

  ]
  },
  "anurino-antianurion":{
    proba:0.5,
    final:[
    { value: ["pluson",1], weight: 12},

  ]
  },
  "antianurion-antirhoton":{
    proba:0.1,
    final:[
    { value: ["glion",1], weight: 12},

  ]
  },
  "glion-glion":{
    proba:0.01,
    final:[
    { value: ["pluson",1], weight: 12},

  ]
  },
  "fixon-antijaudino":{
    proba:0.5,
    final:[
    { value: ["nuon",-1], weight: 12},

  ]
  },
  "antiglion-antiglion":{
    proba:0.5,
    final:[
    { value: ["nuon",-1], weight: 12},

  ]
  },

  "antifixon-antifixon":{
    proba:0.5,
    final:[
    { value: ["rhoton",-1], weight: 12},

  ]
  },
  "minon-minon":{
    proba:0.00005,
    final:[
    { value: ["nuon",-1], weight: 5},
    { value: ["vuon",1], weight:4 }
  ]
},
"antiminon-antiminon":{
  proba:0.0005,
  final:[
  { value: ["vuon",-1], weight: 12},
  { value: ["jaudion",-1], weight:2 }
]
},
"antirhoton-antirhoton":{
  proba:0.05,
  final:[
  { value: ["rhoton",1], weight: 12}
]
},
"rhoton-antirhoton":{
  proba:0.05,
  final:[
  { value: ["rhoton",-1], weight: 12},
]
},
}

let decay_modes = {
  "anurion":{
    final:[
    { value: [["anurino",-1],["rhoton",1]], weight: 50}
    //{ value: [["jaudion",1],["jaudino",1]], weight:100 }
  ]
  },

  "jaudion":{
    final:[
    { value: [["fixon",1],["pluson",-1]], weight:10},
    { value: [["jaudino",-1],["rhoton",1]], weight:50}

  ]
  },


  // "vuon":{
  //   final:[
  //   { value: [["minon",1],["minon",1]], weight: 50},
  //   { value: [["jaudion",1],["jaudino",1]], weight:100 }
  // ]
  // },
  "pluson":{
    final:[
    { value: [["anurion",-1],["anurino",1]], weight: 5},
    { value: [["minon",-1],["minon",-1]], weight: 50},
    { value: [["jaudino",1],["fixon",-1]], weight: 50}
  ]
  },
  // "antipluson":{
  //   final:[
  //   { value: [["anurino",1],["rhoton",1]], weight: 50}
  // ]
  // },
  "minon":{
    final:[
    { value: [["anurion",1],["rhoton",1]], weight: 50}
  ]
  },
  "antiminon":{
    final:[
    { value: [["anurino",1],["rhoton",1]], weight: 50}
  ]
  },
  "glion":{
    final:[
    { value: [["anurion",-1],["rhoton",-1]], weight: 250},
    { value: [["nuon",1],["minon",1]], weight:100 },
    { value: [["vuon",-1],["minon",1]], weight:100 }
  ]
  },
  "antiglion":{
    final:[
    { value: [["anurino",-1],["rhoton",-1]], weight: 5},
    { value: [["pluson",-1],["minon",-1]], weight:150 }
  ]
  },

  "vuon":{
    final:[
    { value: [["minon",1],["minon",1]], weight: 100},
    { value: [["fixon",1],["jaudino",-1]], weight:20 },
    { value: [["anurion",1],["anurino",-1]], weight:10 }
  ]
  },
  "antivuon":{
    final:[
    //{ value: [["minon",-1],["minon",-1]], weight: 50},
    { value: [["jaudion",-1],["fixon",1]], weight:50}
  ]
  },
  "nuon":{
    final:[
    { value: [["jaudion",-1],["fixon",1]], weight: 200}

  ]
  },
  "antinuon":{
    final:[
    { value: [["minon",1],["minon",1]], weight: 100},
    { value: [["anurion",1],["anurino",-1]], weight:50},
    { value: [["jaudino",-1],["fixon",1]], weight:10}

  ]
  },
  "antirhoton":{
    final:[
    { value: [["fixon",-1],["fixon",-1]], weight: 500},


  ]
  },


}
