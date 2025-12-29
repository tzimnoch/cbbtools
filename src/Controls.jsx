import { useRef } from 'react'

function Controls({dispatchGameState, gs}) {
  const saveToLocal = (event) => {   return dispatchGameState({type: 'saveToLocal'}) }
  const loadFromLocal = (event) => { return dispatchGameState({type: 'loadFromLocal'}) }
  const saveToFile = (event) => {    return dispatchGameState({type: 'saveToFile'}) }
  const loadFromFile = (event) => {  return dispatchGameState({type: 'loadFromFile'}) }
  const loadFromHandviewerRef = useRef()
  const loadFromHandviewer = (event) => { return dispatchGameState({type: 'loadFromHandviewer', handviewer_string: loadFromHandviewerRef.current.value}) }
  const rotateHands = (event) => { return dispatchGameState({type: 'rotateHands'}) }
  const generateBridgewinnersHandviewerString = () => { return dispatchGameState({type: 'generateBridgewinnersHandviewerString'}) }

  return (
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
  )
}

export default Controls
