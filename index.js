const {Command} = require('commander');
const fs = require('fs');
const path = require('path');

const myProgr = new Command();

myProgr
  .option('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result in console')
  .parse(process.argv);

const options = myProgr.opts();

// Перевіряємо, чи задано обов'язковий параметр -i
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }
  
  // Перевіряємо, чи існує файл для читання
  if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
  }

  // Читаємо JSON з файлу
const inputFilePath = path.resolve(options.input);
let data;
try {
  data = fs.readFileSync(inputFilePath, 'utf-8');
} catch (err) {
  console.error('Error reading the file:', err);
  process.exit(1);
}

// Парсимо дані з JSON
let parsedData;
try {
  parsedData = JSON.parse(data);
} catch (err) {
  console.error('Error parsing JSON:', err);
  process.exit(1);
}

if (options.display){
    console.log('Data: ', parsedData);
}