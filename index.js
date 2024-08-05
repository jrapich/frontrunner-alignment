const {PointKML} = require("./assets/js/writeKML");
const {RRsort} = require("./assets/js/sort");
//raw RR gps milepost json
const lyndyllSub = require("./assets/json/UTRRMILEPOSTS-LYNDYLLSUB.json");
const SLCsub = require("./assets/json/UTRRMILEPOSTS-SALTLAKESUB.json");
const provoSub = require("./assets/json/UTRRMILEPOSTS-PROVOSUB.json");
const ogdenSub = require("./assets/json/UTRRMILEPOSTS-OGDENSUB.json");

//TODO: change this instead into a functional inquirer prompt
console.log("welcome to map tools");

const lyndyllRRgps = new RRsort(lyndyllSub.features);
lyndyllRRgps.getGPS();
lyndyllRRgps.wholeNumberMPsOnly();
lyndyllRRgps.MPrange(780, 784, lyndyllRRgps.sortedMPs);

const provoRRgps = new RRsort(provoSub.features);
provoRRgps.getGPS();
provoRRgps.wholeNumberMPsOnly();
provoRRgps.MPrange(697, 745, provoRRgps.sortedMPs);

const SLCRRgps = new RRsort(SLCsub.features);
SLCRRgps.getGPS();
SLCRRgps.wholeNumberMPsOnly();
SLCRRgps.MPrange(782, 818, SLCRRgps.sortedMPs);

const ogdenRRgps = new RRsort(ogdenSub.features);
ogdenRRgps.getGPS();
ogdenRRgps.wholeNumberMPsOnly();
ogdenRRgps.MPrange(1, 12, ogdenRRgps.sortedMPs);

const KMLgen = new PointKML();
KMLgen.addPoints(lyndyllRRgps.rangeMPs);
KMLgen.addPoints(provoRRgps.rangeMPs);
KMLgen.addPoints(SLCRRgps.rangeMPs);
KMLgen.addPoints(ogdenRRgps.rangeMPs);
KMLgen.addPlaceMarks(KMLgen.pointsArray);
KMLgen.render("test", "./generated-files/tests/");