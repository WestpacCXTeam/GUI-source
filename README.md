GUI-source
==========

[![Join the chat at https://gitter.im/WestpacCXTeam/GUI-source](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/WestpacCXTeam/GUI-source?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> This is the repository in which we develop each element of the GUI.
> Each module is tested in isolation and put into an JSON object that keeps track of all versions.

### Content

* [General](#general)
* [Run the source](#run-the-source)
* [Testing ingredient](#testing-ingredient)
* [Versioning](#versioning)
* [Adding ingredient](#adding-ingredient)
* [Release History](#release-history)
* [License](#license)


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### General

> We try to keep our rules simple.

We call each module `GUI Ingredient` and a compiled mix `GUI Blend`. The `GUI Blender` is provided to help you pick your mix.

1. The code is modular and built so each `Ingredient` can be blended together at will.
1. The browser/feature support philosopy is:
	1. Support new features by default.
	1. Fallback to something useable.
	1. Don't fake features that are not supported.
1. Make as little assumption as possible about the enviroment this might be used in.
1. This is primarly a CSS framework and Javascript should only be used to toggle classes.
1. A no-js fallback must be given.
1. Collaboration has to abide to the [Styleguide](https://github.com/WestpacCXTeam/GUI-source/wiki/Styleguide).


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Versioning

> `Ingredient` get a new version when HTML changes. We try to keep HTML changes to the absolute minimum.
> Older versions will always be avaliable but might not be supported anymore.

To add a new version to an `Ingredient`, just duplicate the version folder and register your new version in the `module.json`. Grunt does the rest.
(Do run `grunt` in the root folder though to generate a new version of the `GUI.json` and `index.html`)

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Run the source

> To run this repo first download and install all dependencies in the root.


```shell
cd [yourfolder]
npm install
```

To see an overview of all `Ingredient` you can run `grunt` in the root or visit the [GH-Pages](http://WestpacCXTeam.github.io/GUI-source) hosted by GitHub.

To work on a module and watch its files you can run `grunt` in each `Ingredient` directory. There is no need for a dependency install in those folders provided
you have grunt installed globally.

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Testing ingredient

> Each `Ingredient` version has a `tests` folder that contains various html files to be tested.

**[⬆ back to top](#content)**



----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Adding ingredient

> In the root directory run `grunt add` and follow the prompt. Grunt will watch the namespace for you and alter you about potential conflicts.

A new folder with the the name you chose will be generated with a base template for you to start with. Make sure you edit the `module.json` and delete files
you may not need. The less files come with a basic setup that account for multibranding and the mixin setup. Make sure you don;t leave the namespacing in less
to not _contaminate_ other modules.

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

> We are trying to make as little changes to the overall build as possible.

* v1.0.0 - Initial build system setup

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2015 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-source/master/LICENSE).

**[⬆ back to top](#content)**

# };