import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({dogs}) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchError, setSearchError] = useState(false);
    const navigate = useNavigate();

    const Search = (e) => {
        e.preventDefault();
        if (dogs.includes(searchInput)) {
            setSearchError(false);
            navigate(`/dogs/breed/${searchInput}`);
        } else {
            setSearchError(true);
        }
    }

    return (
        <div className="search">
            <form onSubmit={Search}>
                <div className="search-container">
                    <FontAwesomeIcon onClick={Search} className='magnifying-glass' icon={faMagnifyingGlass} />
                    <input type="text" placeholder='Search dog breed...' onChange={e => {setSearchInput(e.target.value)}}/>
                </div>
            </form>
            <span className={`search-error ${!searchError ? 'hidden' : ''}`}>Sorry! That is not a recognized dog.</span>
        </div>
    )
}

export default Search
