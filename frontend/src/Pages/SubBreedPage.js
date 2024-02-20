import axios from "axios";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";

const SubBreedPage = () => {
    const [loading, setLoading] = useState(true);
    const url = window.location.pathname.split('/');
    const dogBreedImagesURL = `https://dog.ceo/api/breed/${url[3]}/${url[5]}/images`;
    const dogBreed = url[3].charAt(0).toUpperCase() + url[3].slice(1);
    const subDogBreed = url[5].charAt(0).toUpperCase() + url[5].slice(1);

    // call the api to get the images of breed
    const GetBreedImages = async () => {
        try {
            const data = await axios
                .get(dogBreedImagesURL)
                .then((response) => {
                    const dogsArray = response.data.message;
                    ShowBreedImages(dogsArray);
                })
                .then(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
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
            const node = document.createTextNode(`No images found for ${subDogBreed}s`);

            li.appendChild(node);
            li.classList.add('no-images');

             // append new list item to list
            breedImagesList.appendChild(li)
        }
    }

    useEffect(() => {
        // get images of breed
        GetBreedImages();
    }, [])

    return (
        <div className="breed-page">
            <Nav />
            <div className="main-content">
                <h1>{subDogBreed} (Sub-breed of {dogBreed})</h1>
                <hr />
                <div className={`breed-content ${loading ? 'hidden' : ''}`}>
                    <h2 className="image-header">Images of {subDogBreed}s</h2>
                    <ul className={loading ? "breed-images-list hidden" : "breed-images-list"}></ul>
                </div>
                <span className={loading ? 'loading' : 'loading hidden'}>Loading</span>
            </div>
        </div>
    )
}

export default SubBreedPage
