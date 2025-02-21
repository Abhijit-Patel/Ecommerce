const request = require("supertest");
const express = require("express");
const { addToCart } = require("./cartController");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

jest.mock("../models/Cart");
jest.mock("../models/Product");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = { id: "user123" }; // Simulating an authenticated user
  next();
});

app.post("/cart", addToCart);

describe("POST /cart (Add to Cart)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if the product does not exist", async () => {
    Product.findById.mockResolvedValue(null);

    const response = await request(app)
      .post("/cart")
      .send({ productId: "product123", quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Product not found" });
    expect(Product.findById).toHaveBeenCalledWith("product123");
  });

  it("should return 400 on server error", async () => {
    Product.findById.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post("/cart")
      .send({ productId: "product123", quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Database error" });
  });
});