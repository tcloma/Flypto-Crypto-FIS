import { useQuery } from "react-query";
import Card from "./sub-components/Card";
import backgroundImage from '../assets/background.mp4'
import { getAllCoins } from "../apis/coinApi";
import { renderSuccessFetch } from '../utilFunctions'
import { Link } from "react-router-dom";

const Homepage = ({ setSelectedCoin }) => {
  const { status, error, data: allCoins } = useQuery('coins', () => getAllCoins())
  console.log('Fetch Status: ', status)
  console.log('Data: ', allCoins)

  const renderCards = () => {
    return (
      <>
        {allCoins?.slice(0, 5).map((coin) => {
          return (
            <Card
              setSelectedCoin={setSelectedCoin}
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.priceUsd}
            />
          )
        })}
      </>
    )
  }

  return (
    <div className="App">
      <div>
        <video className="home-video" muted autoPlay loop>
          <source src={backgroundImage} type="video/mp4" />
        </video>
        <div className="overlay">
          <h1>Flypto</h1>
          <h5>Buy, sell, and exchange your cryptocurrency with no extra fees.</h5>
          <div className='button-home-div'>
            <Link to='/signup'>
              <button id='get-started' className='home-buttons'>Get Started</button>
            </Link>
          </div>
        </div>
        <div className="card-container">
          {renderSuccessFetch(status, error, renderCards())}
        </div>
        <div className="home-reward-container">
          <div className="home-reward-1">
            <h1 className="reward-head"> Explore crypto like Bitcoin, Ethereum ,and Dogecoin </h1>
            <h5> Simply and securely buy, sell, and manage hundreds of cryptocurrency </h5>
            <Link to='/crypto'>
              <button className="reward-button"> See more assets </button>
            </Link>
          </div>
          <div className="home-reward-2" >
            <video className="home-video-reward" muted autoPlay loop>
              <source src='gemini-phone.mp4'  type='video/mp4' />
            </video>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Homepage