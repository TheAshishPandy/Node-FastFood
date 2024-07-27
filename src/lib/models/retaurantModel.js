import mongoose from 'mongoose';

const restaurantsSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    email: { type: String, trim: true },
    contact: { type: String, trim: true },
    password: { type: String, trim: true },

 }); 

const RestaurantModel = mongoose.models.restaurants || mongoose.model('restaurants', restaurantsSchema);

export default RestaurantModel;
