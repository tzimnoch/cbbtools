
export default function Auction({gs}) {
  var tableCells = []
  switch (gs.dealer) {
  case 'south': tableCells.push(<td></td>);
  case 'east': tableCells.push(<td></td>);
  case 'north': tableCells.push(<td></td>);
  case 'west':
  }

  for (let i = 0; i < gs.auction.length; i++) {
    const bid = gs.auction[i]
    switch (bid) {
    case 'p': tableCells.push(<td>P</td>); break
    case 'x': tableCells.push(<td>X</td>); break
    case 'r': tableCells.push(<td>XX</td>); break
    default: tableCells.push(<td>{bid}</td>); break
    }
  }

  var tableRows = []
  for (let i = 0; i < tableCells.length + 3; i+=4) {
    tableRows.push(
    <tr>
      {tableCells[i]}
      {i + 1 < tableCells.length && tableCells[i + 1]}
      {i + 2 < tableCells.length && tableCells[i + 2]}
      {i + 3 < tableCells.length && tableCells[i + 3]}
    </tr>)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>W</th>
            <th>N</th>
            <th>E</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}
