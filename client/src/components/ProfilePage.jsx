// Dependencies
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getAllCoins } from '../apis/coinApi'
import '../styles/Profile.scss'

// Components
import Card from './sub-components/Card'
import Table from './sub-components/Table'

const ProfilePage = ({ user, userCoins = [], setSelectedCoin }) => {
   const { data: allCoins } = useQuery('coins', () => getAllCoins())
   const filteredCoins = allCoins?.filter(coin => userCoins?.map(coin => coin.name).includes(coin.name.toLowerCase()))

   const findQuantity = (searchCoin) => {
      const matchedCoin = userCoins.find(coin => coin.name === searchCoin)
      return matchedCoin.quantity
   }

   const filteredWithQuantity = filteredCoins?.map(coin => ({ ...coin, quantity: findQuantity(coin.name.toLowerCase()) }))
   filteredWithQuantity.push({ id: "BNB", name: "BNB", symbol: "BNB", quantity: 34.71, priceUsd: "288", changePercent24Hr: "0.76" })

   // console.log('user', userCoins)
   console.log(filteredWithQuantity)

   const [gaining, setGaining] = useState(false)

   let totalChange = 0
   filteredCoins?.forEach(coin => {
      totalChange = totalChange + parseFloat(coin.changePercent24Hr)
   })

   let totalValue = 0
   filteredWithQuantity?.forEach(coin => {
      totalValue += parseFloat(coin.priceUsd) * coin.quantity
   })

   const gainCheck = () => {
      if (totalChange > 0) {
         setGaining(true)
      } else if (totalChange < 0) {
         setGaining(false)
      }
   }

   useEffect(() => {
      gainCheck()
   }, [])

   return (
      <div className="profile-container">
         <div className="portfolio-page">
            <div className='portfolio-header'>
               <div className='user-info'>
                  <h1> {user?.name}'s Portfolio </h1>
                  <p> {user?.email} </p>
                  <p> <span className='money'>$</span>{user?.funds}</p>
               </div>
               <div className='portfolio-graph'>
                  <h2>${totalValue.toFixed(3)}</h2>
                  <h3> Your portfolio is {gaining ? 'up' : 'down'}: </h3>
                  <h2 className={gaining ? 'total-gaining' : 'total-losing'}>
                     {gaining ? '▲' : '▼'}{totalChange < 0 ? totalChange?.toFixed(2) * -1 : totalChange?.toFixed(2)}%
                  </h2>
               </div>
            </div>

            {/* <div className='watchlist-container'>
               <h2 style={{ color: 'white' }}> Tracked Coins: </h2>
               {filteredCoins?.slice(0, 5).map(coin => {
                  return (
                     <Card
                        setSelectedCoin={setSelectedCoin}
                        id={coin.id}
                        key={coin.id}
                        name={coin.name}
                        symbol={coin.symbol}
                        price={coin.priceUsd}
                     />
                  )
               })}
            </div> */}
            <div className='owned-coins-table'>
               <h2> Owned Coins: </h2>
               <Table
                  allCoins={filteredWithQuantity}
                  setSelectedCoin={setSelectedCoin}
                  withQuantity={true}
               />
            </div>
         </div>
      </div>
   )
}
export default ProfilePage;