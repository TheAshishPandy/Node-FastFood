import { useState } from "react";

const AddFoodItem = () => {
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        const fileReaders = [];
        const base64Images = [];
        let isValid = true;

        for (let file of files) {
            if (!validImageTypes.includes(file.type)) {
                isValid = false;
                break;
            }
            const reader = new FileReader();
            fileReaders.push(
                new Promise((resolve, reject) => {
                    reader.onload = () => {
                        base64Images.push(reader.result);
                        resolve();
                    };
                    reader.onerror = reject;
                })
            );
            reader.readAsDataURL(file);
        }

        Promise.all(fileReaders).then(() => {
            if (isValid) {
                setImages(base64Images);
                setError(false);
            } else {
                setError(true);
            }
        });
    };

    const clear = () => {
        setImages([]);
        setError(false);
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setDescription("");
    };

    const handleAddFoodItem = async () => {
        if (!name || !price || !quantity || !category || !description || images.length === 0) {
            setError(true);
            return;
        }
        const restaurantId = JSON.parse(localStorage.getItem("RestaurantUaser"))?._id;

        if (!restaurantId) {
            alert("Restaurant ID is missing");
            return;
        }
        const payload = {
            name,
            price,
            quantity,
            category,
            description,
            images, 
            restaurantId
           
        };

        try {
            console.log(payload);
            const response = await fetch("/api/restaurant/foods", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.status === 201) {
                alert(data.message);
                clear();
            } else {
                alert(data.error);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="container">
            <h1>Add New Food Items</h1>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Food Name" value={name} className="input-field" onChange={(event) => setName(event.target.value)} />
                {error && !name && <span className="input-error">Food Name cannot be blank</span>}
            </div>
            <div className="input-wrapper">
                <input type="number" placeholder="Enter Price" value={price} className="input-field" onChange={(event) => setPrice(event.target.value)} />
                {error && !price && <span className="input-error">Price cannot be blank</span>}
            </div>
            <div className="input-wrapper">
                <input type="number" placeholder="Enter Quantity" value={quantity} className="input-field" onChange={(event) => setQuantity(event.target.value)} />
                {error && !quantity && <span className="input-error">Food quantity cannot be blank</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Food Category" value={category} className="input-field" onChange={(event) => setCategory(event.target.value)} />
                {error && !category && <span className="input-error">Food category cannot be blank</span>}
            </div>
            <div className="input-wrapper">
                <textarea rows={5} cols={10} placeholder="Enter Food Description" value={description} className="input-field" onChange={(event) => setDescription(event.target.value)} />
                {error && !description && <span className="input-error">Food description cannot be blank</span>}
            </div>
            <div className="input-wrapper">
                <input type="file" accept="image/*" multiple className="input-field" onChange={handleFileChange} />
                {error && images.length === 0 && <span className="input-error">Food images cannot be blank</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Items</button>
            </div>
            <div className="images-preview">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`food-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }} />
                ))}
            </div>
        </div>
    );
};

export default AddFoodItem;
