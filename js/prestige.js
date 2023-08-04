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
    upgrades: {
     11 : {
      title: `Prestige I`,
      cost: new Decimal(1),
      description: `+100% Point Generation`
     },
     12: {
      title: `Prestige II`,
      cost: new Decimal(5),
      description: `+100% Point Generation`
     },
     13: {
      title: `Prestige III`,
      cost: new Decimal(12),
      description: `+100% Point Generation`
     },
     14: {
      title: `Prestige IV`,
      cost: new Decimal(25),
      description: `+100% Point Generation`
     },
     21: {
      title: `Prestige V`,
      cost: new Decimal(50),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     22: {
      title: `Prestige VI`,
      cost: new Decimal(100),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     23: {
      title: `Prestige VII`,
      cost: new Decimal(175),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     24: {
      title: `Prestige VIII`,
      cost: new Decimal(300),
      description: `+200% Point Generation`,
      unlocked() {
       return player.N.points.gte(3)
      }
     },
     31: {
      title: `Prestige IX`,
      cost: new Decimal(900),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     32: {
      title: `Prestige X`,
      cost: new Decimal(2100),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     33: {
      title: `Prestige XI`,
      cost: new Decimal(4500),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
     34: {
      title: `Prestige XII`,
      cost: new Decimal(11000),
      description: `4x Point Generation`,
      unlocked() {
       return player.N.points.gte(5)
      }
     },
    },
    row: 0,
    layerShown(){return player.N.points.gte(2)}
})
