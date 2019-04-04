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
* [Workflow](#workflow)
* [The module.json](#the-modulejson)
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


**[:point_up: back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Versioning

> `Ingredient` get a new version when anything changes. We try to keep HTML changes to the absolute minimum.
> Older versions will always be avaliable but might not be supported anymore.

New versions are submodules pointing to a tag in the repository of the module. Each version must be referenced in the `module.json` and the latest version
must be marked in the `package.json`. The changelog is maintained in the `Readme.md` file in each version.

The semantic versioning in the GUI follows this principle: `[HTML changes]`.`[JS changes]`.`[Less/SVG changes]` as of version `2.0.0`. New modules will start
with version `2.0.0` to clearly communicate that they follow this version principle.
The reason for this is our focus on updatability and maintainability. We want to make it easy for everyone to assess the impact of each change. HTML
changes are most difficult to implement as these changes will typically be done in a database or another larger system. Javascript changes will be easier as
you may only have to replace the `gui.min.js` file unless you integrated other js functionality with it. Lastly Less and SVG changes will be the easiest as
this typically means you just have to replace the `gui.min.css` file. We hope this makes it easier to integrate with the GUI.
_(If we introduce a new feature that comes with a new class(you could argue an HTML change) we still keep to the smallest change: 2.0.`[change]`.)_

**[:point_up: back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Run the source

> To run this repo first download, install all dependencies in the root and initialize all submodules.

To see an overview of all `Ingredient` you can run `grunt` in the root or visit the [GH-Pages](http://WestpacCXTeam.github.io/GUI-source) hosted by GitHub.

To work on a module and watch its files you can run `grunt` in each repository. Please note that you cannot make changes to any module in this repo.

**[:point_up: back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Testing ingredient

> Each `Ingredient` version has a `tests` folder that contains various html files to be tested.

You can see the tests [here](http://WestpacCXTeam.github.io/GUI-source). Note that those tests are for stress testing only. Find documentation for the GUI
on the [GEL pages](http://gel.westpacgroup.com.au/).


**[:point_up: back to top](#content)**



----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Adding ingredient

> To include a new module, create a new repo and prefix it with `GUI-` or `GUI_` for core modules.

To add this new module into the source you have to create a new folder with the same name and include each version (tagged) in a version folder. All versions
have to be noted in the `module.json`. See the boilerplate for a new module in the here: `._template/module`.

See more in [Workflow](#workflow).

**[:point_up: back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Workflow

#### Add new module

> See below the workflow for adding a new module.

1. create new repo
	1. prefix with `GUI-` or `GUI_` for core modules
	1. take files from `._template/module` folder
	1. replace `[-Module-]` with module name in `README.md`, `module.json`, `package.json`, `less/module-mixin.less`, `js/module.js`
	1. make sure `core` is up to date
	1. create the module
	1. adjust `module.json` to reflect use of `js`, `less`, `svg` etc.
	1. commit, merge `master`
	1. tag, publish tag
	1. edit release on GitHub

#### Change exisiting module

> See below the workflow for changes to a module.

1. change module
	1. `package.json` version bump
	1. `module.json` version bump
	1. `README.md` version bump
	1. make changes
	1. `README.md` whatsnew
	1. commit and push changes, reference issues with: `WestpacCXTeam/GUI-source#[issue number]`
		or reference commits with: `WestpacCXTeam/[repo name]@[commit hash]` and fix issues with: `fixed WestpacCXTeam/GUI-source#[issue number]` (nb. `fixed` keyword will automatically close the issue once merged to `master`)
	1. merge `master` (`master` powers GitHub pages)
	1. -- _Do the following after email is sent out_ --
	1. tag, publish tag
	1. edit release on GitHub

#### Run GUI repos, upload and install

> Run GUI-source and GUI-docs and upload to ubuntu server, install blender script and make sure we have 404 pages in place for transition

1. GUI-source
	1. add submodule in new version folder `git submodule add git@github.com:WestpacCXTeam/GUI-[module].git [module]/[version]`
	1. update submodule to pull files (command above does that automatically)
	1. checkout tag (should always be the latest tag)
	1. `grunt` to compile `index.html`, `GUI.json` and all READMEs
	1. _(optional)_ `grunt all` to compile `_sandbox` files
	1. commit and push `master` (`master` powers GitHub pages)
1. GUI-docs
	1. pull submodule `GUI-source-master` and update to latest master release
	1. update new submodules to pull files
	1. run `grunt new-example` to automatically add the missing `_includes/modules` and `_examples` folders
	1. make sure you have the new `_includes/modules/[module]/[version].liquid` file and updated its documentation
	1. adjust `_examples` and add whatsnew
	1. `grunt` to compile (current devBrand) and run server _(or)_ `grunt server` if you don't need to compile
	1. run blender locally `node remote/server-dev.js` from `/blender` (while GUI-docs server is running)
	1. check local copy and blend new blend if required
	1. install new GUI module(s) into the docs build (js, css, grunticon, img fallback)
	1. check new versions examples in all brands
	1. `grunt prod-all` to build the production files
	1. commit, merge `master`
	1. now make sure all modules have their tags published, GitHub releases submitted
	1. if fonts have changed make sure to upload the new webfont zip to
		[the internal hosting site](https://sites.thewestpacgroup.com.au/sites/TS1206/SitePages/Home.aspx)
1. upload files
    1. Compress all the folders found in `GUI-docs/jekyll/_site` in `docs.zip`
    1. Compress all the files and folders found in `GUI-docs/GUI-source-master` in `gui.zip`
	1. In the server: upload `gui.zip` and `docs.zip` to `/www/GUI/.temp` folder (check no version folders are empty)
	1. upload blender files (`server.js`, `.template/`, `assets/` possibly `package.json` and `.guiconfig`) [For Blender updates only]
	1. ssh into machine
	1. possibly `npm i` in `blender/remote` folder [For Blender updates only]
	1. Navigate to the `/www/GUI/.temp` folder and run: `unzip gui.zip -d ../`
	1. `forever list` [For Blender updates only]
	1. `forever restart 0` or `forever start -l blender.log --append -o blenderOut.log -e blenderError.log server.js` [For Blender updates only]
	1. `forever list` and blend something to test [For Blender updates only]
	1. Navigate to the `/www` folder and rename `construction2.html` to `construction.html` to redirect traffic to this file with nginx
	1. Navigate to the `/www/GUI` folder and run: `rm -rf BOM` | `rm -rf BSA` | `rm -rf STG` | `rm -rf WBC` | `rm -rf WBG` | `rm -rf BT`
	1. Navigate to the `/www/GUI/.temp` folder and run: `unzip docs.zip -d ../`
	1. Navigate to the `/www` folder and rename `construction.html` to `construction2.html` to direct traffic back to the site
	1. `sudo reboot` if necessary
1. email
	1. get all change messages
	1. make it entertaining AND informative
	1. be polite and appreciative
	1. check spelling and grammar
	1. ask for collaboration and ideas


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Bits & bobs

The following are a few things to remember:

* When adding a new **_fonts module** remember to add the new font zips to the shared network location (ref link in Blend index page)
* **SVGs** require some manual editing to clean up XML (aria attributes, fill replace task text, title elements etc)
* GUI-source **_sandbox** markup needs to be manually updated


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
  "hash": "f718a7d02eab6d114b8375aca7c23d98"    #checksum of this module
}
```



----------------------------------------------------------------------------------------------------------------------------------------------------------------


### Release History

> We are trying to make as little changes to the overall build as possible.

* v1.0.5 - Added new `submoduleSync` task to ensure submodule updates are sync’d between developers
* v1.0.4 - Send stress test pages to `/docs` directory
* v1.0.3 - Clean `_sandbox` icon output pre build and update `._template` files
* v1.0.2 - Automated branding with the `.guiconfig` file
* v1.0.1 - Moved all modules into submodules
* v1.0.0 - Initial build system setup

**[:point_up: back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### License

Copyright (c) 2018 Westpac. Licensed under the [GNU GPLv2](https://raw.githubusercontent.com/WestpacCXTeam/GUI-source/master/LICENSE).

**[:point_up: back to top](#content)**

# };
