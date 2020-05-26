<template>
  <div @scroll="onSidebarScroll()" ref="sidebar" id="sidebar-content">
    <img src="../../assets/logo.svg" alt="Logo" id="logo" ref="logo" />
    <div class="container-x search-bar" :class="{ stuck: stickySearch }">
      <input
        type="text"
        placeholder="Search"
        maxlength="32"
        class="text-field"
        ref="search"
      />
    </div>
    <chat-tile
      v-for="n in 18"
      :key="n"
      name="MasfikNET Long Name"
      activity-name="Spongebob Squarepants"
    />
  </div>
</template>

<script lang="ts">
import ChatTile from "@/components/sidebar/RoomTile.vue";

export default {
  name: "Sidebar",
  components: {
    ChatTile
  },
  data() {
    return {
      stickySearch: false
    };
  },
  methods: {
    onSidebarScroll() {
      const { sidebar, logo, search } = this.$refs;
      const triggerScrollHeight = logo.clientHeight + search.clientHeight;
      this.stickySearch = sidebar.scrollTop >= triggerScrollHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
#sidebar-content {
  @include overflow(y);
  max-height: 100vh;
}

#logo {
  padding: 25px 40px 10px;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  height: $header-height;
  margin: 10px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: $primary;
  transition: box-shadow 0.2s ease;

  &.stuck {
    box-shadow: 0 5px 30px #0002;
  }

  .text-field {
    color: #ffffff;
    background-color: lighten($primary, 4);

    &::placeholder {
      color: #ffffff;
    }
  }
}
</style>
