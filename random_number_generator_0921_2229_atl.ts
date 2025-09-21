// 代码生成时间: 2025-09-21 22:29:19
// random_number_generator.ts
// This is an Express server that provides a simple API to generate random numbers.

import express, { Request, Response } from 'express';

// Define a type for the request body
interface RandomNumberRequestBody {
  max: number;
  min?: number;
}

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to generate a random number
app.post('/random-number', (req: Request, res: Response) => {
  const { max, min = 0 } = req.body as RandomNumberRequestBody;
  
  // Input validation
  if (typeof max !== 'number' || (min !== undefined && typeof min !== 'number')) {
    return res.status(400).json({
      error: 'Invalid input: max and min must be numbers.'
    });
  }
  if (min > max) {
    return res.status(400).json({
      error: 'Invalid input: min cannot be greater than max.'
    });
  }
  
  // Generate a random number between min and max
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  
  // Return the generated random number
  return res.status(200).json({
    randomNumber: randomNumber
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  return res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Random Number Generator Server is running on port ${port}`);
});