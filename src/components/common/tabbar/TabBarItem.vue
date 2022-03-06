<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div class="text" :class="isActive ? '' : 'text_active'">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  data() {
    return {};
  },
  methods: {
    itemClick() {
      if (this.$route.path != this.path) {
        this.$router.push(this.path);
      }
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) === -1;
    },
  },
};
</script>

<style lang='less'>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  .text {
    color: #cccccc;
    font-size: 10px;
    &.text_active {
      font-size: 10px;
      color: #8650fe;
    }
  }
}
</style>