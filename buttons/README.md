GUI Buttons
===========

➠
[BOM](http://westpaccxteam.github.io/GUI-buttons/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-buttons/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-buttons/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-buttons/tests/WBC/)

> The button design system gives you the flexibility to choose from multiple styles, sizes and configurations depending on your needs. Use the button classes
> to quickly create styled buttons, groups of buttons, dropdown buttons etc.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v1.0.3 - `LESS/CSS` ~~`JS`~~ ~~`HTML`~~
	* The button-groups got disjointed when faced with the new system font for El Capitan. We loosened them up and stretched those tired legs and arms and now
		all joints join where they should join.
		[#191](https://github.com/WestpacCXTeam/GUI-source/issues/191)
	* We integrated the new versions of checkboxes and radios into the dropdowns.
	* We noticed that icons in button groups were not tinting the way they should. This, too, has been laid to rest in bug-heaven.
		[#185](https://github.com/WestpacCXTeam/GUI-source/issues/185)
* v1.0.2 - `LESS/CSS` `JS` `HTML`
	* We got word that using our JavaScript in dynamic DOM application was a bit... clunky. Clunky wasn't good enough for us so we refactored all Javascript
		modules to unclunk all the things. Beware though, some JavaScript classes had to be injected to keep the modules clunk-free.
		[#140](https://github.com/WestpacCXTeam/GUI-source/issues/140)
	* Differently sized buttons couldn't handle differently sized icons. We thought differently and made it work.
		[#141](https://github.com/WestpacCXTeam/GUI-source/issues/141)
	* We are proud to introduce a very handy(we hope) new feature for buttons. Responsive sizes. You can now resize your buttons according to a breakpoint. Now
		go off and resize those buttons.
* v1.0.1 - `LESS/CSS` ~~`JS`~~ ~~`HTML`~~
	* All our buttons have a specific height to abide to. When you added an icon in a button however, the buttons seized the opportunity to go rouge and
		added two pixels. We sat down with them and had a heart-to-heart. Now they know better. [#131](https://github.com/WestpacCXTeam/GUI-source/issues/131)
	* The icons, set inside a soft button (also being naughty) didn't display in the font color which made it hard for us humans to see them. That too, was
		fixed. [#127](https://github.com/WestpacCXTeam/GUI-source/issues/127) [#126](https://github.com/WestpacCXTeam/GUI-source/issues/126)
	* On some handheld devices when taping and holding the button group, the active state looked cut-off and weird. Admittedly when you hold your finger on
		the screen you kind of hid the problem with your finger and it was hard for us to even find this bug but this is just another example of the extent of
		detailed work we put into this baby. [#129](https://github.com/WestpacCXTeam/GUI-source/issues/129)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2015 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-buttons/master/LICENSE).

**[⬆ back to top](#content)**

# };