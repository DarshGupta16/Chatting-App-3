<template>
  <div>
    <h1>Settings</h1>
    <form>
      <h2>Change Username</h2>
      {{ error }}
      <input type="text" class="form-control" v-model="username" />
      <button class="btn btn-primary" type="submit" @click="changeusername">
        Change Username
      </button>
    </form>
    <br />
    <button class="btn btn-primary" @click="this.$emit('closemodal')">
      Go Back
    </button>
  </div>
</template>

<script>
import firebase from "firebase/app";
require("firebase/auth");

const axios = require("axios");

export default {
  data() {
    return {
      username: "",
      error: "",
    };
  },
  methods: {
    changeusername(e) {
      e.preventDefault();
      axios.get("http://localhost:4000/usernames").then((response) => {
        if (!response.data.find((el) => el.username == this.username)) {
          axios
            .delete(
              "http://localhost:4000/usernames/" +
                response.data.find(
                  (el) => el.username == firebase.auth().currentUser.displayName
                ).id
            )
            .then(() => {
              firebase.auth().currentUser.updateProfile({
                displayName: this.username,
              });
            })
            .catch((error) => console.log(error));

          axios
            .post("http://localhost:4000/usernames", {
              username: this.username,
            })
            .then(() => {
              this.username = "";
            });
        } else {
          this.error = "Username taken. Please try another.";
        }
      });
    },
  },
};
</script>

<style></style>
