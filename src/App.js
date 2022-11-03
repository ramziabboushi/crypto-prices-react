import { useEffect, useState } from "react";
import "./styles.css";

// API
// https://api2.binance.com/api/v3/ticker/24hr

const COIN_NAMES = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  LTCETH: "Litecoin",
  DOGEUSDT: "DogeCoin"
};

const COINS = Object.keys(COIN_NAMES);

export default function App() {
  // 1. STATE AND USEEFFECT HERE
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch("https://api2.binance.com/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const filteredData = data.filter((ticker) => {
          if (COINS.includes(ticker.symbol)) {
            return true;
          }
        });
        setCryptoData(filteredData);
      });
  }, []);

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>

          {/* Up? Green + ▲ */}
          {/* Down? Red + ▼ */}
          <tbody>
            {cryptoData.map((crypto, i) => {
              return (
                <tr key={crypto.symbol}>
                  <td>{i + 1}</td>
                  <td>{COIN_NAMES[crypto.symbol]}</td>
                  <td>${Number(crypto.weightedAvgPrice).toLocaleString()}</td>
                  <td
                    style={
                      Number(crypto.priceChangePercent) > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {Number(crypto.priceChangePercent) > 0 ? "▲ " : "▼ "}
                    {crypto.priceChangePercent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
