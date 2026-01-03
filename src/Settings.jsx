import { useState } from 'react'

export default function Settings({dispatchGameState, gs}) {
  const [open, setOpen] = useState(false)
  const openSettings = () => { setOpen(true) }
  const closeSettings = () => { setOpen(false) }
  const toggleConfirmBids = (event) =>  { return dispatchGameState({type: 'toggleConfirmBids'})}

  return (
    <div>
      <br />
      <button onClick={openSettings}>Settings</button>
      <dialog open={open} onClose={closeSettings}>
        <h2>Settings</h2>
        <form>
          <input type='checkbox' id='confirmBids' checked={gs.settings.confirm_bids} onChange={toggleConfirmBids} />
          <label htmlFor='confirmBids'>Confirm Bids</label>

          <br />
          <br />
          <button formMethod='dialog'>Close Settings</button>
        </form>

      </dialog>
    </div>
  )
}