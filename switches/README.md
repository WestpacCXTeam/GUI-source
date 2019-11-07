GUI Switches
============

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-switches/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-switches/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-switches/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-switches/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-switches/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-switches/tests/BT/)

> These are very simple toggle switches ideal for use in settings or preference screens. The switch can be blank or contain a simple string for example;
> yes/no, on/off etc. Please note: These switches are a fixed width. They are not for use with longs text strings.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Migrate to relative CSS units (a11y)
		[#456](https://github.com/WestpacCXTeam/GUI-source/issues/456)
  * Simplify off/on label CSS positioning
* v3.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Fixing switch layout for Firefox
    [#407](https://github.com/WestpacCXTeam/GUI-source/issues/407)
  * Ensuring sibling switches are top aligned
* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
  * Introducing our new class size naming convention of `.switch-[small|large|xlarge]` (rather than `.switch-[sm|lg|xl]`). This approach frees up the
  'xs/sm/md/lg' abbreviations to refer solely to viewport breakpoint.
    [#360](https://github.com/WestpacCXTeam/GUI-source/issues/360), [#380](https://github.com/WestpacCXTeam/GUI-source/issues/380)
  * New responsive 'sizing by breakpoint' functionality (as per Buttons v4.0.0)
    [#382](https://github.com/WestpacCXTeam/GUI-source/issues/382)
  * New `.switch-toggle` element required after `.switch-text`; markup structure now matches Radios and Checkboxes with `.[radio|checkbox|switch]-text` class referring to the form control’s visible text. This visible `.switch-text` element lives inside the Switch bounds and can be styled as needed. Use `.switch-sronly` class to hide switch text if necessary.
  * Optional Off/On element’s class `.switch-text-[off|on]` renamed; now`.switch-toggle-off` and `.switch-toggle-on`, now aligned correctly
  * New block level switches; in addition to `.switch-flip` option
  * Provided styling for :disabled and :checked states
  * Reduce CSS specificity
    [#346](https://github.com/WestpacCXTeam/GUI-source/issues/346)
* v2.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * The background of the switches have gone from light to white because that’s even lighter.
    [#221](https://github.com/WestpacCXTeam/GUI-source/issues/221)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
    [#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.1 - `LESS/CSS` `HTML` ~~`JS`~~
  * Being the new kid on the block, the switches needed a good talking to about the rules of the GUI street. All GUI kids need to be printable, have disabled
    states and behave while playing with the others. The switches promised to better and from now on hang
    around in the forms category where other like-minded GUI modules hang around. Proud parents here.
    [#155](https://github.com/WestpacCXTeam/GUI-source/issues/155), [#156](https://github.com/WestpacCXTeam/GUI-source/issues/156),
    [#153](https://github.com/WestpacCXTeam/GUI-source/issues/153)
  * We removed the buff flavour of the switches. The class sounded cool but making it look different caused more confusion than coolness.
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2019 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-switches/master/LICENSE).

**[⬆ back to top](#content)**

# };