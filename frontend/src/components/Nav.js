import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const [atTop, setAtTop] = useState(true);

    // set nav bar background to darker color when scrolling down from top
    const changeNavColor = () => {
        if (window.scrollY >= 30) {
            setAtTop(false);
        } else {
            setAtTop(true);
        }
    };

    window.addEventListener('scroll', changeNavColor);

    return (
        <div className={`nav ${atTop ? '' : 'dark-bg'}`}>
            <span className="icon">DoggyPics</span>
            <ul className="nav-links-list">
                <li className="nav-link-item">
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav
