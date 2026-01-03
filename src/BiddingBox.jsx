import styles from './BiddingBox.module.css'

import { useState } from 'react'

var auctionLevel = null
var auctionSuit = null

export default function BiddingBox({dispatchGamestate, gs}) {

  const setLevel = (level) => { 
    console.log(level)
  }
  const setSuit = (suit) => { auctionSuit = suit }
  const pass = () => {
    console.log(pass)
  }
  const double = () => {
    console.log(pass)
  }

  // TODO: Consider design/implementation
  return (
    <div>
      <table className={styles.bidding}>
        <tbody>
          <tr>
            <td className={styles.right}><button onClick={(e) => setLevel(1)}>1</button></td>
            <td><button onClick={(e) => setLevel(2)}>2</button></td>
            <td><button onClick={(e) => setLevel(3)}>3</button></td>
            <td><button onClick={(e) => setLevel(4)}>4</button></td>
            <td><button onClick={(e) => setLevel(5)}>5</button></td>
            <td><button onClick={(e) => setLevel(6)}>6</button></td>
            <td><button onClick={(e) => setLevel(7)}>7</button></td>
          </tr>
          <tr>
            <td><button onClick={pass} className={styles.green}>P</button></td>
            <td><button onClick={(e) => setSuit('spades')}>&spades;</button></td>
            <td><button onClick={(e) => setSuit('hearts')} className={styles.red_suit}>&hearts;</button></td>
            <td><button onClick={(e) => setSuit('diamonds')} className={styles.red_suit}>&diams;</button></td>
            <td><button onClick={(e) => setSuit('clubs')}>&clubs;</button></td>
            <td><button onClick={double} className={styles.red}>X</button></td>
            <td><button onClick={double} className={styles.blue}>R</button></td>
          </tr>
          <tr>
            <td colSpan='3'>{auctionLevel}</td>
            <td colSpan='4'>{auctionSuit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
