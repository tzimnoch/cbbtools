import { parseInput } from './bridge-formats/Parser'
import { newCard } from './Card'

const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const cards = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => newCard(d, e))))
const deck = cartesian(suits, cards)

function removeCard(hand, card) {
  var index = hand.findIndex((c) => c.suit == card.suit && c.value == card.value);
  if (index > -1) {
    hand.splice(index, 1);
  }
  return hand;
}

function addCard(hand, card) {
  return [...hand,
    { suit: card.suit, value: card.value }
  ]
}

function assignCard({rank, suit, gameState}) {
  if (suit == null || gameState.active_player == null || rank == null)
    return gameState

  const card = newCard(suit, rank)
  removeCard(gameState.north.hand, card)
  removeCard(gameState.south.hand, card)
  removeCard(gameState.west.hand, card)
  removeCard(gameState.east.hand, card)
  removeCard(gameState.deck, card)
  return {
    ...gameState,
    [gameState.active_player]: {
      // ...gameState[gameState.active_player],   // will be necessary when players have more than hands.
      hand: addCard(gameState[gameState.active_player].hand, card)
    }
  }
}

function rotateHands(gs) {
  // TODO: rotate vulnerability, dealer/auction, play of hand, player names?
  return {
    ...gs,
    north: gs.west,
    west:  gs.south,
    south: gs.east,
    east:  gs.north
  }
}

const cardArray = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
const displayCard = (c) => cardArray[c];
const numericalSort = (a, b) => b - a;
const filterSuit = (suit) => function(card) { if (card.suit == suit) return card.value; }

// TODO: Move this to Handviewer.jsx
function handviewerExport(gs) {
  // n=ckqj6dq963sqjha96        north
  // &s=c1083ds97hkq875432      south
  // &e=c72da105sa108543hj10    east
  // &w=ca954dkj8742sk62h       west
  // &d=N                       dealer
  // &v=-                       vulnerability (need to get examples. - = no vul)
  // &b=1                       board number
  // &a=ppp5sppp                auction
  var returnString = "{ghand "
  // TODO: Dry this up
  // TODO: Auction, play, names, vulnerability, dealer
  returnString += "n=c" + gs.north.hand.map(filterSuit('clubs')).sort(numericalSort).map(displayCard).join('')
  returnString += "d" + gs.north.hand.map(filterSuit('diamonds')).sort(numericalSort).map(displayCard).join('')
  returnString += "h" + gs.north.hand.map(filterSuit('hearts')).sort(numericalSort).map(displayCard).join('')
  returnString += "s" + gs.north.hand.map(filterSuit('spades')).sort(numericalSort).map(displayCard).join('')
  returnString += "&s=c" + gs.south.hand.map(filterSuit('clubs')).sort(numericalSort).map(displayCard).join('')
  returnString += "d" + gs.south.hand.map(filterSuit('diamonds')).sort(numericalSort).map(displayCard).join('')
  returnString += "h" + gs.south.hand.map(filterSuit('hearts')).sort(numericalSort).map(displayCard).join('')
  returnString += "s" + gs.south.hand.map(filterSuit('spades')).sort(numericalSort).map(displayCard).join('')
  returnString += "&e=c" + gs.east.hand.map(filterSuit('clubs')).sort(numericalSort).map(displayCard).join('')
  returnString += "d" + gs.east.hand.map(filterSuit('diamonds')).sort(numericalSort).map(displayCard).join('')
  returnString += "h" + gs.east.hand.map(filterSuit('hearts')).sort(numericalSort).map(displayCard).join('')
  returnString += "s" + gs.east.hand.map(filterSuit('spades')).sort(numericalSort).map(displayCard).join('')
  returnString += "&w=c" + gs.west.hand.map(filterSuit('clubs')).sort(numericalSort).map(displayCard).join('')
  returnString += "d" + gs.west.hand.map(filterSuit('diamonds')).sort(numericalSort).map(displayCard).join('')
  returnString += "h" + gs.west.hand.map(filterSuit('hearts')).sort(numericalSort).map(displayCard).join('')
  returnString += "s" + gs.west.hand.map(filterSuit('spades')).sort(numericalSort).map(displayCard).join('')
  returnString += "}"

  navigator.clipboard.writeText(returnString)

  return {
    ...gs,
    handviewer_string: returnString
  }
}

/******************
 *
 * Exports
 * 
 ******************/
export const initialGameState = {
  north: { hand: [] },
  west:  { hand: [] },
  east:  { hand: [] },
  south: { hand: [] },
  deck: deck,
  play: [],
  board_number: null,
  vulnerability: 'none',
  scoring: 'matchpoints',
  active_player: 'north',
  handviewer_string: null,

  phase: 'edit'
}

export function gameStateReducer(gs, action) {
  console.log('Action: ' + JSON.stringify(action));
  switch(action.type) {
    case 'moveCard': return assignCard({rank: action.rank, suit: action.suit, gameState: gs})
    case 'setActivePlayer': return { ...gs, active_player: action.player }
    case 'rotateHands': return rotateHands(gs)
    case 'generateBridgewinnersHandviewerString': return handviewerExport(gs)

    case 'saveToLocal': localStorage.setItem('cbb_gamestate', JSON.stringify(gs)); return gs
    case 'loadFromLocal': return JSON.parse(localStorage.getItem('cbb_gamestate'))
    case 'loadFromHandviewer': return parseInput(gs, action.handviewer_string)

    /*****************
     * TODOs
     * ***************/
    // TODO: implement save/load from file
    case 'saveToFile': return gs
    case 'loadFromFile': return gs

    // TODO: implement setBoardNumber, to update dealer/vulnerability
    case 'setBoardNumber': return { ...gs, board_number: action.board_number }

    default: return gs
  }
}
