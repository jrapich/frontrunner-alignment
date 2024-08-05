//raw RR gps milepost json containing UPRR milepost data, near the Frontrunner alignment
//sourced via REST API from this arcgis based utah.gov website:
//https://opendata.gis.utah.gov/datasets/utah::utah-railroad-mileposts/explore
//accurate as of 10.14.22. retrieved 08.04.24
const lyndyllSub = require("./assets/json/UTRRMILEPOSTS-LYNDYLLSUB.json");
const SLCsub = require("./assets/json/UTRRMILEPOSTS-SALTLAKESUB.json");
const provoSub = require("./assets/json/UTRRMILEPOSTS-PROVOSUB.json");
const ogdenSub = require("./assets/json/UTRRMILEPOSTS-OGDENSUB.json");

//array sorting and .kml building tools
const {PointKML} = require("./assets/js/writeKML");
const {RRsort} = require("./assets/js/sort");

//TODO: change this instead into a functional inquirer prompt
//TODO: import prebuilt log tools from other projects
console.log("welcome to map tools");

//sort the lyndyll sub mileposts relevant to frontrunner rail
const lyndyllRRgps = new RRsort(lyndyllSub.features);
lyndyllRRgps.getGPS();
lyndyllRRgps.wholeNumberMPsOnly();
lyndyllRRgps.MPrange(780, 784, lyndyllRRgps.sortedMPs);

//sort the provo sub mileposts relevant to frontrunner rail
const provoRRgps = new RRsort(provoSub.features);
provoRRgps.getGPS();
provoRRgps.wholeNumberMPsOnly();
provoRRgps.MPrange(697, 745, provoRRgps.sortedMPs);

//sort the SLC sub mileposts relevant to frontrunner rail
const SLCRRgps = new RRsort(SLCsub.features);
SLCRRgps.getGPS();
SLCRRgps.wholeNumberMPsOnly();
SLCRRgps.MPrange(782, 818, SLCRRgps.sortedMPs);

//sort the ogden sub mileposts relevant to frontrunner rail
const ogdenRRgps = new RRsort(ogdenSub.features);
ogdenRRgps.getGPS();
ogdenRRgps.wholeNumberMPsOnly();
ogdenRRgps.MPrange(1, 12, ogdenRRgps.sortedMPs);

//generate the sorted mileposts to a .kml file importable into google maps/earth
const KMLgen = new PointKML();
KMLgen.addPoints(lyndyllRRgps.rangeMPs);
KMLgen.addPoints(provoRRgps.rangeMPs);
KMLgen.addPoints(SLCRRgps.rangeMPs);
KMLgen.addPoints(ogdenRRgps.rangeMPs);
KMLgen.addPlaceMarks(KMLgen.pointsArray);
KMLgen.render("test", "./generated-files/tests/");