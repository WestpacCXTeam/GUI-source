GUI Input-groups
================

***This repo is part of the [Westpac GUI](http://gel.westpacgroup.com.au/GUI/) and is setup as a submodule. Please submit any issues with this or any other module in our [GUI-source repo](https://github.com/WestpacCXTeam/GUI-source/issues)***

➠
[BOM](http://westpaccxteam.github.io/GUI-input-groups/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-input-groups/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-input-groups/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-input-groups/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-input-groups/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-input-groups/tests/BT/)

> Styled input fields with attached attributes (i.e. $ or %) or buttons/selects.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Dependencies: GUI_colors v3.0.2, GUI-input-fields v3.0.1
  * Mapped new border colour `@color-BorderDark` from Colors v3.0.2
    [#433](https://github.com/WestpacCXTeam/GUI-source/issues/433)
* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
  * Dependency: GUI-input-fields v3.0.0
  * Input Groups now includes Input Addons (`GUI-input-addons` is now deprecated)
  * Input Groups are block by default (as per simple Input fields); wrap Input Groups with `.form-inline` for inline
  * Simplified approach to Input groups with simple text addons (`.input-group-addon`) and Input groups with button/select addons (`.input-group-control`)
  * Removed `.input-addon-flip` option; simply reorder group addon elements
  * Updated button sizing styling to our new naming convention (in Button v4.0.0)
    [#380](https://github.com/WestpacCXTeam/GUI-source/issues/380)
  * Removed the hidden label from inside the input group; use `.sr-only` label outside the input group, linked by 'for' attribute (or simply wrap all in a label) for accessibility
  * Better handle input field :focus border beside other inputs
  * Fixed input group addon vertical alignment
  * Multiple addons are now supported
  * Input and addon CSS simplified
  * Reduced CSS specificity
    [#346](https://github.com/WestpacCXTeam/GUI-source/issues/346)
* v2.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Changed addon background colour from @color-Background to @color-Light.
    [#309](https://github.com/WestpacCXTeam/GUI-source/issues/309)
* v2.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * The input-groups historically caused issues by refusing to dynamically size its width. Let’s not look back to those dark times but focus on the fact that we’ve fixed it now.
    [#239](https://github.com/WestpacCXTeam/GUI-source/issues/239)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
    [#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
  * On Safari, not to name and shame any browser (#SafariIsTheNewIE), elements showed some space between each other even though all other browsers totally got what we wanted. The elements wanted to be together as they all grew up together so we had to explain that to Safari. After a little discussion about the merits of a tight family even Safari couldn’t deny the cuddling.
    [#205](https://github.com/WestpacCXTeam/GUI-source/issues/205)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2018 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-input-groups/master/LICENSE).

**[⬆ back to top](#content)**

# };