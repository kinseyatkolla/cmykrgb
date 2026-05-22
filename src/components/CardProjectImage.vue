<template>
  <div
    ref="mediaRoot"
    class="card-project-media"
    :class="{
      'card-project-media--carousel': images.length > 1,
      'card-project-media--stack-peek': stackPeekActive,
      'card-project-media--stack-peek-multi':
        stackPeekActive && stackPeekDepthEffective > 1,
      'card-project-media--filled': images.length > 0,
      'card-project-media--framed': browserFrame && images.length > 0,
      'card-project-media--framed-single': browserFrame && images.length === 1,
      'card-project-media--carousel-uniform': carouselUniformSlot,
    }"
  >
    <!-- Empty: placeholder slot (icon only) -->
    <div v-if="images.length === 0" class="card-image-label">
      <slot name="placeholder" />
    </div>

    <!-- Single image -->
    <template v-else-if="images.length === 1">
      <div
        v-if="browserFrame && slideKind(0) === 'browser'"
        class="card-project-media__content browser-window browser-window--mac browser-window--shrink card-project-media__frame-awaiting-media"
        :class="{ 'card-project-media__frame--revealed': isImgReady(0) }"
      >
        <MacTitleBar :title="titleBarLabel(0)" />
        <div
          class="card-project-media__stage browser-window__viewport browser-window__viewport--shrink"
        >
          <img
            class="card-project-media__img card-project-media__img--intrinsic"
            :ref="(el) => imgRef(el, 0)"
            :src="images[0]"
            :alt="altText(0)"
            loading="lazy"
            decoding="async"
            @load="onImgLoad(0)"
          />
        </div>
      </div>

      <div
        v-else-if="browserFrame && slideKind(0) === 'ipad'"
        class="card-project-media__content card-project-media__content--device"
      >
        <DeviceFrame
          variant="ipad"
          class="device-frame--in-slide card-project-media__frame-awaiting-media"
          :class="{ 'card-project-media__frame--revealed': isImgReady(0) }"
        >
          <img
            :ref="(el) => imgRef(el, 0)"
            :src="images[0]"
            :alt="altText(0)"
            loading="lazy"
            decoding="async"
            @load="onImgLoad(0)"
          />
        </DeviceFrame>
      </div>

      <div
        v-else-if="browserFrame && slideKind(0) === 'iphone'"
        class="card-project-media__content card-project-media__content--device"
      >
        <DeviceFrame
          variant="iphone"
          class="device-frame--in-slide card-project-media__frame-awaiting-media"
          :class="{ 'card-project-media__frame--revealed': isImgReady(0) }"
        >
          <img
            :ref="(el) => imgRef(el, 0)"
            :src="images[0]"
            :alt="altText(0)"
            loading="lazy"
            decoding="async"
            @load="onImgLoad(0)"
          />
        </DeviceFrame>
      </div>

      <div
        v-else
        class="card-project-media__content card-project-media__content--plain"
      >
        <div class="card-project-media__stage">
          <img
            class="card-project-media__img card-project-media__reveal-img"
            :class="{ 'card-project-media__reveal-img--ready': isImgReady(0) }"
            :ref="(el) => imgRef(el, 0)"
            :src="images[0]"
            :alt="altText(0)"
            loading="lazy"
            decoding="async"
            @load="onImgLoad(0)"
          />
        </div>
      </div>
    </template>

    <!-- Carousel: each slide is its own frame (browser or print) -->
    <div
      v-else
      class="card-project-media__stage card-project-media__stage--carousel"
    >
      <div class="card-project-media__carousel-shell">
        <div
          class="card-project-media__carousel"
          :class="{
            'card-project-media__carousel--stack': stackPeekActive,
            'card-project-media__carousel--stack-multi':
              stackPeekActive && stackPeekDepthEffective > 1,
          }"
          role="region"
          aria-roledescription="carousel"
          :aria-label="ariaLabel"
          tabindex="0"
          @keydown.left.prevent="prev"
          @keydown.right.prevent="next"
          @pointerdown="onCarouselPointerDown"
          @pointerup="onCarouselPointerUp"
          @pointercancel="onCarouselPointerCancel"
          @lostpointercapture="onCarouselLostPointerCapture"
        >
          <!-- Wide cards: prev/next slides peek behind left & right, scaled -->
          <div
            v-if="stackPeekActive"
            class="card-project-media__stack-stage"
            :class="{
              'card-project-media__stack-stage--multi':
                stackPeekDepthEffective > 1,
            }"
          >
            <div
              v-for="item in stackLayers"
              :key="item.index"
              class="card-project-media__stack-layer"
              :class="`card-project-media__stack-layer--${item.layer}`"
              :aria-hidden="item.layer !== 'active'"
            >
              <template v-if="browserFrame">
                <div
                  v-if="slideKind(item.index) === 'browser'"
                  class="browser-window browser-window--mac browser-window--shrink browser-window--in-slide browser-window--stack card-project-media__frame-awaiting-media"
                  :class="{
                    'card-project-media__frame--revealed': isImgReady(
                      item.index,
                    ),
                  }"
                >
                  <MacTitleBar :title="titleBarLabel(item.index)" />
                  <div
                    class="browser-window__viewport browser-window__viewport--shrink"
                  >
                    <img
                      :ref="(el) => imgRef(el, item.index)"
                      :src="images[item.index]"
                      :alt="altText(item.index)"
                      loading="lazy"
                      decoding="async"
                      @load="onImgLoad(item.index)"
                    />
                  </div>
                </div>
                <DeviceFrame
                  v-else-if="slideKind(item.index) === 'ipad'"
                  variant="ipad"
                  class="device-frame--in-slide device-frame--stack-slide card-project-media__frame-awaiting-media"
                  :class="{
                    'card-project-media__frame--revealed': isImgReady(
                      item.index,
                    ),
                  }"
                >
                  <img
                    :ref="(el) => imgRef(el, item.index)"
                    :src="images[item.index]"
                    :alt="altText(item.index)"
                    loading="lazy"
                    decoding="async"
                    @load="onImgLoad(item.index)"
                  />
                </DeviceFrame>
                <DeviceFrame
                  v-else-if="slideKind(item.index) === 'iphone'"
                  variant="iphone"
                  class="device-frame--in-slide device-frame--stack-slide card-project-media__frame-awaiting-media"
                  :class="{
                    'card-project-media__frame--revealed': isImgReady(
                      item.index,
                    ),
                  }"
                >
                  <img
                    :ref="(el) => imgRef(el, item.index)"
                    :src="images[item.index]"
                    :alt="altText(item.index)"
                    loading="lazy"
                    decoding="async"
                    @load="onImgLoad(item.index)"
                  />
                </DeviceFrame>
                <img
                  v-else
                  class="card-project-media__reveal-img"
                  :class="{
                    'card-project-media__reveal-img--ready': isImgReady(
                      item.index,
                    ),
                  }"
                  :ref="(el) => imgRef(el, item.index)"
                  :src="images[item.index]"
                  :alt="altText(item.index)"
                  loading="lazy"
                  decoding="async"
                  @load="onImgLoad(item.index)"
                />
              </template>
              <img
                v-else
                class="card-project-media__reveal-img"
                :class="{
                  'card-project-media__reveal-img--ready': isImgReady(
                    item.index,
                  ),
                }"
                :ref="(el) => imgRef(el, item.index)"
                :src="images[item.index]"
                :alt="altText(item.index)"
                loading="lazy"
                decoding="async"
                @load="onImgLoad(item.index)"
              />
            </div>
          </div>

          <div v-else class="card-project-media__carousel-row">
            <button
              type="button"
              class="card-project-media__nav card-project-media__nav--prev card-project-media__nav--beside"
              aria-label="Previous image"
              @click="prev"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="card-project-media__chev"
              >
                <path
                  d="M14 18l-6-6 6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div class="card-project-media__carousel-viewport">
              <div
                class="card-project-media__track"
                :style="{ transform: `translateX(-${active * 100}%)` }"
              >
                <div
                  v-for="(src, i) in images"
                  :key="i"
                  class="card-project-media__slide"
                  :aria-hidden="i !== active"
                >
                  <template v-if="browserFrame">
                    <div
                      v-if="slideKind(i) === 'browser'"
                      class="browser-window browser-window--mac browser-window--shrink browser-window--in-slide card-project-media__frame-awaiting-media"
                      :class="{
                        'card-project-media__frame--revealed': isImgReady(i),
                      }"
                    >
                      <MacTitleBar :title="titleBarLabel(i)" />
                      <div
                        class="browser-window__viewport browser-window__viewport--shrink"
                      >
                        <img
                          :ref="(el) => imgRef(el, i)"
                          :src="src"
                          :alt="altText(i)"
                          loading="lazy"
                          decoding="async"
                          @load="onImgLoad(i)"
                        />
                      </div>
                    </div>
                    <DeviceFrame
                      v-else-if="slideKind(i) === 'ipad'"
                      variant="ipad"
                      class="device-frame--in-slide card-project-media__frame-awaiting-media"
                      :class="{
                        'card-project-media__frame--revealed': isImgReady(i),
                      }"
                    >
                      <img
                        :ref="(el) => imgRef(el, i)"
                        :src="src"
                        :alt="altText(i)"
                        loading="lazy"
                        decoding="async"
                        @load="onImgLoad(i)"
                      />
                    </DeviceFrame>
                    <DeviceFrame
                      v-else-if="slideKind(i) === 'iphone'"
                      variant="iphone"
                      class="device-frame--in-slide card-project-media__frame-awaiting-media"
                      :class="{
                        'card-project-media__frame--revealed': isImgReady(i),
                      }"
                    >
                      <img
                        :ref="(el) => imgRef(el, i)"
                        :src="src"
                        :alt="altText(i)"
                        loading="lazy"
                        decoding="async"
                        @load="onImgLoad(i)"
                      />
                    </DeviceFrame>
                    <img
                      v-else
                      class="card-project-media__reveal-img"
                      :class="{
                        'card-project-media__reveal-img--ready': isImgReady(i),
                      }"
                      :ref="(el) => imgRef(el, i)"
                      :src="src"
                      :alt="altText(i)"
                      loading="lazy"
                      decoding="async"
                      @load="onImgLoad(i)"
                    />
                  </template>
                  <img
                    v-else
                    class="card-project-media__reveal-img"
                    :class="{
                      'card-project-media__reveal-img--ready': isImgReady(i),
                    }"
                    :ref="(el) => imgRef(el, i)"
                    :src="src"
                    :alt="altText(i)"
                    loading="lazy"
                    decoding="async"
                    @load="onImgLoad(i)"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="card-project-media__nav card-project-media__nav--next card-project-media__nav--beside"
              aria-label="Next image"
              @click="next"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="card-project-media__chev"
              >
                <path
                  d="M10 18l6-6-6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <button
            v-if="stackPeekActive"
            type="button"
            class="card-project-media__nav card-project-media__nav--prev"
            aria-label="Previous image"
            @click="prev"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="card-project-media__chev"
            >
              <path
                d="M14 18l-6-6 6-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            v-if="stackPeekActive"
            type="button"
            class="card-project-media__nav card-project-media__nav--next"
            aria-label="Next image"
            @click="next"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="card-project-media__chev"
            >
              <path
                d="M10 18l6-6-6-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          class="card-project-media__dots"
          role="tablist"
          aria-label="Slides"
        >
          <button
            v-for="(_, i) in images"
            :key="i"
            type="button"
            role="tab"
            :aria-selected="i === active"
            :class="{ 'is-active': i === active }"
            :aria-label="`Image ${i + 1} of ${images.length}`"
            @click="active = i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import MacTitleBar from "./CardProjectImageMacTitleBar.vue";
