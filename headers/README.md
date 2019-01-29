GUI headers
===========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-headers/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-headers/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-headers/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-headers/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-headers/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-headers/tests/BT/)

> ⚠️ **IMPORTANT!** This module is deprecated and merged into Templates as from v2.0.0. Please refer to [GUI-templates](https://github.com/WestpacCXTeam/GUI-templates) for new projects.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* Improved A11Y of graphic links; `.sr-only` text added to logo links
	* Removed unnecessary embedded SVG setting (`data-grunticon-embed`) from logos. We are aiming to use the embedded option sparingly as per recommendation (see [Grunticon v2.0 What’s New!](https://github.com/filamentgroup/grunticon#version-20-is-out---heres-whats-new)). This option should only be used with SVGs requiring CSS styling.
	* Increased mobile header height (from 44px to 54px - excl. bottom line), increase gap above/below header buttons for mobile and ensure header logo is vertically centre aligned
		[#409](https://github.com/WestpacCXTeam/GUI-source/issues/409)
	* Added an additional fixed header breakpoint option `.header-fixed-md`
	* Made the header drop shadow styling reusable via a new mixin `._header-shadow()`
	* Added the accessible `.sr-skiplink` element as per best practice
	* Removed `.header-inner` inline-block hack (`font-size:0`) as it’s no longer needed
	* Ensure fixed header always has a bottom border for <=IE9 (as linear-gradient not available)
	* Changed header button (arrow) icons to the default (medium) size; was sized large from sm breakpoint (`.icon-large-sm`)
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

Copyright (c) 2019 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-headers/master/LICENSE).

**[⬆ back to top](#content)**

# };