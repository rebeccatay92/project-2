Magic Mango --- DOTA 2 Hero Builds
==================================
DOTA 2 is a popular game with a complicated character equipment system.

In the heat of battle, thinking of the next item to buy can be troublesome. Most players thus follow specific builds depending on the situation.

Taking inspiration from sites like https://www.dotabuff.com and https://www.dotafire.com, this site is to provide a place for users to create and save hero builds.

Live Links
==================================
Repo: https://github.com/rebeccatay92/project-2

Site: https://magicmango.herokuapp.com/

Setting up
==================================

User Stories
==================================
All visitors to the site can access the homepage and 'view by heroes' page.

Only logged in users can view the pages for 'saved builds', 'creating new builds' and 'update build'.

In the view by heroes page, the user should be able to click on a specific hero and see builds from all users for that particular hero.

When creating a new build, users will select their hero from a dropdown, give their build a title, and add items by clicking on pictures of the items.

In the 'manage builds' page, users will be able to see all builds that they have created and saved. Each build will have edit and delete buttons.

Users can delete builds just by clicking on the delete. Users will be asked to confirm deletion.

Users that click on the edit button will be redirected to an 'update' page. The update page cannot be accessed through the navigation bar.

The update page has pre-filled build data based on which build the user clicked. Hero is not editable, but title and items are.

Wireframes
==================================
![Homepage and Login](https://github.com/rebeccatay92/project-2/blob/master/imgs/homepage.jpg)

![Viewing builds and creating new builds](https://github.com/rebeccatay92/project-2/blob/master/imgs/builds.jpg)

Models
==================================
![ERD] (https://github.com/rebeccatay92/project-2/blob/master/imgs/ERD.png)

There will be two models: User and Build. User can have zero or many builds. Each Build can only belong to one user (it's creator).

Builds are referenced in Users. Each user will have an array `builds[ ]`, that contains build IDs.

Accessing the DOTA2 API
==================================
The DOTA2 API is available for free use. To acquire an API key, go to the Steam Community API key registration page at: https://steamcommunity.com/login/home/?goto=%2Fdev%2Fapikey
A Steam account is required to obtain an API key.

Complete documentation on the API is available at: https://dota2api.readthedocs.io/en/latest/

We will be requiring API responses for hero and item details, and extracting the hero/item name and images.

Returns a JSON object with all heros currently available
https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=APIKEY
http://cdn.dota2.com/apps/dota2/images/heroes/HERONAME_lg.png

Returns a JSON object with all items currently available.
https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key=APIKEY
http://cdn.dota2.com/apps/dota2/images/items/ITEMNAME_lg.png

Prefixes are dropped when accessing images.
For example, the JSON object for hero name returns `npc_dota_hero_crystal_maiden`. We access the image url through
`http://cdn.dota2.com/apps/dota2/images/heroes/crystal_maiden_lg.png`. Similarly for items, `item_blink` is accessed with `blink_lg.png`

Issues to fix
==================================
Basic column layout was done with Bulma. Need to fill in CSS styling

Need to add a search function for items so users can quickly find what they need.

In both view by heroes and manage pages, builds should be grouped by hero instead of displayed in the order they were created. Eg. instead of `sniper`, `crystal maiden`, `sniper`. Display all `sniper` builds together.
