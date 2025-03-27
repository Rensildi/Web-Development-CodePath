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

        // Function to fetch a random website screnshot (excluding banned oens)
        const fetchRandomSite = async () => {
            const availableUrls = allUrls.filter(url => !bannedUrls.includes(url));

            if (availableUrls.length === 0) {
                alert("No more available sites! Unban some to continue.");
                return;
            }
        }
        const randomIndex = Math.floor(Math.random() * availableUrls.length);
        const randomSite = availableUrls[randomIndex];

        const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${encodeURIComponent(randomSite)}`;

        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                setImageUrl(apiUrl);
                setCurrentUrl(randomSite);
            } else {
                console.error("Error fetching screenshot");
            }
        } catch (error) {
            console.error("API request failed", error);
        }
    };

    // Function to ban the current site
    const banCurrentSite = () => {
        if (currentUrl && !bannedUrls.includes(currentUrl)) {
            setBannedUrls([...bannedUrls, currentUrl]);
        }
    };

    // Function to remove a site form the ban list
    const unbanSite = (url) => {
        setBannedUrls(bannedUrls.filter(banned => banned !== url));
    };

    return (
        <div>
            <button onClick={fetchRandomSite}>Discover Something New!</button>
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="Random Website Screenshot" style={{ width: "100%", marginTop: "10px" }} />
                    <p>{currentUrl}</p>
                    <button onClick={banCurrentSite}>Ban This Site</button>
                </div>
            )}
            <h3>Banned Sites</h3>
            <ul>
                {bannedUrls.map((url,index) => (
                    <li key={index}>
                        {url} <button onClick={() => unbanSite(url)}>Unban</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RandomContent