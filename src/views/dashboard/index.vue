<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Sale from "./Sale";
import Card from "./Card";
import Observe from "./Observe";
export default {
  name: "Dashboard",
  components: {
    Card,
    Sale,
    Observe,
  },
};
</script>

<style scoped></style>
