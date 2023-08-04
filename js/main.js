addLayer("N", {
    name: "", 
    rawText() {
     return `
     <div>
     <b class="mT">NG</b>
     <b class="ide"></b>
     </div>`
    },
    position: 0, 
    startData() { return {
        unlocked: true,
		      points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), 
    resource: "New Game",
    baseResource: "Points", 
    baseAmount() {return player.points}, 
    type: "static",
    exponent: 2.25, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    ng3boost() {
     let Base = player.points
     let Log = new Decimal(10)
     
     let Boost = new Decimal.log(Base.add(1), Log)
     Boost = Boost.max(1)
     return Boost
    },
    ng4boost() {
     let Base = player.P.upgrades.length
     let Power = new Decimal(1.2)
     
     let Boost = new Decimal.pow(Power, Base)
     return Boost
    },
    tabFormat: {
    "Main NG": {
      content: [
      "blank",
      "prestige-button",
      "blank",
      ['raw-html', () => {
          return `
          <div>
          Current mode: NG${displayPluses(player.N.points)}
          </div>`
                }],
       "blank",
       ['raw-html', () => {
        if (player.N.points.gte(1)) {
        return `
          <div>
          NG+<br>
          + Generate 2 points in a second
          </div>`
        }
        return ``
                }],
       "blank",
              ['raw-html', () => {
        if (player.N.points.gte(2)) {
         return `
                 <div>
                 NG++<br>
                 + Unlock Prestige
                 </div>`
        }
        return ``
                       }],
       "blank",
              ['raw-html', () => {
        if (player.N.points.gte(3)) {
         return `
                 <div>
                 NG+++<br>
                 + Unlock a new row of Prestige upgrades<br>
                 + Multiply Point gain based on log10(points), ×( ${format(tmp.N.ng3boost)} )
                 </div>`
        }
        return ``
                       }],
        "blank",
                      ['raw-html', () => {
         if (player.N.points.gte(4)) {
          return `
                         <div>
                         NG++++<br>
                         + Unlock Boosters<br>
                         + Multiply Prestige Point gain based on Prestige upgrades bought ×( ${format(tmp.N.ng4boost)} )
                         </div>`
         }
         return ``
                               }],
      "blank",
                    ['raw-html', () => {
       if (player.N.points.gte(5)) {
        return `
                       <div>
                       NG+++++ ( endgame )<br>
                       + For every Booster you own, it's base gets increased by 0.05<br>
                       + Unlock a new row of Prestige upgrades<br>
                       + Unlock few Booster upgrades
                       </div>`
       }
       return ``
                             }],
    ]
    },
    },
    row: 999, // ahhhh, hughh, eughhh
    layerShown(){return true}
})
