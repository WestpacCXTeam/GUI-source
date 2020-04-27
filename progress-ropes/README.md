GUI Progress Ropes
===========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-progress-ropes/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-progress-ropes/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-progress-ropes/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-progress-ropes/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-progress-ropes/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-progress-ropes/tests/BT/)

> A detailed visual indication of progress. Use to indicate how far along the user is in a journey. Progress-Ropes plays nicely with Templates.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v2.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* Added further accessibility features required to meet WCAG 2.1 AA
		[#456](https://github.com/WestpacCXTeam/GUI-source/issues/456)
		* Updated group and step styling to improve visual indication of current state (not relying on colour alone)
		* Group toggle button heading element wrapping; provides navigation shortcut for screen reader users
		* Visually hidden (screen reader only) text appended to group and step text; announces current state to screen reader users
		* ARIA attributes (`aria-controls` and `aria-expanded`) added to group toggles
		* Final review step moved into ordered list
* v1.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Migrate to relative CSS units (a11y)
		[#456](https://github.com/WestpacCXTeam/GUI-source/issues/456)
* v1.0.0 - `LESS/CSS` ~~`HTML`~~ `JS`
	* Removed programmatic focus setting on group body; focus remains on the group toggle
	* Removed `aria-selected` attribute; not required by the ARIA design pattern
	* Updated focus outline to use global styling; provided by _Text-Styling module
	* Removed styling for step links as buttons; simply use link `<a>` elements
	* Updated future step markup for better screen reader and keyboard user support; ideally ’disabled links’ (divs) until actived
	* Added a simple active step marker for high contrast mode users
* v1.0.0-alpha - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2019 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-progress-ropes/master/LICENSE).

**[⬆ back to top](#content)**

# };