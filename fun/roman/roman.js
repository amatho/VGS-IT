
function convertToRoman(num) {
  var thousands = Math.floor(num / 1000);
  var hundreds = Math.floor((num - thousands * 1000) / 100);
  var tens = Math.floor((num - thousands * 1000 - hundreds * 100) / 10);
  var ones = num - thousands * 1000 - hundreds * 100 - tens * 10;

  var roman = convertThousand(thousands) + convertHundred(hundreds) +
    convertTen(tens) + convertOne(ones);
  return roman;
}

const convertThousand = thousands => charMultiply("M", thousands);

function convertHundred(hundreds) {
  return romanTopMiddleConversion(hundreds, "C", "D", "M");
}

function convertTen(tens) {
  return romanTopMiddleConversion(tens, "X", "L", "C");
}

function convertOne(num) {
  return romanTopMiddleConversion(num, "I", "V", "X");
}

function romanTopMiddleConversion(num, normalChar, middleChar, topChar) {
  if (num === 9) {
    return normalChar + topChar;
  } else if (num > 5 && num < 9) {
    return middleChar + charMultiply(normalChar, num - 5);
  } else if (num === 5) {
    return middleChar;
  } else if (num === 4) {
    return normalChar + middleChar;
  } else if (num >= 1 && num < 4) {
    return charMultiply(normalChar, num);
  } else {
    return "";
  }
}

function charMultiply(char, num) {
  if (num === 0) return "";

  return iterate(char, num, function (a, b) {
    return a + b;
  });
}

function iterate(item, times, action, acc) {
  if (times <= 0) return acc;
  if (acc === undefined) {
    return iterate(item, times - 1, action, item);
  }
  return iterate(item, times - 1, action, action(acc, item));
}

convertToRoman(4532);
convertToRoman(36);
