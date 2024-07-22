import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RestaurantSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const handleSignUp = async () => {
        try {
            let result = await fetch("http://localhost:3000/api/restaurant", {
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

            if (result.status === 201) {
                // Clear input fields on successful sign-up
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setName('');
                setCity('');
                setState('');
                setAddress('');
                setContact('');

                // Show success message with SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Sign Up Successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error('Failed to sign up');
            }

            result = await result.json();
            console.log(result);
        } catch (error) {
            console.error("Error during sign up:", error);
            // Show error message with SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Sign Up Failed',
                text: 'An error occurred while signing up. Please try again later.',
                timer: 3000
            });
        }
    };

    return (
        <>
            <h3>SignUp Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="email" placeholder="Enter email Id" value={email} className="input-field" onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password" value={password} className="input-field" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Confirm Password" value={confirmPassword} className="input-field" onChange={(event) => setConfirmPassword(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant Name" value={name} className="input-field" onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant City" value={city} className="input-field" onChange={(event) => setCity(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant State" value={state} className="input-field" onChange={(event) => setState(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant Full Address" value={address} className="input-field" onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant Contact No" value={contact} className="input-field" onChange={(event) => setContact(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </>
    );
}

export default RestaurantSignUp;
