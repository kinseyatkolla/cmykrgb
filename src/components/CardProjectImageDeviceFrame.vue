<template>
  <div class="device-frame" :class="`device-frame--${variant}`">
    <div
      class="device-frame__bezel"
      :class="{
        'device-frame__bezel--chrome-right': variant === 'ipad' && chromeEdge === 'right',
      }"
    >
      <div
        v-if="variant === 'iphone' || chromeEdge === 'top'"
        class="device-frame__chrome"
        aria-hidden="true"
      >
        <span class="device-frame__camera" />
        <span class="device-frame__grille device-frame__grille--horizontal" />
      </div>

      <div ref="screenRef" class="device-frame__screen">
        <slot />
      </div>

      <!-- iPad portrait: chrome on longest side (right); same circle + lines, vertical grille -->
      <div
        v-if="variant === 'ipad' && chromeEdge === 'right'"
        class="device-frame__chrome device-frame__chrome--vertical"
        aria-hidden="true"
      >
        <span class="device-frame__camera" />
        <span class="device-frame__grille device-frame__grille--vertical" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUpdated, ref, watch } from "vue";

const props = defineProps({
  variant: { type: String, required: true },
});

const screenRef = ref(null);
/** iPhone: always top. iPad: top if screenshot is landscape, right if portrait. */
const chromeEdge = ref(props.variant === "ipad" ? "right" : "top");

function measureChromeEdge() {
  if (props.variant === "iphone") {
    chromeEdge.value = "top";
    return;
  }
  const img = screenRef.value?.querySelector("img");
  if (!img) return;
  const apply = () => {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return;
    chromeEdge.value = w > h ? "top" : "right";
  };
  if (img.complete && img.naturalWidth) apply();
  else img.addEventListener("load", apply, { once: true });
}

function scheduleMeasure() {
  nextTick(() => measureChromeEdge());
}

onMounted(scheduleMeasure);
onUpdated(scheduleMeasure);
watch(
  () => props.variant,
  () => scheduleMeasure()
);
</script>

<style scoped>
/* Snug to screenshot: outer box is only as large as the image (+ chrome). */
.device-frame {
  flex-shrink: 0;
  width: fit-content;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #000;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 2px 0 #000;
  overflow: hidden;
}

.device-frame__bezel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  width: fit-content;
  max-width: 100%;
}

.device-frame__bezel--chrome-right {
  flex-direction: row;
  align-items: stretch;
}

/* Double-rule strip (camera + speaker) — same for iPhone and iPad */
.device-frame__chrome {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 5px 10px;
  box-sizing: border-box;
  min-height: 24px;
  background: #fff;
  border-bottom: 1px solid #000;
  box-shadow:
    inset 0 1px 0 0 #000,
    inset 0 3px 0 0 #fff,
    inset 0 4px 0 0 #000;
}

.device-frame__chrome--vertical {
  flex-direction: column;
  width: 22px;
  min-width: 22px;
  min-height: 0;
  padding: 8px 4px;
  border-bottom: none;
  border-left: 1px solid #000;
  box-shadow:
    inset 1px 0 0 0 #000,
    inset 3px 0 0 0 #fff,
    inset 4px 0 0 0 #000;
  justify-content: center;
  gap: 0.35rem;
}

.device-frame__camera {
  width: 7px;
  height: 7px;
  border: 1px solid #000;
  border-radius: 50%;
  background: #fff;
  flex-shrink: 0;
}

/* Four horizontal rules (speaker) */
.device-frame__grille--horizontal {
  width: 44px;
  height: 8px;
  flex-shrink: 0;
  background-image: linear-gradient(
    to bottom,
    #000 0,
    #000 1px,
    #fff 1px,
    #fff 2px,
    #000 2px,
    #000 3px,
    #fff 3px,
    #fff 4px,
    #000 4px,
    #000 5px,
    #fff 5px,
    #fff 6px,
    #000 6px,
    #000 7px,
    #fff 7px,
    #fff 8px
  );
}

/* Vertical strip: four vertical rules */
.device-frame__grille--vertical {
  width: 8px;
  height: 36px;
  flex-shrink: 0;
  background-image: linear-gradient(
    to right,
    #000 0,
    #000 1px,
    #fff 1px,
    #fff 2px,
    #000 2px,
    #000 3px,
    #fff 3px,
    #fff 4px,
    #000 4px,
    #000 5px,
    #fff 5px,
    #fff 6px,
    #000 6px,
    #000 7px,
    #fff 7px,
    #fff 8px
  );
}

.device-frame__screen {
  line-height: 0;
  display: block;
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  margin: 0;
  background: #000;
  overflow: hidden;
}

.device-frame__bezel--chrome-right .device-frame__screen {
  flex: 0 1 auto;
  min-width: 0;
}

.device-frame__screen :deep(img) {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: min(17rem, calc(100vh - 10rem));
  object-fit: contain;
}

@media (max-width: 640px) {
  .device-frame__screen :deep(img) {
    max-height: min(14rem, calc(100vh - 9rem));
  }
}
</style>
