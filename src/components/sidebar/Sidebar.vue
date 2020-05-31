<template>
  <div @scroll="onSidebarScroll" ref="sidebar" id="sidebar-content">
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
      :name="
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
      "
      activity-name="Spongebob Squarepants"
    />
  </div>
</template>

<script lang="ts">
import ChatTile from "@/components/sidebar/RoomTile.vue";
import { Ref, ref } from "@vue/composition-api";

export default {
  name: "Sidebar",
  components: {
    ChatTile
  },
  setup() {
    const stickySearch = ref(false);

    // Template references
    const [sidebar, logo, search]: Ref<any>[] = [
      ref(null),
      ref(null),
      ref(null)
    ];

    function onSidebarScroll() {
      const triggerScrollHeight =
        logo.value.clientHeight + search.value.clientHeight;
      stickySearch.value = sidebar.value.scrollTop >= triggerScrollHeight;
    }

    return { stickySearch, sidebar, logo, search, onSidebarScroll };
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
  height: $s-header-height;
  margin: 10px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--c-primary);
  transition: box-shadow 0.2s ease;

  &.stuck {
    box-shadow: 0 5px 30px #0002;
  }

  .text-field {
    color: #ffffff;
    background-color: var(--c-primary-lighter);

    &::placeholder {
      color: #ffffff;
    }
  }
}
</style>
