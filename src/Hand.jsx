import styles from './Hand.module.css';

const cardArray = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const displayCard = (c) => cardArray[c];

const numericalSort = (a, b) => b - a;
const filterSuit = (suit) => function(card) { if (card.suit == suit) return card.value; }
const isVulnerable = (vulnerability, direction) => {
  switch(vulnerability) {
    case 'none': return false
    case 'all' : return true
    case 'ns'  : return direction == 'north' ? true : direction == 'south' ? true : false
    case 'ew'  : return direction == 'east' ? true : direction == 'west' ? true : false
    default    : return false
  }
}

export default function Hand({hand, direction, active}) {
  var vulStyle = isVulnerable('all', direction) ? '{styles.vulnerable} {styles.hand}' : 'styles.hand'
  var s = []
  s.push(`${styles.hand}`)
  if (active) s.push(`${styles.active}`)
  
  return (
    <div className={s.join(' ')}>
      <div className={styles.vulnerable}>{direction}</div>
      <p>&spades; {hand.map(filterSuit('spades')).sort(numericalSort).map(displayCard)}</p>
      <p>&hearts; {hand.map(filterSuit('hearts')).sort(numericalSort).map(displayCard)}</p>
      <p>&diams; {hand.map(filterSuit('diamonds')).sort(numericalSort).map(displayCard)}</p>
      <p>&clubs; {hand.map(filterSuit('clubs')).sort(numericalSort).map(displayCard)}</p>
    </div>
  )
}
