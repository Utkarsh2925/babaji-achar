/**
 * DATABASE SCHEMAS (For Backend Developers)
 * Target: MongoDB with Mongoose
 */

/* 
// USER SCHEMA
const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, lowercase: true },
  password: { type: String, required: true }, // Hashed
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  addresses: [{
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String
  }]
}, { timestamps: true });

// PRODUCT SCHEMA
const ProductSchema = new Schema({
  name: { type: String, required: true },
  englishName: { type: String, required: true },
  description: String,
  tagline: String,
  mainImage: String,
  galleryImages: [String],
  altText: String,
  ingredients: [String],
  isFeatured: { type: Boolean, default: false },
  variants: [{
    size: { type: String, required: true },
    mrp: { type: Number, required: true },
    stock: { type: Number, default: 0 }
  }]
}, { timestamps: true });

// ORDER SCHEMA
const OrderSchema = new Schema({
  orderId: { type: String, unique: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  customerDetails: {
    fullName: String,
    phone: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    size: String,
    quantity: Number,
    price: Number
  }],
  subtotal: Number,
  deliveryCharge: { type: Number, default: 50 },
  totalAmount: Number,
  payment: {
    mode: { type: String, enum: ['UPI_QR', 'UPI_ID'] },
    utrNumber: String,
    status: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' }
  },
  status: { 
    type: String, 
    enum: ['Pending Payment', 'Payment Received', 'Packed', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending Payment' 
  }
}, { timestamps: true });
*/
