"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you're using Next.js and router

const RestaurantSignUp = () => {


    const Clear = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setCity('');
        setState('');
        setAddress('');
        setContact('');
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        try {

            if (!email || !password || !confirmPassword || !name || !city || !address || !state || !contact) {
                setError(true)
            }
            else if (password !== confirmPassword) {
                setError(false)
                setPasswordError(true)
            }
            else {
                setError(false)
                setPasswordError(false)
                let response = await fetch("http://localhost:3000/api/restaurant", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                        confirmPassword,
                        name,
                        city,
                        address,
                        state,
                        contact
                    })
                });
                if (response.status === 201) {
                    Clear();
                    alert("Record Insert Sucessfully");
                } else {
                    throw new Error(response.error);
                }
                const responseData = await response.json();
                const { data } = responseData
                delete data.password;
                localStorage.setItem("RestaurantUaser", JSON.stringify(data));
                router.push("/restaurant/dashboard");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            // Show error message with SweetAlert
            alert("Sign Up Failed");
        }

    };

    return (
        <>
            <h3>SignUp Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="email" placeholder="Enter email Id" value={email} className="input-field" onChange={(event) => setEmail(event.target.value)} />
                    {
                        error && !email && <span class="input-error"> Plaese Enter Valid email </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password" value={password} className="input-field" onChange={(event) => setPassword(event.target.value)} />
                    {
                        error && !password && <span class="input-error"> Password can not blank  </span>
                    }
                    {
                        passwordError && <span class="input-error"> password and confirmPassword not match </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Confirm Password" value={confirmPassword} className="input-field" onChange={(event) => setConfirmPassword(event.target.value)} />
                    {
                        error && !confirmPassword && <span class="input-error">Confirm  Password can not blank  </span>
                    }
                    {
                        passwordError && <span class="input-error"> password and confirmPassword not match </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant Name" value={name} className="input-field" onChange={(event) => setName(event.target.value)} />
                    {
                        error && !name && <span class="input-error"> Name can not blank  </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant City" value={city} className="input-field" onChange={(event) => setCity(event.target.value)} />
                    {
                        error && !city && <span class="input-error"> Restaurant City can not blank  </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant State" value={state} className="input-field" onChange={(event) => setState(event.target.value)} />
                    {
                        error && !state && <span class="input-error"> Restaurant State can not blank  </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant Full Address" value={address} className="input-field" onChange={(event) => setAddress(event.target.value)} />
                    {
                        error && !address && <span class="input-error"> Restaurant Full Address can not blank  </span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="number" placeholder="Enter Restaurant Contact No" minLength={10} maxLength={12} value={contact} className="input-field" onChange={(event) => setContact(event.target.value)} />
                    {
                        error && !contact && <span class="input-error"> Contact Number can not blank  </span>
                    }
                </div>

                <div className="input-wrapper">
                    <button className="button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </>
    );
}

export default RestaurantSignUp;
