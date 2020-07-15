<template>
  <div class="not-found-container">
    <div>
      <img src="/assets/img/undraw_Taken_if77.svg" />
      <br>
      <h1>Whoopsie!</h1>
      <small>
        Looks like the page you're looking for<br>doesn't exist.<br><br>
        Or maybe it has just been stolen<br>by some alien cactus 🌵
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
  font-size: 3vw;
  text-align: center;
}

img {
  width: 260px;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  margin-bottom: 30px;
  display: inline-block;
}


.not-found-container {
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  text-align: center;

  div {
    small {
      margin-top: 10px;
      display: inline-block;
    }
  }
}
</style>
