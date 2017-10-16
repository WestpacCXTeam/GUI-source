GUI Alerts
==========

➠
[BOM](http://westpaccxteam.github.io/GUI-alerts/tests/BOM/) |
[BSA](http://westpaccxteam.github.io/GUI-alerts/tests/BSA/) |
[STG](http://westpaccxteam.github.io/GUI-alerts/tests/STG/) |
[WBC](http://westpaccxteam.github.io/GUI-alerts/tests/WBC/) |
[WBG](http://westpaccxteam.github.io/GUI-alerts/tests/WBG/) |
[BT](http://westpaccxteam.github.io/GUI-alerts/tests/BT/)

> User feedback and messaging is essential in UI design. Using a cross-brand palette of reserved, contextual colours provides a flexible, consistent message
> system for common user interactions.

----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

* v3.0.0 - `LESS/CSS` `HTML` ~~`JS`~~
  * Dependencies: GUI-buttons v4.0.0, GUI-icons v2.0.0
  * Alerts module consists of four alert types...
    * Text (alert): simple inline text styling
    * Alert: structured (block) alert without icon text wrapping (maintains left text edge)
    * Alert form: validation styling for forms
  * Changed alert close button markup structure for consistency; close icon now inside button
  * Alert close button now leverages `.btn-link`; Alerts module now has a Buttons (and Icons) dependency
  * Alert padding (right-side) is now consistent with other sides; whether or not close button exists
  * Alert body wraps around icon in XS; reducing unnecessary left-side whitespace
  * Alert body vertically aligns with icon if needed (small and xsmall disregard); also considers responsive icon sizing
  * Removed flex layout, max-height restrictions and scrolling
  * Alert form (validation) messages now support icons, font-size decreased from 13px to 12px
  * Reduced CSS specificity
    [#346](https://github.com/WestpacCXTeam/GUI-source/issues/346)
* v2.0.3 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Reduce module modifier CSS over-specificity
    [#346](https://github.com/WestpacCXTeam/GUI-source/issues/346)
  * Removed duplicated alert label styling (already in Labels module)
    [#364](https://github.com/WestpacCXTeam/GUI-source/issues/364)
* v2.0.2 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Tweaking has alert class to apply alert colour to input and textarea content so they are more visible.
  [#315](https://github.com/WestpacCXTeam/GUI-source/issues/315)
* v2.0.1 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Fanfare, Drum roll … We’ve added another brand. Yay! :clap:
* v2.0.0 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * To make it easier to switch brands with Less we’ve added a brand variable. Building multibrand sites has never been this easy!
    [#203](https://github.com/WestpacCXTeam/GUI-source/issues/203)
* v1.0.4 - `LESS/CSS` ~~`HTML`~~ ~~`JS`~~
  * Fixed flexbox bug with a handy workaround.
    [#194](https://github.com/WestpacCXTeam/GUI-source/issues/194)
  * Worked on the no-js fallback and made usability of large alerts better. Not that you should use large alert messages. Let's keep those grumpy messages
    as short as possible.
  * Icons in those handy alert messages are now tinting the way they should have right from the start.
    [#190](https://github.com/WestpacCXTeam/GUI-source/issues/190)
* v1.0.3 - `HTML` `LESS/CSS` ~~`JS`~~
  * You know the feeling when you're trying to buy a beer at the corner pub on a Friday afternoon after you've just finished a sprint that was particularly
    difficult and the alert message says: "No more funds" and you know you left the other card at home and never got around to setting up cardless cash?
    Long story short: You now get to make that alert message a bit easier on the eyes by adding icons inside of it to help make Friday afternoons fun again.
    [#177](https://github.com/WestpacCXTeam/GUI-source/issues/177)
* v1.0.2 - `JS` `HTML` ~~`LESS/CSS`~~
  * We got word that using our JavaScript in dynamic DOM application was a bit... clunky. Clunky wasn't good enough for us so we refactored all Javascript
    modules to unclunk all the things. Beware though, some JavaScript classes had to be injected to keep the modules clunk-free.
    [#140](https://github.com/WestpacCXTeam/GUI-source/issues/140)
* v1.0.1 - `LESS/CSS` ~~`JS`~~ ~~`HTML`~~
  * As the built-in faux italic cut off the descenders in alert messages, we changed the font style to a more native style.
    [#130](https://github.com/WestpacCXTeam/GUI-source/issues/130)
* v1.0.0 - Initial port

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2017 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-alerts/master/LICENSE).

**[⬆ back to top](#content)**

# };