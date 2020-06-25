<template>
  <div id="app">
    <AuthProvider />
  </div>
</template>

<script>
import AuthProvider from "@/components/authentication/AuthProvider";

export default {
  components: { AuthProvider }
};
</script>
