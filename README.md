# recipe-finder
A small site to help users to find a recipe

## Install
As with any Node JS project, just run `npm install`. To run the project, you need to have NodeJS version 14 or higher, but an older version should execute.
After installing dependencies, run `npm run dev` to execute the development environment.

The project uses Next.JS, an amazing framework and gives a great starting point for the client and server-side rendering and several tools that help the development; however, it does not use much of its features.
### Client side
The application uses Redux to manage notification on state changes to keep logic apart from views on the client-side. Slices can be use on different type of application or platform such as React Native
### Networks calls
`recipes/api` Exposes all calls into API module to enable uses both client and server-side.
### CSS
For styles the project uses SASS with modules to increase performance due to styles will be load on demand, and avoid conflicts with other styles.