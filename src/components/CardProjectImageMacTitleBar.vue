<template>
  <div class="mac-title-bar" aria-hidden="true">
    <div class="mac-title-bar__close" />
    <div class="mac-title-bar__title-wrap">
      <span class="mac-title-bar__title">{{ title }}</span>
    </div>
    <div class="mac-title-bar__close mac-title-bar__close--spacer" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<style scoped>
/* Six horizontal rules, top/bottom margin inside the bar; title band is full height and masks the lines */
.mac-title-bar {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 13px 1fr 13px;
  align-items: stretch;
  gap: 0.25rem 0.35rem;
  padding: 0 5px;
  /* Fixed height: gradient stripes are px-defined; stretching blurs 1px lines */
  box-sizing: border-box;
  height: 18px;
  overflow: hidden;
  border-bottom: 1px solid #000;
  background-color: #fff;
  background-image: linear-gradient(
    to bottom,
    #ffffff 0,
    #ffffff 3px,
    #000000 3px,
    #000000 4px,
    #ffffff 4px,
    #ffffff 5px,
    #000000 5px,
    #000000 6px,
    #ffffff 6px,
    #ffffff 7px,
    #000000 7px,
    #000000 8px,
    #ffffff 8px,
    #ffffff 9px,
    #000000 9px,
    #000000 10px,
    #ffffff 10px,
    #ffffff 11px,
    #000000 11px,
    #000000 12px,
    #ffffff 12px,
    #ffffff 13px,
    #000000 13px,
    #000000 14px,
    #ffffff 14px,
    #ffffff 17px
  );
}

.mac-title-bar__close {
  width: 11px;
  height: 11px;
  border: 1px solid #000;
  background: #fff;
  align-self: center;
  justify-self: center;
  box-sizing: border-box;
}

.mac-title-bar__close--spacer {
  visibility: hidden;
  pointer-events: none;
}

.mac-title-bar__title-wrap {
  display: flex;
  align-items: stretch;
  justify-content: center;
  min-width: 0;
  min-height: 0;
}

.mac-title-bar__title {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  max-width: 100%;
  line-height: 1;
  padding: 0 6px;
  background: #fff;
  color: #000;
  font-family:
    ui-monospace, "Cascadia Mono", "SF Mono", Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
