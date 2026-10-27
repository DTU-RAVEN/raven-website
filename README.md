# RAVEN Website

Setup guide for macOS.

## 1. Install npm

npm comes with Node.js. The easiest way to install it is with [Homebrew](https://brew.sh).

Install Homebrew if you don't have it (paste into Terminal):

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install Node.js (includes npm):

```sh
brew install node
```

Check that it worked:

```sh
node -v
npm -v
```

## 2. Run the site locally

Get the code (first time only):

```sh
git clone git@github.com:DTU-RAVEN/raven-website.git
cd raven-website
```

Install the dependencies (first time, and whenever `package.json` changes):

```sh
npm i
```

Start the dev server:

```sh
npm run dev
```

Open http://localhost:8080 in your browser. The page reloads automatically when you save a file. Press `Ctrl + C` in Terminal to stop the server.

## 3. Push your changes to main

```sh
git checkout main
git pull                      # get the latest changes first
git add .                     # stage everything you changed
git commit -m "Describe what you changed"
git push origin main
```

If `git push` is rejected because someone else pushed first, run `git pull` and then `git push origin main` again.
