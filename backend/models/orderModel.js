import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String
    }
  ],
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  paymentMethod: { type: String, enum: ["PhonePe", "PayPal", "CreditCard", "DebitCard"], required: true },
  totalAmount: Number,
  status: { type: String, enum: ["Pending", "Paid", "Shipped", "Delivered"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
