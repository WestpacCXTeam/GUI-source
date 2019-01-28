GUI Symbols
===========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-symbols/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-symbols/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-symbols/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-symbols/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-symbols/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-symbols/tests/BT/)

> These symbols are commonly used in WBC user interfaces. They are implemented as scalable vector graphics (SVGs) with PNG fallbacks for older browsers. Using requirements.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.2 - `SVG` `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* New PayID symbol added... `.symbol-payid`
* v3.0.1 - `SVG` `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Updated the Apple Store symbol and added an inverse option
	* New BPay symbols added... `.symbol-bpay-port` and `.symbol-bpay-land`
	* Optimised CSS; combined symbol dimension settings where possible
* v3.0.0 - `SVG` `LESS/CSS` `HTML` ~~`JS`~~
	* `.symbol-logo-alt` multi-brand logo deprecated
	* Multi-brand logos moved to Logos module... now `.logo-multibrand-small` and `.logo-multibrand-large`
		[#333](https://github.com/WestpacCXTeam/GUI-source/issues/333)
	* Symbols now shared between all brands (duplicate SVGs no longer maintained per brand)
	* Reduce CSS over-specificity
* v2.0.5 - `SVG` `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* New Instagram, Slack and Yammer social symbols added
		[#330](https://github.com/WestpacCXTeam/GUI-source/issues/330)
		[#260](https://github.com/WestpacCXTeam/GUI-source/issues/260)
	* Social symbols updated (Facebook, Google Plus, LinkedIn, Twitter and YouTube)
	* Renamed Mastercard (vertical) symbol ensuring legacy class name support
	* Reverted to pre-v2.0.4 Mastercard symbol class names `.symbol-master-card` and `.symbol-master-card-*` (with dashes)
* v2.0.4 - `SVG` `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Updating the Google Plus icon.
		[#322](https://github.com/WestpacCXTeam/GUI-source/issues/322)
	* Removing the old and adding new Mastercard symbols.
		[#307](https://github.com/WestpacCXTeam/GUI-source/issues/307)
	* Updating the Visa symbol and adding 2 new Visa symbols.
		[#324](https://github.com/WestpacCXTeam/GUI-source/issues/324)
* v2.0.3 - `SVG` `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Updating the Google Play badge.
		[#293](https://github.com/WestpacCXTeam/GUI-source/issues/293)
	* Adding full colour social network icons.
		[#294](https://github.com/WestpacCXTeam/GUI-source/issues/294)
* v2.0.2 - `SVG` ~~`LESS/CSS`~~ ~~`HTML`~~ ~~`JS`~~
	* Part of the STG logos where not showing. We really want all parts of the logos showing so we gave it a pep-talk.
		[#254](https://github.com/WestpacCXTeam/GUI-source/issues/254)
* v2.0.1 - `SVG` ~~`LESS/CSS`~~ ~~`HTML`~~ ~~`JS`~~
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
	* We fixed some of the SVG code to make them even better.
* v2.0.0 - `SVG` `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
	* All SVGs now come with a unique title ID. That may not sound like much but SVGs are very particular about their individualism.
		[#204](https://github.com/WestpacCXTeam/GUI-source/issues/204)
* v1.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* BIG BOM brand change. All new colours, all new look, all new GUI. Brace yourselfs.
		[#157](https://github.com/WestpacCXTeam/GUI-source/issues/157)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2019 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-symbols/master/LICENSE).

**[⬆ back to top](#content)**

# };