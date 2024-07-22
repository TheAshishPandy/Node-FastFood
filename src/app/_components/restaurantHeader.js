const { default: Image } = require("next/image")
const { default: Link } = require("next/link")



const RestaurantHeader = () => {
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img src="https://customernextresources.s3.ap-south-1.amazonaws.com/resources/abc/cde/logo.png"  height={100} width={100}/>
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/Login">Login / Sign Up</Link>
                </li>
                <li>
                    <Link href="/Profile">Profile</Link>
                </li>
            </ul>
        </div>
    )
}

export default RestaurantHeader