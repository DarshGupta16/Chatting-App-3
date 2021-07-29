<template>
  <div>
    <h1>Login</h1>
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
        type="password"
        v-model="password"
        placeholder="Enter your password here"
        class="form-control"
        required
      />
      <label for="rememberme">Remember Me: &nbsp;</label>
      <input type="checkbox" id="rememberme" v-model="rememberme" />
      <br />
      <button type="submit" class="btn btn-primary" @click="login">
        Log in!
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

export default {
  data() {
    return {
      email: "",
      password: "",
      rememberme: false,
      error: "",
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      if (this.rememberme)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      else firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.email = "";
          this.password = "";
          this.$emit("closemodal");
        })
        .catch((error) => (this.error = error.message));
    },
  },
};
</script>

<style></style>
