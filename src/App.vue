<template>
  <center>
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

    <h1>The Chatters | By Darsh Gupta</h1>
    <div>
      <button class="btn btn-primary" @click="showsignupmodal = true">
        Sign Up
      </button>
      &nbsp;
      <button class="btn btn-primary" @click="showloginmodal = true">
        Log in
      </button>
    </div>
    <div></div>
    <br />
    <div class="chatbox">
      <div class="chat" id="chat" style="text-align:left;">
        <div>
          <p class="sender">
            <strong></strong>
          </p>
          <p class="message"></p>
        </div>
      </div>
      <form class="input-flexbox">
        <input type="text" class="form-control" v-model="messageInput" />
        <button class="btn btn-primary">
          Add Message
        </button>
      </form>
    </div>
  </center>
</template>

<script>
import Login from "./Login.vue";
import Signup from "./Signup.vue";

export default {
  components: {
    Login,
    Signup,
  },
  data() {
    return {
      showsignupmodal: false,
      showloginmodal: false,
    };
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
@import url("./assets/styles/style.css");
</style>
