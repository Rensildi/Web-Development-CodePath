import { useEffect, useState } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    // define async function fetchAllCoinData()
    // use fetch to make call to APi
    const fetchAllCoinData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      );
      
      // saving the JSON response returend to the list state variable
      const json = await response.json();
      setList(json);
    };
    // call fetchAllCoinData to handle errors that could pop up with it
    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };
  

  return (
    <div className='whole-page'>
      <h1>My Crypto List</h1>
      <input type="text"
             placeholder='Search...'
             onChange={(inputString) => searchItems(inputString.target.value)} 
      />
      
          {/* Checking if list exist
             Using Object.entries to get an array of key-value pairs from list.Data
             Using map to iterate over each key-value pair
             For each coin, checking the PlatformType property
                if platformtype is equl to "blockchain", create an li element
                and sent the text to the coin's FullName
                Otherwise return null.
           */}
        <ul>
          {list && list.Data ? (
          Object.entries(list.Data).map(([coin]) =>
            list.Data[coin].PlatformType === "blockchain" ? (
              <CoinInfo
                image={list.Data[coin].ImageUrl}
                name={list.Data[coin].FullName}
                symbol={list.Data[coin].Symbol}
              />

            ) : null
          )
        ) : (
          <p>Loading...</p>
        )}
        </ul>
        {searchInput.length > 0
          ? filteredResults.map((coin) => 
            list.Data[coin].PlatformType === "blockchain" ? 
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
          : null
        )
        : list && Object.entries(list.Data).map(([coin]) => 
          list.Data[coin].PlatformType === "blockchain" ? 
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
        : null
      )}
    </div>
  )

}

export default App
