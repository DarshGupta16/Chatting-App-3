<template>
  <center>
    <SettingsModal
      v-if="showsettingsmodal"
      @closemodal="showsettingsmodal = false"
      class="authmodal"
    />
    <Login
      v-if="showloginmodal"
      @closemodal="showloginmodal = false"
      class="authmodal"
    />
    <Signup
      v-if="showsignupmodal"
      @closemodal="showsignupmodal = false"
      class="authmodal"
    />

    <p>
      <span v-if="loggedin">Logged In - {{ username }}</span>
      <span v-else>Logged Out</span>
    </p>

    <h1>The Chatters | By Darsh Gupta</h1>
    <div v-if="!loggedin">
      <button class="btn btn-primary" @click="showsignupmodal = true">
        Sign Up
      </button>
      &nbsp;
      <button class="btn btn-primary" @click="showloginmodal = true">
        Log in
      </button>
    </div>
    <div v-else>
      <button class="btn btn-primary" @click="logout">Log Out</button> &nbsp;
      <button class="btn btn-primary" @click="showsettingsmodal = true">
        Settings
      </button>
    </div>
    <br />
    <div class="chatbox">
      <div class="chat" id="chat" style="text-align:left;">
        <div v-for="(message, index) in messages" :key="index">
          <p class="sender">
            <strong
              >{{ message.sender }}
              <span v-if="message.sender == this.username">(You)</span></strong
            >
          </p>
          <p class="message">{{ message.message }}</p>
        </div>
      </div>
      <form class="input-flexbox">
        <input type="text" class="form-control" v-model="messageInput" />
        <button class="btn btn-primary" @click="sendmessage">
          Add Message
        </button>
      </form>
      <br />
    </div>
  </center>
</template>

<script>
import Login from "./Login.vue";
import Signup from "./Signup.vue";
import SettingsModal from "./SettingsModal.vue";
const axios = require("axios");

import firebase from "firebase/app";
require("firebase/auth");

export default {
  components: {
    Login,
    Signup,
    SettingsModal,
  },
  created() {
    setInterval(() => {
      axios
        .get(this.messagesAPI)
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => console.log(error));

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedin = true;
          this.username = user.displayName;
        } else {
          this.loggedin = false;
        }
      });

      const container = this.$el.querySelector(".chat");
      container.scrollTop = container.scrollHeight;
    }, 600);
  },
  data() {
    return {
      showsignupmodal: false,
      showloginmodal: false,
      showsettingsmodal: false,
      messageInput: "",
      messages: [],
      messagesAPI: "http://localhost:3000/messages",
      loggedin: false,
      username: "",
    };
  },
  methods: {
    sendmessage(e) {
      e.preventDefault();
      if (!this.loggedin && this.username.length == 0) {
        this.username = "anonymous" + Math.floor(Math.random() * 10000);
      }
      axios
        .post(this.messagesAPI, {
          sender: this.username,
          message: this.messageInput,
        })
        .then(() => {
          this.messageInput = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
@import url("./assets/styles/style.css");
</style>
