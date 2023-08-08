let modInfo = {
	name: "The NG ( Infinite ) Tree",
	id: "cta1-NG",
	author: "Zittara | ( Citrine )",
	pointsName: "Points",
	modFiles: [
	"main.js",
	"prestige.js",
	"booster.js",
	"generators.js",
	"accelerant.js",
	"tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 8192,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "v2.00",
	name: "Final Future - NG+(10)",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "procHeat", "procTanks", "procKilns"] 

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	gain = gain.add(player.N.points.gte(1) ? 2 : 0)
	gain = gain.mul(player.N.points.gte(3) ? tmp.N.ng3boost : 1)
 gain = gain.mul(tmp.B.boosterEffect)
	
	gain = gain.mul(hasUpgrade("P", 11) ? 2 : 1)
	gain = gain.mul(hasUpgrade("P", 12) ? 2 : 1)
	gain = gain.mul(hasUpgrade("P", 13) ? 2 : 1)
	gain = gain.mul(hasUpgrade("P", 14) ? 2 : 1)
	
	gain = gain.mul(hasUpgrade("P", 21) ? 3 : 1)
	gain = gain.mul(hasUpgrade("P", 22) ? 3 : 1)
	gain = gain.mul(hasUpgrade("P", 23) ? 3 : 1)
	gain = gain.mul(hasUpgrade("P", 24) ? 3 : 1)
	
	gain = gain.mul(hasUpgrade("P", 31) ? 4 : 1)
	gain = gain.mul(hasUpgrade("P", 32) ? 4 : 1)
	gain = gain.mul(hasUpgrade("P", 33) ? 4 : 1)
	gain = gain.mul(hasUpgrade("P", 34) ? 4 : 1)
	
	gain = gain.mul(hasUpgrade("P", 41) ? 5 : 1)
	gain = gain.mul(hasUpgrade("P", 42) ? 5 : 1)
	gain = gain.mul(hasUpgrade("P", 43) ? 5 : 1)
	gain = gain.mul(hasUpgrade("P", 44) ? 5 : 1)
	
	gain = gain.mul(upgradeEffect("B", 21))
	gain = gain.mul(buyableEffect("B", "P2"))
	gain = gain.mul(buyableEffect("AC", "HeatBoostI"))
	
	gain = gain.mul(tmp["N"].challenges["T0"].effect)
	gain = gain.pow(hasUpgrade("B", 12) ?tmp.B.prestartBoostI : 1)
	gain = gain.pow(hasUpgrade("B", 22) ?tmp.B.prestartBoostII : 1)
	
	gain = gain.pow(tmp.N.ch1De)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eee9"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
 player.N.points = new Decimal(5)
}