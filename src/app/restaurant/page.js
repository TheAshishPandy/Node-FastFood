"use client"
import { useState } from "react"
import RestaurantLogin from "../_components/restaurantLogin"
import RestaurantSignUp from "../_components/restaurantSignUp"
import RestaurantHeader from "../_components/restaurantHeader"
import './style.css'
import RestaurantFooter from "../_components/restaurantFooter"
const Restaurant = () => {
    const [login, setlogin] = useState(true)
    return (
        <>
            <div className="container">
                <RestaurantHeader/>
                <h1> Restaurant Login / Sign Up Page </h1>
                {
                    login ? <RestaurantLogin /> : <RestaurantSignUp />
                }
                <div>
                    <button className="button-login"  onClick={() => setlogin(!login)}>
                        {login ? "Don't have Account (Sign Up)" : "Already have Account (Login) "} </button>
                </div>
                <RestaurantFooter />
            </div>
           
        </>
    )
}

export default Restaurant