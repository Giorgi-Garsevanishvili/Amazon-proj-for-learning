import { formatCurency } from "../scripts/utils/money.js";

console.log('test suite: formatCurrency')
console.log('converts cents into dollars')

if (formatCurency(2095) === '20.95'){
  console.log('Passed')
} else {
  console.log('failed')
};

