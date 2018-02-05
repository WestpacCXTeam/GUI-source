GUI Tabcordions
===============

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-tabcordions/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-tabcordions/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-tabcordions/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-tabcordions/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-tabcordions/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-tabcordions/tests/BT/)

> Sometimes you need to group elements either for visual structure or as a functional requirement so that you can manipulate the group. For those situations
> we’ve created several containers to get you started.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v4.1.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Updating the accordion toggle icon and removing the indicator arrow
	[#402](https://github.com/WestpacCXTeam/GUI-source/issues/402)
	* Removing top border from borderless lego accordion, as per borderless default (non-lego) accordion
* v4.1.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Updating border radius to 3px
	[#392](https://github.com/WestpacCXTeam/GUI-source/issues/392)
* v4.1.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Tweaked border and fill styling of lego accordion
		[#313](https://github.com/WestpacCXTeam/GUI-source/issues/313)
	* Added `tabcordion-accordion-borderless` modifier class to remove outer border. Useful for instances where accordion is used within a panel or other container.
* v4.1.0 - ~~`LESS/CSS`~~ ~~`HTML`~~ `JS`
	* Added support for toggle functionality for tabcordion accordion's with a single item. Previously worked with 2 or more items only.
		[#287](https://github.com/WestpacCXTeam/GUI-source/issues/287)
* v4.0.0 - `LESS/CSS` `HTML` `JS`
	* Tabcordions gain a helper. The WCAG has long been struggling with how to use arrow keys vs the tab key for keyboard users. This update is an attempt to
		help both use cases while improving the overall usability of tabs.
		[#283](https://github.com/WestpacCXTeam/GUI-source/issues/283)
	* The body of the tabcordion was transparent. We don’t have casual Friday here at the GUI headquarter and put the tabcordion in the proper attire.
		[#275](https://github.com/WestpacCXTeam/GUI-source/issues/275)
* v3.0.0 - `LESS/CSS` `HTML` `JS`
	* Tabcordions have this really neat class that makes all tabs equal heights which looks really rad! Unless it doesn’t work. Then it looks bad, less rad.
		No more.
		[#237](https://github.com/WestpacCXTeam/GUI-source/issues/237)
	* Justified tabs unjustified in the mobile breakpoint. That was deemed unjust and they now justify again! Justice served.
		[#238](https://github.com/WestpacCXTeam/GUI-source/issues/238)
	* Scrolling can now be disabled or adjusted by an offset. If you have a fixed header and need the tabcordion to scroll a little less, NOW is your time!
		[#245](https://github.com/WestpacCXTeam/GUI-source/issues/245)
	* We made improvements to our A11Y. Now all links come with underlines so you can tell them apart by color AND shape. Also A11Y means "accessibility" for all
		who were wondering.
		[#247](https://github.com/WestpacCXTeam/GUI-source/issues/247)
	* One last little big thing: We added some attributes to help screenreaders to understand what tab is open. Another win for A11Y!
		[#258](https://github.com/WestpacCXTeam/GUI-source/issues/258)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.1 - ~~`LESS/CSS`~~ `JS` `HTML`
	* We got word that using our JavaScript in dynamic DOM application was a bit... clunky. Clunky wasn’t good enough for us so we refactored all Javascript
		modules to unclunk all the things. Beware though, some JavaScript classes had to be injected to keep the modules clunk-free.
		[#140](https://github.com/WestpacCXTeam/GUI-source/issues/140)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-tabcordions/master/LICENSE).

**[⬆ back to top](#content)**

# };