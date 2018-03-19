GUI Text-styling
================

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI_text-styling/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI_text-styling/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI_text-styling/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI_text-styling/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI_text-styling/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI_text-styling/tests/BT/)

> All HTML headings, are available. h1 through to h6 classes are also available, for when you want to match the font styling of a heading while maintaining
> inline display. The default spacing used in these headings may not be suitable in all cases. Use the margin classes to adjust spacing above and below
> headings.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v4.0.4 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Ensure OpenType ligatures are enabled for IE (modern browsers do this by default)
* v4.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Removed `body` element `background-color` setting for simplicity; it was never our intention for GUI to enforce a website background colour. Removing this setting makes things clearer.
		[#376](https://github.com/WestpacCXTeam/GUI-source/issues/376)
	* Removed redundant `a` plain link `background-color` and text `color` styling
	* Added default `label` styling; now inline-block and has bottom margin spacing
* v4.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Remapped BT’s text selection colour as we’re deprecating the previous colour variable
	* Added colour styling of heading elements, utilising the Colors module’s new `@color-Heading` variable.
* v4.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Normalize was overriding the body font-family for button, input, textarea, select and optgroup by setting font-family to san-serif. The change applies the same font-family as body to these elements specifically to override normalize.
		[#306](https://github.com/WestpacCXTeam/GUI-source/issues/306)
* v4.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* We have removed the classes for headlines. Wow. I know! The thing was, they were not really useful and more overwritten than used as is. Now you can go and run your own headlines. Prettier, more your.
		[#277](https://github.com/WestpacCXTeam/GUI-source/issues/277)
	* Updated the normalize CSS to v4.2.0. (Everything is now even more normal)
* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* Headlines caused a lot of confusion. We showed tags in the examples, developers knew they should us the classes so we removed the tags from the selectors. Less shenanigans, more classes.
		[#251](https://github.com/WestpacCXTeam/GUI-source/issues/251)
	* We nudged the spacing of the paragraphs ever so slightly. This should be better now. Definitely! Maybe.
		[#253](https://github.com/WestpacCXTeam/GUI-source/issues/253)
	* We made improvements to our A11Y. Now all links come with underlines so you can tell them apart by color AND shape. Also A11Y means "accessibility" for all who were wondering.
		[#247](https://github.com/WestpacCXTeam/GUI-source/issues/247)
	* We started working on even better A11Y. Something we are passionate about. A11Y that is, not working in general.
		[#214](https://github.com/WestpacCXTeam/GUI-source/issues/214)
		[#241](https://github.com/WestpacCXTeam/GUI-source/issues/241)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
	* We’ve updated to normalizer 4.0 which comes with juicy new fixes and normalizations. (Yes! That’s a thing)
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
	* We have added support to the lesser known, but still wildly attractive HTML5 tags `<mark>`, `<del>` and `<ins>`.
* v1.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* The core two modules `_fonts` and `_text-styling` had a bit of a fight about who sets the font-family variable. This went on for a bit unnoticed until we made them sit together in timeout. Now `_text-styling` totally understands that everything font should be handled by `_fonts` and they are best buddys again. sheesh kids... right?!
		[#163](https://github.com/WestpacCXTeam/GUI-source/issues/163)
* v1.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* BIG BOM brand change. All new colours, all new look, all new GUI. Brace yourselfs.
		[#157](https://github.com/WestpacCXTeam/GUI-source/issues/157)
* v1.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Being all accessible means we highlight links when they are focused for better readability. We still do it but now only for keyboard users. We also added styling for text selection. Now more trendy, more brandy.
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI_text-styling/master/LICENSE).

**[⬆ back to top](#content)**

# };