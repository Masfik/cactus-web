<template>
  <div @scroll="onSidebarScroll" ref="sidebarEl" id="sidebar-content">
    <div ref="logoEl"><Logo class="logo" /></div>
    <div class="container-x search-bar" :class="{ stuck: stickySearch }">
      <input
        type="text"
        placeholder="Search"
        maxlength="32"
        class="text-field"
        v-model="searchQuery.query"
        ref="searchEl"
      />
    </div>

    <div v-show="isSearching">
      <font-awesome-icon
        v-if="searchQuery.isLoading"
        icon="spinner"
        spin
        style="text-align: center"
      />
      <div v-else>
        <p v-if="usersFound.length === 0" style="text-align: center">
          No user found!
        </p>
        <room-tile
          v-else
          v-for="user of usersFound"
          :key="user.id"
          :room="user"
        />
      </div>
    </div>

    <div v-show="!isSearching">
      <router-link
        v-for="n in 18"
        :key="n"
        :to="{ name: 'room', params: { roomId: n } }"
      >
        <room-tile
          :room="{
            name: Math.random()
              .toString(36)
              .replace(/[^a-z]+/g, ''),
            id: n,
            watching: 'Spongebob Squarepants'
          }"
        />
      </router-link>
    </div>
    <!--<room-tile v-for="(room, i) of rooms" :key="i" :room="room" />-->
  </div>
</template>

<script lang="ts">
import RoomTile from "@/components/sidebar/RoomTile.vue";
import {
  computed,
  reactive,
  ref,
  SetupContext,
  watch
} from "@vue/composition-api";
import Logo from "@/components/common/Logo.vue";

export default {
  name: "Sidebar",
  components: {
    Logo,
    RoomTile
  },
  setup(_: any, ctx: SetupContext) {
    const { $store } = ctx.root;

    //--------------------------------------------------------------------------
    // SEARCH QUERY
    //--------------------------------------------------------------------------

    const searchQuery = reactive({
      query: "",
      isLoading: false
    });
    const usersFound = computed(() => $store.state.userStore.usersFound);

    function searchUser(query: string) {
      searchQuery.isLoading = true;
      $store
        .dispatch("userStore/search", query)
        .catch(console.error)
        .finally(() => (searchQuery.isLoading = false));
    }

    watch(
      () => searchQuery.query,
      (query: string) => {
        if (query !== "" && query.length >= 5) searchUser(query);
        else $store.dispatch("userStore/resetUsersFound");
      }
    );

    //--------------------------------------------------------------------------
    // STICKY SEARCH BAR SHADOW
    //--------------------------------------------------------------------------

    // Template references
    const sidebarEl = ref<HTMLDivElement>(null);
    const logoEl = ref<HTMLDivElement>(null);
    const searchEl = ref<HTMLDivElement>(null);

    // If the search input is stuck (initial value of false)
    const stickySearch = ref(false);

    function onSidebarScroll() {
      const triggerScrollHeight =
        logoEl.value!.clientHeight + searchEl.value!.clientHeight;
      stickySearch.value = sidebarEl.value!.scrollTop >= triggerScrollHeight;
    }

    return {
      searchQuery,
      isSearching: computed(() => searchQuery.query !== ""),
      usersFound,
      stickySearch,
      sidebarEl,
      logoEl,
      searchEl,
      onSidebarScroll,
      rooms: computed(() => $store.state.roomStore.rooms)
    };
  }
};
</script>

<style lang="scss" scoped>
#sidebar-content {
  @include overflow(y);
  max-height: 100vh;
}

.logo {
  padding: 25px 40px 10px;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  height: $s-header-height;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--c-sidebar);
  transition: box-shadow 0.2s ease;

  &.stuck {
    @include shadow();
  }

  .text-field {
    color: #ffffff;
    background-color: var(--c-sidebar-search);

    &::placeholder {
      color: #ffffff;
    }
  }
}
</style>
