Accessing the DOTA2 API

The DOTA2 API is available for free use. To acquire an API key, go to the Steam Community API key registration page at: https://steamcommunity.com/login/home/?goto=%2Fdev%2Fapikey
A Steam account is required to obtain an API key.
Complete documentation on the API is available at: https://dota2api.readthedocs.io/en/latest/

http://sharonkuo.me/dota2/index.html

For the purposes of this site, the only API responses required are hero and item details.
https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=APIKEY
http://cdn.dota2.com/apps/dota2/images/heroes/HERONAME_SUFFIX
sb.png: 59x33px small horizontal portrait
lg.png: 205x105px large horizontal portrait
full.png: 256x144px full-quality horizontal portrait
vert.jpg: 235x272px full-quality vertical portrait (note that this is a .jpg)
https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key=APIKEY&language=LANGCODE
http://cdn.dota2.com/apps/dota2/images/items/ITEMNAME_lg.png
Prefixes are dropped when accessing hero and item images.
Eg: npc_dota_hero_crystal_maiden => crystal_maiden
Eg: item_blink => blink
