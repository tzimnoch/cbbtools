
// https://www.bridgebase.com/tools/handviewer.html?lin=pn%7Chautbois%2C~~v3fakebot%2C~~v3fakebot%2C~~v3fakebot%7Cst%7C%7Cmd%7C3SKJ9HT94DAJ53CAKJ%2CST87HQJ62DQ94CQ84%2CSA543HKDKT72C7632%2CSQ62HA8753D86CT95%7Csv%7Co%7Crh%7C%7Cah%7CBoard%201%7Cmb%7CP%7Cmb%7CP%7Cmb%7C1N%7Can%7Cnotrump%20opener.%20Could%20have%205M.%20--%202-5%20!C%3B%202-5%20!D%3B%202-5%20!H%3B%202-5%20!S%3B%2015-17%20HCP%3B%2018-%20total%20points%7Cmb%7CP%7Cmb%7C2C%7Can%7CStayman%20--%2011-%20HCP%3B%2012-%20total%20points%7Cmb%7CP%7Cmb%7C2D%7Can%7CNo%20major%20suits%20--%202-5%20!C%3B%202-5%20!D%3B%202-3%20!H%3B%202-3%20!S%3B%2015-17%20HCP%3B%2018-%20total%20points%7Cmb%7CP%7Cmb%7C3N%7Can%7C11-%20HCP%3B%2012-%20total%20points%7Cmb%7CP%7Cmb%7CP%7Cmb%7CP%7Cpc%7CHQ%7Cpc%7CHK%7Cpc%7CHA%7Cpc%7CH4%7Cpc%7CH3%7Cpc%7CH9%7Cpc%7CHJ%7Cpc%7CD2%7Cpc%7CH6%7Cpc%7CC2%7Cpc%7CH5%7Cpc%7CHT%7Cpc%7CCA%7Cpc%7CC4%7Cpc%7CC3%7Cpc%7CC5%7Cpc%7CDA%7Cpc%7CD4%7Cpc%7CD7%7Cpc%7CD6%7Cpc%7CD3%7Cpc%7CD9%7Cpc%7CDK%7Cpc%7CD8%7Cpc%7CS3%7Cpc%7CS2%7Cpc%7CSJ%7Cpc%7CS7%7Cpc%7CSK%7Cpc%7CS8%7Cpc%7CS4%7Cpc%7CS6%7Cpc%7CS9%7Cpc%7CST%7Cpc%7CSA%7Cpc%7CSQ%7Cpc%7CS5%7Cpc%7CH7%7Cpc%7CCJ%7Cpc%7CC8%7Cpc%7CC6%7Cpc%7CC9%7Cpc%7CCK%7Cpc%7CCQ%7Cpc%7CD5%7Cpc%7CDQ%7Cpc%7CDT%7Cpc%7CH8%7Cpc%7CH2%7Cpc%7CC7%7Cpc%7CCT%7Cpc%7CDJ%7C
/*
 decoded input: https://www.bridgebase.com/tools/handviewer.html?
 lin=
   pn|hautbois,~~v3fakebot,~~v3fakebot,~~v3fakebot
   |st|
   |md|3SKJ9HT94DAJ53CAKJ,ST87HQJ62DQ94CQ84,SA543HKDKT72C7632,SQ62HA8753D86CT95
   |sv|o
   |rh|
   |ah|Board 1
   |mb|P
   |mb|P
   |mb|1N
   -- an is comment on previous bid
   |an|notrump opener. Could have 5M. -- 2-5 !C; 2-5 !D; 2-5 !H; 2-5 !S; 15-17 HCP; 18- total points
   |mb|P
   |mb|2C
   |an|Stayman -- 11- HCP; 12- total points
   |mb|P
   |mb|2D
   |an|No major suits -- 2-5 !C; 2-5 !D; 2-3 !H; 2-3 !S; 15-17 HCP; 18- total points
   |mb|P
   |mb|3N
   |an|11- HCP; 12- total points
   |mb|P
   |mb|P
   |mb|P
   |pc|HQ
   |pc|HK
   |pc|HA
   |pc|H4

   |pc|H3
   |pc|H9
   |pc|HJ
   |pc|D2

   etc.

 */
export function parseLin(input) {
  var params = input.split('|')
  for(var x = 0; x < params.length; x += 2) {
    switch (params[x]) {
    case 'pn': // player names in swne order, csv
      break;
    case 'md': // make deal in swne order, csv. Prefixed by dealer (1=s, 2=w, etc.). If only 3 hands are given, the fourth hand is implied.
      break;
    case 'sv': // set vulnerability n = ns, e = ew, b = both, o = none
      break;
    case 'ah': // acronym unknown, seems to be board name/number
      break;
    case 'mb': // make bid, d = x, r = xx, n = nt
      break;
    case 'an': // annotation
      break;
    case 'pc': // play card
      break;
    case 'st': // ?
    case 'rh': // ?
    default:
      console.log("Lin parameter: " + params[x] + ", value: " + params[x+1])
    }
  }

  return null
}
