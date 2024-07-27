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
        console.log(data)
        if (data.login) {
            // Handle login
            const user = await RestaurantModel.findOne({ email: data.email, password: data.password });
            if (user) {
                return NextResponse.json(
                    { message: "Record Found Successfully", success: true, data: user },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { error: "Invalid email or password", success: false },
                    { status: 401 }
                );
            }
        }
            else {
                const { email, password, confirmPassword, name, city, address, contact, state } = data;
                if (!email || !password || !confirmPassword || !name || !city || !address || !contact || !state) {
                    return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
                }

                if (password !== confirmPassword) {
                    return NextResponse.json({ error: "Password and Confirm Password do not match" }, { status: 400 });
                }
                const newRestaurant = new RestaurantModel({
                    name, address, city, state, email, contact, password,
                });
                const savedRestaurant = await newRestaurant.save();

                return NextResponse.json({ message: "Restaurant registered successfully", success: true, data: savedRestaurant }, { status: 201 });
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 },);
        }
    }