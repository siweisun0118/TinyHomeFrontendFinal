# Tiny Home Frontend
This frontend is meant to be run together with the API implementation (located at https://github.com/siweisun0118/TinyHomeWebAPIFinal). This is the React frontend for a To-Do list application.

## Setup
#### Linux/WSL
Install `nodejs` from the command line. This frontend was built against Node 24, and some dependencies will not work on earlier versions.
```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

Do not use `sudo apt install nodejs` without adding `nodesource` first: many versions of `apt` ship with an older version of Node that will not work.

#### Windows
Install Node 24 from Command Prompt or PowerShell:
```
winget install -e --id OpenJS.NodeJS.LTS --version 24.11.0
```

##### Verify Install
Verify the installation with `node -v` (should be `v24.X.X`). Then, verify that `npm` was correctly bundled with the installation using `npm -v` (should be `11.X.X`).

Now that `npm` is ready, install the necessary dependencies with `npm ci`. This will pull in `react 19`, `react-dom 19` and `react-datepicker 9` (used to implement the calendar) at runtime, plus `vite`, `typescript 6`, `eslint 10` and `typescript-eslint` for development.

## Run
After verifying, clone the repo and cd into it:
```bash
git clone https://github.com/siweisun0118/TinyHomeFrontendFinal.git
cd TinyHomeFrontendFinal
```

Make sure the API service is already running on port 5190 (this port is hardcoded into `src/api.ts:4`). Then, from a separate terminal than the one running the API service, start the frontend using
```bash
npm run dev
```
By default, the frontend will run on port `5173`, and the page can be accessed at `localhost:5173`.

The other utility scripts included with the package are:
```bash
npm run build      # tsc --noEmit, then a production build into dist/
npm run typecheck  # types only
npm run lint       # eslint
npm run preview    # serve the production build
```
