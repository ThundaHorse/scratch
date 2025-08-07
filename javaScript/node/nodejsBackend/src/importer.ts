import { createReadStream } from 'fs';
import { connect, Client } from 'pg';
import { parse } from 'csv-parse';
import { Transform } from 'stream';

// 1. Define the structure of our product data
interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
}

// 2. Create a custom Transform stream to process each row
const createProductTransformer = (): Transform => {
  return new Transform({
    objectMode: true, // This allows us to work with JavaScript objects instead of just buffers
    transform(chunk, encoding, callback) {
      try {
        const product: Product = {
          id: chunk.id,
          name: chunk.name.trim(),
          price: parseFloat(chunk.price),
          inventory: parseInt(chunk.inventory, 10),
        };

        // Filter out products with no inventory
        if (product.inventory > 0) {
          this.push(product);
        }
        callback();
      } catch (error) {
        callback(error as Error);
      }
    },
  });
};

// 3. Main function to run the ETL process
async function processCSVAndInsert() {
  const client: Client = new Client({
    // Your database connection details
    host: 'localhost',
    port: 5432,
    user: 'your_user',
    password: 'your_password',
    database: 'your_database',
  });

  await client.connect();

  const source = createReadStream('products.csv');
  const csvParser = parse({ columns: true, trim: true });
  const productTransformer = createProductTransformer();

  console.log('Starting the import process... 🚀');

  source
    .pipe(csvParser)
    .pipe(productTransformer)
    .on('data', async (product: Product) => {
      try {
        const query =
          'INSERT INTO products (id, name, price, inventory) VALUES ($1, $2, $3, $4)';
        const values = [
          product.id,
          product.name,
          product.price,
          product.inventory,
        ];
        await client.query(query, values);
      } catch (err) {
        console.error('Error inserting product:', err);
      }
    })
    .on('end', async () => {
      console.log('✅ CSV file successfully processed and data inserted.');
      await client.end();
    })
    .on('error', (err) => {
      console.error('An error occurred in the stream:', err);
    });
}

processCSVAndInsert();
