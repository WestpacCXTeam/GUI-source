GUI Input-field
===============

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-input-fields/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-input-fields/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-input-fields/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-input-fields/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-input-fields/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-input-fields/tests/BT/)

> Inputs are the most common form controls. Text-based input fields include support for all HTML5 types: text, password, datetime, datetime-local, date, month,
> time, week, number, email, url, search, tel, and colour. The date element triggers the date selector in compliant browsers.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Changed the input field sizing classes to our new naming convention
		[#380](https://github.com/WestpacCXTeam/GUI-source/issues/380)
	* Updated input sizing and added input line-height
	* Select inputs are now block level by default as per other text inputs; use `.form-inline` wrapping for inline
	* Simplified select input markup; wrapping element (`.input-field-select-wrapper`) no longer required and SVG caret supplied via Grunticon
	* Dropped the `.input-field-select`, `.input-field-select-{size}` and `.input-field-select-wrapper` classes; simply use the common `.input-field` and 
	`.input-field-{size}` classes on all input types (input, textarea and select) 
	* Removed fieldset sizing options; sizing already available per input via sizing classes `.input-field-{size}`
	* Merged `:disabled` and `readonly` state styling; using the former’s styling
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* We added a "block" class to the selects so they can stretch as wide as the input fields stretch. No stretch marks though.
		[#186](https://github.com/WestpacCXTeam/GUI-source/issues/186)
	* IE8 and IE9 got some visual love because we care, not because they deserved it.
		[#193](https://github.com/WestpacCXTeam/GUI-source/issues/193)
* v1.0.2 - `HTML` ~~`LESS/CSS`~~ ~~`JS`~~
	* Our recent move to system fonts means we trust the system to take care of something as basic as the display of a font. Turns out you can't trust Microsoft
		with such a task as they increase the size of the font rather than just the face. We fixed that and wrote an ~~angry~~ constructive letter to Redmond.
		It's always important to vent your frustrations in a productive manner.
		[#174](https://github.com/WestpacCXTeam/GUI-source/issues/174)
* v1.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Somewhere at Microsoft a person decided that placeholder text should look like input text. Making it less placeholder text and more like... text.
		We were sure there was logic in there somewhere but we couldn't find it so we made it a tint in all browsers (including the elusive IE) to match the default
		styling of sensible browsers.
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-source/master/LICENSE).

**[⬆ back to top](#content)**

# };