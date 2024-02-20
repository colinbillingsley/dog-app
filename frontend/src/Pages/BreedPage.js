import axios from "axios";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";

const BreedPage = () => {
    const [loading, setLoading] = useState(true);
    const url = window.location.pathname.split('/');
    const dogSubBreedsURL = `https://dog.ceo/api/breed/${url[3]}/list`;
    const dogBreedImagesURL = `https://dog.ceo/api/breed/${url[3]}/images`;
    const dogBreed = url[3].charAt(0).toUpperCase() + url[3].slice(1);

    // call the api to get the subreeds of breed
    const GetSubBreeds = async () => {
        try {
            const data = await axios
                .get(dogSubBreedsURL)
                .then((response) => {
                    const dogsArray = response.data.message;
                    ShowSubBreeds(dogsArray);
                })
                .then(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }        
    }

    // call the api to get the images of breed
    const GetBreedImages = async () => {
        try {
            const data = await axios
                .get(dogBreedImagesURL)
                .then((response) => {
                    const dogsArray = response.data.message;
                    ShowBreedImages(dogsArray);
                })
        } catch (error) {
            console.log(error);
        }
    }

    // add sub-breeds to list if they exist, otherwise display message
    const ShowSubBreeds = (dogs) => {
        const subBreedsList = document.querySelector(".sub-breeds-list");

        if (dogs.length > 0) {
            // add each dog from api to list
            for (let dog of dogs) {
                const li = document.createElement("li");
                li.classList.add('sub-breed-item')
                const node = document.createTextNode(dog);

                const link = document.createElement("a");
                link.appendChild(node);
                link.href = `${url[3]}/sub-breed/${dog}`;

                // append text node to newly created list item of dog
                li.appendChild(link);
                // append new list item to list
                subBreedsList.appendChild(li);
            }
        } else {
            const li = document.createElement("li");
            const node = document.createTextNode(`No sub-breeds found for ${dogBreed}s`);

            li.appendChild(node);
            li.classList.add('no-sub-breeds');

             // append new list item to list
            subBreedsList.appendChild(li)
        }
    }

    // add breed images to list if they exist, otherwise display message
    const ShowBreedImages = (images) => {
        const breedImagesList = document.querySelector(".breed-images-list");

        if (images.length > 0) {
            // add each dog from api to list
            for (let image of images) {
                const li = document.createElement("li");
                const img = document.createElement("img");

                img.setAttribute('src', image);
                // append img node to newly created list item of dog
                li.appendChild(img);

                 // append new list item to list
                breedImagesList.appendChild(li)
            }
        } else {
            const li = document.createElement("li");
            const node = document.createTextNode(`No images found for ${dogBreed}s`);

            li.appendChild(node);
            li.classList.add('no-images');

             // append new list item to list
            breedImagesList.appendChild(li)
        }
    }

    useEffect(() => {
        // get sub-breeds of dog if any
        GetSubBreeds();
        // get images of breed
        GetBreedImages();
    }, [])

    return (
        <div className="breed-page">
            <Nav />
            <div className="main-content">
                <h1>{dogBreed}</h1>
                <hr />
                <div className={`breed-content ${loading ? 'hidden' : ''}`}>
                    <h2 className="sub-breed-header">Sub-Breeds</h2>
                    <ul className="sub-breeds-list"></ul>
                    <h2 className="image-header">Images of {dogBreed}s</h2>
                    <ul className="breed-images-list"></ul>
                </div>
                <span className={loading ? 'loading' : 'loading hidden'}>Loading</span>
            </div>
        </div>
    )
}

export default BreedPage
