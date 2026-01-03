import { GHAND_PREFIX, HANDVIEWER_PREFIX, LIN_PREFIX } from './Constants'
import { parseLin } from './Lin'
import { parseHandviewer } from './Handviewer'

// TODO: Refactor handviewer/pbn/lin import exports to their own file.

export function parseInput(gs, input) {
  var gs2 = null

  input = decodeURIComponent(input)
  console.log("decoded input: " + input)

  const linIndex = input.indexOf(LIN_PREFIX)
  const handviewerIndex = input.indexOf(HANDVIEWER_PREFIX)
  const ghandIndex = input.indexOf(GHAND_PREFIX)
  if (linIndex > -1) {
    gs2 = parseLin(input.slice(linIndex + LIN_PREFIX.length))
  } else if (handviewerIndex > -1) {
  	gs2 = parseHandviewer(input.slice(handviewerIndex + HANDVIEWER_PREFIX.length))
  } else if (ghandIndex > -1) {
  	gs2 = parseHandviewer(input.slice(ghandIndex + GHAND_PREFIX.length))
  }

  return (gs2 != null) ? gs2 : gs
}
