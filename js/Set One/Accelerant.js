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
   RESOURCES: [
     null,
     new Decimal(0),
     new Decimal(0),
     new Decimal(0)],
    SPECIAL_RESOURCES: {
     "Workers": {
       "AMOUNT": new Decimal(0),
       "MAX_CAPACITY": new Decimal(25),
       "PRODUCTION_TIME": new Decimal(180),
       "TIME_ELAPSED": new Decimal(0),
       "IS_PRODUCING": false,
       "REQUIRED_RESOURCES": [null, new Decimal(1000)]
     }
    },
   RESOURCE_PER_PRODUCTION: [
     null,
     new Decimal(1),
     new Decimal(1),
     new Decimal(1)],
   MAX_CAPACITY: [
     null,
     new Decimal(10),
     new Decimal(30),
     new Decimal(20)],
   BEST_RESOURCES: [
     null,
     new Decimal(0),
     new Decimal(0),
     new Decimal(0)],
   NORMALIZED_RESOURCES: [
     null,
     "Heat",
     "Tanks",
     "Kilns"],
   REQUIRED_RESOURCES: {
     "HEAT":  [null], 
     "TANKS": [null, new Decimal(10)], 
     "KILNS": [null, new Decimal(100), new Decimal(50)]
   }
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
 update(delta) {
   let TICKRATE = new Decimal(1)
   
   if (player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] === true) {
     player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"] = player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"].add((TICKRATE).mul(delta))
   }
   if (player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"].gte(player.AC.SPECIAL_RESOURCES["Workers"]["PRODUCTION_TIME"])) {
     tmp.AC.PRODUCE_WORKERS_2();
     player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] = false
   }
 },
 UniversalUpdate() {
   var x = player.AC
   
   let HEAT_CAPACITY = new Decimal(10)
   let HEAT_PRODUCTION = new Decimal(1)
   HEAT_CAPACITY = HEAT_CAPACITY.mul(buyableEffect("AC", "HEAT_CAPACITY_I"))
   HEAT_PRODUCTION = HEAT_PRODUCTION.mul(buyableEffect("AC", "HEAT_QUANTITY_I"))
   x.MAX_CAPACITY[1] = HEAT_CAPACITY.ceil()
   x.RESOURCE_PER_PRODUCTION[1] = HEAT_PRODUCTION
   
   
   let TANK_CAPACITY = new Decimal(30)
   let TANK_PRODUCTION = new Decimal(1)
   let TANK_NEED = new Decimal(10)
   TANK_CAPACITY = TANK_CAPACITY.mul(buyableEffect("AC", "TANK_CAPACITY_I"))
   TANK_PRODUCTION = TANK_PRODUCTION.mul(buyableEffect("AC", "TANK_QUANTITY_I"))
   TANK_NEED = TANK_NEED.mul(buyableEffect("AC", "TANK_QUANTITY_I"))
   x.MAX_CAPACITY[2] = TANK_CAPACITY.ceil()
   x.RESOURCE_PER_PRODUCTION[2] = TANK_PRODUCTION
   x.REQUIRED_RESOURCES["TANKS"][1] = TANK_NEED
   
   
   let KILN_CAPACITY = new Decimal(20)
   let KILN_PRODUCTION = new Decimal(1)
   let KILN_NEED_1 = new Decimal(100)
   let KILN_NEED_2 = new Decimal(50)
   KILN_CAPACITY = KILN_CAPACITY.mul(buyableEffect("AC", "KILN_CAPACITY_I"))
   KILN_PRODUCTION = KILN_PRODUCTION.mul(buyableEffect("AC", "KILN_QUANTITY_I"))
   KILN_NEED_1 = KILN_NEED_1.mul(buyableEffect("AC", "KILN_QUANTITY_I"))
   KILN_NEED_2 = KILN_NEED_2.mul(buyableEffect("AC", "KILN_QUANTITY_I"))
   x.MAX_CAPACITY[3] = KILN_CAPACITY.ceil()
   x.RESOURCE_PER_PRODUCTION[3] = KILN_PRODUCTION
   x.REQUIRED_RESOURCES["KILNS"][1] = KILN_NEED_1
   x.REQUIRED_RESOURCES["KILNS"][2] = KILN_NEED_2
 },
 PRODUCE_HEAT() {
   var x = player.AC
   let AM_PER_CLICK = x.RESOURCE_PER_PRODUCTION[1]
   x.RESOURCES[1] = x.RESOURCES[1].add(AM_PER_CLICK)
   x.BEST_RESOURCES[1] = x.BEST_RESOURCES[1].add(AM_PER_CLICK)
   
   x.RESOURCES[1] = x.RESOURCES[1].clampMax(x.MAX_CAPACITY[1])
 },
 PRODUCE_TANKS() {
   var x = player.AC
   let AM_PER_CLICK = x.RESOURCE_PER_PRODUCTION[2]
   let REQUIREMENT = x.REQUIRED_RESOURCES["TANKS"]
   x.RESOURCES[2] = x.RESOURCES[2].add(AM_PER_CLICK)
   x.BEST_RESOURCES[2] = x.BEST_RESOURCES[2].add(AM_PER_CLICK)
   
   x.RESOURCES[1] = x.RESOURCES[1].sub(REQUIREMENT[1])
   
   x.RESOURCES[2] = x.RESOURCES[2].clampMax(x.MAX_CAPACITY[2])
   console.log(REQUIREMENT)
 },
 PRODUCE_KILNS() {
   var x = player.AC
   let AM_PER_CLICK = x.RESOURCE_PER_PRODUCTION[3]
   let REQUIREMENT = x.REQUIRED_RESOURCES["KILNS"]
   x.RESOURCES[3] = x.RESOURCES[3].add(AM_PER_CLICK)
   x.BEST_RESOURCES[3] = x.BEST_RESOURCES[3].add(AM_PER_CLICK)
 
   x.RESOURCES[1] = x.RESOURCES[1].sub(REQUIREMENT[1])
   x.RESOURCES[2] = x.RESOURCES[2].sub(REQUIREMENT[2])
   
   x.RESOURCES[3] = x.RESOURCES[3].clampMax(x.MAX_CAPACITY[3])
 },
 
 PRODUCE_WORKERS_1() {
  var x = player.AC
  let AM_PER_CLICK = new Decimal(1)
  let REQUIREMENT = x.SPECIAL_RESOURCES["Workers"]["REQUIRED_RESOURCES"]
  
  x.RESOURCES[1] = x.RESOURCES[1].sub(REQUIREMENT[1])
  
  x.SPECIAL_RESOURCES["Workers"]["AMOUNT"] = x.SPECIAL_RESOURCES["Workers"]["AMOUNT"] .clampMax(x.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"])
 },
 PRODUCE_WORKERS_2() {
  var x = player.AC
  x.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"] = new Decimal(0)
  let AM_PER_CLICK = new Decimal(1)
  x.SPECIAL_RESOURCES["Workers"]["AMOUNT"] = x.SPECIAL_RESOURCES["Workers"]["AMOUNT"].add(AM_PER_CLICK)
 },
 bars: {
     HEAT_BAR: {
       fillStyle: { 'background': "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)" },
       baseStyle: { 'background': "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)" },
       borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
       direction: RIGHT,
       width: 500,
       height: 50,
       progress() {
         return (player.AC.RESOURCES[1].div(player.AC.MAX_CAPACITY[1]))
       },
       display() {
         return `<div style="color: #000000"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">Heat<br><span style="font-size: 10px">+${format(player.AC.RESOURCE_PER_PRODUCTION[1])} HEAT / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES[1])} / ${formatNoDecimals(player.AC.MAX_CAPACITY[1])}</span></div>`
       },
       unlocked: true,
     },
     TANK_BAR: {
       fillStyle: { 'background': "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)" },
       baseStyle: { 'background': "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)" },
       borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
       direction: RIGHT,
       width: 500,
       height: 50,
       progress() {
         return (player.AC.RESOURCES[2].div(player.AC.MAX_CAPACITY[2]))
       },
       display() {
         return `<span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">Tanks<br><span style="font-size: 10px">+${format(player.AC.RESOURCE_PER_PRODUCTION[2])} TANKS / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES[2])} / ${formatNoDecimals(player.AC.MAX_CAPACITY[2])}</span>`
       },
       unlocked() { return player.AC.BEST_RESOURCES[1].gte(10)}
     },
     KILN_BAR: {
       fillStyle: { 'background': "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)" },
       baseStyle: { 'background': "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)" },
       borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
       direction: RIGHT,
       width: 500,
       height: 50,
       progress() {
         return (player.AC.RESOURCES[3].div(player.AC.MAX_CAPACITY[3]))
       },
       display() {
         return `<span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">Kilns<br><span style="font-size: 10px">+${format(player.AC.RESOURCE_PER_PRODUCTION[3])} KILNS / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES[3])} / ${formatNoDecimals(player.AC.MAX_CAPACITY[3])}</span>`
       },
       unlocked() { return player.AC.BEST_RESOURCES[2].gte(50) }
     },
     
     
     WORKER_BAR: {
       fillStyle: { 'background': "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)" },
       baseStyle: { 'background': "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)" },
       borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
       direction: RIGHT,
       width: 500,
       height: 50,
       progress() {
         return (player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].div(player.AC.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"]))
       },
       display() {
         return `<div style="color: #000000"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">Workers</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"])} / ${formatNoDecimals(player.AC.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"])}</span></div>`
       },
       unlocked: true,
     },
     WORKER_PRODUCTION_BAR: {
       fillStyle: { 'background': "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)" },
       baseStyle: { 'background': "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)" },
       borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
       direction: RIGHT,
       width: 500,
       height: 10,
       progress() {
         return (player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"].div(player.AC.SPECIAL_RESOURCES["Workers"]["PRODUCTION_TIME"]))
       },
       unlocked: true,
     },
 },
 clickables: {
     "PRODUCE_HEAT": {
       title() {
         return `<b style="font-size:12px">Produce Heat</b>`
       },
       canClick() {
         return player.AC.RESOURCES[1].lt(player.AC.MAX_CAPACITY[1])
       },
       onClick() {
         tmp.AC.PRODUCE_HEAT();
       },
       style() {
         if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#000000"
         }
         return {
           "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
         }
       },
       unlocked() {
         return true
       }
     },
     "PRODUCE_TANKS": {
       title() {
         return `<b style="font-size:12px">Produce Tanks</b>`
       },
       canClick() {
         return player.AC.RESOURCES[2].lt(player.AC.MAX_CAPACITY[2]) && player.AC.RESOURCES[1].gte(player.AC.REQUIRED_RESOURCES["TANKS"][1])
       },
       onClick() {
         tmp.AC.PRODUCE_TANKS();
       },
       style() {
         if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
         }
         return {
           "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#000000"
         }
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[1].gte(10)
       }
     },
     "PRODUCE_KILNS": {
       title() {
         return `<b style="font-size:12px">Produce Kilns</b>`
       },
       canClick() {
         return player.AC.RESOURCES[3].lt(player.AC.MAX_CAPACITY[3]) && player.AC.RESOURCES[1].gte(player.AC.REQUIRED_RESOURCES["KILNS"][1]) && player.AC.RESOURCES[2].gte(player.AC.REQUIRED_RESOURCES["KILNS"][2])
       },
       onClick() {
         tmp.AC.PRODUCE_KILNS();
       },
       style() {
         if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
         }
         return {
           "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#000000"
         }
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[2].gte(50)
       }
     },
     
     "PRODUCE_WORKERS": {
       title() {
         return `<b style="font-size:12px">Produce Workers</b>`
       },
       canClick() {
         return player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].lt(player.AC.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"]) && player.AC.RESOURCES[1].gte(player.AC.SPECIAL_RESOURCES["Workers"]["REQUIRED_RESOURCES"][1]) && player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] === false
       },
       onClick() {
         player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] = true;
         tmp.AC.PRODUCE_WORKERS_1()
       },
       style() {
         if (tmp[this.layer].clickables[this.id].canClick) return {
           "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
           "width": "120px",
           "height": "50px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "5px",
           "color": "#ffffff"
         }
         return {
           "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
           "width": "120px",
           "height": "50px",
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
 },
 buyables: {
     "HEAT_QUANTITY_I": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[1] = player[this.layer].RESOURCES[1].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Heat Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[1].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(1.25)
 
         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[1].gte(10)
       }
     },
     "HEAT_CAPACITY_I": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[2] = player[this.layer].RESOURCES[2].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Heat Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[2].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(1.5)

         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[1].gte(10)
       }
     },
     
     
     "TANK_QUANTITY_I": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(30).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[1] = player[this.layer].RESOURCES[1].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Tank Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[1].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(1.25)
 
         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[1].gte(10)
       }
     },
     "TANK_CAPACITY_I": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(15).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[2] = player[this.layer].RESOURCES[2].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Tank Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[2].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(1.5)

         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[1].gte(10)
       }
     },
     
     
     "KILN_QUANTITY_I": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[1] = player[this.layer].RESOURCES[1].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Kiln Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[1].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(1.25)
 
         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[2].gte(50)
       }
     },
     "KILN_CAPACITY_I": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[2] = player[this.layer].RESOURCES[2].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Kiln Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[2].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(1.5)

         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return player.AC.BEST_RESOURCES[2].gte(50)
       }
     },
     
     "POINT_BUYABLE_I": {
       cost(x) {
         let PowerI = new Decimal(1.25)
         let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[1] = player[this.layer].RESOURCES[1].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Point Buyable+</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Points</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[1].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(3)

         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return true
       }
     },
     "POINT_BUYABLE_II": {
       cost(x) {
         let PowerI = new Decimal(1.5)
         let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
         return Calculation;
       },
       buy() {
         player[this.layer].RESOURCES[2] = player[this.layer].RESOURCES[2].sub(this.cost())
         setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
       },
       display() {
         var S = tmp[this.layer].buyables[this.id]
         var SV = player[this.layer].buyables[this.id]
         return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Point Buyable++</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Points</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
       },
       canAfford() {
         return player[this.layer].RESOURCES[2].gte(this.cost())
       },
       style() {
         if (tmp[this.layer].buyables[this.id].canAfford)
           return {
             "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
             "width": "150px",
             "height": "60px",
             "border-radius": "0px",
             "border": "0px",
             "margin": "2.5px",
             "color": "#000000"
           }
         return {
           "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
           "width": "150px",
           "height": "60px",
           "border-radius": "0px",
           "border": "0px",
           "margin": "2.5px",
           "color": "#ffffff"
         }
       },
       effect(x) {
         let PowerI = new Decimal(5)

         let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
         return Effect;
       },
       unlocked() {
         return true
       }
     },
 },
 // linear-gradient(180deg, rgba(221,219,219,1) 0%, rgba(130,130,130,1) 100%)
