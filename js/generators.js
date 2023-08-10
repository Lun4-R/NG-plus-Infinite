addLayer("G", {
    name: "Generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    rawText: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		power: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(1e72), // Can be a function that takes requirement increases into account
    resource: "Generators", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    generatorEffect() {
     let Base = player.G.power
     let Power = new Decimal(0.5)
     let Softcap1threshold = new Decimal(200e12)
     let Softcap1factor = new Decimal(0.5)
    
     let Calculation = new Decimal.pow(Base, Power)
    
     if (Calculation.gte(Softcap1threshold)) {
      Calculation = Calculation.mul(Softcap1threshold).pow(Softcap1factor)
     }
     return Calculation
    },
    generatePower() {
     let Base = player.G.points
     let Power = new Decimal(2.5)
     
     let Calculation = new Decimal.pow(Power, Base).sub(1)
     return Calculation
    },
    update(delta) {
     player.G.power = player.G.power.add((tmp.G.generatePower).times(delta))
    },
    branches : [["P", "#ffffff", "10"]],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
    "Generators": {
      content: [
      "main-display",
      "prestige-button",
      "resource-display",
      "blank",
      "blank",
      ['raw-html', () => {
          return `
          <div>
          You have ${format(player.G.power)} Power, that is generated ${format(tmp.G.generatePower)} / sec<br>
          Your Power is translated as ${format(tmp.G.generatorEffect)}× boost to lower layer currencies
          </div>`
                }],
                ]
    }
    },
    layerShown(){return player.N.points.gte(11)}
})
