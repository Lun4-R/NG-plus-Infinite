addLayer("B", {
 name: "",
 rawText() {
  return `B`
 },
 position: 0,
 startData() {
  return {
   unlocked: true,
   points: new Decimal(0),
  }
 },
 color: "#ffffff",
 branches: [["P", "#ffffff", "10"]],
 requires: new Decimal(1e5),
 resource: "Boosters",
 baseResource: "Points",
 baseAmount() { return player.points },
 type: "static",
 exponent: 1.25,
 gainMult() {
  mult = new Decimal(1)
  mult = mult.div(upgradeEffect("B", 11))
  return mult
 },
 gainExp() {
  return new Decimal(1)
 },
 boosterEffect() {
  let Base = player.B.points
  let Power = new Decimal(1.5)
  Power = Power.add(player.N.points.gte(9) ? 0.315 : 0)
  let BonusPower = new Decimal.div(player.B.points, 20)
  let Softcap1threshold = new Decimal(200e12)
  Softcap1threshold = Softcap1threshold.mul(player.N.points.gte(7) ? 5e6 : 1)
  Softcap1threshold = Softcap1threshold.mul(player.N.points.gte(9) ? 1e21 : 1)
  let Softcap1factor = new Decimal(0.5)

  Power = Power.add(player.N.points.gte(5) ? BonusPower : 0)

  let Calculation = new Decimal.pow(Power, Base)
  
  if (Calculation.gte(Softcap1threshold)) {
   Calculation = Calculation.mul(Softcap1threshold).pow(Softcap1factor)
  }
  return Calculation
 },
 prestartBoostI() {
  let Power = new Decimal(1)
  let Threshold = new Decimal(1e6)
  
  if (player.points.lte(Threshold)) {
   Power = Power.add(0.33)
  }
  return Power
 },
 prestartBoostII() {
  let Power = new Decimal(1)
  let Threshold = new Decimal(1e60)
 
  if (player.points.lte(Threshold)) {
   Power = Power.add(0.15)
  }
  return Power
 },
 canBuyMax() {
  return player.N.points.gte(6)
 },
 resetsNothing() {
  return player.N.points.gte(7)
 },
 autoPrestige() {
  return player.N.points.gte(7)
 },
 update(delta) {
  if (player.N.points.gte(9)) buyUpgrade(this.layer, 11)
  if (player.N.points.gte(9)) buyUpgrade(this.layer, 12)
  if (player.N.points.gte(9)) buyUpgrade(this.layer, 21)
  if (player.N.points.gte(9)) buyUpgrade(this.layer, 22)
  
  if (player.N.points.gte(9)) buyBuyable(this.layer, "P1")
  if (player.N.points.gte(9)) buyBuyable(this.layer, "P2")
 },
 upgrades: {
   11: {
    title: `Synergism`,
    cost: new Decimal(2),
    description: `Points boost Booster gain`,
    effect() {
     if (hasUpgrade(this.layer, this.id)) {
     let Base = player.points
     let Log = new Decimal(10)
     let Power = new Decimal(0.125)
     
     return Decimal.log(Base.add(1), Log).pow(Power)
     }
     else return new Decimal(1)
    },
    unlocked() {
     return player.N.points.gte(5)
    }
   },
   12: {
    title: `★ Pre-Start boost`,
    cost: new Decimal(3),
    description: `^1.33 Point gain until 1,000,000 Points`,
    unlocked() {
     return player.N.points.gte(5)
    }
   },
   
   21: {
     title: `Super Synergism`,
     cost: new Decimal(17),
     description: `Prestige Points boost Point gain`,
     effect() {
      if (hasUpgrade(this.layer, this.id)) {
       let Base = player.P.points
       let Log = new Decimal(10)
       let Power = new Decimal(0.1275)
   
       return Decimal.log(Base.add(1), Log).pow(Power)
      }
      else return new Decimal(1)
     },
     unlocked() {
      return player.N.points.gte(6)
     }
    },
    22: {
     title: `★★ Pre-Start boost`,
     cost: new Decimal(24),
     description: `^1.15 Point gain until 1e60 Points`,
     unlocked() {
      return player.N.points.gte(6)
     }
    },
 },
 buyables : {
 "P1": {
  cost(x) {
   let PowerI = new Decimal(1.25)
   let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(1)
   let Growth = new Decimal(1.25)
   let Currency = player.B.points
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   return `<b style="font-size:12px">Infinite PP-Upgrade</b>
         <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
         <b style="font-size:10px">${format(S.effect)}x PP</b><br>
     Cost: ${format(S.cost)} Boosters`
  },
  canAfford() {
   return player[this.layer].points.gte(this.cost())
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
   let PowerI = new Decimal(1.125)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return player.N.points.gte(5)
  }
 },
 "P2": {
  cost(x) {
   let PowerI = new Decimal(1.275)
   let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1)))
   return Calculation;
  },
  buy() {
   let Base = new Decimal(5)
   let Growth = new Decimal(1.275)
   let Currency = player.B.points
   let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
   let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
  },
  display() {
   var S = tmp[this.layer].buyables[this.id]
   var SV = player[this.layer].buyables[this.id]
   return `<b style="font-size:12px">Infinite P-Upgrade</b>
         <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
         <b style="font-size:10px">${format(S.effect)}x Points</b><br>
     Cost: ${format(S.cost)} Boosters`
  },
  canAfford() {
   return player[this.layer].points.gte(this.cost())
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
   let PowerI = new Decimal(1.33)
 
   let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
   return Effect;
  },
  unlocked() {
   return player.N.points.gte(6)
  }
 },

 },
 tabFormat: {
  "Boosters": {
   content: [
      ['raw-html', () => {
       return `<MA style='font-size: 16px'>You have <HI style='font-size: 24px; text-shadow: 0px 0px 20px; color:#ffffff'>${format(player.B.points)}</HI> Boosters</MA>`
                          }],
      "blank",
      "prestige-button",
      "resource-display",
      ['raw-html', () => {
       let softcap1 = ""
       if ( player.B.points.gte(30)) {
        softcap1 = `( softcapped bruh )`
       }
     return `
          <div>
          Boost to points: ×${format(tmp.B.boosterEffect)} ${softcap1}
          </div>`
                }],
                "blank",
     ["row", [["upgrade", 11], ["upgrade", 12], ["buyable", "P1"]]],
     ["row", [["upgrade", 21], ["upgrade", 22], ["buyable", "P2"]]]
    ]
  }
 },
 hotkeys: [
  { key: "b", description: "B: Reset for Boosters if possible", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
     ],
 row: 1,
 layerShown() { return player.N.points.gte(4) }
})