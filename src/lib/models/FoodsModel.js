import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    price: { type: String, trim: true },
    quantity: { type: String, trim: true },
    category: { type: String, trim: true },
    description: { type: String, trim: true },
    images: [{ type: String}],
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;
