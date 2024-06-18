const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('#integer input', function() {
        assert.equal(convertHandler.getNum('5l'), 5);  
    });
    test('#decimal input', function(){
        assert.equal(convertHandler.getNum('5.78L'), 5.78);
    });
    test('#fraction input', function(){
        assert.equal(convertHandler.getNum('1/4kg'), 0.25);
    });
    test('#fraction input with decimal', function(){
        assert.equal(convertHandler.getNum('1.5/0.1lbs'), 15);
    });
    test('#invalid fraction', function(){
        assert.isNotOk(convertHandler.getNum('5/6/7km'));
    });
    test('#no number input', function(){
        assert.equal(convertHandler.getNum('gal'), 1);
    });
    test('#valid unit input', function(){
        assert.equal(convertHandler.getUnit('56.6gal'), 'gal');
        assert.equal(convertHandler.getUnit('4/7.66l'), 'L');
        assert.equal(convertHandler.getUnit('54mi'), 'mi');
        assert.equal(convertHandler.getUnit('55.666km'), 'km');
        assert.equal(convertHandler.getUnit('1.4lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('5/6kg'), 'kg');
    });
    test('#invalid unit input', function(){
        assert.isNotOk(convertHandler.getUnit('3/5kgs'));
    });
    test('#valid unit input returns', function(){
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
    test('#string return', function(){
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
    test('#gallons to liters', function(){
        assert.equal(convertHandler.convert(1.2, 'gal'), 4.54249);
    });
    test('#liters to gallons', function(){
        assert.equal(convertHandler.convert(6, 'L'), 1.58503);
    });
    test('#miles to km', function(){
        assert.equal(convertHandler.convert(17, 'mi'), 27.35878);
    });
    test('#km to mi', function(){
        assert.equal(convertHandler.convert(3, 'km'), 1.86412);
    });
    test('#lbs to kg', function(){
        assert.equal(convertHandler.convert(14.7, 'lbs'), 6.66780);
    });
    test('#kg to lbs', function(){
        assert.equal(convertHandler.convert(0.234, 'kg'), 0.51588);
    });
});