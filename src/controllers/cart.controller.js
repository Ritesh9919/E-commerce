import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { calculateTotalPrice } from "../utils/calculateTotalPrice.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";

const addProductToCart = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const { quantity, productId } = items;

  if (!items) {
    throw new ApiError(400, "items is required");
  }

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex((item) =>
    item.productId.equals(productId)
  );

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  // calculate total price
  const totalPrice = await calculateTotalPrice(cart.items);
  cart.totalPrice = totalPrice;
  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Product added successfully"));
});


const viewCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId",
    "name price"
  );
  if (!cart) {
    throw new ApiError(404, "Cart does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});


const updateQunatity = asyncHandler(async (req, res) => {
  const { productId, action } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const productIndex = cart.items.findIndex((item) =>
    item.productId.equals(productId)
  );
  if (productIndex == -1) {
    throw new ApiError(404, "Product does not exist");
  }

  if (action == "increment") {
    cart.items[productIndex].quantity++;
  } else if (action == "decrement") {
    cart.items[productIndex].quantity--;
  } else {
    throw new ApiError(400, "Invalid action");
  }

  cart.totalPrice = await calculateTotalPrice(cart.items);
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Quantity updated successfully"));
});


const removeItemFromCart = asyncHandler(async (req, res) => {
    const {productId} = req.params;
    const cart = await Cart.findOne({userId:req.user._id});
    if(!cart) {
        throw new ApiError(404,'Cart does not exist');
    }

    const productIndex = cart.items.findIndex((item)=> item.productId.equals(productId));
    if(productIndex == -1) {
        throw new ApiError(404,'Product does not exist');
    }

    cart.items.splice(productIndex,1);
    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    return res.status(200)
    .json(new ApiResponse(200,{},'Product removed successfully'));
    
});

export { addProductToCart, viewCart, updateQunatity, removeItemFromCart };
