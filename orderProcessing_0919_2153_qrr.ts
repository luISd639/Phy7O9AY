// 代码生成时间: 2025-09-19 21:53:18
import express, { Request, Response, Router } from 'express';

// Define the Order interface
interface Order {
  id: string;
  customer: string;
  items: { itemName: string; quantity: number }[];
  status: string;
}

// Define the OrderService class with necessary methods
class OrderService {
  private static instance: OrderService;

  private orders: Order[] = [];

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  createOrder(order: Order): Order {
    this.orders.push(order);
    return order;
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders.find(order => order.id === orderId);
  }

  updateOrderStatus(orderId: string, newStatus: string): boolean {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = newStatus;
      return true;
    }
    return false;
  }
}

// Define the router
const router: Router = express.Router();

// Create a middleware to handle JSON body parsing
router.use(express.json());

// POST endpoint to create a new order
router.post('/orders', (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const newOrder = OrderService.getInstance().createOrder(order);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint to get an order by id
router.get('/orders/:id', (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = OrderService.getInstance().getOrderById(orderId);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// PUT endpoint to update an order's status
router.put('/orders/:id/status', (req: Request, res: Response) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;
  const statusUpdated = OrderService.getInstance().updateOrderStatus(orderId, newStatus);
  if (statusUpdated) {
    res.json({ message: 'Order status updated successfully' });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Export the router
export default router;
