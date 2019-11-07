GUI Templates
===========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-templates/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-templates/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-templates/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-templates/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-templates/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-templates/tests/BT/)

> Global page templates.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v2.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Migrate to relative CSS units (a11y)
		[#456](https://github.com/WestpacCXTeam/GUI-source/issues/456)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Fixed header drop shadow rendering
		[#450](https://github.com/WestpacCXTeam/GUI-source/issues/450)
* v2.0.0 - `LESS/CSS` `HTML` `JS`
	* Updated `.header-inner`, `.sidebar-content` and sidebar backdrop overlay z-index
	* Added styling to reposition sidebar `.sr-skiplink`
	* Updated JS functionality; only add sidebar `aria-hidden` attribute if necessary (when hidden in XS & SM)
* v2.0.0-alpha - `LESS/CSS` `HTML` ~~`JS`~~
	* Fixed sticky footer functionality and fixed header center alignment in IE
		[#423](https://github.com/WestpacCXTeam/GUI-source/issues/423)
	* Moved the `.template` class from `<html>` down to `<body>` element; our new sticky footer implementation no longer requires access to `<html>` (Note: This is in the only HTML update)
		[#423](https://github.com/WestpacCXTeam/GUI-source/issues/423)
	* Templates now includes the Headers and Footers modules; which are now deprecated
		[#424](https://github.com/WestpacCXTeam/GUI-source/issues/424)
	* Renamed `.wrapper` class... now `.template-wrapper`
	* Added sidebar styling
	* Increased vertical section padding for mobile
	* Removed `.section` alternating background fill; now available as an option via `.section-fill` modifier
	* Removed the content panel (`.content-panel`) block; now provided by the new Form-Pod module
	* Adding new scroll locking utility styling
* v1.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Removed `.main-fit` modifier styling; found to be unnecessary and easily misunderstood
	* Added `.section` block styling; similar to `.main-padded` modifier styling
	* Fixed undesirable `.wrapper` edge border effect; wrapper and header now utilise available width until 1920px. Borders appear from 1922px.
	* White content panel (`.content-panel`) border-radius and border removed and top/bottom padding increased
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2019 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-templates/master/LICENSE).

**[⬆ back to top](#content)**

# };