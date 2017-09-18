# Veritone Sample App - React

The [Veritone][veri] sample app is a minimal boilerplate for creating [Veritone][veri] powered web applications ([SPA](https://en.wikipedia.org/wiki/Single-page_application)s).


### Tech Stack

* [Create React App][cra] for development and test infrastructure (see [user guide][cradocs])
* [React][react] + [Redux][redux] for UI and declarative data fetching.


### Walkthrough

* [Sample App Walkthrough][saw] – How the sample app functions.


### Quick Start
* Clone this repo and install the dependencies
```sh
git clone https://github.com/veritone/veritone-sample-app-react.git
cd veritone-sample-app-react/
yarn install
```

* If you don't already have a local development alias in your `hosts` file, create one.
  * edit `/etc/hosts` with `sudo` using your preferred text editor
  * add: `127.0.0.1   local.veritone-sample-app.com`

* [Create a Veritone developer account](https://www.veritone.com/onboarding/#/signUp?type=developer) if you don't already have one.

* [Register a new Veritone application](https://developer.veritone.com/applications/overview/new/details).
  * URL: use the URL you added to `hosts`, with port `3000`
    * for example: `http://local.veritone-sample-app.com:3000`
  * Oauth2 Redirect URL: use the url you added to `hosts`, with port `3000` and path `/auth/veritone/callback`
    * for example: `http://local.veritone-sample-app.com:3000/auth/veritone/callback`

* In the files `.env` and `.env.development`, fill in the CLIENT_ID, CLIENT_SECRET and CALLBACK_URL fields. These can be found by going to https://developer.veritone.com/applications and clicking your application in the table. The fields are shown underneath the application name at the top of the page.

* Start the development server
```sh
yarn start
```



### Requirements
* node `^6.4.0`
* yarn `^0.24.5` or npm `^3.10.3`

You can use [nvm](https://github.com/creationix/nvm#installation) to easily switch Node versions between different projects.


### Installation

We recommend using [Yarn](https://yarnpkg.com/) for dependency management, but `npm install` will suffice.

```bash
$ yarn install # Install project dependencies (or `npm install`)
```

### Running the Project

```bash
$ yarn start  # Start the development server (or `npm start`)
```

**We recommend using the [Redux DevTools Chrome Extension][rdce].**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

### Running the Tests


```bash
$ yarn test  # Run the tests (or `npm run test`)
```

### Building for Production


```bash
$ yarn build  # Build production assets (or `npm run build`)
```



[cra]: https://github.com/facebookincubator/create-react-app
[cradocs]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[veri]: https://veritone.com/
[saw]: https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/17989665/Sample+App+Walkthrough
[rdce]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
