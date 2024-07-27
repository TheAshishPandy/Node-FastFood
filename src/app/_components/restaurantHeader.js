"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const { default: Image } = require("next/image")
const { default: Link } = require("next/link")



const RestaurantHeader = () => {
    const [details,setDetails]=useState();
    const router =useRouter();
    const pathName=usePathname();
    useEffect(()=>{
        const data=localStorage.getItem("RestaurantUaser");
        if(!data && pathName=="/restaurant/dashboard") router.push("/restaurant")
            else if(data && pathName=="/restaurant"){
        router.push("/restaurant/dashboard");
        }
        else setDetails(JSON.parse(data))
    },[])
    const handlelogout=()=>{
        localStorage.removeItem("RestaurantUaser");
        router.push("/restaurant");
        }
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img src="https://customernextresources.s3.ap-south-1.amazonaws.com/resources/abc/cde/logo.png"  height={100} width={100}/>
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
            
                    {
                    details && details.name?<>
                    <li><button onClick={handlelogout}>Logout</button></li>
                    <li><Link href="/Profile">Profile</Link></li>
                    </> :
                     <li><Link href="/Login">Login / Sign Up</Link> </li>
                    }
                    
                
            </ul>
        </div>
    )
}

export default RestaurantHeader