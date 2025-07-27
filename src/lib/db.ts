// A simple in-memory database for prototyping purposes.

export type Review = {
    rating: number;
    comment: string;
    vendorName: string;
    date: string;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description: string;
  supplier: string; // Supplier Name
  rating: number;
  reviews: Review[];
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type OrderStatus = "pending" | "preparing" | "out_for_delivery" | "delivered" | "completed";

export type Order = {
  id: string;
  vendorName: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  supplier: string;
  reviewSubmitted?: boolean;
};

export type DeliveryStatus = "pending" | "in_progress" | "completed";

export type DeliveryTask = {
  id: string;
  orderId: string;
  pickup: string;
  dropoff: string;
  status: DeliveryStatus;
  fee: number;
  date: string; 
};


let products: Product[] = [
  { id: "1", name: "Fresh Tomatoes", price: 200, quantity: 100, imageUrl: "https://placehold.co/600x400/FF6347/FFFFFF.png", supplier: "Green Farms", description: "Locally sourced, ripe red tomatoes.", rating: 4.5, reviews: [{rating: 5, comment: "Very fresh!", vendorName: "Tasty Tacos Stand", date: "2024-07-29"}] },
  { id: "2", name: "Red Onions", price: 140, quantity: 250, imageUrl: "https://placehold.co/600x400/8A2BE2/FFFFFF.png", supplier: "Veggie Co.", description: "Fresh red and white onions.", rating: 4.8, reviews: [] },
  { id: "3", name: "Basmati Rice (20kg)", price: 1200, quantity: 50, imageUrl: "https://placehold.co/600x400/F5DEB3/000000.png", supplier: "Spice & Grain", description: "Premium long-grain basmati rice (20kg bags).", rating: 4.2, reviews: [] },
  { id: "4", name: "Chicken Breast (kg)", price: 680, quantity: 10, imageUrl: "https://placehold.co/600x400/FFF8DC/000000.png", supplier: "The Meat Locker", description: "Fresh, free-range chicken breast.", rating: 4.9, reviews: [] },
  { id: "5", name: "Garam Masala", price: 420, quantity: 80, imageUrl: "https://placehold.co/600x400/D2B48C/000000.png", supplier: "Spice & Grain", description: "Aromatic blend of ground spices.", rating: 4.6, reviews: [] },
  { id: "6", name: "Canola Oil (5L)", price: 1760, quantity: 40, imageUrl: "https://placehold.co/600x400/FFFFE0/000000.png", supplier: "Veggie Co.", description: "Pure canola oil for all your cooking needs.", rating: 4.0, reviews: [] },
  { id: "7", name: "Potatoes (bag)", price: 400, quantity: 150, imageUrl: "https://placehold.co/600x400/966919/FFFFFF.png", supplier: "Green Farms", description: "Versatile potatoes, perfect for fries or curries.", rating: 4.3, reviews: [] },
  { id: "8", name: "Paneer (kg)", price: 720, quantity: 30, imageUrl: "https://placehold.co/600x400/F5F5F5/000000.png", supplier: "Dairy King", description: "Fresh, soft paneer for your vegetarian dishes.", rating: 4.7, reviews: [] },
  { id: "9", name: "All-Purpose Flour (5kg)", price: 520, quantity: 100, imageUrl: "https://placehold.co/600x400/FAFAFA/000000.png", supplier: "Spice & Grain", description: "High-quality all-purpose flour.", rating: 4.5, reviews: [] },
  { id: "10", name: "Lamb Mince (kg)", price: 960, quantity: 25, imageUrl: "https://placehold.co/600x400/DC143C/FFFFFF.png", supplier: "The Meat Locker", description: "Freshly ground lamb mince.", rating: 4.8, reviews: [] },
];

let orders: Order[] = [
    {
    id: "ORD-001",
    vendorName: "Tasty Tacos Stand",
    date: "2024-07-28",
    total: 3660,
    status: "delivered",
    items: [
      { id: "1", name: "Fresh Tomatoes", quantity: 5, price: 200 },
      { id: "2", name: "Onions", quantity: 10, price: 140 },
    ],
    supplier: "Green Farms",
  },
  {
    id: "ORD-002",
    vendorName: "Noodle Nirvana",
    date: "2024-07-28",
    total: 7040,
    status: "preparing",
    items: [
      { id: "3", name: "Basmati Rice", quantity: 2, price: 1200 },
      { id: "6", name: "Canola Oil (5L)", quantity: 1, price: 1760 },
    ],
    supplier: "Spice & Grain",
  },
  {
    id: "ORD-003",
    vendorName: "Tasty Tacos Stand",
    date: "2024-07-29",
    total: 2000,
    status: "pending",
    items: [
      { id: "7", name: "Potatoes (bag)", quantity: 5, price: 400 },
    ],
    supplier: "Veggie Co.",
  },
];

let deliveryTasks: DeliveryTask[] = [
   {
    id: "DEL-001",
    orderId: "ORD-004", // This needs to exist in orders for full sync
    pickup: "The Meat Locker",
    dropoff: "Sizzling Skewers",
    status: "in_progress",
    fee: 1200,
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: "DEL-002",
    orderId: "ORD-001",
    pickup: "Green Farms",
    dropoff: "Tasty Tacos Stand",
    status: "completed",
    fee: 600,
    date: "2024-07-28",
  },
];


const db = {
  products: {
    findMany: () => products,
    create: (data: Omit<Product, 'id'>) => {
      const newProduct = { ...data, id: String(products.length + 1) };
      products.push(newProduct);
      return newProduct;
    },
    delete: (id: string) => {
        products = products.filter(p => p.id !== id);
        return { success: true };
    }
  },
  orders: {
    findMany: () => orders,
    create: (data: Omit<Order, 'id'>) => {
       const newOrder = { ...data, id: `ORD-${String(orders.length + 1).padStart(3, '0')}` };
       orders.push(newOrder);
       return newOrder;
    },
    update: (id: string, data: Partial<Order>) => {
        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex > -1) {
            orders[orderIndex] = { ...orders[orderIndex], ...data };
            return orders[orderIndex];
        }
        return null;
    },
    addReview: (id: string, reviewData: { rating: number, comment: string }) => {
        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex > -1) {
            const order = orders[orderIndex];
            order.reviewSubmitted = true;
            
            // Add review to each product in the order
            order.items.forEach(item => {
                const productIndex = products.findIndex(p => p.id === item.id);
                if (productIndex > -1) {
                    const product = products[productIndex];
                    const newReview: Review = {
                        ...reviewData,
                        vendorName: order.vendorName,
                        date: new Date().toISOString().split('T')[0],
                    };
                    product.reviews.push(newReview);
                    // Recalculate average rating
                    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
                    product.rating = totalRating / product.reviews.length;
                }
            });
            return orders[orderIndex];
        }
        return null;
    }
  },
  deliveryTasks: {
      findMany: () => deliveryTasks,
      create: (data: Omit<DeliveryTask, 'id' | 'date'>) => {
          const newDelivery = { ...data, id: `DEL-${String(deliveryTasks.length + 1).padStart(3, '0')}`, date: new Date().toISOString().split('T')[0] };
          deliveryTasks.push(newDelivery);
          return newDelivery;
      },
      update: (id: string, data: Partial<Pick<DeliveryTask, 'status'>>) => {
          const taskIndex = deliveryTasks.findIndex(t => t.id === id);
          if (taskIndex > -1) {
              deliveryTasks[taskIndex] = { ...deliveryTasks[taskIndex], ...data };
              
              // Also update the main order status
              const orderId = deliveryTasks[taskIndex].orderId;
              if (data.status === 'completed') {
                  db.orders.update(orderId, { status: 'delivered' });
              }

              return deliveryTasks[taskIndex];
          }
          return null;
      }
  }
};

export default db;
