import React, { useEffect, useState } from 'react';

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.dexscreener.com/latest/dex/pairs/solana")
      .then(response => response.json())
      .then(data => {
        const newMemeCoins = data.pairs.filter(coin => {
          const coinAgeInHours = (Date.now() - new Date(coin.addedTimestamp * 1000)) / 3600000;
          return coinAgeInHours < 24 && coin.liquidity.usd > 10000;
        });
        setCoins(newMemeCoins);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>New Solana Meme Coins</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume</th>
            <th>Liquidity</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.pairAddress}>
              <td>{coin.baseToken.symbol}</td>
              <td>${coin.priceUsd.toFixed(4)}</td>
              <td>${coin.fdv.toLocaleString()}</td>
              <td>${coin.volume.h24.toLocaleString()}</td>
              <td>${coin.liquidity.usd.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
