<script setup>
import { ref, onMounted } from "vue";

/** CMYK + RGB — matches site tokens */
const PALETTE = [
  "#00aeef",
  "#ec008c",
  "#fff200",
  "#ff0000",
  "#00ff00",
  "#0000ff",
];

const circles = ref([]);

onMounted(() => {
  const count = 5;
  const size = 500 + Math.random() * 100;

  circles.value = Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    size,
  }));
});
</script>

<template>
  <div class="services-color-field" aria-hidden="true">
    <div
      v-for="(c, i) in circles"
      :key="i"
      class="services-color-field__orb"
      :style="{
        left: `${c.x}%`,
        top: `${c.y}%`,
        width: `${c.size}px`,
        height: `${c.size}px`,
        background: c.color,
      }"
    />
  </div>
</template>

<style scoped>
.services-color-field {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.services-color-field__orb {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(52px);
  opacity: 0.92;
}

@media (prefers-reduced-motion: reduce) {
  .services-color-field__orb {
    filter: blur(28px);
  }
}
</style>
