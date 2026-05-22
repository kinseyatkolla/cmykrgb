<script setup>
import { computed } from "vue";
import CardProjectImage from "@/components/CardProjectImage.vue";

const props = defineProps({
  project: { type: Object, required: true },
});

const images = computed(() => props.project.images ?? []);

const altBase = computed(
  () => `${props.project.title} preview`,
);
</script>

<template>
  <article
    class="project"
    :class="[
      `project--${project.accent}`,
      { 'project--wide': project.spanWide },
    ]"
  >
    <div class="project-visual">
      <CardProjectImage
        :images="images"
        :slide-kinds="project.slideKinds"
        :alt-base="altBase"
        :browser-frame="project.browserFrame"
        :browser-frame-title="project.browserFrameTitle"
        :stack-peek="project.stackPeek"
        :stack-peek-depth="project.stackPeekDepth"
      >
        <template #placeholder>
          <span class="project-placeholder-label">{{ project.category }}</span>
        </template>
      </CardProjectImage>
    </div>
    <div class="project-body">
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-desc">{{ project.description }}</p>
      <p class="project-meta">{{ project.meta }}</p>
      <a
        v-if="project.link"
        :href="project.link"
        class="project-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View recognition ↗
      </a>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--line);
  background: #fff;
  transition: transform 0.3s var(--ease);
  overflow: hidden;
}

.project:has(:deep(.card-project-media--stack-peek)) {
  overflow: visible;
}

.project:has(:deep(.card-project-media--carousel-uniform)) {
  overflow: visible;
}

.project:hover {
  transform: translateY(-4px);
}

.project-visual {
  position: relative;
  background: #fff;
  overflow: hidden;
  min-height: 200px;
}

.project--wide .project-visual {
  min-height: 260px;
}

.project-visual:has(:deep(.card-project-media--carousel-uniform)) {
  height: auto;
  min-height: 0;
  overflow: visible;
}

.project-visual:has(:deep(.card-project-media--stack-peek)) {
  overflow: visible;
  min-height: 280px;
}

.project-visual:has(:deep(.card-project-media--stack-peek-multi)) {
  min-height: 300px;
}

.project :deep(.card-image-label) {
  background: linear-gradient(135deg, #f5f5f5 0%, #ebebeb 50%, #e0e0e0 100%);
}

.project--cmyk :deep(.card-image-label) {
  background: linear-gradient(
    135deg,
    var(--c-cyan) 0%,
    var(--c-magenta) 45%,
    var(--c-yellow) 85%,
    var(--c-key) 100%
  );
}

.project--rgb :deep(.card-image-label) {
  background: linear-gradient(
    135deg,
    var(--r-red),
    var(--r-green) 50%,
    var(--r-blue)
  );
}

.project-placeholder-label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.85);
  padding: 0.4rem 0.75rem;
}

/* Carousel padding overrides (match kinsey WorkView single-col cards) */
.project:not(.project--wide)
  :deep(.card-project-media--carousel.card-project-media--filled) {
  padding-top: 8px !important;
  padding-bottom: 0 !important;
}

.project:not(.project--wide)
  :deep(
    .card-project-media--carousel.card-project-media--filled:not(
        .card-project-media--framed
      )
  ) {
  padding-left: 0.85rem !important;
  padding-right: 0.85rem !important;
}

.project:not(.project--wide)
  :deep(
    .card-project-media--carousel.card-project-media--filled.card-project-media--framed
  ) {
  padding-left: 0.65rem !important;
  padding-right: 0.65rem !important;
}

.project:not(.project--wide) :deep(.card-project-media__carousel-shell) {
  gap: 0.45rem !important;
}

.project-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-title {
  font-size: 1.35rem;
  letter-spacing: -0.02em;
}

.project-desc {
  color: var(--muted);
  font-size: 0.95rem;
  flex: 1;
}

.project-meta {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.project-link {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
}

.project-link:hover {
  color: var(--c-magenta);
}
</style>
