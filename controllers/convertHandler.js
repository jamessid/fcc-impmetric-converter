function ConvertHandler() {

  /* UNIT DATA */

  // define unit pairs, to find "partners"
  const unitPairs = [
    {
      imperial: {
        unit: 'gal',
        word: 'gallons',
      },
      metric: {
        unit: 'L',
        word: 'liters',
      }
    },
    {
      imperial: {
        unit: 'mi',
        word: 'miles',
      },
      metric: {
        unit: 'km',
        word: 'kilometers',
      }
    },
    {
      imperial: {
        unit: 'lbs',
        word: 'pounds',
      },
      metric: {
        unit: 'kg',
        word: 'kilograms',
      }
    }
  ];

  // create array of valid units.
  const validUnits = [];

  for (const pair of unitPairs){
    validUnits.push(pair.imperial.unit);
    validUnits.push(pair.metric.unit);
  }

  /* FUNCTIONS */

  this.getNum = function (input) {

    let numberString; // "Numberical" element of input string
    const regex = /[a-zA-Z]/; // Any letters that may form part of unit.

    // Test to see if letters are present, and set numberString appropriately.
    
    if (input.search(regex) < 0) {
      numberString = ''; // if we just slice based on regex search and no letters are present, index end will be -1.
    } else {
      numberString = input.slice(0, input.search(regex));
    }

    // Set numberString to 1 if no value present
    if (numberString == '') {
      numberString = '1';
    }

    // FRACTION INPUT:

    // Check to see if string could be fraction (i.e contains '/')
    if (numberString.includes('/')) {
      fractionArray = numberString.split('/');

      // fraction is invalid if more than one '/' present
      if (fractionArray.length > 2) {
        return false;
      }

      fractionResult = fractionArray[0] / fractionArray[1];

      // ensure that fraction is valid.
      if (isFinite(fractionResult)) {
        return fractionResult;
      } else {
        return false;
      }
    }

    // NON FRACTIONS

    if (!isNaN(numberString)){
      return Number(numberString);
    } else {
      return false;
    }

  };

  this.getUnit = function (input) {
    
    let unitString; // "unit" element of input string
    const regex = /[a-zA-Z]/; // Any letters that may form part of unit.

    // test to see if any letters are present, and set unitString appropriately.
    if (input.search(regex) < 0){
      unitString = '';
    } else {
      unitString = input.slice(input.search(regex)).toLowerCase();
    }
    
    // litres is represented with capital L, so change if required.
    if (unitString == 'l') {
      unitString = 'L';
    }

    if (validUnits.includes(unitString)){
      return unitString; // return uppercase L if litres chosen;
    } else {
      return false
    }
  };

  this.getReturnUnit = function (initUnit) {

    for (const pair of unitPairs){
      if (pair.imperial.unit == initUnit){
        return pair.metric.unit;
      } else if (pair.metric.unit == initUnit){
        return pair.imperial.unit;
      }
    }

    return 'invalid input unit';

  };

  this.spellOutUnit = function (unit) {

    for (const pair of unitPairs){
      if (unit === pair.imperial.unit){
        return pair.imperial.word;
      }
      if (unit === pair.metric.unit){
        return pair.metric.word;
      }
    }

    return 'invalid input unit';

  };

  this.convert = function (initNum, initUnit) {

    let result;

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }

    return Math.round(result * 100000) / 100000; // round to 5dp

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;

  };

}

module.exports = ConvertHandler;
