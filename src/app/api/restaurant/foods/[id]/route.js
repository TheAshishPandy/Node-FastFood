import connectToDatabase from "@/lib/connectDB"
import FoodModel from "@/lib/models/FoodsModel";
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectToDatabase();
    try{
        const id=content.params.id;
        if(id !=="")
        {
            const Foods = await FoodModel.find({restaurantId:id});
            return NextResponse.json({Message:"Record found Successfully",success:true,data:Foods},
                {status:200}
            )
        }
        else{
            return NextResponse.json({Message:"No Record  found ",success:False},
                {status:400}
            )
        }
       
    }
    catch(error){
        console.error("Error Fetch food item:", error);
        return NextResponse.json({
            message: "Failed to fetech food item",
            success: false,
            error: error.message
        }, { status: 500 });
    }
   
   
} 