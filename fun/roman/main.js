const input = document.getElementById('input');
const result = document.getElementById('result');
const convert = document.getElementById('convert');

convert.addEventListener('click', evt => {
  const inputNumber = Number(input.value);
  try {
    result.textContent = convertToRoman(inputNumber);
  } catch (error) {
    console.log('Conversion error.', error)
    result.textContent = 'Invalid input';
  }
})
