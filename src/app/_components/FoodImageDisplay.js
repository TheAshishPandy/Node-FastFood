"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../restaurant/style.css';

// List of food images
const foodImages = [
    'https://img.freepik.com/free-photo/delicious-pizza-plate_1150-15522.jpg',
    'https://img.freepik.com/free-photo/juicy-burger-with-fries_1150-7809.jpg',
    'https://img.freepik.com/free-photo/fresh-sushi-set-chopsticks_1150-5869.jpg',
    'https://img.freepik.com/free-photo/pasta-with-tomato-sauce-basil_1150-18068.jpg',
    'https://img.freepik.com/free-photo/healthy-salad-bowl_1150-14737.jpg'
];

const getRandomFoodImage = () => {
    const randomIndex = Math.floor(Math.random() * foodImages.length);
    return foodImages[randomIndex];
};

const FoodImageDisplay = () => {
    const [image, setImage] = useState(getRandomFoodImage());
    const [totalFoods, setTotalFoods] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchFoodCount = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("RestaurantUaser")); // Fixed typo
                const id = user?._id;
                if (id) {
                    const response = await fetch(`/api/restaurant/foods/${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setTotalFoods(data.data?.length || 0); // Added fallback to 0
                }
            } catch (error) {
                console.error("Failed to fetch food count", error);
            }
        };

        fetchFoodCount(); // Uncommented to ensure it runs
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleClick = () => {
        setImage(getRandomFoodImage());
        router.push("/restaurant/foods");
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center', width: '300px', height: '220px' }}>
            <img
                src={image}
                alt="Food"
                className='foodImages'
            />
            <button
                onClick={handleClick}
                className='FoodButton'
            >
                {totalFoods} Foods
            </button>
        </div>
    );
};

export default FoodImageDisplay;
