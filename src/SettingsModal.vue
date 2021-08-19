<template>
  <div>
    <h1>Settings</h1>
    <form>
      <h2>Change Username</h2>
      {{ usernameerror }}
      <input type="text" class="form-control" v-model="username" />
      <button class="btn btn-primary" type="submit" @click="changeusername">
        Change Username
      </button>
    </form>
    <br />
    <form>
      {{ emailerror }}
      <input type="email" class="form-control" v-model="emailaddress" />
      <button type="submit" class="btn btn-primary" @click="changeemail">
        Change Email
      </button>
    </form>
    <br />
    <form>
      {{ passworderror }}
      <input type="password" class="form-control" v-model="password" />
      <button type="submit" class="btn btn-primary" @click="changepassword">
        Change Password
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
      usernameerror: "",
      emailaddress: "",
      emailerror: "",
      passworderror: "",
      password: "",
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
          this.usernameerror = "Username taken. Please try another.";
        }
      });
    },
    changeemail(e) {
      e.preventDefault();
      const user = firebase.auth().currentUser;
      user
        .updateEmail(this.emailaddress)
        .then(() => {
          alert("Email updated!!");
          this.$emit("closemodal");
        })
        .catch((error) => (this.emailerror = error.message));
    },
    changepassword(e) {
      e.preventDefault();
      const user = firebase.auth().currentUser;
      user
        .updatePassword(this.password)
        .then(() => {
          alert("Changed Password!");
          this.$emit("closemodal");
        })
        .catch((error) => (this.passworderror = error.message));
    },
  },
};
</script>

<style></style>
