<template>
  <center>
    <h1>Signup</h1>
    <form>
      <input
        type="email"
        v-model="email"
        placeholder="Enter your email here"
        class="form-control"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Enter your password here"
        class="form-control"
      />
      <label for="rememberme">Remember Me: &nbsp;</label>
      <input type="checkbox" id="rememberme" v-model="rememberme" />
      <br />
      <button type="submit" class="btn btn-primary">Sign up!</button>
    </form>
    <br />
    <button class="btn btn-primary" @click="this.$emit('closemodal')">
      Go Back
    </button>
  </center>
</template>

<script>
const firebase = require("firebase/app");
require("firebase/auth");

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style></style>
