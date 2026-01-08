### N-Back memory game

If not using link, please install node modules

`npm run dev` - runs locally on port 5174
`npm run coverage` - runs tests and prints coverage
`npx playwright test` - runs tests in playwright
`npx playwright test --project=chromium --debug` - debugs playwright test

### Deployment link

https://n-back-challange.vercel.app/

### Architecture

- Single page app which loads a game
- Unit tests using mocks and playwright tests. Simulating as close to a how a user would interact
- tailwind with shadcn for styling

### user acceptance criteria

- User can insert their last name longer than 4 letters

- User can start the game

- User should not be able to guest the first 2 letters

- After the third, user can guess, user is then presented with correct or incorrect guess

- After the last letter or if they have guest to wrong. User is presented with results screen

- User is also presented with small state notification when game state has changed

Bonus

- User can customize complexity of n (2n, or more)
- User is presented with funky pictures and has to guess the letter based on the picture
