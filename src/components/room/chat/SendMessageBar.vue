<template>
  <div id="send-message-container">
    <div class="send-message-bar">
      <font-awesome-icon icon="smile" id="select-emoji" />
      <input type="text" placeholder="Write a message..." class="text-field" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SendMessageBar"
};
</script>

<style lang="scss" scoped>
#send-message-container {
  background-color: var(--c-background-darker);

  .send-message-bar {
    $spacing: 10px;

    padding: $spacing;
    display: flex;
    align-items: center;

    #select-emoji {
      font-size: 18pt;
      margin-right: $spacing;
    }
  }
}
</style>
