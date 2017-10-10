GUI Icons
=========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-icons/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-icons/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-icons/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-icons/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-icons/tests/WBC/) |
[BT](http://westpaccxteam.github.io/GUI-icons/tests/BT/)

> This library of icons is intended for use across all of our brands and user interfaces. They are designed to aid navigation and legibility. The use of
> icons purely as page embellishment is not recommended and in some cases will be off brand. These icons are implemented as scalable vector graphics (SVGs)
> with PNG fallbacks for older browsers. Using SVGs ensures the highest quality rendering on all devices, allows us to style the icons using code and also
> complies with AA accessibility requirements.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v2.0.0 - `SVG` `LESS/CSS` `HTML` ~~`JS`~~
	* Updated the SVG icon design, including a number of brand new icons
  * Updated the `.icon-loading` and `.icon-loading-inverse` animated icons; IE8&9 now use a simple clock icon
	* Introducing our new class size naming convention of `.icon-[xsmall|small|large|xlarge]` (rather than `.icon-size-[sm|md|lg]`). This approach frees up the 
  'xs/sm/md/lg' abbreviations to refer solely to viewport breakpoint.
		[#360](https://github.com/WestpacCXTeam/GUI-source/issues/360)
	* New icon designs are designed for optimal rendering for the above sizes; snapping to the pixel grid where possible
  * New responsive 'sizing by breakpoint' options using `.icon-{size}-{breakpoint}` and `.icon-{size}-{breakpoint}-only` classes (as per Buttons v4.0.0)
    [#382](https://github.com/WestpacCXTeam/GUI-source/issues/382)
  * Icons are now vertically aligned to the middle by default
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-icons/master/LICENSE).

**[⬆ back to top](#content)**

# };