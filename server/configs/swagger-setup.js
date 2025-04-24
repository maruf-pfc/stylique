const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stylique API Documentation",
      version: "1.0.0",
      description: "API documentation for Stylique E-Commerce platform",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email",
              format: "email",
            },
            password: {
              type: "string",
              description: "User's password (hashed)",
              minLength: 6,
            },
            role: {
              type: "string",
              description: "User's role",
              enum: ["admin", "customer"],
              default: "customer",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c85",
            name: "John Doe",
            email: "john@example.com",
            role: "customer",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
          },
        },
        Product: {
          type: "object",
          required: [
            "name",
            "description",
            "price",
            "countInStock",
            "sku",
            "category",
            "brand",
            "sizes",
            "colors",
            "collections",
            "material",
            "images",
            "user",
          ],
          properties: {
            _id: {
              type: "string",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            description: {
              type: "string",
              description: "Product description",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            discountPrice: {
              type: "number",
              description: "Discounted price (if applicable)",
            },
            countInStock: {
              type: "number",
              description: "Available quantity in stock",
              default: 0,
            },
            sku: {
              type: "string",
              description: "Stock keeping unit (unique identifier)",
            },
            category: {
              type: "string",
              description: "Product category",
            },
            brand: {
              type: "string",
              description: "Product brand",
            },
            sizes: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Available sizes",
            },
            colors: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Available colors",
            },
            collections: {
              type: "string",
              description: "Product collection",
            },
            material: {
              type: "string",
              description: "Product material",
            },
            gender: {
              type: "string",
              enum: ["Men", "Women", "Unisex"],
              description: "Target gender",
            },
            images: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    description: "Image URL",
                  },
                  altText: {
                    type: "string",
                    description: "Alternative text for image",
                  },
                },
              },
              description: "Product images",
            },
            isFeatured: {
              type: "boolean",
              description: "Whether product is featured",
              default: false,
            },
            isPublished: {
              type: "boolean",
              description: "Whether product is published",
              default: false,
            },
            rating: {
              type: "number",
              description: "Product rating",
              default: 0,
            },
            numReviews: {
              type: "number",
              description: "Number of reviews",
              default: 0,
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Product tags",
            },
            user: {
              type: "string",
              description: "ID of user who created the product",
            },
            metaTitle: {
              type: "string",
              description: "SEO meta title",
            },
            metaDescription: {
              type: "string",
              description: "SEO meta description",
            },
            metaKeywords: {
              type: "array",
              items: {
                type: "string",
              },
              description: "SEO meta keywords",
            },
            dimensions: {
              type: "object",
              properties: {
                length: {
                  type: "number",
                  description: "Length dimension",
                },
                width: {
                  type: "number",
                  description: "Width dimension",
                },
                height: {
                  type: "number",
                  description: "Height dimension",
                },
              },
              description: "Product dimensions",
            },
            weight: {
              type: "number",
              description: "Product weight",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c85",
            name: "Designer T-Shirt",
            description: "Premium cotton t-shirt with unique design",
            price: 49.99,
            countInStock: 100,
            sku: "TS-001",
            category: "Clothing",
            brand: "Stylique",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Blue"],
            collections: "Summer 2023",
            material: "100% Cotton",
            gender: "Unisex",
            images: [
              {
                url: "https://example.com/image1.jpg",
                altText: "T-shirt front view",
              },
            ],
            isFeatured: true,
            isPublished: true,
            rating: 4.5,
            numReviews: 12,
            tags: ["t-shirt", "summer", "cotton"],
            user: "60d21b4667d0d8992e610c86",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
          },
        },
        CartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: {
              type: "string",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            image: {
              type: "string",
              description: "Product image URL",
            },
            price: {
              type: "string",
              description: "Product price",
            },
            size: {
              type: "string",
              description: "Selected size",
            },
            color: {
              type: "string",
              description: "Selected color",
            },
            quantity: {
              type: "number",
              description: "Quantity of product",
              default: 1,
            },
          },
        },
        Cart: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Cart ID",
            },
            user: {
              type: "string",
              description: "User ID (if authenticated)",
            },
            guestId: {
              type: "string",
              description: "Guest ID (if not authenticated)",
            },
            products: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem",
              },
              description: "Cart items",
            },
            totalPrice: {
              type: "number",
              description: "Total price of items in cart",
              default: 0,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c87",
            user: "60d21b4667d0d8992e610c85",
            products: [
              {
                productId: "60d21b4667d0d8992e610c86",
                name: "Designer T-Shirt",
                image: "https://example.com/image1.jpg",
                price: "49.99",
                size: "M",
                color: "Black",
                quantity: 2,
              },
            ],
            totalPrice: 99.98,
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
          },
        },
        OrderItem: {
          type: "object",
          required: ["productId", "name", "image", "price", "quantity"],
          properties: {
            productId: {
              type: "string",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            image: {
              type: "string",
              description: "Product image URL",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            size: {
              type: "string",
              description: "Selected size",
            },
            color: {
              type: "string",
              description: "Selected color",
            },
            quantity: {
              type: "number",
              description: "Quantity of product",
            },
          },
        },
        Order: {
          type: "object",
          required: [
            "user",
            "orderItems",
            "shippingAddress",
            "paymentMethod",
            "totalPrice",
          ],
          properties: {
            _id: {
              type: "string",
              description: "Order ID",
            },
            user: {
              type: "string",
              description: "User ID",
            },
            orderItems: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderItem",
              },
              description: "Order items",
            },
            shippingAddress: {
              type: "object",
              properties: {
                address: {
                  type: "string",
                  description: "Street address",
                },
                city: {
                  type: "string",
                  description: "City",
                },
                postalCode: {
                  type: "string",
                  description: "Postal code",
                },
                country: {
                  type: "string",
                  description: "Country",
                },
              },
              description: "Shipping address",
            },
            paymentMethod: {
              type: "string",
              description: "Payment method",
            },
            totalPrice: {
              type: "number",
              description: "Total order price",
            },
            isPaid: {
              type: "boolean",
              description: "Payment status",
              default: false,
            },
            paidAt: {
              type: "string",
              format: "date-time",
              description: "Payment timestamp",
            },
            isDelivered: {
              type: "boolean",
              description: "Delivery status",
              default: false,
            },
            deliveredAt: {
              type: "string",
              format: "date-time",
              description: "Delivery timestamp",
            },
            paymentStatus: {
              type: "string",
              description: "Payment status",
              default: "Pending",
            },
            status: {
              type: "string",
              enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
              description: "Order status",
              default: "Processing",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c88",
            user: "60d21b4667d0d8992e610c85",
            orderItems: [
              {
                productId: "60d21b4667d0d8992e610c86",
                name: "Designer T-Shirt",
                image: "https://example.com/image1.jpg",
                price: 49.99,
                size: "M",
                color: "Black",
                quantity: 2,
              },
            ],
            shippingAddress: {
              address: "123 Main St",
              city: "Anytown",
              postalCode: "12345",
              country: "USA",
            },
            paymentMethod: "PayPal",
            totalPrice: 99.98,
            isPaid: true,
            paidAt: "2023-01-01T12:00:00.000Z",
            isDelivered: false,
            paymentStatus: "Completed",
            status: "Processing",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T12:00:00.000Z",
          },
        },
        CheckoutItem: {
          type: "object",
          required: ["productId", "name", "image", "price", "quantity"],
          properties: {
            productId: {
              type: "string",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            image: {
              type: "string",
              description: "Product image URL",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            quantity: {
              type: "number",
              description: "Quantity of product",
            },
          },
        },
        Checkout: {
          type: "object",
          required: [
            "user",
            "checkoutItems",
            "totalPrice",
            "shippingAddress",
            "paymentMethod",
          ],
          properties: {
            _id: {
              type: "string",
              description: "Checkout ID",
            },
            user: {
              type: "string",
              description: "User ID",
            },
            checkoutItems: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CheckoutItem",
              },
              description: "Checkout items",
            },
            totalPrice: {
              type: "number",
              description: "Total checkout price",
            },
            shippingAddress: {
              type: "object",
              properties: {
                address: {
                  type: "string",
                  description: "Street address",
                },
                city: {
                  type: "string",
                  description: "City",
                },
                postalCode: {
                  type: "string",
                  description: "Postal code",
                },
                country: {
                  type: "string",
                  description: "Country",
                },
              },
              description: "Shipping address",
            },
            paymentMethod: {
              type: "string",
              description: "Payment method",
            },
            isPaid: {
              type: "boolean",
              description: "Payment status",
              default: false,
            },
            paidAt: {
              type: "string",
              format: "date-time",
              description: "Payment timestamp",
            },
            paymentStatus: {
              type: "string",
              description: "Payment status",
              default: "Pending",
            },
            paymentDetails: {
              type: "object",
              description: "Payment details (varies by payment method)",
            },
            isFinalized: {
              type: "boolean",
              description: "Whether checkout is finalized",
              default: false,
            },
            finalizedAt: {
              type: "string",
              format: "date-time",
              description: "Finalization timestamp",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c89",
            user: "60d21b4667d0d8992e610c85",
            checkoutItems: [
              {
                productId: "60d21b4667d0d8992e610c86",
                name: "Designer T-Shirt",
                image: "https://example.com/image1.jpg",
                price: 49.99,
                quantity: 2,
              },
            ],
            totalPrice: 99.98,
            shippingAddress: {
              address: "123 Main St",
              city: "Anytown",
              postalCode: "12345",
              country: "USA",
            },
            paymentMethod: "PayPal",
            isPaid: false,
            paymentStatus: "Pending",
            isFinalized: false,
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
          },
        },
        Subscriber: {
          type: "object",
          required: ["email"],
          properties: {
            _id: {
              type: "string",
              description: "Subscriber ID",
            },
            email: {
              type: "string",
              description: "Subscriber email",
              format: "email",
            },
            subscribedAt: {
              type: "string",
              format: "date-time",
              description: "Subscription timestamp",
              default: "Date.now",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c90",
            email: "subscriber@example.com",
            subscribedAt: "2023-01-01T00:00:00.000Z",
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            status: {
              type: "integer",
              description: "HTTP status code",
            },
          },
          example: {
            message: "Resource not found",
            status: 404,
          },
        },
        LoginCredentials: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email",
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password",
            },
          },
          example: {
            email: "user@example.com",
            password: "password123",
          },
        },
        RegisterUser: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email",
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password",
              minLength: 6,
            },
          },
          example: {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User's name",
            },
            email: {
              type: "string",
              description: "User's email",
            },
            role: {
              type: "string",
              description: "User's role",
            },
            token: {
              type: "string",
              description: "JWT authentication token",
            },
          },
          example: {
            _id: "60d21b4667d0d8992e610c85",
            name: "John Doe",
            email: "john@example.com",
            role: "customer",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
    },
  },
  // Path to the API docs
  apis: ["./routes/*.js", "./swagger-docs/*.js", "./app.js"], // paths to files containing annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route for swagger docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`📝 Swagger docs available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
