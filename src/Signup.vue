<template>
  <center>
    <h1>Signup</h1>
    <form>
      {{ error }}
      <input
        type="email"
        v-model="email"
        placeholder="Enter your email here"
        class="form-control"
        required
      />
      <input
        type="text"
        v-model="username"
        placeholder="Enter your username here"
        class="form-control"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Enter your password here"
        class="form-control"
        required
      />
      <label for="rememberme">Remember Me: &nbsp;</label>
      <input type="checkbox" id="rememberme" v-model="rememberme" />
      <br />
      <button type="submit" class="btn btn-primary" @click="signup">
        Sign up!
      </button>
    </form>
    <br />
    <button class="btn btn-primary" @click="this.$emit('closemodal')">
      Go Back
    </button>
  </center>
</template>

<script>
import firebase from "firebase/app";
require("firebase/auth");

const axios = require("axios");

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      rememberme: false,
      error: "",
    };
  },
  methods: {
    signup(e) {
      e.preventDefault();
      axios
        .get("http://localhost:4000/usernames")
        .then((response) => {
          if (!response.data.find((el) => el.username == this.username)) {
            if (this.rememberme)
              firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            else
              firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.NONE);
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((result) => {
                result.user.updateProfile({
                  displayName: this.username,
                });

                axios
                  .post("http://localhost:4000/usernames", {
                    username: this.username,
                  })
                  .catch((error) => console.log(error));

                this.email = "";
                this.password = "";
                this.$emit("closemodal");
              })
              .catch((error) => {
                this.error = error.message;
              });
          } else {
            this.error = "Username taken. Please try another.";
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
