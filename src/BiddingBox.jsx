
var auctionLevel = null
var auctionSuit = null

export default function BiddingBox({dispatchGamestate, gs}) {
  const setLevel = (level) => { 
    console.log(level)
  }
  const setSuit = (suit) => { auctionSuit = suit }

  // TODO: Consider design/implementation
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><button onClick={(e) => setLevel(1)}>1</button></td>
            <td><button onClick={(e) => setLevel(2)}>2</button></td>
            <td><button onClick={(e) => setLevel(3)}>3</button></td>
            <td><button onClick={(e) => setLevel(4)}>4</button></td>
            <td><button onClick={(e) => setLevel(5)}>5</button></td>
            <td><button onClick={(e) => setLevel(6)}>6</button></td>
            <td><button onClick={(e) => setLevel(7)}>7</button></td>
          </tr>
          <tr>
            <td onClick={setSuit('spades')}>&spades;</td>
            <td onClick={setSuit('hearts')}>&hearts;</td>
            <td onClick={setSuit('diamonds')}>&diams;</td>
            <td onClick={setSuit('clubs')}>&clubs;</td>
          </tr>
          <tr>
            <td>{auctionLevel}</td>
            <td>{auctionSuit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
