<template>
  <div class="editable">
    <slot></slot>
    <span @click="edit()" class="edit-button">
      <font-awesome-icon icon="edit" />
    </span>
  </div>
</template>

<script>
export default {
  name: "editable",
  data() {
    return {
      editing: false
    };
  },
  methods: {
    edit() {
      // TODO: Show input
    },
    save() {
      // TODO: Save and hide input
    }
  }
};
</script>

<style lang="scss" scoped>
.editable {
  display: inline-flex;

  > span.edit-button {
    margin-left: 10px;
    text-decoration: underline;
    font-size: larger;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover span.edit-button {
    cursor: pointer;
    user-select: none;
    opacity: 1;
  }
}
</style>
