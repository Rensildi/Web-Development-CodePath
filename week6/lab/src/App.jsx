import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  useEffect(() => {
    // define async function fetchAllCoinData()
    // use fetch to make call to APi
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" 
        + API_KEY
      );
      // saving the JSON response returend to the list state variable
      const json = await response.json();
      setList(json);
    };
    // call fetchAllCoinData to handle errors that could pop up with it
    fetchAllCoinData().catch(console.error);
  }, []);

  return (
    <div className='whole-page'>
      <h1>My Crypto List</h1>
          {/* Checking if list exist
             Using Object.entries to get an array of key-value pairs from list.Data
             Using map to iterate over each key-value pair
             For each coin, checking the PlatformType property
                if platformtype is equl to "blockchain", create an li element
                and sent the text to the coin's FullName
                Otherwise return null.
           */}
        <ul>
          {list && Object.entries(list.Data).map(([coin]) =>
            list.Data[coin].PlatformType === "blockchain" ? (
              <li key={list.Data[coin].FullName}>{list.Data[coin].FullName}</li>
            ) : null
          )}
        </ul>
    </div>
  )

}

export default App
