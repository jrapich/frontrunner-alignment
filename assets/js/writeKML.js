//classes to generate a basic .kml file importable into google maps/earth
//<insert dev google reference for .kml file here>

class KML {
    constructor(contentArray) {
        this.start = 
        `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
        `;
        this.contentArray = contentArray;
        this.end = 
        `
        </Document>
        </kml>
        `;
    }
    addPlaceMarks() {
        
    }
    render() {

    }
};