import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

// Define the structure of the data we're writing
interface Car {
  make: string;
  model: string;
  year: number;
}

// The main function that performs the writing operation
async function writeCsvFile(): Promise<void> {
  // 1. Define the CSV writer
  const csvWriter = createObjectCsvWriter({
    // Define the output path and filename
    path: path.resolve(__dirname, '..', 'data', 'output.csv'),
    // Define the CSV header columns
    header: [
      { id: 'make', title: 'MAKE' },
      { id: 'model', title: 'MODEL' },
      { id: 'year', title: 'YEAR' },
    ],
  });

  // 2. Define your input data
  const data: Car[] = [
    { make: 'Toyota', model: 'Camry', year: 2022 },
    { make: 'Honda', model: 'Civic', year: 2023 },
    { make: 'Ford', model: 'Mustang', year: 2024 },
  ];

  try {
    // 3. Write the records to the CSV file
    await csvWriter.writeRecords(data);
    console.log('✅ The CSV file was written successfully.');
  } catch (error) {
    console.error('Error writing the CSV file:', error);
  }
}

// Run the function
writeCsvFile();
