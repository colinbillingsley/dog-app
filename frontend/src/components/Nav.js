import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faHouse } from '@fortawesome/free-solid-svg-icons';

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
            <span className="icon"><FontAwesomeIcon icon={faDog}/> DoggyPics</span>
            <ul className="nav-links-list">
                <li className="nav-link-item">
                    <Link to="/"><FontAwesomeIcon icon={faHouse} /> Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav
