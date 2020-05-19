<template>
  <ul id="header-items">
    <li>
      <a href="">
        <div class="notifications">
          <font-awesome-icon icon="bell" class="bell-icon" />
          <span class="count">6</span>
        </div>
      </a>
    </li>
    <li id="header-profile">
      <a href="">
        <img src="@/assets/user.png" alt="User's avatar" />
        <span class="username">MasfikNET</span>
        <font-awesome-icon icon="caret-down" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
$spacing: 20px;

ul#header-items {
  height: 100%;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-block-start: 0;
  margin-block-end: 0;

  li {
    margin: 0 $spacing;

    .notifications {
      position: relative;

      .bell-icon {
        font-size: 28px;
      }

      .count {
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: $color6;
        color: $text-on-primary;
        text-align: center;
        font-size: x-small;
        font-weight: bold;
        top: 0;
        right: -3px;
      }
    }

    &#header-profile {
      $spacing: 10px;

      img {
        @include circular-avatar(35px);
        margin-right: $spacing;
        vertical-align: middle;
      }

      span.username {
        margin-right: $spacing;
      }
    }
  }

  &:last-child {
    margin-right: $spacing;
  }
}
</style>
