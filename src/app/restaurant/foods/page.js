"use client";

import { useState, useEffect } from 'react';
import RestaurantFooter from "@/app/_components/restaurantFooter";
import RestaurantHeader from "@/app/_components/restaurantHeader";
import  '../../../app/global.css'

const Foodlist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("RestaurantUaser"));
                const id = user?._id;
                if (id) {
                    const response = await fetch(`/api/restaurant/foods/${id}`);
                    const result = await response.json();
                    setData(result.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch food data", err);
                setError("Failed to fetch food data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <RestaurantHeader />
            <div className="container">
                <h1>Food List</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <table>
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No food items found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <RestaurantFooter />
        </>
    );
};

export default Foodlist;
