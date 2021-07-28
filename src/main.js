import { createApp } from "vue";
import App from "./App.vue";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyApk2te8KtHZwBJxOfchIE7hwC2nNedoQM",
  authDomain: "chatting-app-v3.firebaseapp.com",
  projectId: "chatting-app-v3",
  storageBucket: "chatting-app-v3.appspot.com",
  messagingSenderId: "408903927837",
  appId: "1:408903927837:web:dc04fe0e9dda1a30955ef4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).mount("#app");
