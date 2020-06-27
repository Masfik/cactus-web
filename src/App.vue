<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Service } from "@/services/service";
import { FirebaseAuthService } from "@/services/auth/firebase-auth.service";

export default {
  provide: {
    [Service.AUTH]: new FirebaseAuthService()
  }
};
</script>
