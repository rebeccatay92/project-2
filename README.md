Magic Mango --- DOTA 2 Hero Builds
==================================
### Concept:
DOTA 2 is a popular game with a complicated character equipment system.
In the heat of battle, thinking of the next item to buy can be troublesome.
Most players thus follow specific builds depending on the situation.
Taking inspiration from sites like [www.dotabuff.com] and [www.dotafire.com], this site is to provide a place for users to create and save hero builds.

### Features:

Live Links
==================================
Repo: https://github.com/rebeccatay92/project-2

Site: https://magicmango.herokuapp.com/

Setting up
==================================

Wireframes
==================================
![Homepage and Login]()

![Viewing builds and creating new builds]()
In the view by heroes page, the user should be able to click on a specific hero and see builds from all users for that particular hero.
When creating a new build, users will select their hero from a dropdown, give their build a title, and add items by clicking on pictures of the items.

Models
==================================
![ERD] (https://github.com/rebeccatay92/project-2/blob/master/imgs/ERD.png)
Accessing the DOTA2 API
==================================
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

Issues to fix
==================================
