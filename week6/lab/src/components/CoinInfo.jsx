import React from "react";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({image, name, symbol}) => {
    const [price, setPrice] = useState(null);
    useEffect(() => {
        // creating getCoinPrice functin in the useEffect() hook
        const getCoinPrice = async () => {
            try {
                const response = await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
                );
                const json = await response.json();
                if (json.USD) {
                    setPrice(json.USD);
                } else {
                    console.error("Invalid API response:", json);
                }
            } catch (error) {
                console.error("Error fetching price:", error);
            }
        };
        getCoinPrice().catch(console.error);
        // instead of useEffect runnig on every render, it will now run whenever the symbol we pass in changes.
        // so everytime a new coin symbol is given to get the infor for, the useEffcct() hook will run.
    }, [symbol]); 

    return (
        <div>
            {price ? ( // rendering only if API call actually returned data
                <li className="main-list" key={symbol}>
                    <img className="icons" 
                         src={`https://www.cryptocompare.com${image}`}
                         alt={`Small icon for ${name} crypto coin`} 
                    />
                    {name} &lt;<span className="tab"></span>  ${price.USD} USD
                </li>
            ) :
            null
            }
        </div>
    )
};

export default CoinInfo;