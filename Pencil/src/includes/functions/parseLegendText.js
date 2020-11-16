function parseLegendText(sText) {
   return sText.split(/[\r\n]+/)
       .filter((sItem) => sItem.split("|").length === 2)
       .map((sItem, i) => {
           let [sColor, sItemName] = sItem.split("|");
           return {
               name: sItemName,
               color: sColor
           };
       });
}

module.exports = parseLegendText;
