//in this class we are going to pull the following coordinates data frm the RR json:
//"name" property from the "LABEL" key
//"longitude" property from the "geometry:x" key
//"latitude" property from the "geometry:y" key
/**
 * constructor to sort and store RR milepost gps data from ARCGIS.
 * @param {array} features pass the features array from the ARCGIS json object: json.features
 */
class RRsort {
    constructor(features) {
        this.rawData = features;
        this.mileposts = [];
    }
    /**
     * sorts the GPS data from the passed features object. returns an array of objects with name/latitude/longitude
     * @returns {array}
     */
    getGPS() {
        const finalArray = [];
        for (let i = 0; i < this.rawData.length; i++) {
            finalArray.push(
                {
                    name:this.rawData[i].attributes.LABEL,
                    latitude:this.rawData[i].geometry.y,
                    longitude:this.rawData[i].geometry.x,
                }
            );
        }
        return finalArray;
    }
}

module.exports = RRsort;