import DeviceFrame from "./CardProjectImageDeviceFrame.vue";

const props = defineProps({
  images: { type: Array, required: true },
  altBase: { type: String, default: "Project preview" },
  browserFrame: { type: Boolean, default: false },
  slideKinds: { type: Array, default: undefined },
  browserFrameTitle: { type: String, default: undefined },
  stackPeek: { type: Boolean, default: false },
  stackPeekDepth: { type: Number, default: 1 },
});

const active = ref(0);

/** Per-slide decode reveal (home page pattern); frames stay hidden until image loads. */
const imageReady = ref([]);

watch(
  () => props.images.map((u) => u).join("\u0001"),
  () => {
    imageReady.value = props.images.map(() => false);
  },
  { immediate: true },
);

function isImgReady(index) {
  return Boolean(imageReady.value[index]);
}

function markImageReady(index) {
  if (index < 0 || index >= props.images.length) return;
  if (imageReady.value[index]) return;
  const next = [...imageReady.value];
  while (next.length <= index) next.push(false);
  next[index] = true;
  imageReady.value = next;
}

function onImgLoad(index) {
  markImageReady(index);
}

function imgRef(el, index) {
  if (el == null) return;
  const img = el instanceof HTMLImageElement ? el : null;
  if (!img) return;
  if (img.complete && img.naturalWidth > 0) markImageReady(index);
}

