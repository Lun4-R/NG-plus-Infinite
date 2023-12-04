let modInfo = {
	name: "The NG ( Infinite ) Tree",
	id: "cta3-NG",
	author: "komputer cast | ( citrine_ex )",
	pointsName: "Points",
	modFiles: [
	"misc.js",
	"Set One/NewGame.js",
	"Set One/Prestige.js",
	"Set One/Booster.js",
	"Set One/Generator.js",
	"Set One/Accelerant.js",
	"tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 8192,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "4.04",
	name: "continuum - NG+(9)?",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "StartBoostPoints", "UniversalNGReset", "PRODUCE_HEAT", "PRODUCE_TANKS", "PRODUCE_KILNS", "PRODUCE_FLUID", "PRODUCE_WORKERS_1", "PRODUCE_WORKERS_2", "SET_HEAT_AUTOMATION", "SET_TANK_AUTOMATION", "SET_KILN_AUTOMATION"] 

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(0)
	gain = gain.add(player.NG.points.gte(1) ? 1 : 0)
	gain = gain.mul(hasUpgrade("P", 11) ? upgradeEffect("P", 11) : 1)
	gain = gain.mul(hasUpgrade("P", 12) ? upgradeEffect("P", 12) : 1)
	gain = gain.mul(hasUpgrade("P", 13) ? upgradeEffect("P", 13) : 1)
	gain = gain.mul(hasUpgrade("P", 14) ? upgradeEffect("P", 14) : 1)
	gain = gain.mul(hasUpgrade("P", 15) ? upgradeEffect("P", 15) : 1)
	gain = gain.mul(hasUpgrade("P", 16) ? upgradeEffect("P", 16) : 1)
	gain = gain.mul(hasUpgrade("P", 17) ? upgradeEffect("P", 17) : 1)
	gain = gain.mul(hasUpgrade("P", 18) ? upgradeEffect("P", 18) : 1)
	
	gain = gain.mul(hasUpgrade("P", 21) ? upgradeEffect("P", 21) : 1)
	gain = gain.mul(hasUpgrade("P", 22) ? upgradeEffect("P", 22) : 1)
	gain = gain.mul(hasUpgrade("P", 23) ? upgradeEffect("P", 23) : 1)
	gain = gain.mul(hasUpgrade("P", 24) ? upgradeEffect("P", 24) : 1)
	gain = gain.mul(hasUpgrade("P", 25) ? upgradeEffect("P", 25) : 1)
	gain = gain.mul(hasUpgrade("P", 26) ? upgradeEffect("P", 26) : 1)
	gain = gain.mul(hasUpgrade("P", 27) ? upgradeEffect("P", 27) : 1)
	gain = gain.mul(hasUpgrade("P", 28) ? upgradeEffect("P", 28) : 1)
	
	gain = gain.mul(hasUpgrade("P", 31) ? upgradeEffect("P", 31) : 1)
	gain = gain.mul(hasUpgrade("P", 32) ? upgradeEffect("P", 32) : 1)
	gain = gain.mul(hasUpgrade("P", 33) ? upgradeEffect("P", 33) : 1)
	gain = gain.mul(hasUpgrade("P", 34) ? upgradeEffect("P", 34) : 1)
	gain = gain.mul(hasUpgrade("P", 35) ? upgradeEffect("P", 35) : 1)
	gain = gain.mul(hasUpgrade("P", 36) ? upgradeEffect("P", 36) : 1)
	gain = gain.mul(hasUpgrade("P", 37) ? upgradeEffect("P", 37) : 1)
	gain = gain.mul(hasUpgrade("P", 38) ? upgradeEffect("P", 38) : 1)
	
	gain = gain.mul(hasUpgrade("P", 41) ? upgradeEffect("P", 41) : 1)
	gain = gain.mul(hasUpgrade("P", 42) ? upgradeEffect("P", 42) : 1)
	gain = gain.mul(hasUpgrade("P", 43) ? upgradeEffect("P", 43) : 1)
	gain = gain.mul(hasUpgrade("P", 44) ? upgradeEffect("P", 44) : 1)
	gain = gain.mul(hasUpgrade("P", 45) ? upgradeEffect("P", 45) : 1)
	gain = gain.mul(hasUpgrade("P", 46) ? upgradeEffect("P", 46) : 1)
	gain = gain.mul(hasUpgrade("P", 47) ? upgradeEffect("P", 47) : 1)
	gain = gain.mul(hasUpgrade("P", 48) ? upgradeEffect("P", 48) : 1)
	
	gain = gain.mul(hasUpgrade("B", 11) ? 2 : 1)
	gain = gain.mul(hasUpgrade("B", 13) ? 3 : 1)
	gain = gain.mul(hasUpgrade("B", 15) ? 4 : 1)
	gain = gain.mul(hasUpgrade("B", 17) ? 5 : 1)
	gain = gain.mul(tmp.B.BoosterEffect)
	gain = gain.mul(tmp.G.calcPWRIBoost)
	
	gain = gain.mul(hasUpgrade("G", 14) ? tmp.G.upgrades[14].effect1 : 1)
	gain = gain.mul(hasUpgrade("G", 14) ? tmp.G.upgrades[14].effect2 : 1)
	
	gain = gain.mul(hasUpgrade("G", 16) ? upgradeEffect("G", 16) : 1)
	
	gain = gain.mul(buyableEffect("AC", "POINT_BUYABLE_I"))
	gain = gain.mul(buyableEffect("AC", "POINT_BUYABLE_II"))
	gain = gain.mul(buyableEffect("AC", "POINT_BUYABLE_III"))
	gain = gain.mul(buyableEffect("AC", "POINT_BUYABLE_IV"))
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
}