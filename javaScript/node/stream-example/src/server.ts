import express, { Request, Response } from 'express';
import { Readable } from 'stream';
import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';

const app = express();
const PORT = 3000;

app.get('/download-image', async (req: Request, res: Response) => {
  try {
    const imageUrl =
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713';

    const response = await fetch(imageUrl);

    // Handle cases where the file isn't found or there's an error.
    if (!response.ok || !response.body) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    // 2. Set the proper headers to tell the browser how to handle the file.
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="source-code.jpeg"'
    );

    // 3. Convert the web stream (ReadableStream) from fetch to a Node.js stream (Readable)
    //    and pipe it to the client's response.
    const nodeStream = Readable.fromWeb(response.body as any);
    nodeStream.pipe(res);
  } catch (error) {
    console.error('Error streaming the file:', error);
    if (!res.headersSent) {
      res.status(500).send('Failed to download and stream the file.');
    }
  }
});

app.get('/csv-writer', async (req: Request, res: Response) => {
  try {
    const results: any[] = [];
    const filePath = path.resolve(__dirname, '..', 'data', 'output.csv');

    createReadStream(filePath)
      .pipe(csv())
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
  } catch (error) {
    console.error('Error streaming the file:', error);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
