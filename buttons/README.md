GUI Buttons
===========

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other
module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-buttons/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-buttons/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-buttons/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-buttons/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-buttons/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-buttons/tests/BT/)

> The button design system gives you the flexibility to choose from multiple styles, sizes and configurations depending on your needs. Use the button classes
> to quickly create styled buttons, groups of buttons, dropdown buttons etc.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v4.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* Dependency: GUI-icons v2.0.0
	* Reduced border radius; relative to font size, from 6px to 3px for default buttons (slightly more/less depending on button size)
	* Increased horizontal padding; relative to font size
	* Button link has underlining on :hover, now supports disabled state and is now inline-block (was inline)
	* Button :focus styling removed (used to match :active styling)
	* Changed the button sizing classes to our new naming convention, incl. Button groups and Button dropdowns
		[#380](https://github.com/WestpacCXTeam/GUI-source/issues/380)
	* Extended the `.btn-{size}-{breakpoint}` responsive 'sizing by breakpoint' implementation; now with a 'breakpoint only' option using `.btn-{size}-{breakpoint}-only` classes
		[#382](https://github.com/WestpacCXTeam/GUI-source/issues/382)
	* Block buttons (`.btn-block`) with icons now have text and icons against the left/right edge (nb. must use `.btn-text` and `.btn-icon` classes)
		[#383](https://github.com/WestpacCXTeam/GUI-source/issues/383)
	* Buttons now utlilise the new icon design sizes from Icons v2.0.0
	* Button icon sizing options removed; icons are now sized automatically to suit the button size (using Icons v2.0.0)
	* Buttons with icons must use `.btn-text` and `.btn-icon` classes; gap now consistent whether button is on left or right, alignment determined by markup order (nb. icon on the right is preferred)
	* Adjusted button text/icon gap (nb. ensure there is a space between button icon and text spans for correct gap width)
		[#378](https://github.com/WestpacCXTeam/GUI-source/issues/378)
	* Optimised Dropdown button caret to work with default and block button dropdown alignment options, automatically coloured to match text color and removed
	`.btn-dropdown-caret` span from markup (this element is no longer required)
	* Fixed `.btn-link` sizing/alignment; now consistent with other buttons
	* New `.btn-tight` modifier which strips the horizontal padding of buttons, useful for `.btn-link` buttons
	* Button group block and Button dropdown block classes now `.btn-group-block` and `.btn-dropdown-block` respectively; for naming consistency
	* Button group CSS simplified; border radius managed by `.btn` class
	* Button group leading line text class now `.btn-group-text` (was `.btn-group-line`) and padding gap added
	* All block buttons and leading line button groups (`.btn-group-wrapper`) can now be stacked; top margin used for separation
	* Reduced CSS specificity
    [#346](https://github.com/WestpacCXTeam/GUI-source/issues/346)
* v3.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Changed 'faint' button style background color from @color-Background to @color-Light.
		[#311](https://github.com/WestpacCXTeam/GUI-source/issues/311)
* v3.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Resolved issue where radio/checkbox inputs were visible in dropdowns on iOS. Also resolved some minor alignment issues with radio/checkbox dropdowns.
		[#299](https://github.com/WestpacCXTeam/GUI-source/issues/299)
* v3.0.1 - `LESS/CSS` `HTML` ~~`JS`~~
	* Link buttons did not like icons but icons liked buttons and wanted to make it work. After an intense couples therapy both now get along just fine.
		[#264](https://github.com/WestpacCXTeam/GUI-source/issues/264)
	* When we call a button faint and soft we might as well use the muted text color to show the full submissiveness of this variation.
		[#265](https://github.com/WestpacCXTeam/GUI-source/issues/265)
	* We found a little known behaviour difference between the HTML button tag and the HTML anchor tag. They take the same CSS but apply it differently.
		Pixel perfect as we are, this has now been fixed after a three day pixel-pushing session. This kind of work is only possible in a design system. ✊
		[#272](https://github.com/WestpacCXTeam/GUI-source/issues/272)
* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
	* The dropdowns got an upgrade to uber-status. The Button-groups also got a new style for when you have a line of text preceding it. We are not sure which
		of the two we are most excited about.
		[#261](https://github.com/WestpacCXTeam/GUI-source/issues/261)
	* We made improvements to our A11Y. Now all links come with underlines so you can tell them apart by color AND shape. Also A11Y means "accessibility" for all
		who were wondering.
		[#247](https://github.com/WestpacCXTeam/GUI-source/issues/247)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* Buttons can be links and links can be buttons. We are THAT progressive. It’s just when a keyboard user focuses on a link the link-button would display it’s
		text white on white background. That’s the opposite of accessibility. Tis no more!
		[#216](https://github.com/WestpacCXTeam/GUI-source/issues/216)
	* Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
	* To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
		[#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.3 - `LESS/CSS` ~~`JS`~~ ~~`HTML`~~
	* The button-groups got disjointed when faced with the new system font for El Capitan. We loosened them up and stretched those tired legs and arms and now
		all joints join where they should join.
		[#191](https://github.com/WestpacCXTeam/GUI-source/issues/191)
	* We integrated the new versions of checkboxes and radios into the dropdowns.
	* We noticed that icons in button groups were not tinting the way they should. This, too, has been laid to rest in bug-heaven.
		[#185](https://github.com/WestpacCXTeam/GUI-source/issues/185)
* v1.0.2 - `LESS/CSS` `JS` `HTML`
	* We got word that using our JavaScript in dynamic DOM application was a bit... clunky. Clunky wasn’t good enough for us so we refactored all Javascript
		modules to unclunk all the things. Beware though, some JavaScript classes had to be injected to keep the modules clunk-free.
		[#140](https://github.com/WestpacCXTeam/GUI-source/issues/140)
	* Differently sized buttons couldn’t handle differently sized icons. We thought differently and made it work.
		[#141](https://github.com/WestpacCXTeam/GUI-source/issues/141)
	* We are proud to introduce a very handy(we hope) new feature for buttons. Responsive sizes. You can now resize your buttons according to a breakpoint. Now
		go off and resize those buttons.
* v1.0.1 - `LESS/CSS` ~~`JS`~~ ~~`HTML`~~
	* All our buttons have a specific height to abide to. When you added an icon in a button however, the buttons seized the opportunity to go rouge and
		added two pixels. We sat down with them and had a heart-to-heart. Now they know better. [#131](https://github.com/WestpacCXTeam/GUI-source/issues/131)
	* The icons, set inside a soft button (also being naughty) didn’t display in the font color which made it hard for us humans to see them. That too, was
		fixed. [#127](https://github.com/WestpacCXTeam/GUI-source/issues/127) [#126](https://github.com/WestpacCXTeam/GUI-source/issues/126)
	* On some handheld devices when taping and holding the button group, the active state looked cut-off and weird. Admittedly when you hold your finger on
		the screen you kind of hid the problem with your finger and it was hard for us to even find this bug but this is just another example of the extent of
		detailed work we put into this baby. [#129](https://github.com/WestpacCXTeam/GUI-source/issues/129)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-buttons/master/LICENSE).

**[⬆ back to top](#content)**

# };