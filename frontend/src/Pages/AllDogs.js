import axios from 'axios';

import Nav from '../components/Nav';

const AllDogs = () => {
    const allDogsURL = 'https://dog.ceo/api/breeds/list/all';

    // Fetch all dogs data from API
    const GetAllDogs = async () => {
        try {
            const response = await axios.get(allDogsURL);
            const dogsObject = response.data.message;
            const dogsArray = Object.keys(dogsObject);

            ShowData(dogsArray);
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
        }
    }

    GetAllDogs();

    return (
        <div className='all-dogs'>
            <Nav />
            <div className="main-content">
                <h1>All Dogs</h1>
                <ul className="dogs-list"></ul>
            </div>
        </div>
    )
}

export default AllDogs
