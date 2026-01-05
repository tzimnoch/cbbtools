import { initialGameState } from '../Gamestate'
import { newCard } from '../Card'

function parseHand(h) {
  var currentSuit = null
  var currentRank = null

  var hand = []

  for(var char of h.split('')) {
    switch (char) {
    case 'c': currentSuit = 'clubs'; break
    case 'd': currentSuit = 'diamonds'; break
    case 'h': currentSuit = 'hearts'; break
    case 's': currentSuit = 'spades'; break

    case '2': hand.push(newCard(currentSuit, 0)); break
    case '3': hand.push(newCard(currentSuit, 1)); break
    case '4': hand.push(newCard(currentSuit, 2)); break
    case '5': hand.push(newCard(currentSuit, 3)); break
    case '6': hand.push(newCard(currentSuit, 4)); break
    case '7': hand.push(newCard(currentSuit, 5)); break
    case '8': hand.push(newCard(currentSuit, 6)); break
    case '9': hand.push(newCard(currentSuit, 7)); break
    case 't': hand.push(newCard(currentSuit, 8)); break
    case '0': hand.push(newCard(currentSuit, 8)); break   // can use 10 instead of t
    case 'j': hand.push(newCard(currentSuit, 9)); break
    case 'q': hand.push(newCard(currentSuit, 10)); break
    case 'k': hand.push(newCard(currentSuit, 11)); break
    case 'a': hand.push(newCard(currentSuit, 12)); break

    default: break
    }
  }

  return { hand: hand }
}

function parseAuction(a) {
  var auction = []

  for (let i = 0; i < a.length; i++) {
    switch (a.charAt(i).toLowerCase()) {
    case 'p': auction.push('p'); break

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7': auction.push(a.charAt(i) + a.charAt(i+1)); i++; break

    case 'd':
    case 'x': auction.push('x'); break

    case 'r': auction.push('r'); break

    // TODO: Set contract without an auction, e.g., a=-6hrw means final contract is 6H** by West without an auction
    // May need a hook at a different level since this will alter the gamestate object and 
    case '-': alert('Feature not yet implemented.'); break
    }
  }

  return auction
}

function parseDealer(dealer) {
  switch (dealer.toLowerCase()) {
  case 'e': return 'east'
  case 'n': return 'north'
  case 's': return 'south'
  case 'w': return 'west'
  }
}

function parseVulnerability(vulnerability) {
  switch(vulnerability.toLowerCase()) {
  case 'e': return 'ew'
  case 'n': return 'ns'
  case 'b': return 'all'
  case '-': return 'none'
  }
}

export function parseHandviewer(input) {
  var gs = initialGameState

  // TODO: Replace with URLSearchParams to cope with &p={key=value&more_keys=value} and other issues/code cleanliness.
  for (var param of input.split('&')) {
    switch (param.charAt(0)) {
    case 'n': gs = {...gs, north: parseHand(param.slice(2)) }; break
    case 'e': gs = {...gs, east:  parseHand(param.slice(2)) }; break
    case 'w': gs = {...gs, west:  parseHand(param.slice(2)) }; break
    case 's': gs = {...gs, south: parseHand(param.slice(2)) }; break

    case 'b': gs = {...gs, board_number: param.slice(2) }; break

    case 'd': gs = {...gs, dealer: parseDealer(param.slice(2)) }; break
    case 'v': gs = {...gs, vulnerability: parseVulnerability(param.slice(2)) }; break
    case 'a': gs = {...gs, auction: parseAuction(param.slice(2)) }; break

    // TODO: implement play
    case 'p':
    }
  }

  // TODO: strip deck of dealt cards

  return gs
}