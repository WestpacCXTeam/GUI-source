GUI Tables
==========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-tables/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-tables/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-tables/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-tables/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-tables/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-tables/tests/BT/)

> Financial services use tables a lot. Tables should only be used for rendering data that belongs naturally in a grid, in other words where the data
> describes a number of objects that have the same properties.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v2.0.5 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Migrate to relative CSS units (a11y)
		[#456](https://github.com/WestpacCXTeam/GUI-source/issues/456)
* v2.0.4 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Removed row hover styling for `.table-striped` tables. The row hover background colour fill is provided to help when scanning across the row, but striped
	tables provide this anyway without hovering.
		[#377](https://github.com/WestpacCXTeam/GUI-source/issues/377)
* v2.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Re-mapped BT brand’s table header border colour (previous variable is deprecated)
		[#370](https://github.com/WestpacCXTeam/GUI-source/issues/370)
* v2.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* The striped styling option for tables has been modified to start on the second, rather than first, row of the table body.
		[#314](https://github.com/WestpacCXTeam/GUI-source/issues/314)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
	* The highlighting of the first cell would be cut off on mobile in bordered tables. We wanted to highlight that we fixed that.
		[#210](https://github.com/WestpacCXTeam/GUI-source/issues/210)
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2019 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-tables/master/LICENSE).

**[⬆ back to top](#content)**

# };