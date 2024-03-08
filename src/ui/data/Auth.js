import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from './firebase-config'; // Adjust the path according to where your Firebase config is

const auth = getAuth();

// Function to handle user signup
const signupUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
      
      // Optionally, initialize user settings upon account creation
      await setDoc(doc(db, "userSettings", user.uid), {
        // Default settings or empty object
        theme: "light", // Example setting
      });

      console.log("User created: ", user.uid); // For debugging
      // Redirect user or update UI accordingly
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Signup error: ", errorCode, errorMessage); // For debugging
      // Handle errors (e.g., show error message to user)
    });
};

// Function to handle user sign-in
const signinUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in: ", user.uid); // For debugging
      // Redirect user or update UI accordingly
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Signin error: ", errorCode, errorMessage); // For debugging
      // Handle errors (e.g., show error message to user)
    });
};

// Function to update user settings
const updateUserSettings = async (userId, settings) => {
    try {
      await setDoc(doc(db, "userSettings", userId), settings, { merge: true });
      console.log("User settings updated");
      // Update UI or notify user accordingly
    } catch (error) {
      console.error("Error updating settings: ", error);
      // Handle errors (e.g., show error message)
    }
  };
  

export { signupUser, signinUser };
