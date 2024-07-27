"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

const RestaurantLogin =()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false)
    const [loading,setLoading]=useState(false)
    const router=useRouter();

    const Clear=()=>{
        setEmail('');
    setPassword('');    
    }
    
    const handleLogin= async ()=>{
        try{

        
        if( !email || !password){
            setError(true)
        }
        else{
            let response= await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({email,password,login:true}),
            });

         const    responseData= await response.json();
         console.log(responseData);
         const  data  = responseData;
         console.log(JSON.stringify(data));
         
            if(data.success){  
                delete data.password;              
                Clear();
                alert("Login Successfully");
                localStorage.setItem("RestaurantUaser", JSON.stringify(data.data));
                router.push("/restaurant/dashboard");


            }
            else{
                alert(data.error);
            }
            
        }
    }
        catch(e){
            console.log(e);
        }
    }
        
    
    return(
        <>
     <h3>Login Component</h3>   
     <div>
        <div className="input-wrapper">
            <input type="text" placeholder="Enter email Id " className="input-field" value ={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            {
                error && !email && <span className="input-error">Please enter email </span>
            }
        </div>
        <div className="input-wrapper">
            <input type="password" placeholder="Enter Password " className="input-field" value ={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            {
                error && !password && <span className="input-error">Please enter  password</span>
            }
        </div>
        <div className="input-wrapper">
            <button className="button" onClick={handleLogin}>Login</button>
        </div>
     </div>
        </>
    )}

    export default RestaurantLogin