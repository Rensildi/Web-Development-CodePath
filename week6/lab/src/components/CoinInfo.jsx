import React from "react";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({image, name, symbol}) => {
    const [price, setPrice] = useState(null);
    useEffect(() => {
        // creating getCoinPrice functin in the useEffect() hook
        const getCoinPrice = async () => {
            const response = await fetch (
                `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
                API_KEY
            );
            const json = await response.json();
            setPrice(json);
        };
        getCoinPrice().catch(console.error);
        // instead of useEffect runnig on every render, it will now run whenever the symbol we pass in changes.
        // so everytime a new coin symbol is given to get the infor for, the useEffcct() hook will run.
    }, [symbol]); 
};

export default CoinInfo;