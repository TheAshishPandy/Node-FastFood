"use client"
import RestaurantHeader from "@/app/_components/restaurantHeader"
import './../style.css'
import AddFoodItem from "@/app/_components/addFoodItem"
import { useState } from "react"
import FoodImageDisplay from "@/app/_components/FoodImageDisplay"

const Dashboard=()=>{
    const [addItem,setAddItem]=useState(false);
    return(
        <div>
            <RestaurantHeader/>
           
        <button onClick={()=>setAddItem(true)}> Add Food Item</button>
        <button onClick={()=>setAddItem(false)}> Dashboard</button>
         {
            addItem?   <AddFoodItem />: <div className="container"><h1>Retaurant  Dashboard</h1>
            <FoodImageDisplay />
            </div>

}
        </div>
    )
}

export default Dashboard