import { Link } from "react-router-dom"
import Styles from "./NavBar.module.css"

export default function Nav(){
    return(
        <nav className={Styles.navContainer}>
            <ul>
                <li>
                    <Link to="/">Home Page</Link>
                </li>

                <li>
                    <Link to="/show">ClothingStock</Link>
                </li>

                <li>
                    <Link state={{requestMethod: "post", text: "New Clothing"}}to="/new">New Clothing</Link>
                </li>
            </ul>

        </nav>
    )
}