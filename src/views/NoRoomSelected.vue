<template>
  <h2 id="no-room-selected">
    <div class="vcenter">
      <img src="/assets/img/undraw_monitor_iqpq.svg" />
      <br />
      No room selected
      <br />
      <small>
        Choose one from the sidebar<br />
        or add some friends!
      </small>
    </div>
  </h2>
</template>

<script>
export default {
  name: "NoRoomSelected"
};
</script>

<style lang="scss" scoped>
#no-room-selected {
  margin: 0;
  text-align: center;
  color: var(--c-bubble-recipient);
  user-select: none;
}

.vcenter {
  display: inline-block;
  line-height: initial;
}

img {
  margin: 10vmax 0 20px;
  width: 300px;
}

small {
  font-size: 0.65em;
  font-weight: 300;
  display: inline-block;
  line-height: 23px;
  padding-top: 10px;
}
</style>