function slideKind(index) {
  const k = props.slideKinds?.[index];
  if (k === "print" || k === "ipad" || k === "iphone" || k === "browser")
    return k;
  return "browser";
}

/** Last path segment from bundled URL — fallback when `browserFrameTitle` is unset. */
function fileLabel(url) {
  const name = url
    .replace(/^[a-z]+:\/\/[^/]+\//i, "")
    .split("/")
    .pop();
  return (name ?? "image").split("?")[0] || "image";
}

function titleBarLabel(index) {
  const custom = props.browserFrameTitle?.trim();
  if (custom) return custom;
  const url = props.images[index];
  return url ? fileLabel(url) : "image";
}

watch(
  () => props.images.length,
  (len) => {
    if (active.value >= len) active.value = Math.max(0, len - 1);
  },
);

function altText(index) {
  if (props.images.length <= 1) return props.altBase;
  return `${props.altBase} (${index + 1} of ${props.images.length})`;
}

const ariaLabel = computed(() => `${props.altBase} - image gallery`);

/** ~1-col grid cards are narrower than this; span-2 cards are usually wider — stack only then. */
const STACK_PEEK_MIN_WIDTH_PX = 560;

const mediaRoot = ref(null);
const cardWideEnoughForStack = ref(false);

/** @type {ResizeObserver | null} */
let stackPeekResizeObserver = null;

function updateCardWideForStack() {
  if (!props.stackPeek || props.images.length < 2) {
    cardWideEnoughForStack.value = false;
    return;
  }
  const el = mediaRoot.value;
  if (!el) {
    cardWideEnoughForStack.value = false;
    return;
  }
  cardWideEnoughForStack.value =
    el.getBoundingClientRect().width >= STACK_PEEK_MIN_WIDTH_PX;
}

function setupStackPeekResize() {
  if (stackPeekResizeObserver) {
    stackPeekResizeObserver.disconnect();
    stackPeekResizeObserver = null;
  }
  if (!props.stackPeek || props.images.length < 2) {
    cardWideEnoughForStack.value = false;
    return;
  }
  void nextTick(() => {
    const el = mediaRoot.value;
    if (!el) return;
    updateCardWideForStack();
    stackPeekResizeObserver = new ResizeObserver(() =>
      updateCardWideForStack(),
    );
    stackPeekResizeObserver.observe(el);
  });
}

onMounted(() => {
  setupStackPeekResize();
});

onUnmounted(() => {
  if (stackPeekResizeObserver) {
    stackPeekResizeObserver.disconnect();
    stackPeekResizeObserver = null;
  }
});

watch(
  () => [props.stackPeek, props.images.length],
  () => {
    setupStackPeekResize();
  },
);

/** Stack-peek only for `stack-peek` cards that are actually wide (span-2 in the grid). */
const stackPeekActive = computed(
  () =>
    props.stackPeek && props.images.length > 1 && cardWideEnoughForStack.value,
);

/** Standard carousel track: fill the card image area and equalize slide heights (mixed browser / device / print). */
const carouselUniformSlot = computed(
  () => props.images.length > 1 && !stackPeekActive.value,
);

/** Capped depth so we don’t repeat the same slide in multiple peek slots. */
const stackPeekDepthEffective = computed(() => {
  const n = props.images.length;
  if (!stackPeekActive.value) return 0;
  const requested = props.stackPeekDepth ?? 1;
  const maxByCount = Math.floor((n - 1) / 2);
  let d = Math.min(requested, maxByCount);
  if (d < 1) d = 1;
  return d;
});

/**
 * Stack order (DOM): outer peeks first, then inner peeks, active last (on top).
 * Layer names: peek-prev-2, peek-prev-1, peek-next-2, peek-next-1, active (when depth=2).
 */
const stackLayers = computed(() => {
  const n = props.images.length;
  const depth = stackPeekDepthEffective.value;
  if (!stackPeekActive.value || depth < 1) {
    return [];
  }
  const layers = [];
  for (let d = depth; d >= 1; d--) {
    layers.push({
      layer: `peek-prev-${d}`,
      index: (active.value - d + n) % n,
    });
  }
  for (let d = depth; d >= 1; d--) {
    layers.push({
      layer: `peek-next-${d}`,
      index: (active.value + d) % n,
    });
  }
  layers.push({ layer: "active", index: active.value });
  // Stable Vue keys: one node per slide index. Duplicates (e.g. n=2 with depth 1)
  // would break `:key="item.index"`; keep first occurrence (bottom → top order intact).
  const seen = new Set();
  return layers.filter((item) => {
    if (seen.has(item.index)) return false;
    seen.add(item.index);
    return true;
  });
});

function prev() {
  const n = props.images.length;
  if (n < 2) return;
  active.value = (active.value - 1 + n) % n;
}

function next() {
  const n = props.images.length;
  if (n < 2) return;
  active.value = (active.value + 1) % n;
}

/** Horizontal swipe / drag to change slide (touch + mouse); skips nav + dots. */
const SWIPE_MIN_PX = 48;
let swipePointerId = null;
let swipeStartX = 0;
let swipeStartY = 0;

function swipeTargetIsControls(target) {
  const el = target;
  if (!el?.closest) return false;
  return Boolean(
    el.closest(".card-project-media__nav") ||
      el.closest(".card-project-media__dots"),
  );
}

function onCarouselPointerDown(e) {
  if (props.images.length < 2) return;
  if (swipeTargetIsControls(e.target)) return;
  if (e.pointerType === "mouse" && e.button !== 0) return;
  swipePointerId = e.pointerId;
  swipeStartX = e.clientX;
  swipeStartY = e.clientY;
  e.currentTarget.setPointerCapture(e.pointerId);
}

function onCarouselPointerUp(e) {
  if (swipePointerId !== e.pointerId) return;
  const el = e.currentTarget;
  swipePointerId = null;
  try {
    el.releasePointerCapture(e.pointerId);
  } catch {
    /* already released */
  }
  const dx = e.clientX - swipeStartX;
  const dy = e.clientY - swipeStartY;
  if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
  if (dx > 0) prev();
  else next();
}

function onCarouselPointerCancel(e) {
  if (swipePointerId !== e.pointerId) return;
  swipePointerId = null;
  try {
    e.currentTarget.releasePointerCapture(e.pointerId);
  } catch {
    /* already released */
  }
}

function onCarouselLostPointerCapture(e) {
  if (swipePointerId === e.pointerId) swipePointerId = null;
}
</script>

<style scoped>
.card-project-media {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

/* Uniform track carousel: height follows slide content (no fixed card-image slot). */
.card-project-media--carousel-uniform {
  height: auto;
  align-self: stretch;
}

.card-project-media--filled {
  padding: 0.65rem 0.85rem;
}

.card-project-media--filled.card-project-media--framed {
  padding: 0.55rem 0.65rem;
}

.card-project-media--carousel.card-project-media--filled {
  --carousel-framed-max-h: 14.5rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-project-media--carousel.card-project-media--filled.card-project-media--framed {
  padding: calc(0.55rem + 8px) 0.65rem 0.55rem;
}

.card-project-media--framed-single {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image-label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
}

.card-project-media__content {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.card-project-media--framed-single .card-project-media__content {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  flex: 0 1 auto;
}

.card-project-media__content--plain {
  flex: 1;
  min-height: 0;
}

.card-project-media__stage {
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-project-media__stage--carousel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* —— Mac window (shared with MacTitleBar styles below) —— */
.browser-window--mac {
  border: 1px solid #000;
  border-radius: 2px;
  overflow: hidden;
  background: #fff;
  box-shadow: 2px 2px 0 #000;
}

.browser-window--mac.browser-window--shrink {
  width: fit-content;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.browser-window--mac.browser-window--shrink > :deep(.mac-title-bar) {
  flex: 0 0 auto;
}

.browser-window--in-slide {
  margin: 0 auto;
}

:deep(.device-frame--in-slide) {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  max-width: 100%;
}

.card-project-media__content--device {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.card-project-media--framed-single .card-project-media__content--device {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  flex: 0 1 auto;
}

.card-project-media__stack-layer--active :deep(.device-frame--stack-slide) {
  box-shadow:
    0 10px 26px rgba(26, 24, 20, 0.12),
    2px 2px 0 #000;
}

.browser-window__viewport {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: hidden;
}

.browser-window__viewport--shrink {
  line-height: 0;
  max-height: var(--carousel-framed-max-h, 14.5rem);
}

.browser-window__viewport--shrink img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: var(--carousel-framed-max-h, 14.5rem);
  object-fit: contain;
  object-position: center;
}

/* Decode reveal (Home collage pattern): hide Mac/device chrome until screenshot loads; blur+fade plain slides */
.card-project-media .browser-window.card-project-media__frame-awaiting-media {
  opacity: 0;
  transition: opacity 0.55s ease-out;
}

.card-project-media
  .browser-window.card-project-media__frame-awaiting-media.card-project-media__frame--revealed {
  opacity: 1;
}

.card-project-media
  :deep(.device-frame.card-project-media__frame-awaiting-media) {
  opacity: 0;
  transition: opacity 0.55s ease-out;
}

.card-project-media
  :deep(
    .device-frame.card-project-media__frame-awaiting-media.card-project-media__frame--revealed
  ) {
  opacity: 1;
}

.card-project-media__reveal-img {
  opacity: 0;
  filter: blur(14px);
  transform: scale(1.02);
  image-rendering: auto;
  transition:
    opacity 0.55s ease-out,
    filter 0.5s ease-out,
    transform 0.55s ease-out;
  will-change: opacity, filter;
}

.card-project-media__reveal-img--ready {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .card-project-media .browser-window.card-project-media__frame-awaiting-media,
  .card-project-media
    :deep(.device-frame.card-project-media__frame-awaiting-media) {
    transition: none;
    opacity: 1;
  }

  .card-project-media__reveal-img {
    transition: none;
    filter: none;
    transform: none;
    opacity: 1;
  }
}

.card-project-media__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.card-project-media__img--intrinsic {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: var(--carousel-framed-max-h, 14.5rem);
  object-fit: contain;
}

.card-project-media__carousel-shell {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  align-self: flex-start;
  min-height: min-content;
  width: 100%;
  gap: calc(0.45rem + 8px);
}

.card-project-media__carousel {
  position: relative;
  flex: 0 0 auto;
  min-height: min-content;
  width: 100%;
  overflow: hidden;
  outline: none;
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
}

/* Uniform track: intrinsic height; shell stacks dots under the row. */
.card-project-media--carousel-uniform .card-project-media__carousel-shell {
  flex: 0 1 auto;
  align-self: stretch;
  min-height: 0;
}

.card-project-media--carousel-uniform .card-project-media__carousel {
  flex: 0 1 auto;
  min-height: 0;
}

.card-project-media__carousel-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.35rem;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  min-height: 0;
}

.card-project-media--carousel-uniform .card-project-media__carousel-viewport {
  /* Must stay flex:1 so the viewport has a real width — slides use min-width:100cqw
     and collapse to zero if the viewport doesn’t grow in the carousel row. */
  flex: 1 1 auto;
  min-height: min-content;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-project-media--carousel-uniform .card-project-media__track {
  flex: 0 0 auto;
  min-height: min-content;
  height: auto;
  align-items: stretch;
}

/*
 * Slides: inline-size container for 100cqw; height from tallest slide content.
 */
.card-project-media--carousel-uniform .card-project-media__slide {
  container-type: inline-size;
  container-name: carousel-slide;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  min-height: min-content;
}

.card-project-media--carousel-uniform .card-project-media__slide > * {
  max-width: 100%;
  min-width: 0;
  min-height: 0;
  flex-shrink: 1;
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  .browser-window--in-slide {
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  .browser-window__viewport--shrink {
  line-height: 0;
  max-height: min(var(--carousel-framed-max-h, 14.5rem), 70vh);
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  .browser-window__viewport--shrink
  img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: min(var(--carousel-framed-max-h, 14.5rem), 70vh);
  object-fit: contain;
  object-position: center center;
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  :deep(.device-frame--in-slide) {
  width: fit-content;
  max-width: 100%;
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  :deep(.device-frame__bezel) {
  max-width: 100%;
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  :deep(.device-frame__screen) {
  line-height: 0;
  overflow: hidden;
}

.card-project-media--carousel-uniform
  .card-project-media__slide
  :deep(.device-frame__screen img) {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  /* Reserve ~device chrome + border so the full phone frame fits in the slide */
  max-height: min(var(--carousel-framed-max-h, 14.5rem), calc(70vh - 2.75rem));
  object-fit: contain;
  object-position: center center;
}

.card-project-media__carousel--stack {
  overflow: visible;
}

.card-project-media--stack-peek .card-project-media__carousel-shell {
  overflow: visible;
}

.card-project-media__stack-stage {
  position: relative;
  width: 100%;
  min-height: min-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 clamp(2rem, 11vw, 4rem);
  box-sizing: border-box;
}

.card-project-media__stack-stage--multi {
  /* Horizontal % positions are vs full stage width; keep gutters modest */
  padding: 0 clamp(0.35rem, 2vw, 1rem);
}

.card-project-media__stack-layer {
  flex-shrink: 0;
}

/*
 * Side peeks: position by horizontal % (translate -50%) so each centers in a column.
 * width: max-content — without this, abs + left:% uses shrink-to-fit and the used width
 * is only the strip from left to the container’s right edge, so right-side peeks (~70–90%)
 * get squeezed to a fraction of row width while left peeks get most of the row. That
 * made the far-right slide tiny and resize-sensitive.
 */
.card-project-media__stack-layer--peek-prev-1,
.card-project-media__stack-layer--peek-prev-2,
.card-project-media__stack-layer--peek-prev-3,
.card-project-media__stack-layer--peek-prev-4,
.card-project-media__stack-layer--peek-next-1,
.card-project-media__stack-layer--peek-next-2,
.card-project-media__stack-layer--peek-next-3,
.card-project-media__stack-layer--peek-next-4 {
  position: absolute;
  top: 50%;
  width: max-content;
  max-width: none;
  transform-origin: center center;
  pointer-events: none;
  opacity: 1;
  isolation: isolate;
  transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.card-project-media__stack-layer--peek-prev-1,
.card-project-media__stack-layer--peek-next-1 {
  z-index: 3;
}

.card-project-media__stack-layer--peek-prev-2,
.card-project-media__stack-layer--peek-next-2 {
  z-index: 2;
}

.card-project-media__stack-layer--peek-prev-3,
.card-project-media__stack-layer--peek-next-3 {
  z-index: 1;
}

.card-project-media__stack-layer--peek-prev-4,
.card-project-media__stack-layer--peek-next-4 {
  z-index: 0;
}

/*
 * Peek positions: % = horizontal center (translate -50%). Focus = scale(1).
 * Inner ring (…-1): 90%. Outer ring (…-2): a bit smaller — step is gentler than center→inner.
 */
.card-project-media__stack-layer--peek-prev-1 {
  left: 31%;
  transform: translate(-50%, -50%) scale(0.9);
}

.card-project-media__stack-layer--peek-prev-2 {
  left: 22%;
  transform: translate(-50%, -50%) scale(0.86);
}

.card-project-media__stack-layer--peek-prev-3 {
  left: 14%;
  transform: translate(-50%, -50%) scale(0.9);
}

.card-project-media__stack-layer--peek-prev-4 {
  left: 8%;
  transform: translate(-50%, -50%) scale(0.9);
}

.card-project-media__stack-layer--peek-next-1 {
  left: 69%;
  transform: translate(-50%, -50%) scale(0.9);
}

.card-project-media__stack-layer--peek-next-2 {
  left: 78%;
  transform: translate(-50%, -50%) scale(0.86);
}

.card-project-media__stack-layer--peek-next-3 {
  left: 86%;
  transform: translate(-50%, -50%) scale(0.9);
}

.card-project-media__stack-layer--peek-next-4 {
  left: 90%;
  transform: translate(-50%, -50%) scale(0.9);
}

.card-project-media__stack-layer--active {
  position: relative;
  z-index: 5;
}

.card-project-media__stack-layer--active
  .browser-window--mac.browser-window--stack {
  box-shadow:
    0 10px 26px rgba(26, 24, 20, 0.12),
    2px 2px 0 #000;
}

@media (prefers-reduced-motion: reduce) {
  .card-project-media__stack-layer--peek-prev-1,
  .card-project-media__stack-layer--peek-prev-2,
  .card-project-media__stack-layer--peek-prev-3,
  .card-project-media__stack-layer--peek-prev-4,
  .card-project-media__stack-layer--peek-next-1,
  .card-project-media__stack-layer--peek-next-2,
  .card-project-media__stack-layer--peek-next-3,
  .card-project-media__stack-layer--peek-next-4 {
    transition: none;
  }
}

.card-project-media__carousel:focus-visible {
  box-shadow: inset 0 0 0 2px
    color-mix(in srgb, var(--ink, #1a1814) 35%, transparent);
}

/* Track viewport: full width between side nav (uniform row); stack layout has no viewport. */
.card-project-media__carousel-viewport {
  container-type: inline-size;
  container-name: card-carousel;
  overflow: hidden;
  margin-left: 0;
  margin-right: 0;
  min-width: 0;
  flex: 1 1 auto;
  width: auto;
  align-self: stretch;
}

.card-project-media__track {
  display: flex;
  align-items: stretch;
  min-height: min-content;
  transition: transform 0.38s cubic-bezier(0.33, 1, 0.68, 1);
  will-change: transform;
}

/*
 * Each slide must be exactly one viewport width. `min-width: 0` (flex default) let slides
 * shrink so multiple appeared in one row on narrow single-col cards.
 */
.card-project-media__slide {
  flex: 0 0 100cqw;
  min-width: 100cqw;
  min-height: min-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  box-sizing: border-box;
}

@supports not (width: 100cqw) {
  .card-project-media__slide {
    flex: 0 0 100%;
    min-width: 100%;
  }
}

/* Plain print slides: direct img */
.card-project-media__slide > img {
  display: block;
  max-width: 100%;
  max-height: min(var(--carousel-framed-max-h, 14.5rem), 70vh);
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
}

.card-project-media--carousel-uniform .card-project-media__slide > img {
  max-width: 100%;
  max-height: min(var(--carousel-framed-max-h, 14.5rem), 70vh);
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center center;
}

/* Same screenshot cap as browser/print — DeviceFrame defaults to 17rem which skews mixed carousels (e.g. mofm) */
.card-project-media--carousel:not(.card-project-media--carousel-uniform)
  .card-project-media__slide
  :deep(.device-frame__screen img),
.card-project-media--carousel:not(.card-project-media--carousel-uniform)
  .card-project-media__stack-layer
  :deep(.device-frame__screen img) {
  max-height: var(--carousel-framed-max-h, 14.5rem);
}

/* iPhone top chrome is taller than the Mac title bar; slightly lower screen cap so outer frame height matches browser slides */
.card-project-media--carousel:not(.card-project-media--carousel-uniform)
  .card-project-media__slide
  :deep(.device-frame--iphone .device-frame__screen img),
.card-project-media--carousel:not(.card-project-media--carousel-uniform)
  .card-project-media__stack-layer
  :deep(.device-frame--iphone .device-frame__screen img) {
  max-height: calc(var(--carousel-framed-max-h, 14.5rem) - 1rem);
}

.card-project-media__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: auto;
  padding: 0.35rem;
  margin: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--ink, #1a1814);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  transition: opacity 0.15s ease;
}

.card-project-media__nav:hover {
  opacity: 0.72;
}

.card-project-media__nav:focus-visible {
  outline: 2px solid var(--ink, #1a1814);
  outline-offset: 2px;
}

.card-project-media__chev {
  width: 18px;
  height: 18px;
  display: block;
}

.card-project-media__nav--prev {
  left: 0.35rem;
}

.card-project-media__nav--next {
  right: 0.35rem;
}

/* Track carousel: chevrons sit outside the viewport in a flex row (not over the screenshot). */
.card-project-media__nav--beside {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  transform: none;
  flex-shrink: 0;
}

.card-project-media__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.25rem;
  flex-shrink: 0;
}

.card-project-media__dots button {
  width: 6px;
  height: 6px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: color-mix(in srgb, var(--ink, #1a1814) 22%, transparent);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.card-project-media__dots button.is-active {
  background: var(--ink, #1a1814);
  transform: scale(1.25);
}

@media (max-width: 640px) {
  .card-project-media__nav {
    padding: 0.45rem;
  }
}
</style>
