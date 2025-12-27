import { assignCard } from './Gamestate.jsx'

var activeSuit = null

export function keyboardHandler({event, dispatchGameState}) {
  // don't capture browser hotkeys or menu navigation
  if (event.ctrlKey || event.altKey) return

  console.log("keypressed: " + event.key)

  switch(event.key) {
    case 'ArrowDown':  return dispatchGameState({type: 'setActivePlayer', player: 'south'})
    case 'ArrowUp':    return dispatchGameState({type: 'setActivePlayer', player: 'north'})
    case 'ArrowLeft':  return dispatchGameState({type: 'setActivePlayer', player: 'west'})
    case 'ArrowRight': return dispatchGameState({type: 'setActivePlayer', player: 'east'})
    case 'S':
    case 's':
      return activeSuit = 'spades'
    case 'H':
    case 'h':
      return activeSuit = 'hearts'
    case 'D':
    case 'd':
      return activeSuit = 'diamonds'
    case 'C':
    case 'c':
      return activeSuit = 'clubs'
    case 'A':
    case 'a': return dispatchGameState({type: 'moveCard', rank: 12, suit: activeSuit});
    case 'K':
    case 'k': return dispatchGameState({type: 'moveCard', rank: 11, suit: activeSuit});
    case 'Q':
    case 'q': return dispatchGameState({type: 'moveCard', rank: 10, suit: activeSuit});
    case 'J':
    case 'j': return dispatchGameState({type: 'moveCard', rank: 9, suit: activeSuit});
    case 'T':
    case 't': return dispatchGameState({type: 'moveCard', rank: 8, suit: activeSuit});
    case '9': return dispatchGameState({type: 'moveCard', rank: 7, suit: activeSuit});
    case '8': return dispatchGameState({type: 'moveCard', rank: 6, suit: activeSuit});
    case '7': return dispatchGameState({type: 'moveCard', rank: 5, suit: activeSuit});
    case '6': return dispatchGameState({type: 'moveCard', rank: 4, suit: activeSuit});
    case '5': return dispatchGameState({type: 'moveCard', rank: 3, suit: activeSuit});
    case '4': return dispatchGameState({type: 'moveCard', rank: 2, suit: activeSuit});
    case '3': return dispatchGameState({type: 'moveCard', rank: 1, suit: activeSuit});
    case '2': return dispatchGameState({type: 'moveCard', rank: 0, suit: activeSuit});
  }
}
