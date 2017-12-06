# Veritone Sample App - React

The [Veritone][veri] sample app is a minimal boilerplate for creating [Veritone][veri] powered web applications ([SPA](https://en.wikipedia.org/wiki/Single-page_application)s).

### Tech Stack
* [Create React App][cra] for development and test infrastructure (see [user guide][cradocs])
* [React][react] + [Redux][redux] for UI and declarative data fetching.

### Walkthrough
* [Sample App Walkthrough][saw] – How the sample app functions.

### Requirements
* node `^6.4.0`
* yarn `^0.24.5` or npm `^3.10.3`

You can use [nvm](https://github.com/creationix/nvm#installation) to easily switch Node versions between different projects.

### Installation
We recommend using [Yarn](https://yarnpkg.com/) for dependency management, but `npm install` will suffice.

```bash
$ yarn install # Install project dependencies (or `npm install`)
```

### Quick Start
* Clone this repo and install the dependencies
```sh
git clone https://github.com/veritone/veritone-sample-app-react.git
cd veritone-sample-app-react/
yarn install
```

* Create a local development alias in your `hosts` file for the new app.
  * edit `/etc/hosts` with `sudo` using your preferred text editor
  * add: `127.0.0.1   local.veritone.com`

* [Create a Veritone developer account](https://www.veritone.com/onboarding/#/signUp?type=developer) if you don't already have one.

* [Register a new Veritone application](https://developer.veritone.com/applications/overview/new/details).
  * URL: `http://local.veritone.com:3000`
  * Oauth2 Redirect URL: `http://local.veritone.com:3000/auth/veritone/callback`

* In the files `.env` and `.env.development`, fill in the CLIENT_ID, CLIENT_SECRET and CALLBACK_URL fields. These can be found by going to https://developer.veritone.com/applications and clicking your application in the table. The fields are shown underneath the application name at the top of the page.

* Start the development server
```sh
yarn start
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

# License
Copyright 2017, Veritone Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
