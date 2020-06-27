<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Service } from "@/services/service";
import { AuthServiceAdapter } from "@/services/auth/auth.service.adapter";

export default {
  provide: {
    [Service.AUTH]: new AuthServiceAdapter()
  }
};
</script>
