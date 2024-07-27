import connectToDatabase from "@/lib/connectDB";
import FoodModel from "@/lib/models/FoodsModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectToDatabase();
    try {
        const payload = await request.json();

        // Validate payload
        const { name, price, quantity, category, description, images, restaurantId } = payload;

        if (!name || !price || !quantity || !category || !description || !images || !restaurantId) {
            return NextResponse.json({
                error: "All fields are required",
                success: false
            }, { status: 400 });
        }
        console.log("Received payload:", payload);

        // Create and save the food item
        const food = new FoodModel(payload);
        const result = await food.save();
        console.log("Food item saved:", result);

        return NextResponse.json({
            message: "Food Item Added Successfully",
            success: true,
            data: result
        }, { status: 201 });
    } catch (error) {
        console.error("Error adding food item:", error);
        return NextResponse.json({
            message: "Failed to add food item",
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
