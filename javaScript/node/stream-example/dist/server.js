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
const express_1 = __importDefault(require("express"));
const stream_1 = require("stream");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/download-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageUrl = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713';
        const response = yield fetch(imageUrl);
        // Handle cases where the file isn't found or there's an error.
        if (!response.ok || !response.body) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }
        // 2. Set the proper headers to tell the browser how to handle the file.
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', 'attachment; filename="source-code.jpeg"');
        // 3. Convert the web stream (ReadableStream) from fetch to a Node.js stream (Readable)
        //    and pipe it to the client's response.
        const nodeStream = stream_1.Readable.fromWeb(response.body);
        nodeStream.pipe(res);
    }
    catch (error) {
        console.error('Error streaming the file:', error);
        if (!res.headersSent) {
            res.status(500).send('Failed to download and stream the file.');
        }
    }
}));
app.get('/csv-writer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = [];
        const filePath = path_1.default.resolve(__dirname, '..', 'data', 'output.csv');
        (0, fs_1.createReadStream)(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            // Send the collected JSON array as the response
            res.json(results);
        })
            .on('error', (error) => {
            console.error('Error processing CSV file:', error);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Failed to process CSV file.' });
            }
        });
    }
    catch (error) {
        console.error('Error streaming the file:', error);
    }
}));
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
