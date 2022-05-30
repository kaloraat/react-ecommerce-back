const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// PRODUCT VARIANT IDEA
// refer to a new model with array type that contains object (different size will have different price)
// https://stackoverflow.com/questions/46870088/how-to-add-different-sizes-of-a-product-in-mongoose-model

/**
 const ProductVariant = new mongoose.Schema({
  name: String,  // If you're certain this will only ever be sizes, you could make it an enum
  inventory: Number
});

module.exports = mongoose.model('Product',{
  imagePath: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  variants: [ProductVariant]
});
 */

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

/**
 // Generate slug for product before validation
productSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});
 
// Populate category and subs
productSchema.pre(/^find/, function (next) {
  this.populate("category subs");
  next();
});
 */

module.exports = mongoose.model("Product", productSchema);
