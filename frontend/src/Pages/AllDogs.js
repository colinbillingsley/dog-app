import axios from 'axios';

import Nav from '../components/Nav';
import Search from '../components/Search';
import { useState, useEffect } from 'react';

const AllDogs = () => {
    const [dogs, setDogs] = useState([])
    const allDogsURL = 'https://dog.ceo/api/breeds/list/all';

    // Fetch all dogs data from API
    const GetAllDogs = async () => {
        try {
            const data = await axios
                .get(allDogsURL)
                .then((response) => {
                    const dogsObject = response.data.message;
                    const dogsArray = Object.keys(dogsObject);
                    console.log(dogsArray);
                    ShowData(dogsArray);
                })
        } catch (error) {
            console.log(error);
        }
    }

    // show data from api by adding to DOM
    const ShowData = (dogs) => {
        const dogsList = document.querySelector(".dogs-list");

        // add each dog from api to list
        for (let dog of dogs) {
            const li = document.createElement("li");
            const node = document.createTextNode(dog);

            const link = document.createElement("a");
            link.appendChild(node);
            link.href = `dogs/breed/${dog}`;

            // append text node to newly created list item of dog
            li.appendChild(link);
            // append new list item to list
            dogsList.appendChild(li)

            setDogs([...dogs, dog]);
        }
    }

    useEffect(() => {
        GetAllDogs();
    }, [])

    

    return (
        <div className='all-dogs'>
            <Nav />
            <div className="search-container">
                <Search dogs={dogs}/>
            </div>
            <div className="main-content">
                <h1>All Dogs</h1>
                <ul className="dogs-list"></ul>
            </div>
        </div>
    )
}

export default AllDogs
