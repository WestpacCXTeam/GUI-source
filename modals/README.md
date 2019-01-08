GUI Modals
==========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-modals/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-modals/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-modals/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-modals/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-modals/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-modals/tests/BT/)

> Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults. Modals should be easy to digest so that the user can quickly get back to what they were doing. Set the initial width of your modal depending on the amount of content you are showing.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Increased modal z-index; modals should sit above everything
* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* Dependencies: Buttons v4.0.0, Icons v2.0.0
	* Changed the modal sizing classes to our new naming convention
		[#380](https://github.com/WestpacCXTeam/GUI-source/issues/380)
	* Changed Modal close button markup structure for consistency; close icon now inside button
	* Renamed `.modal-header-close` to `.modal-close`; implementation similar to Alert close button
	* Adjusted modal padding and increased footer buttons gap
	* Reduced CSS specificity
* v2.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Changed modal header title text colour to default text colour.
		[#317](https://github.com/WestpacCXTeam/GUI-source/issues/317)
* v2.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* We removed the border around the modal. Why? Because you couldn’t see it.
		[#240](https://github.com/WestpacCXTeam/GUI-source/issues/240)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* The headline in modals was hanging a bit low. We put it up again, tucked it’s shirt in and ironed it’s pants. Now the modal is presentable again.
		[#219](https://github.com/WestpacCXTeam/GUI-source/issues/219)
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

Copyright (c) 2018 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-modals/master/LICENSE).

**[⬆ back to top](#content)**

# };