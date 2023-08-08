addLayer("AC", {
 name: "",
 rawText() {
  return `
     <div>
     <b class="mT">AC</b>
     <b class="ide"></b>
     </div>`
 },
 position: 0,
 startData() {
  return {
   unlocked: true,
   points: new Decimal(0),
   heat: new Decimal(0),
   tanks: new Decimal(0),
   kilns: new Decimal(0),
   kilnCapacity: new Decimal(5),
  }
 },
 color: "#ffffff",
 requires: new Decimal(10),
 resource: "Accelerant",
 baseResource: "Points",
 baseAmount() { return player.points },
 type: "normal",
 exponent: 1,
 gainMult() {
  mult = new Decimal(1)
  return mult
 },
 gainExp() {
  return new Decimal(1)
 },
 bars: {
   heatCapacity: {
    fillStyle: { 'background': "linear-gradient(180deg, rgba(221,219,219,1) 0%, rgba(130,130,130,1) 100%)"},
    baseStyle: { 'background': "linear-gradient(180deg, rgba(125,125,125,1) 0%, rgba(58,57,57,1) 100%)" },
 
    borderStyle() { return {'border-radius' : '0px', 'border' : '0px'} },
    direction: RIGHT,
    width: 300,
    height: 30,
    progress() {
     return (player.AC.heat.div(tmp.AC.heatCapacity))
    },
    display() {
     return `<b class="InfoBox"> Heat ${format(player.AC.heat)} / ${format(tmp.AC.heatCapacity)}<b>`
    },
    unlocked: true,
 },
   tankCapacity: {
  fillStyle: { 'background': "linear-gradient(180deg, rgba(205,80,66,1) 0%, rgba(122,56,21,1) 100%)" },
  baseStyle: { 'background': "linear-gradient(180deg, rgba(104,42,35,1) 0%, rgba(35,16,6,1) 100%)" },
  textStyle: { 'text-shadow': '0px 0px 0.75px #000000' },
 
  borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
  direction: RIGHT,
  width: 300,
  height: 30,
  progress() {
   return (player.AC.tanks.div(tmp.AC.tankCapacity))
  },
  display() {
   return `Tanks ${format(player.AC.tanks)} / ${format(tmp.AC.tankCapacity)}`
  },
  unlocked: true,
 },
   kilnCapacity: {
  fillStyle: { 'background': "linear-gradient(180deg, rgba(121,143,148,1) 0%, rgba(96,110,109,1) 100%)" },
  baseStyle: { 'background': "linear-gradient(180deg, rgba(46,55,57,1) 0%, rgba(34,39,39,1) 100%)" },
  textStyle: { 'text-shadow': '0px 0px 0.75px #000000' },
 
  borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
  direction: RIGHT,
  width: 300,
  height: 30,
  progress() {
   return (player.AC.kilns.div(player.AC.kilnCapacity))
  },
  display() {
   return `Kilns ${format(player.AC.kilns)} / ${format(player.AC.kilnCapacity)}`
  },
  unlocked() {
   return player.N.points.gte(9)
  }
 },

 },
 procHeat() {
  let amount = new Decimal(1)
  amount = amount.mul(buyableEffect("AC", "HeatGainI"))
  player.AC.heat = player.AC.heat.add(amount)
 },
 heatFixate() {
  if (player.AC.heat.gt(tmp.AC.heatCapacity)) {
   player.AC.heat = tmp.AC.heatCapacity
  }
 },
 heatCapacity() {
  let BaseC = new Decimal(10)
  
  BaseC = BaseC.mul(buyableEffect("AC", "HeatCapacityI"))
  return BaseC
 },
 procTanks() {
  let amount = new Decimal(1)
  amount = amount.mul(buyableEffect("AC", "TankGainI"))
  let cost = new Decimal(10)
  cost = cost.mul(buyableEffect("AC", "TankGainI"))
  player.AC.heat = player.AC.heat.sub(cost)
  player.AC.tanks = player.AC.tanks.add(amount)
 },
 tankCapacity() {
  let BaseC = new Decimal(50)
 
  BaseC = BaseC.mul(buyableEffect("AC", "TankCapacityI"))
  return BaseC
 },
 tankFixate() {
  if (player.AC.tanks.gt(tmp.AC.tankCapacity)) {
   player.AC.tanks = tmp.AC.tankCapacity
  }
 },
 tankNeed() {
  let cost = new Decimal(10)
  cost = cost.mul(buyableEffect("AC", "TankGainI"))
  return cost
 },
 
 procKilns() {
  player.AC.heat = player.AC.heat.sub(30)
  player.AC.tanks = player.AC.tanks.sub(5)
  player.AC.kilns = player.AC.tanks.add(1)
 },
 clickables: {
    "ProcHeat": {
      title() {
       let state = []
       if (player.AC.heat.gte(tmp.AC.heatCapacity)) {
        state = "MAX"
       }
        return `<b style="font-size:12px">Produce Heat</b><br>
        <b style="font-size:8px">${state}</b>`
      },
      canClick() {
        return player.AC.heat.lt(tmp.AC.heatCapacity)
      },
      onClick() {
       tmp.AC.procHeat();
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(180deg, rgba(255,36,8,1) 0%, rgba(255,158,1,1) 100%)",
           "width": "120px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
          }
          return {
           "width": "120px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#000000"
        }
      },
      unlocked() {
        return true
      }
    },
    "ProcTanks": {
      title() {
       let state = []
       if (player.AC.tanks.gte(tmp.AC.tankCapacity)) {
        state = "MAX"
       }
        return `<b style="font-size:12px">Produce Tanks</b><br>
        <b style="font-size:8px">${state}</b>`
      },
      canClick() {
        return player.AC.tanks.lt(tmp.AC.tankCapacity) && player.AC.heat.gte(tmp.AC.tankNeed)
      },
      onClick() {
       tmp.AC.procTanks();
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(180deg, rgba(205,80,66,1) 0%, rgba(122,56,21,1) 100%)",
           "width": "120px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
          }
          return {
           "width": "120px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#000000"
        }
      },
      unlocked() {
        return true
      }
    },
    "ProcKilns": {
      title() {
       let state = []
       if (player.AC.kilns.eq(player.AC.kilnCapacity)) {
        state = "MAX"
       }
        return `<b style="font-size:12px">Produce Kilns</b><br>
        <b style="font-size:8px">${state}</b>`
      },
      canClick() {
        return player.AC.kilns.lt(player.AC.kilnCapacity) && player.AC.tanks.gte(5) && player.AC.heat.gte(30)
      },
      onClick() {
       tmp.AC.ProcKilns();
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(180deg, rgba(121,143,148,1) 0%, rgba(96,110,109,1) 100%)",
           "width": "120px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
          }
          return {
           "width": "120px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#000000"
        }
      },
      unlocked() {
        return player.N.points.gte(9)
      }
    },

 },
 buyables : {
 "HeatGainI": {
  cost(x) {
   let PowerI = new Decimal(1.3)
   let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(1)
   let Growth = new Decimal(1.3)
   let Currency = player.AC.heat
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   player.AC.heat = player.AC.heat.sub(Cost)
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   return `<b style="font-size:12px">Job Quantity</b>
         <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
         <b style="font-size:10px">${format(S.effect)}x Heat Production</b><br>
     Cost: ${format(S.cost)} Heat`
  },
  canAfford() {
   return player[this.layer].heat.gte(this.cost())
  },
  style() {
   if (tmp[this.layer].buyables[this.id].canAfford)
    return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   return {
    "width": "120px",
    "height": "120px",
    "border-radius": "5px",
    "border": "0px",
    "margin": "5px",
    "color": "#000000"
   }
  },
  effect(x) {
   let PowerI = new Decimal(1.15)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return player.N.points.gte(6)
  }
 },
 "HeatCapacityI": {
  cost(x) {
   let PowerI = new Decimal(1.1)
   let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(1)
   let Growth = new Decimal(1.1)
   let Currency = player.AC.tanks
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   player.AC.tanks = player.AC.tanks.sub(Cost)
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   return `<b style="font-size:12px">Capacity</b>
         <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
         <b style="font-size:10px">${format(S.effect)}x Heat Capacity</b><br>
     Cost: ${format(S.cost)} Tanks`
  },
  canAfford() {
   return player[this.layer].tanks.gte(this.cost())
  },
  style() {
   if (tmp[this.layer].buyables[this.id].canAfford)
    return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   return {
    "width": "120px",
    "height": "120px",
    "border-radius": "5px",
    "border": "0px",
    "margin": "5px",
    "color": "#000000"
   }
  },
  effect(x) {
   let PowerI = new Decimal(1.15)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return player.N.points.gte(6)
  }
 },
 "HeatEffiencyI": {
 cost(x) {
   let PowerI = new Decimal(1.1)
   let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(1)
   let Growth = new Decimal(1.1)
   let Currency = player.AC.kilns
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   if (player.N.points.gte(9)) {
   return `<b style="font-size:12px">Automation</b>
          <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
          <b style="font-size:10px">${format(S.effect)}x Heat Auto Efficiency</b><br>
      Cost: ${format(S.cost)} Kilns`
   }
   return ``
  },
  canAfford() {
   if (player.N.points.gte(9)) {
   return player[this.layer].kilns.gte(this.cost())
   }
  },
  style() {
   if (player.N.points.lt(8.9))
    return {
     "background": "url('images/static.gif')",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   if (tmp[this.layer].buyables[this.id].canAfford)
    return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   if (player.N.points.gt(8)) {
    return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
    }
   }
  },
  effect(x) {
   let PowerI = new Decimal(1.15)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return true
  }
 },
 "HeatBoostI": {
   cost(x) {
    let PowerI = new Decimal(2)
    let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(100)
    let Growth = new Decimal(2)
    let Currency = player.AC.heat
    let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
    let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
    player.AC.heat = player.AC.heat.sub(Cost)
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
   },
   display() {
    var S = tmp[this.layer].buyables[this.id]
    var SV = player[this.layer].buyables[this.id]
    return `<b style="font-size:12px">Point Generator Energy</b>
          <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
          <b style="font-size:10px">${format(S.effect)}x Points</b><br>
      Cost: ${format(S.cost)} Heat`
   },
   canAfford() {
    return player[this.layer].heat.gte(this.cost())
   },
   style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
     return {
      "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
      "width": "120px",
      "height": "120px",
      "border-radius": "5px",
      "border": "0px",
      "margin": "5px",
      "color": "#ffffff"
     }
    return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
    }
   },
   effect(x) {
    let PowerI = new Decimal(2)
 
    let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Effect;
   },
   unlocked() {
    return player.N.points.gte(6)
   }
  },
  
 "TankGainI": {
  cost(x) {
   let PowerI = new Decimal(1.3)
   let Calculation = new Decimal(50).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(50)
   let Growth = new Decimal(1.3)
   let Currency = player.AC.heat
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   player.AC.heat = player.AC.heat.sub(Cost)
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   return `<b style="font-size:12px">Job Quantity</b>
         <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
         <b style="font-size:10px">${format(S.effect)}x Tank Production</b><br>
     Cost: ${format(S.cost)} Heat`
  },
  canAfford() {
   return player[this.layer].heat.gte(this.cost())
  },
  style() {
   if (tmp[this.layer].buyables[this.id].canAfford)
    return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   return {
    "width": "120px",
    "height": "120px",
    "border-radius": "5px",
    "border": "0px",
    "margin": "5px",
    "color": "#000000"
   }
  },
  effect(x) {
   let PowerI = new Decimal(1.15)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return player.N.points.gte(6)
  }
 },
 "TankCapacityI": {
  cost(x) {
   let PowerI = new Decimal(1.1)
   let Calculation = new Decimal(30).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(30)
   let Growth = new Decimal(1.1)
   let Currency = player.AC.tanks
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   player.AC.tanks = player.AC.tanks.sub(Cost)
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   return `<b style="font-size:12px">Capacity</b>
         <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
         <b style="font-size:10px">${format(S.effect)}x Tank Capacity</b><br>
     Cost: ${format(S.cost)} Tanks`
  },
  canAfford() {
   return player[this.layer].tanks.gte(this.cost())
  },
  style() {
   if (tmp[this.layer].buyables[this.id].canAfford)
    return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   return {
    "width": "120px",
    "height": "120px",
    "border-radius": "5px",
    "border": "0px",
    "margin": "5px",
    "color": "#000000"
   }
  },
  effect(x) {
   let PowerI = new Decimal(1.15)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return player.N.points.gte(6)
  }
 },
 "TankEffiencyI": {
 cost(x) {
   let PowerI = new Decimal(1.1)
   let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(1)
   let Growth = new Decimal(1.1)
   let Currency = player.AC.kilns
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   if (player.N.points.gte(9)) {
   return `<b style="font-size:12px">Automation</b>
          <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
          <b style="font-size:10px">${format(S.effect)}x Tank Auto Efficiency</b><br>
      Cost: ${format(S.cost)} Kilns`
   }
   return ``
  },
  canAfford() {
   if (player.N.points.gte(9)) {
   return player[this.layer].kilns.gte(this.cost())
   }
  },
  style() {
   if (player.N.points.lt(8.9))
    return {
     "background": "url('images/static.gif')",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
    }
   if (player.N.points.gt(8)) {
   return {
    "width": "120px",
    "height": "120px",
    "border-radius": "5px",
    "border": "0px",
    "margin": "5px",
    "color": "#000000"
   }
    }
  },
  effect(x) {
   let PowerI = new Decimal(1.15)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return true
  }
 },
},
 tabFormat: {
  "Produce Stuff": {
   content: [
     ['raw-html', () => {
     return `
     <p>
        You are <a id="nameLink" onclick="showCustomDialog()">???</a>
    </p>
    <div id="customDialog" class="custom-dialog">
        <h3>Who are you?</h3><br>
        <label for="nameInput">I am... </label>
        <input type="text" id="nameInput">
        <br>
        <button onclick="changeName()">Change</button>
        <button onclick="closeCustomDialog()">Cancel</button>
    </div>`
     }],
     ["blank", "25px"],
     ["row", [["column", [["bar", "heatCapacity"]]], ["clickable", "ProcHeat"]]],
     ["row", [["column", [["bar", "tankCapacity"], ['raw-html', () => {return `<div class="InfoBox"><img src='images/Heat.png' class='cen' width='14' height='14'> ${format(tmp.AC.tankNeed)} Heat</div>`}]]], ["clickable", "ProcTanks"]]],
     ["row", [["column", [["bar", "kilnCapacity"], ['raw-html', () => {if (player.N.points.gte(9)) {return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> 5 Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> 30 Heat</div>`}}]]], ["clickable", "ProcKilns"]]]
     ]
  },
  
   "Upgrades": {
    content: [
     ["row", [["buyable", "HeatGainI"], ["buyable", "HeatCapacityI"], ["buyable", "HeatEffiencyI"], ["buyable", "HeatBoostI"]]],
     ["row", [["buyable", "TankGainI"], ["buyable", "TankCapacityI"], ["buyable", "TankEffiencyI"]]]
     ]
   }
 },
 row: 1001,
 displayRow: 998,
 layerShown() { return player.N.points.gte(6) }
})