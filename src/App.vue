<template>
  <center>
    <h1>The Chatters | By Darsh Gupta</h1>
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
export default {};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
@import url("./assets/styles/style.css");
</style>
