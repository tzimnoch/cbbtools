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

export function parseHandviewer(input) {
  var gs = initialGameState

  for (var param of input.split('&')) {
    switch (param.charAt(0)) {
    case 'n': gs = {...gs, north: parseHand(param.slice(2)) }; break
    case 'e': gs = {...gs, east:  parseHand(param.slice(2)) }; break
    case 'w': gs = {...gs, west:  parseHand(param.slice(2)) }; break
    case 's': gs = {...gs, south: parseHand(param.slice(2)) }; break

    case 'b': gs = {...gs, board_number: param.slice(2) }; break

    // TODO: implement dealer, vulnerability, auction
    case 'd':
    case 'v':
    case 'a':
    }
  }

  // // TODO: strip deck of dealt cards

  return gs
}