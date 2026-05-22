<script setup>
defineProps({
  borderless: { type: Boolean, default: false },
});
</script>

<template>
  <span
    class="mark-grid"
    :class="{ 'mark-grid--borderless': borderless }"
    aria-label="CMYK RGB"
  >
    <span class="mark-cell">/</span>
    <span class="mark-cell">C</span>
    <span class="mark-cell">M</span>
    <span class="mark-cell">Y</span>
    <span class="mark-cell">K</span>
    <span class="mark-cell">/</span>
    <span class="mark-cell">R</span>
    <span class="mark-cell">G</span>
    <span class="mark-cell">B</span>
  </span>
</template>

<style scoped>
.mark-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 2.85rem;
  height: 2.85rem;
  border: 1px solid var(--ink);
  background: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(0.48rem, 2.2vw, 0.62rem);
  line-height: 1;
  letter-spacing: 0;
  flex-shrink: 0;
}

.mark-cell {
  display: grid;
  place-items: center;
  color: var(--ink);
}

.mark-grid--borderless {
  border: none;
  background: transparent;
}
</style>
