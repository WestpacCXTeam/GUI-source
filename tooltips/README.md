GUI Tooltips
============

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-tooltips/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-tooltips/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-tooltips/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-tooltips/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-tooltips/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-tooltips/tests/BT/)

> Tool tips display when a hover event is triggered. On small devices the information is displayed inline.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* When attaching tooltips to a button element the tooltip got cut off. We explained to buttons that interrupting a well articulated tooltip is rude. Now
		tooltips won’t stop in the middle of
		[#220](https://github.com/WestpacCXTeam/GUI-source/issues/220)
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.1 - ~~`LESS/CSS`~~ `JS` ~~`HTML`~~
	* We got word that using our JavaScript in dynamic DOM application was a bit... clunky. Clunky wasn't good enough for us so we refactored all Javascript
		modules to unclunk all the things. Beware though, some JavaScript classes had to be injected to keep the modules clunk-free.
		[#140](https://github.com/WestpacCXTeam/GUI-source/issues/140)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-tooltips/master/LICENSE).

**[⬆ back to top](#content)**

# };