/* bars: {
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
    return player.NG.points.gte(9)
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
    return player.NG.points.gte(9)
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
    return player.NG.points.gte(9)
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
    return player.NG.points.gte(9)
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
    return player.NG.points.gte(6)
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
    return player.NG.points.gte(6)
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
    if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
    }
   },
   style() {
    if (player.NG.points.lt(8.9))
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
    return player.NG.points.gte(6)
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
    return player.NG.points.gte(6)
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
    return player.NG.points.gte(6)
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
    if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
    }
   },
   style() {
    if (player.NG.points.lt(8.9))
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
    if (player.NG.points.gt(8)) {
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
    return player.NG.points.gte(6)
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
    return player.NG.points.gte(6)
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
    if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
    }
   },
   style() {
    if (player.NG.points.lt(8.9))
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
    if (player.NG.points.gt(8)) {
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
    return player.NG.points.gte(6)
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
    return player.NG.points.gte(6)
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
    if (player.NG.points.gte(9)) {
     return `<b style="font-size:12px">Automation</b>
          <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
          <b style="font-size:10px">${format(S.effect)}x Water Auto Efficiency</b><br>
      Cost: ${format(S.cost)} Kilns`
    }
    return ``
   },
   canAfford() {
    if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
    }
   },
   style() {
    if (player.NG.points.lt(8.9))
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
    if (player.NG.points.gt(8)) {
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
     ["row", [["column", [["bar", "heatCapacity"]]], ["clickable", "ProcHeat"]]],
     ["row", [["column", [["bar", "tankCapacity"], ['raw-html', () => { return `<div class="InfoBox"><img src='images/Heat.png' class='cen' width='14' height='14'> ${format(tmp.AC.tankNeed)} Heat</div>` }]]], ["clickable", "ProcTanks"]]],
     ["row", [["column", [["bar", "kilnCapacity"], ['raw-html', () => {
     const [heat, tanks] = tmp.AC.kilnNeed
     if (player.NG.points.gte(9)) { return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> ${format(tanks)} Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> ${format(heat)} Heat</div>` }
    }]]], ["clickable", "ProcKilns"]]],
     ["row", [["column", [["bar", "waterCapacity"], ['raw-html', () => {
     const [heat, tanks] = tmp.AC.waterNeed
     if (player.NG.points.gte(9)) { return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> ${format(tanks)} Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> ${format(heat)} Heat</b></div>` }
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
 },*/
 tabFormat: {
     "Produce Stuff": {
       content:  [
         ["row", [["column", [["bar", "HEAT_BAR"]]], ["clickable", "PRODUCE_HEAT"]]],
         ["blank", "1px"],
         ["row", [["buyable", "HEAT_QUANTITY_I"], ["buyable", "HEAT_CAPACITY_I"]]],
         ["blank", "40px"],
         ["row", [["column", [["bar", "TANK_BAR"]]], ["clickable", "PRODUCE_TANKS"]]],
         ["row", [["buyable", "TANK_QUANTITY_I"], ["buyable", "TANK_CAPACITY_I"]]],
         ['raw-html', () => { return `
         <br><div class="InfoBox" style="line-height: 12px">
         <span style="font-size: 20px; font-family: CRDIReg">REQUIRED RESOURCES</span><br>
         <img src='images/Heat.png' class='cen' width='20' height='20'> -${format(player.AC.REQUIRED_RESOURCES["TANKS"][1])} ${player.AC.NORMALIZED_RESOURCES[1]} </div>` }],
         ["blank", "40px"],
         ["row", [["column", [["bar", "KILN_BAR"]]], ["clickable", "PRODUCE_KILNS"]]],
         ["row", [["buyable", "KILN_QUANTITY_I"], ["buyable", "KILN_CAPACITY_I"]]],
         ['raw-html', () => { return `
         <br><div class="InfoBox" style="line-height: 12px">
         <span style="font-size: 20px; font-family: CRDIReg">REQUIRED RESOURCES</span><br>
         <img src='images/Heat.png' class='cen' width='20' height='20'> -${format(player.AC.REQUIRED_RESOURCES["KILNS"][1])} ${player.AC.NORMALIZED_RESOURCES[1]}<br>
         <img src='images/Tanks.png' class='cen' width='20' height='20'>         -${format(player.AC.REQUIRED_RESOURCES["KILNS"][2])} ${player.AC.NORMALIZED_RESOURCES[2]}</div>` }],
         ]
     },
     "Special Stuff": {
       unlocked() {return player.AC.BEST_RESOURCES[3].gte(1)},
       content: [
         ["row", [["column", [["bar", "WORKER_BAR"], ["bar", "WORKER_PRODUCTION_BAR"]]], ["clickable", "PRODUCE_WORKERS"]]],
         ]
     },
     "Permament Upgrades": {
       unlocked() { return player.AC.BEST_RESOURCES[3].gte(1) },
       content: [
         ["row", [["buyable", "POINT_BUYABLE_I"], ["buyable", "POINT_BUYABLE_II"]]]
         ]
     }
 },
 row: 256,
 displayRow: 254,
 layerShown() { return player.NG.points.gte(9) }
})