// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK3crk0yDErvNlUNBrTT93G4xrUL28sWs",
    authDomain: "taqs-weather-web-app.firebaseapp.com",
    projectId: "taqs-weather-web-app",
    storageBucket: "taqs-weather-web-app.appspot.com",
    messagingSenderId: "405436914762",
    appId: "1:405436914762:web:b3f8503f759d2d9c173705"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign Up
document.getElementById("signup").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById("auth-message").textContent = "Account created!";
        })
        .catch(error => {
            document.getElementById("auth-message").textContent = error.message;
        });
});

// Sign In
document.getElementById("signin").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById("auth-forms").style.display = "none";
            document.getElementById("user-info").style.display = "block";
            document.getElementById("weather-container").style.display = "block";
            document.getElementById("user-email").textContent = userCredential.user.email;
        })
        .catch(error => {
            document.getElementById("auth-message").textContent = error.message;
        });
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
    auth.signOut().then(() => {
        document.getElementById("auth-forms").style.display = "block";
        document.getElementById("user-info").style.display = "none";
        document.getElementById("weather-container").style.display = "none";
    });
});
