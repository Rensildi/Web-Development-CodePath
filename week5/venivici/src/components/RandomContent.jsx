import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const RandomContent = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [currentUrl, setCurrentUrl] = useState("");
    const [bannedUrls, setBannedUrls] = useState([]);

    // function to fetch a random website screenshot
    const fetchRandomSite = async () => {
        const randomUrls = [
            "https://www.wikipedia.org/",
            "https://www.nationalgeographic.com/",
            "https://www.space.com/",
            "https://www.bbc.com/",
            "https://www.artstation.com/"
        ];
        const randomIndex = Math.floor(Math.random() * randomUrls.length);
        const randomSite = randomUrls[randomIndex];

        const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${encodeURIComponent(randomSite)}`;

        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                setImageUrl(apiUrl);
            } else {
                console.error("Error fetching screenshot");
            }
        } catch (error) {
            console.error("API request failed", error);
        }
    };

    return (
        <div>
            <button onClick={fetchRandomSite}>Discover Somethign New!</button>
            {imageUrl && <img src={imageUrl} alt="Random Website Screenshot" style={{ width: "100%", marginTop: "10px" }} />}
        </div>
    )
}

export default RandomContent