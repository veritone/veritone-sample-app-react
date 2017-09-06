# Veritone Sample App - React

[Veritone][veri] sample app is a minimal boilerplate for creating [Veritone][veri] powered web applications ([SPA](https://en.wikipedia.org/wiki/Single-page_application)s).


### Tech Stack

* [Create React App][cra] for development and test infrastructure (see [user guide][cradocs])
* [React][react] + [Redux][redux] for UI and declarative data fetching.


### Walkthrough


* [Sample App Walkthrough][saw] – How the sample app functions.



## Quick Start

```sh
git clone https://github.com/veritone/veritone-component-boilerplate.git

cd veritone-component-boilerplate/
yarn install
yarn start
```

## Project Structure

```
veritone-component-boilerplate
├── README.md
├── node_modules
├── package.json
├── .env
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    ├── helpers
    │   ├── redux
    │   └── index.js
    │
    ├── modules
    │   ├── application
    │   ├── mediaExample
    │   └── user
    │
    ├── resources
    │   ├── veritone-hello-world.mp4
    │   └── hello-logo-white.svg
    │
    ├── shared-components
    │   ├── AppSwitcher
    │   ├── AppSwitcherErrorState
    │   ├── AppSwitcherList
    │   ├── Branding
    │   ├── ExpandingContainer
    │   ├── Footer
    │   ├── grid
    │   ├── Header
    │   ├── MediaExample
    │   ├── MediaUpload
    │   ├── MediaUploadState
    │   ├── MediaUploadStates
    │   ├── ProfileMenu
    │   ├── ProgressButton
    │   ├── RequestBar
    │   └── TopBar
    │
    ├── styles
    │   ├── modules
    │   └── vendor
    │
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

[cra]: https://github.com/facebookincubator/create-react-app
[cradocs]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[veri]: https://veritone.com/
[saw]: https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/17989665/Sample+App+Walkthrough