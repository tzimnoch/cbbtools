import styles from './App.module.css'

import { useState, useCallback, useReducer, useRef } from 'react'

import Hand from './Hand'
import { keyboardHandler } from './KeyboardHandler'
import { initialGameState, gameStateReducer, handviewerExport } from './Gamestate'


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
  const rotateHands = (event) => { return dispatchGameState({type: 'rotateHands'}) }
  const startWithFocus = useCallback((a) => { if (a) a.focus(); })
  const generateBridgewinnersHandviewerString = () => { return dispatchGameState({type: 'generateBridgewinnersHandviewerString'}) }
  const selectBoardNumber = (event) => { return dispatchGameState({type: 'setBoardNumber', board_number: event.target.value}) }

  const saveToLocal = (event) => {   return dispatchGameState({type: 'saveToLocal'}) }
  const loadFromLocal = (event) => { return dispatchGameState({type: 'loadFromLocal'}) }
  const saveToFile = (event) => {    return dispatchGameState({type: 'saveToFile'}) }
  const loadFromFile = (event) => {  return dispatchGameState({type: 'loadFromFile'}) }
  const loadFromHandviewerRef = useRef()
  const loadFromHandviewer = (event) => { return dispatchGameState({type: 'loadFromHandviewer', handviewer_string: loadFromHandviewerRef.current.value}) }

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
      <div>
        <h3>Buttons</h3>
        <button onClick={saveToLocal}>Save Local</button>
        <button onClick={loadFromLocal}>Load Local</button>
        <button onClick={saveToFile} disabled>Save to file</button>
        <button onClick={loadFromFile} disabled>Load from file</button>
        <br />
        <br />
        <label htmlFor='hvstring'>Handviewer String: </label>
        <input id='hvstring' type='text' ref={loadFromHandviewerRef} />
        <button onClick={loadFromHandviewer}>Load from handviewer</button>
        <br />
        <br />
        <button onClick={rotateHands}>Rotate clockwise</button>
        <button onClick={generateBridgewinnersHandviewerString}>Generate Bridgewinners handviewer</button>
        <p>{gs.handviewer_string ? gs.handviewer_string + ' ✅ copied' : ''}</p>
      </div>
      <div>
        <h3>Instructions</h3>
        <p>Use arrow keys to navigate between north, south, east and west. Select suit with <u>S</u>pades, <u>H</u>earts, <u>D</u>iamonds and <u>C</u>lubs.
          Then select the cards.
        </p>
      </div>
    </div>
  )
}

export default App
