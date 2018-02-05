GUI headers
===========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-headers/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-headers/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-headers/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-headers/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-headers/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-headers/tests/BT/)

> Our multi-brand, responsive header components provide a flexible, accessible solution for navigation and branding. Using these headers will help to maintain a consistent application of our brand marks (size, position etc) throughout the customer journey. It’s important to note that all header components use the multi-brand logos and flex box. This makes them extremely robust and versatile.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Increased mobile header height (from 44px to 54px - excl. bottom line), increase gap above/below header buttons for mobile and ensure header logo is vertically centre aligned
		[#409](https://github.com/WestpacCXTeam/GUI-source/issues/409)
	* Added an additional fixed header breakpoint option `.header-fixed-md`
	* Made the header drop shadow styling reusable via a new mixin `._header-shadow()`
	* Added the accessible `.sr-skiplink` element as per best practice
	* Removed `.header-inner` inline-block hack (`font-size:0`) as it’s no longer needed
* v2.0.0 - `LESS/CSS` `HTML` `JS`
	* New header contact module to support 'Call us' and 'LiveChat' CTAs
	* New JS dependency; providing drop shadow feature on window scroll (for fixed option)
	* Added new fixed header modifier option `.header-fixed`
	* Added `.header-inner` wrapper; giving us more flexibility with new fixed header option
	* Fixed header button icon vertical alignment
	* Fixed logo center option horizontal alignment and updated modifier class option to `.header-logo-center-xs-only` for consistency
	* Updated logo and right button gap slightly
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-headers/master/LICENSE).

**[⬆ back to top](#content)**

# };