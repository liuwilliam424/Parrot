//TODO: fix centering on sign out button


//https://firebase.google.com/docs/web/learn-more#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUcuvOpLrA0L0tj1pE82YVwZIeBZcSfDI",
  authDomain: "parrot-cac27.firebaseapp.com",
  databaseURL: "https://parrot-cac27-default-rtdb.firebaseio.com",
  projectId: "parrot-cac27",
  storageBucket: "parrot-cac27.appspot.com",
  messagingSenderId: "40805265769",
  appId: "1:40805265769:web:53eeeede473a2680ce4df8",
  measurementId: "G-96J2CZKLYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const analytics = getAnalytics(app);

//Initialize Authentication
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

//Initialize HTML elements
let sign_in_button = document.querySelector("#sign-in")
let sign_out_button = document.querySelector("#sign-out")
let welcome_message = document.querySelector("#welcome_message")

sign_in_button.style.display = "none"

document.querySelectorAll('#student, #teacher').forEach((element) => {
  element.onclick = () => {
    sign_in_button.style.display = "flex"
  }
});

sign_in_button.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (document.querySelector('#student').checked) {
        localStorage.setItem("Role", "Student")
        location.href = "./student_home.html"

      } else if (document.querySelector('#teacher').checked) {
        localStorage.setItem("Role", "Teacher")
        location.href = "./teacher_home.html"

      } else {
        signOut(auth).then(() => {
          localStorage.clear()
          location.reload()
        }).catch((error) => {
          alert("Error: failed to sign out")
        });

      }
    }).catch((error) => {
      alert("Error: Google Sign In Failed")
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used. 
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, (user) => {
  //checks the sign-in state of the user
  if (user) {
    //code that runs if user is signed in
    console.log("signed in")
    localStorage.setItem("UID", user.uid);
    localStorage.setItem("Name", user.displayName)

    welcome_message.innerHTML = `Welcome back, ${localStorage.getItem("Name")}!`;
    sign_in_button.style.display = "flex"
    sign_in_button.innerHTML = "Confirm with Google Sign In";
    document.querySelectorAll('.radio-selection').forEach((element) => {
      element.style.display = "none"
      sign_out_button.style.display = "flex"
    });

  } else {
    //code that runs if user is signed out
    console.log("not signed in")
    sign_out_button.style.display = "none"
  }
});

sign_out_button.onclick = () => {
  signOut(auth).then(() => {
    localStorage.clear()
    location.reload()
  }).catch((error) => {
    alert("Error: failed to sign out")
  });
}