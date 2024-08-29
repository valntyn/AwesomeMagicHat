## Technologies Used

This project, **AwesomeMagicHat**, is built using a variety of modern technologies and libraries to ensure a robust and scalable application. Below is a breakdown of the key technologies utilized:

### Frameworks & Libraries
- **React Native (v0.74.1)**: The core framework for building the mobile application, enabling cross-platform development for both iOS and Android.
- **Expo (v51.0.0)**: Utilized in Bare Workflow mode.
- **Redux Toolkit**: State management library, ensuring predictable and maintainable application state.
- **React Navigation**: Handles navigation within the app, with a focus on stack and bottom-tab navigations.
- **Axios**: For making HTTP requests to external APIs.
- **React Native Gesture Handler & Reanimated**: Enhancing gesture management and animations within the app.

### Development
- **TypeScript**: Adds static typing to JavaScript, helping to catch errors early and improve code quality.
- **ESLint & Prettier**: Linting and formatting tools that help maintain code consistency and quality.

## Architecture

This application is developed using the **Expo Bare Workflow**, which allows for the customization of native code while still benefiting from Expo’s rich library of APIs and modules.

### Feature-Sliced Design (FSD)

The app follows the **Feature-Sliced Design (FSD)** architecture, a scalable and modular architecture pattern. The key aspects of FSD architecture include:
- **Feature-Based Structure**: The project is organized into feature-based modules, where each feature encapsulates its own components, styles, and logic. This modular approach enhances maintainability and reusability.
- **Component-Driven Development**: The UI is built using reusable components, promoting a clean separation of concerns and making the app easier to scale.
- **State Management**: Centralized using Redux Toolkit, ensuring that the state is predictable and manageable across the app.

This architecture enables the app to be highly modular, scalable, and easy to maintain as it grows.
