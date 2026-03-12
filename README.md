# React Native Authentication App

## Overview

This project is a simple **React Native authentication application** built using **TypeScript**.
It demonstrates how to implement a basic authentication flow with **Login, Signup, and Home screens** using **React Context API** for global state management and **React Navigation** for screen navigation.

The application also includes form validation, password visibility toggle, and optional authentication persistence using **AsyncStorage**.

---

# Features Implemented

## 1. Authentication Context

The application uses **React Context API** to manage authentication state globally.

The context provides the following:

* **login(email, password)** – Authenticates the user
* **signup(name, email, password)** – Registers a new user
* **logout()** – Logs out the user
* **user** – Stores the currently authenticated user

This prevents prop drilling and allows all components to access authentication state easily.

---

## 2. Login Screen

The Login screen allows existing users to log in.

### Inputs

* Email
* Password

### Features

* Email validation
* Password validation
* Error messages for:

  * Missing fields
  * Invalid email format
  * Incorrect credentials
* Password visibility toggle
* Navigation to Signup screen

---

## 3. Signup Screen

The Signup screen allows new users to create an account.

### Inputs

* Name
* Email
* Password

### Validation

* All fields required
* Email must be valid
* Password must be at least **6 characters**

### Features

* Password visibility toggle
* Error messages for invalid input
* Navigation back to Login screen

---

## 4. Home Screen

After successful login/signup, the user is redirected to the **Home Screen**.

### Displays

* Logged-in user's **Name**
* Logged-in user's **Email**

### Features

* Logout button
* Logout clears authentication state and returns user to Login screen

---

## 5. Authentication Persistence

The app uses **AsyncStorage** to store the authenticated user locally.

### Benefits

* User stays logged in after closing the app
* Authentication state restores automatically when the app restarts

Flow:

App Start
→ Load user from AsyncStorage
→ If user exists → Navigate to Home
→ If not → Navigate to Login

---

## 6. Navigation

The app uses **React Navigation (Native Stack Navigator)**.

Screens:

* Login
* Signup
* Home

Navigation automatically switches based on authentication state.

---

## 7. Password Visibility Toggle

The password field includes an **eye icon** that allows users to toggle password visibility.

This improves user experience while entering passwords.

---

# Tech Stack

* React Native
* TypeScript
* React Context API
* React Navigation
* AsyncStorage
* React Native Vector Icons

---

# Project Structure

```
src
 ├── context
 │     AuthContext.tsx
 │
 ├── navigation
 │     AppNavigator.tsx
 │
 ├── screens
 │     LoginScreen.tsx
 │     SignupScreen.tsx
 │     HomeScreen.tsx
 │
 ├── components
 │     PasswordInput.tsx
 │
 └── types
       AuthTypes.ts
```

---

# Setup Instructions

## 1. Clone the Repository

```
git clone <repository-url>
cd AuthApp
```

---

## 2. Install Dependencies

```
npm install
```

---

## 3. Install iOS Dependencies (Mac only)

```
cd ios
pod install
cd ..
```

---

## 4. Run Metro Bundler

```
npx react-native start
```

---

## 5. Run the App

### Android

```
npx react-native run-android
```

### iOS

```
npx react-native run-ios
```

---

# Future Improvements

Possible improvements for production apps:

* API-based authentication
* JWT token storage
* Secure storage using **react-native-keychain**
* Form validation using **Formik + Yup**
* Loading indicators
* Unit testing

---

# Conclusion

This project demonstrates a clean implementation of a **React Native authentication flow** using modern React practices such as **Context API, TypeScript, and React Navigation**.
It provides a scalable foundation for building authentication systems in React Native applications.
