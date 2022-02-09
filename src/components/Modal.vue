<template>
  <teleport to="#modal">
    <div id="dialog" v-if="isOpen">
      <h1><slot>this is modal</slot></h1>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return {
      buttonClick,
    };
  },
});
</script>

<style>
#dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  background: #fff;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
