GUI-source
==========

> This is the repository in which we develop each element of the GUI.
> Each module is tested in isolation and put into an JSON object that keeps track of all versions.

### Content

* [General](#general)
* [Run the source](#run-the-source)
* [Testing ingredient](#testing-ingredient)
* [Versioning](#versioning)
* [Adding ingredient](#adding-ingredient)
* [The module.json](#the-module-json)
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

We got a grunt task to automate this:

```shell
cd [module folder]
grunt add
```

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

You can see the tests [here](http://WestpacCXTeam.github.io/GUI-source). Note that those tests are for stress testing only. Find documentation for the GUI
[here](http://gel.westpacgroup.com.au/).


**[⬆ back to top](#content)**



----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Adding ingredient

> In the root directory run `grunt add` and follow the prompt. Grunt will watch the namespace for you and alter you about potential conflicts.

A new folder with the the name you chose will be generated with a base template for you to start with. Make sure you edit the `module.json` and delete files
you may not need. The less files come with a basic setup that account for multibranding and the mixin setup. Make sure you don;t leave the namespacing in less
to not _contaminate_ other modules.

We got a grunt task to automate this:

```shell
cd [root]
grunt add
```

**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### The module.json

The `module.json` file that is then compiled into the GUI.json file is the engine of the GUI modular system.

```shell
{
  "ID": "moduleID",                             #the unique ID of the module
  "name": "Module name",                        #the name of the module
  "description": "some text",                   #description used in the blender
  "category": "cateogry",                       #category for blender and doc pages
  "versions": {
    "1.0.0": {                                  #listing of all versions
      "dependencies": [],                       #dependencies on any other modules?
      "js": true,                               #does this module include javascript
      "less": true,                             #does this module include less
      "svg": false,                             #does this module include svgs
      "font": false,                            #does this module include web fonts
      "size": 12                                #what's the estimated file size
    },
    "1.0.1": {
      "dependencies": [],
      "js": true,
      "less": true,
      "svg": true,
      "font": false,
      "size": 13
    },
    "1.0.2": {
      "dependencies": [],
      "js": true,
      "less": true,
      "svg": true,
      "font": true,
      "size": 27
    }
  },
  "hash": "f718a7d02eab6d114b8375aca7c23d98"    //hashsum of this module
}
```



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