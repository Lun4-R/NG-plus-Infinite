addLayer("AC", {
 name: "",
 rawText() {
  return `
     <div>
     <b class="mT">C</b>
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
   water: new Decimal(0),
   rawMaterials: new Decimal(0)
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
 
 // linear-gradient(180deg, rgba(221,219,219,1) 0%, rgba(130,130,130,1) 100%)
 bars: {
  heatCapacity: {
   fillStyle: { 'background': "linear-gradient(180deg, rgba(221,219,219,1) 0%, rgba(130,130,130,1) 100%)" },
   baseStyle: { 'background': "linear-gradient(180deg, rgba(125,125,125,1) 0%, rgba(58,57,57,1) 100%)" },
   borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
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
    return (player.AC.kilns.div(tmp.AC.kilnCapacity))
   },
   display() {
    return `Kilns ${format(player.AC.kilns)} / ${format(tmp.AC.kilnCapacity)}`
   },
   unlocked() {
    return player.N.points.gte(9)
   }
  },
  waterCapacity: {
   fillStyle: { 'background': "linear-gradient(180deg, rgba(45,49,109,1) 0%, rgba(91,199,199,1) 100%)" },
   baseStyle: { 'background': "linear-gradient(180deg, rgba(27,30,67,1) 0%, rgba(50,106,106,1) 100%)" },
   textStyle: { 'text-shadow': '0px 0px 0.75px #000000' },

   borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
   direction: RIGHT,
   width: 300,
   height: 30,
   progress() {
    return (player.AC.water.div(tmp.AC.waterCapacity))
   },
   display() {
    return `${format(player.AC.water)} / ${format(tmp.AC.waterCapacity)} L Water`
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
  let amount = new Decimal(1)
  amount = amount.mul(buyableEffect("AC", "KilnGainI"))
  let cost1 = new Decimal(30)
  let cost2 = new Decimal(5)
  cost1 = cost1.mul(buyableEffect("AC", "KilnGainI"))
  cost2 = cost2.mul(buyableEffect("AC", "KilnGainI"))
  player.AC.heat = player.AC.heat.sub(cost1)
  player.AC.tanks = player.AC.tanks.sub(cost2)
  player.AC.kilns = player.AC.kilns.add(amount)
 },
 kilnCapacity() {
  let BaseC = new Decimal(5)

  BaseC = BaseC.mul(buyableEffect("AC", "KilnCapacityI"))
  return BaseC
 },
 kilnFixate() {
  if (player.AC.kilns.gt(tmp.AC.kilnCapacity)) {
   player.AC.kilns = tmp.AC.kilnCapacity
  }
 },
 kilnNeed() {
  let cost1 = new Decimal(30)
  let cost2 = new Decimal(5)
  cost1 = cost1.mul(buyableEffect("AC", "KilnGainI"))
  cost2 = cost2.mul(buyableEffect("AC", "KilnGainI"))
  return [cost1, cost2]
 },

 procWater() {
  let amount = new Decimal(1)
  amount = amount.mul(buyableEffect("AC", "WaterGainI"))
  let cost1 = new Decimal(100)
  let cost2 = new Decimal(100)
  cost1 = cost1.mul(buyableEffect("AC", "WaterGainI"))
  cost2 = cost2.mul(buyableEffect("AC", "WaterGainI"))
  player.AC.heat = player.AC.heat.sub(cost1)
  player.AC.tanks = player.AC.tanks.sub(cost2)
  player.AC.water = player.AC.water.add(amount)
 },
 waterCapacity() {
  let BaseC = new Decimal(1000)

  BaseC = BaseC.mul(buyableEffect("AC", "WaterCapacityI"))
  return BaseC
 },
 waterFixate() {
  if (player.AC.water.gt(tmp.AC.waterCapacity)) {
   player.AC.water = tmp.AC.waterCapacity
  }
 },
 waterNeed() {
  let heatC = new Decimal(100)
  let tankC = new Decimal(10)
  heatC = heatC.mul(buyableEffect("AC", "WaterGainI"))
  tankC = tankC.mul(buyableEffect("AC", "WaterGainI"))
  return [heatC, tankC]
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
    tmp.AC.procKilns();
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
  "ProcWater": {
   title() {
    let state = []
    if (player.AC.water.eq(tmp.AC.waterCapacity)) {
     state = "MAX"
    }
    return `<b style="font-size:12px">Produce Water</b><br>
        <b style="font-size:8px">${state}</b>`
   },
   canClick() {
    const [heat, tanks] = tmp.AC.waterNeed
    
    return player.AC.water.lt(tmp.AC.waterCapacity) &&
     player.AC.heat.gte(tmp.AC.waterNeed.heat) &&
     player.AC.tanks.gte(tmp.AC.waterNeed.tanks)
    
   },
   onClick() {
    const [tanks, heat] = tmp.AC.waterNeed
    tmp.AC.procWater();

    console.log(typeof heat, typeof tanks)
   },
   style() {
    if (tmp[this.layer].clickables[this.id].canClick) return {
     "background": "linear-gradient(180deg, rgba(45,49,109,1) 0%, rgba(91,199,199,1) 100%)",
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
 buyables: {
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
    let Base = new Decimal(10)
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

  "KilnGainI": {
   cost(x) {
    let PowerI = new Decimal(1.3)
    let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(500)
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
         <b style="font-size:10px">${format(S.effect)}x Kiln Production</b><br>
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
  "KilnCapacityI": {
   cost(x) {
    let PowerI = new Decimal(1.1)
    let Calculation = new Decimal(300).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(300)
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
         <b style="font-size:10px">${format(S.effect)}x Kiln Capacity</b><br>
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
  "KilnEffiencyI": {
   cost(x) {
    let PowerI = new Decimal(1.1)
    let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(100)
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

  "WaterGainI": {
   cost(x) {
    let PowerI = new Decimal(1.3)
    let Calculation = new Decimal(5000).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(5000)
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
         <b style="font-size:10px">${format(S.effect)}x Water Production</b><br>
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
  "WaterCapacityI": {
   cost(x) {
    let PowerI = new Decimal(1.1)
    let Calculation = new Decimal(3000).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(3000)
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
         <b style="font-size:10px">${format(S.effect)}x Water Capacity</b><br>
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
  "WaterEffiencyI": {
   cost(x) {
    let PowerI = new Decimal(1.1)
    let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
   },
   buy() {
    let Base = new Decimal(1000)
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
          <b style="font-size:10px">${format(S.effect)}x Water Auto Efficiency</b><br>
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
     ["row", [["column", [["bar", "tankCapacity"], ['raw-html', () => { return `<div class="InfoBox"><img src='images/Heat.png' class='cen' width='14' height='14'> ${format(tmp.AC.tankNeed)} Heat</div>` }]]], ["clickable", "ProcTanks"]]],
     ["row", [["column", [["bar", "kilnCapacity"], ['raw-html', () => {
     const [heat, tanks] = tmp.AC.kilnNeed
     if (player.N.points.gte(9)) { return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> ${format(tanks)} Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> ${format(heat)} Heat</div>` }
    }]]], ["clickable", "ProcKilns"]]],
     ["row", [["column", [["bar", "waterCapacity"], ['raw-html', () => {
     const [heat, tanks] = tmp.AC.waterNeed
     if (player.N.points.gte(9)) { return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> ${format(tanks)} Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> ${format(heat)} Heat</b></div>` }
    }]]], ["clickable", "ProcWater"]]]
     ]
  },

  "Upgrades": {
   content: [
     ["row", [["buyable", "HeatGainI"], ["buyable", "HeatCapacityI"], ["buyable", "HeatEffiencyI"], ["buyable", "HeatBoostI"]]],
     ["row", [["buyable", "TankGainI"], ["buyable", "TankCapacityI"], ["buyable", "TankEffiencyI"]]],
     ["row", [["buyable", "KilnGainI"], ["buyable", "KilnCapacityI"], ["buyable", "KilnEffiencyI"]]]
     ]
  }
 },
 row: 1001,
 displayRow: 998,
 layerShown() { return player.N.points.gte(6) }
})