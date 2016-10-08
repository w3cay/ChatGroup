<template>
<div>
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
</div>
</template>

<script>
import store from '../../vuex/store';
export default {
  store, // 在根组件加入 store，让它的子组件和 store 连接
};
</script>