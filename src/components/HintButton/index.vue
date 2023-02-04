<template>
  <a :title="title" style="margin: 10px">
    <el-button v-bind="$attrs" v-on="$Listeners"></el-button>
  </a>
</template>

<script>
import { title } from "@/settings";
export default {
  name: "HintButton",
  props: [title],
};
</script>

<style></style>
