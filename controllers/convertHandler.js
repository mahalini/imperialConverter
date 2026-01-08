function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    // Extract the numeric part from the input
    // Look for the first character that is a letter
    let firstLetterIdx = input.search(/[a-zA-Z]/);
    let numString = firstLetterIdx === -1 ? input : input.slice(0, firstLetterIdx);
    
    // If no number provided, default to 1
    if (!numString) {
      return 1;
    }
    
    // Check for double fraction (e.g., 3/2/3)
    const fractionCount = (numString.match(/\//g) || []).length;
    if (fractionCount > 1) {
      return 'invalid number';
    }
    
    // Handle fractions
    if (numString.includes('/')) {
      const parts = numString.split('/');
      // Ensure there are exactly two parts and both are valid numbers
      if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
          return 'invalid number';
      }
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      
      result = numerator / denominator;
    } else {
      result = parseFloat(numString);
      
      if (isNaN(result)) {
        return 'invalid number';
      }
    }
    
    return result;
  };

  this.getUnit = function(input) {
    let result;
    
    // Extract the unit part from the input (everything from the first letter to the end)
    let firstLetterIdx = input.search(/[a-zA-Z]/);
    if (firstLetterIdx === -1) {
      return 'invalid unit';
    }
    
    let unitString = input.slice(firstLetterIdx).toLowerCase();
    
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unitString)) {
      // Return 'L' in uppercase for liters, lowercase for others
      result = unitString === 'l' ? 'L' : unitString;
    } else {
      result = 'invalid unit';
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    result = unitMap[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    result = spellOutMap[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    
    // Round to 5 decimal places
    if (result !== undefined) {
      result = Math.round(result * 100000) / 100000;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
