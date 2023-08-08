addLayer("P", {
    name: "", 
    rawText() {
     return `P`
    },
    position: 0, 
    startData() { return {
        unlocked: true,
		      points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), 
    resource: "Prestige Points",
    baseResource: "Points", 
    baseAmount() {return player.points}, 
    type: "normal",
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        mult = mult.mul(player.N.points.gte(4) ? tmp.N.ng4boost : 1)
        mult = mult.mul(buyableEffect("B", "P1"))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    passiveGeneration() {
     let gen = new Decimal(0)
     gen = gen.add(player.N.points.gte(4) ? 0.05 : 0)
     gen = gen.add(player.N.points.gte(5) ? 0.075 : 0)
     return gen
    },
    update(delta) {
     if (player.N.points.gte(4)) buyUpgrade(this.layer, 11)
     if (player.N.points.gte(4)) buyUpgrade(this.layer, 12)
     if (player.N.points.gte(4)) buyUpgrade(this.layer, 13)
     if (player.N.points.gte(4)) buyUpgrade(this.layer, 14)
     
     if (player.N.points.gte(5)) buyUpgrade(this.layer, 21)
     if (player.N.points.gte(5)) buyUpgrade(this.layer, 22)
     if (player.N.points.gte(5)) buyUpgrade(this.layer, 23)
     if (player.N.points.gte(5)) buyUpgrade(this.layer, 24)
     
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 31)
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 32)
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 33)
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 34)
     
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 41)
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 42)
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 43)
     if (player.N.points.gte(9)) buyUpgrade(this.layer, 44)
    },
    upgrades: {
     11 : {
      title: `Prestige I`,
      cost: new Decimal(1),
      description: `+100% Point Generation`
     },
     12: {
      title: `Prestige II`,
      cost: new Decimal(2),
      description: `+100% Point Generation`
     },
     13: {
      title: `Prestige III`,
      cost: new Decimal(5),
      description: `+100% Point Generation`
     },
     14: {
      title: `Prestige IV`,
      cost: new Decimal(10),
      description: `+100% Point Generation`
     },
     21: {
      title: `Prestige V`,
      cost: new Decimal(25),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     22: {
      title: `Prestige VI`,
      cost: new Decimal(50),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     23: {
      title: `Prestige VII`,
      cost: new Decimal(100),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     24: {
      title: `Prestige VIII`,
      cost: new Decimal(250),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     31: {
      title: `Prestige IX`,
      cost: new Decimal(500),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     32: {
      title: `Prestige X`,
      cost: new Decimal(1000),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     33: {
      title: `Prestige XI`,
      cost: new Decimal(2500),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     34: {
      title: `Prestige XII`,
      cost: new Decimal(5000),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     41: {
       title: `Prestige XIII`,
       cost: new Decimal(10e6),
       description: `5x Point Generation`,
       unlocked() {
        return player.N.points.gte(6)
       }
      },
      42: {
       title: `Prestige XIV`,
       cost: new Decimal(25e6),
       description: `5x Point Generation`,
       unlocked() {
        return player.N.points.gte(6)
       }
      },
      43: {
       title: `Prestige XV`,
       cost: new Decimal(50e6),
       description: `5x Point Generation`,
       unlocked() {
        return player.N.points.gte(6)
       }
      },
      44: {
       title: `Prestige XVI`,
       cost: new Decimal(10e7),
       description: `5x Point Generation`,
       unlocked() {
        return player.N.points.gte(6)
       }
      },
    },
    hotkeys: [
     { key: "p", description: "P: Reset for prestige points is possible", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
        ],
    row: 0,
    layerShown(){return player.N.points.gte(2)}
})
