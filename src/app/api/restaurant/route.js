import { NextResponse } from "next/server";
import mongoose from "mongoose";
import RestaurantModel from "@/lib/models/retaurantModel";
import connectToDatabase from "@/lib/connectDB";



export async function GET() {
    await connectToDatabase();

    try {
        const restaurants = await RestaurantModel.find();

        if (restaurants.length > 0) {
            return NextResponse.json({ data: restaurants }, { status: 200 });
        } else {
            return NextResponse.json({ data: "Data not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request) {
    await connectToDatabase();

    try {
        const data = await request.json();
        const { email, password, confirmPassword, name, city, address, contact, state } = data;
        if (password !== confirmPassword) {
            console.log(password)
            console.log(confirmPassword)
            return NextResponse.json({ error: "Password and Confirm Password does not match" }, { status:401})
        }
        const newRestaurant = new RestaurantModel({
            name,address,city,state,email,contact,password,
        });
        await newRestaurant.save();

        return NextResponse.json({ message: "Restaurant registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error during sign up:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}