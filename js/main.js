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
		      ch1: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), 
    resource: "New Game",
    baseResource: "Points", 
    baseAmount() {return player.points}, 
    type: "static",
    exponent() {
     let expo = new Decimal(2)
     let S1 = new Decimal.div(player.N.points, 25)
     let S2 = new Decimal.div(player.N.points, 100)
     let S3 = new Decimal.div(player.N.points, 125)
     expo = expo.add(S1)
     expo = expo.add(S2)
     expo = expo.add(S3)
     return expo
    },
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
    ch1De() {
     let Power = new Decimal(1)
     if (player.N.ch1.gte(1)) {
      Power = Power.sub(0.75)
     }
     return Power
    },
    challenges: {
     "T0": {
      display() {
       var AC = tmp[this.layer].challenges[this.id]
       return `
                <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★ -</b>
                <br>
                <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">PCH1</b><br>
                <br> <br>
                <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Produce <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} Points</b> when in this challenge<br>
                <br>
                You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Points</b> to finish this challenge once<br>
                ${format(challengeCompletions(this.layer, this.id))} / ${format(this.completionLimit)} completions<br>
                Boost from completations: <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.effect)}x Points</b>
                <br> <br>
                Entering this challenge will perform NG like reset!</b>`
      },
      completionLimit: new Decimal(1.78e308),
      goal() {
       let x = new Decimal(challengeCompletions(this.layer, this.id))
       x = x.add(1)
    
       let Power = new Decimal(10)
       let Calculation = new Decimal(1).mul(Decimal.pow(Power, x.pow(1)))
       return Calculation;
      },
      canComplete() {
       let x = new Decimal(challengeCompletions(this.layer, this.id))
       x = x.add(1)
    
       let Power = new Decimal(10)
       let Calculation = new Decimal(1).mul(Decimal.pow(Power, x.pow(1)))
       let Check = player.points.gte(Calculation)
       return Check;
      },
      effect() {
       let x = new Decimal(challengeCompletions(this.layer, this.id))
    
       let Power = new Decimal(2.5)
       let Calculation = new Decimal(1).mul(Decimal.pow(Power, x.pow(1)))
       return Calculation;
      },
      debuff() {
       let Base = new Decimal(0.25)
       return Base
      },
      onEnter() {
       player.N.ch1 = new Decimal(1)
      },
      onExit() {
       player.N.ch1 = new Decimal(0)
      },
      unlocked() { return true },
      style() {
       return {
        "background-image": "url('images/TCH1.png')",
        "background-size": "cover",
        "background-color": "#ffffff",
        "animation": "pulse 2s infinite",
        "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
        "width": "450px",
        "height": "auto",
        "border-radius": "20px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 15px #000000",
        "color": "#ffffff"
       }
      },
     },
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
                         + Multiply Prestige Point gain based on Prestige upgrades bought ×( ${format(tmp.N.ng4boost)} )<br>
                         No one likes repetitive gameplay, so why not automate Prestige a bit?<br>
                         ( Automatic Prestige 1st row buying, 5% passive PP generation / sec )
                         </div>`
         }
         return ``
                               }],
      "blank",
                    ['raw-html', () => {
       if (player.N.points.gte(5)) {
        return `
                       <div>
                       NG+++++<br>
                       + For every Booster you own, it's base gets increased by 0.05<br>
                       + Unlock a new row of Prestige upgrades<br>
                       + Unlock few Booster upgrades<br>
                       Huh? The Automator I gave you was slow and sluggish? Well I can't argue that you took your time to grind for this NG<br>
                                                ( Automatic Prestige 2nd row buying, additional 7.5% passive PP generation / sec )
                       </div>`
       }
       return ``
                             }],
    "blank",
    ['raw-html', () => {
     if (player.N.points.gte(6)) {
      return `
                           <div>
                           NG+(6) <br>
     + Allows to buymax Boosters<br>
     + Unlock Production<br>
     + Unlock a new row of Prestige upgrades<br>
     + Unlock a new row of Booster upgrades<br>
     + Prestige Automator Mark III<br>
     ( Automatic Prestige 3rd row buying, additional 10% passive PP generation / sec )
                           </div>`
     }
     return ``
                                 }],
         "blank",
         ['raw-html', () => {
          if (player.N.points.gte(7)) {
           return `
                                <div>
                                NG+(7) <br>
          + Make Booster effect softcap start from 10Qi instead 200T<br>
          + Boosters don't reset Prestige anymore<br>
          + Booster Automator Mark I<br>
          ( Automatic Booster 1-2 row buying and automatic Booster gaining )
                                </div>`
          }
          return ``
                                      }],
         "blank",
                  ['raw-html', () => {
          if (player.N.points.gte(9)) {
           return `
                                         <div>
                                         NG+(9) <br>
          + Unlock Kilns<br>
          + Unlock T0 challenge<br>
          + Increase Booster base by 21%<br>
          + Make Booster effect softcap start from 1DDc instead 10Qi<br>
          + Prestige Automator Mark IV<br>
          ( Automate everything there is to automate in Prestige layer )<br>
          <br>
          For extra grinders there is NG+(11) milestone if you have wish to smash your fingers away in Production layer to unlock it
                                         </div>`
          }
          return ``
                                               }],
          "blank",
                            ['raw-html', () => {
           if (player.N.points.gte(11)) {
            return `
                                                   <div>
                                                   NG+(11) ( currently endgame ) <br>
                    + Unlock Generators ( lmao why did you even grinded for this, also no it isn't fully done )
            </div>`
           }
           return ``
                                                         }],
    ]
    },
        "Challenges": {
         unlocked() { return player.N.points.gte(9) },
         content: [
          ["row", [["challenge", "T0"]]]
          ]
        }
    },
    row: 999, // ahhhh, hughh, eughhh
    layerShown(){return true}
})
