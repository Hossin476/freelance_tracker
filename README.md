# Freelance Tracker

Freelance Tracker is a comprehensive tool designed to help freelancers efficiently manage their business operations. It provides features for project management, time tracking, invoice generation, client management, and more, all in one place. The application is built using Vue 3, Vite, and Pinia for state management, ensuring a modern and responsive user experience.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Challenges Faced

1. **State Management**: Managing state across multiple components and ensuring data consistency was challenging. Pinia was used to simplify state management.
2. **Authentication**: Implementing token-based authentication and ensuring secure API communication required careful handling.
3. **Responsive Design**: Ensuring the UI is responsive and works seamlessly across devices required additional effort.
4. **Error Handling**: Providing meaningful error messages and handling edge cases in API interactions was a key focus.
5. **Testing**: Writing comprehensive unit and end-to-end tests to ensure application reliability was time-consuming but essential.

## Future Improvements

1. **Enhanced Reporting**: Add detailed analytics and reporting features for better insights into projects and time tracking.
2. **Mobile App**: Develop a mobile version of the application for better accessibility.
3. **Real-Time Updates**: Implement real-time updates using WebSockets for collaborative features.
4. **Multi-Currency Support**: Expand currency options and integrate real-time exchange rates.
5. **Third-Party Integrations**: Add integrations with popular tools like Slack, Trello, and payment gateways.
6. **Improved UI/UX**: Continuously refine the user interface and experience based on user feedback.
7. **Localization**: Add support for multiple languages to cater to a global audience.
