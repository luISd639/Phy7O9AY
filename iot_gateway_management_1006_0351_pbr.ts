// 代码生成时间: 2025-10-06 03:51:24
import express, { Request, Response } from 'express';
import { IoTGateway } from './models/IoTGateway'; // Assuming IoTGateway is a TypeScript class representing the gateway model.

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Define the API endpoints
// GET /gateways - Retrieves a list of all IoT gateways
app.get('/gateways', async (req: Request, res: Response) => {
    try {
        // Retrieve all gateways from the database
        const gateways = await IoTGateway.find();
        res.json(gateways);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to retrieve gateways' });
    }
});

// POST /gateways - Creates a new IoT gateway
app.post('/gateways', async (req: Request, res: Response) => {
    const gatewayData: any = req.body;
    try {
        const newGateway = new IoTGateway(gatewayData);
        await newGateway.save();
        res.status(201).json(newGateway);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create gateway' });
    }
});

// PUT /gateways/:id - Updates an existing IoT gateway
app.put('/gateways/:id', async (req: Request, res: Response) => {
    const gatewayId = req.params.id;
    const updateData: any = req.body;
    try {
        const updatedGateway = await IoTGateway.findByIdAndUpdate(gatewayId, updateData, { new: true });
        if (!updatedGateway) {
            res.status(404).json({ error: 'Gateway not found' });
            return;
        }
        res.json(updatedGateway);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update gateway' });
    }
});

// DELETE /gateways/:id - Deletes an IoT gateway
app.delete('/gateways/:id', async (req: Request, res: Response) => {
    const gatewayId = req.params.id;
    try {
        const result = await IoTGateway.findByIdAndDelete(gatewayId);
        if (!result) {
            res.status(404).json({ error: 'Gateway not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete gateway' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`IoT Gateway Management API running on port ${PORT}`);
});