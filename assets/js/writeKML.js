//classes to generate a basic .kml file importable into google maps/earth
//<insert dev google reference for .kml file here>
const fs = require("fs");

class KML {
  constructor() {
    this.start = `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
        `;
    this.end = `
        </Document>
        </kml>
        `;
    this.contentArray = [];
  }
  /**
   * adds a placemarker into the body of the .kml file
   * @param {array} placeMarkArray should contain an array of placemarks to add.
   * they should be in the following string format:
   * "<name>Point Name</name>
   * <Point>
   *  <coordinates>longitude,latitude,0</coordinates>
   * </Point>"
   */
  addPlaceMarks(placeMarkArray) {
    for (let i = 0; i < placeMarkArray.length; i++) {
      this.contentArray.push(
        `
                <Placemark>
                    ${placeMarkArray[i]}
                </Placemark>

                `
      );
    }
    return;
  }
  /**
   * Generates a complete .kml file for importing into google maps/earth
   * @param {string} fileName name of the .kml file to be generated
   */
  render(fileName) {
    const contentString = () => {
      let finalContentString = "";
      for (let i = 0; i < this.contentArray.length; i++) {
        finalContentString += this.contentArray[i];
      }
      return finalContentString;
    };
    const finalKML = `${this.start}
        ${contentString()}
        ${this.end}`;

    fs.writeFile(`../../generated-files/${fileName}.kml`, finalKML, (err) => {
      err
        ? () => {
            console.log("ERROR: File was not written");
            console.error(err);
          }
        : console.log(`File written successfully as ${fileName}.kml`);
    });
    return;
  }
}

class PointKML extends KML {
  constructor() {
    this.pointsArray = [];
  }
  /**
   * @param {array} points should contain an array of objects,
   * which contain the following keys as strings:
   * latitude,
   * longitude,
   * name,
   * a point tag will be added to the content of the .kml file for each object.
   * @returns {array} returns an array of point tags. pass this to addPlaceMarks
   * method to add these points to the .kml file content.
   */
  addPoints(points) {
    for (let i = 0; i < points.length; i++) {
      this.pointsArray.push(
        `<name>${points[i].name}</name>
                <Point>
                    <coordinates>${points[i].longitude},${points[i].latitude},0</coordinates>
                </Point>`
      );
    }
    return this.pointsArray;
  }
}

//TODO: add other classes to be able to add other .kml objects such as pointlines, etc

module.exports = { KML, PointKML };
