<template>
  <div @scroll="onSidebarScroll" ref="sidebarEl" id="sidebar-content">
    <div ref="logoEl"><Logo class="logo" /><Logo small class="logo small" /></div>
    <div class="container-x search-bar" :class="{ stuck: stickySearch }">
      <input
        type="text"
        placeholder="Search"
        maxlength="32"
        class="text-field"
        v-model="searchQuery.query"
        ref="searchEl"
      />
      <font-awesome-icon class="search-icon" icon="search"></font-awesome-icon>
    </div>

    <div v-show="isSearching" style="text-align: center">
      <font-awesome-icon
        v-if="searchQuery.isLoading"
        icon="spinner"
        size="2x"
        spin
      />
      <div v-else>
        <p v-if="usersFound.length === 0">
          No user found!
        </p>
        <template v-else>
          <div class="users-found-label">
            Users found:
          </div>
          <room-tile
            v-for="user of usersFound"
            :key="user.id"
            :room="user"
            @click.native="sendFriendRequest(user)"
            style="text-align: left;"
          />
        </template>
      </div>
    </div>

    <div v-show="!isSearching">
      <router-link
        v-for="room of rooms"
        :key="room.id"
        :to="{ name: 'room', params: { roomId: room.id } }"
      >
        <room-tile :room="room" />
      </router-link>
    </div>
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
import { User } from "@/models/user";

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

    // Watch the search input query: automatically runs the searchUser function
    watch(
      () => searchQuery.query,
      (query: string) => {
        if (query.length >= 5) searchUser(query);
        else if (query == "") $store.dispatch("userStore/resetUsersFound");
      }
    );

    function sendFriendRequest(user: User) {
      $store
        .dispatch("userStore/sendFriendRequest", user)
        .then(() => {
          // TODO: this section is unpolished. It will be heavily changed later.
          alert("Friend added!");
        })
        .catch(console.error);
    }

    //--------------------------------------------------------------------------
    // STICKY SEARCH BAR SHADOW
    //--------------------------------------------------------------------------

    // Template references
    const sidebarEl = ref<HTMLDivElement>(null);
    const logoEl = ref<HTMLDivElement>(null);
    const searchEl = ref<HTMLDivElement>(null);

    // If the search input is stuck (initial value of false)
    const stickySearch = ref(false);

    // TODO: this method re-renders the Sidebar every time the user scrolls down
    function onSidebarScroll() {
      const triggerScrollHeight =
        logoEl.value!.clientHeight + searchEl.value!.clientHeight;
      stickySearch.value = sidebarEl.value!.scrollTop >= triggerScrollHeight;
    }

    return {
      // Search handling
      searchQuery,
      isSearching: computed(() => searchQuery.query !== ""),
      usersFound,
      sendFriendRequest,

      // Rooms
      rooms: computed(() => $store.state.roomStore.rooms),

      // Sticky searchbar
      stickySearch,
      sidebarEl,
      logoEl,
      searchEl,
      onSidebarScroll
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

  &.small {
    display: none;
    width: 250px;
    margin-top: -10px;
    padding-left: 17.5px;
  }
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

  .search-icon {
    position: absolute;
    pointer-events: none;
    display: none;
    color: #fffd;
    left: 30px;
    top: 22px;
  }
}
@media (max-width: 1140px) {
  .search-bar {
    .text-field::placeholder {
      color: transparent;
    }
    .text-field:not(:placeholder-shown) + .search-icon {
      display: none;
    }
  }
  .logo {
    display: none;
  }
  .search-bar .search-icon, .logo.small {
    display: block;
  }
}

.users-found-label {
  padding: 10px $s-container-spacing;
  background-color: var(--c-room-tile-hover);
  font-size: smaller;
  font-weight: bold;
  text-align: left;
}
</style>
