import styles from './App.module.css'

import { useCallback, useReducer } from 'react'

import Controls from './Controls'
import { initialGameState, gameStateReducer, handviewerExport } from './Gamestate'
import Hand from './Hand'
import Instructions from './Instructions'
import { keyboardHandler } from './KeyboardHandler'

/*******************
 * TODOS
 * 
 * import/export handviewer
 * import lin, pbn
 * 
 * expand card sizes to allow more styling of cards (Does card need to become its own component class?)
 * 
 * handle mouse clicks for assignment
 * 
 * dropdowns:
 *  - board number
 *  - vulnerability
 *  - scoring
 * 
 * Buttons:
 *  - snapshot/checkpoint
 *  - first error
 *  - ?missed opportunity?
 * 
 * input boxes:
 *  - player names
 *  - handviewer url/export
 * 
 * Handle auction
 * 
 * Handle play
 * 
 * Attach double dummy solver
 * 
 * Implement simple simulation dealer/stats
 * 
 * 
 *******************/

const App = () => {
  const [gs, dispatchGameState] = useReducer(gameStateReducer, initialGameState)
  const handleKeyUp = (event) => { keyboardHandler({event, dispatchGameState}) }
  const startWithFocus = useCallback((a) => { if (a) a.focus(); })
  const selectBoardNumber = (event) => { return dispatchGameState({type: 'setBoardNumber', board_number: event.target.value}) }

  return (
    <div>
    <div className={styles.content} onKeyUp={handleKeyUp} tabIndex="1" ref={startWithFocus}>
      <div className={styles.flex}>
        <div className={styles.flex}>
          <p>
            <label htmlFor="boardnumber">Board Number: </label>
            <select name="boardnumber" id="boardnumber" onChange={selectBoardNumber}>
              {[...Array(36)].map((x, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </p>
        </div>
        <div className={styles.flex}>
          <Hand hand={gs['north'].hand} direction='north' active={gs.active_player == 'north'} />
        </div>
        <div className={styles.flex} />
      </div>
      <div className={styles.flex}>
        <div className={styles.flex}>
          <Hand hand={gs.west.hand} direction='west' active={gs.active_player == 'west'} />
        </div>
        <div className={styles.flex}>
          <Hand hand={gs['deck']} direction='center' />
        </div>
        <div className={styles.flex}>
          <Hand hand={gs['east'].hand} direction='east' active={gs.active_player == 'east'} />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.flex} />
        <div className={styles.flex}>
          <Hand hand={gs['south'].hand} direction='south' active={gs.active_player == 'south'} />
        </div>
        <div className={styles.flex} />
      </div>
    </div>
      <Controls dispatchGameState={dispatchGameState} gs={gs}/>
      <Instructions />
    </div>
  )
}

export default App
