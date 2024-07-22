import mongoose from 'mongoose';

const restaurantsSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },

 }); 

const RestaurantModel = mongoose.models.restaurants || mongoose.model('restaurants', restaurantsSchema);

export default RestaurantModel;
