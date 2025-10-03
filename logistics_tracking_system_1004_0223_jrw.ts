// 代码生成时间: 2025-10-04 02:23:19
import express, { Request, Response } from 'express';
import { TrackingData, TrackingService } from './tracking_service'; // Assuming tracking_service.ts exists with TrackingService class

// Define the type for a tracking request
interface TrackingRequest extends Request {
  query: {
    trackingId: string;
  };
}

// Create a new express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to track a package
app.get('/track', async (req: TrackingRequest, res: Response) => {
  try {
    // Extract the tracking ID from the query
    const trackingId = req.query.trackingId;
    if (!trackingId) {
      return res.status(400).json({
        error: 'Missing tracking ID'
      });
    }

    // Get tracking data using the TrackingService
    const trackingService = new TrackingService();
    const trackingData: TrackingData = await trackingService.getTrackingData(trackingId);

    // Send the tracking data back to the client
    res.json(trackingData);
  } catch (error) {
    // Handle any errors that occur during tracking
    res.status(500).json({
      error: 'Error fetching tracking data'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Logistics tracking system running on port ${port}`);
});
