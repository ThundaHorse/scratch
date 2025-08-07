"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_writer_1 = require("csv-writer");
const path_1 = __importDefault(require("path"));
// The main function that performs the writing operation
function writeCsvFile() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Define the CSV writer
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            // Define the output path and filename
            path: path_1.default.resolve(__dirname, '..', 'data', 'output.csv'),
            // Define the CSV header columns
            header: [
                { id: 'make', title: 'MAKE' },
                { id: 'model', title: 'MODEL' },
                { id: 'year', title: 'YEAR' },
            ],
        });
        // 2. Define your input data
        const data = [
            { make: 'Toyota', model: 'Camry', year: 2022 },
            { make: 'Honda', model: 'Civic', year: 2023 },
            { make: 'Ford', model: 'Mustang', year: 2024 },
        ];
        try {
            // 3. Write the records to the CSV file
            yield csvWriter.writeRecords(data);
            console.log('✅ The CSV file was written successfully.');
        }
        catch (error) {
            console.error('Error writing the CSV file:', error);
        }
    });
}
// Run the function
writeCsvFile();
