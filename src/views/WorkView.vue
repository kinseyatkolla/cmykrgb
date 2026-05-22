<script setup>
import { featuredProjects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard.vue";
</script>

<template>
  <div class="page work-page">
    <section class="section work-hero">
      <div class="container reveal">
        <p class="section-label">Portfolio</p>
        <h1 class="heading-xl">Selected work</h1>
        <p class="lead">
          Enterprise platforms, civic campaigns, and products — designed and
          developed end to end.
        </p>
      </div>
    </section>

    <div class="rgb-bar" aria-hidden="true"><span /><span /><span /></div>

    <section class="section">
      <div class="container work-grid">
        <ProjectCard
          v-for="p in featuredProjects"
          :key="p.id"
          class="reveal"
          :project="p"
        />
      </div>
    </section>

    <section class="section cta-mini">
      <div class="container reveal">
        <h2 class="heading-lg">Ready to add your project here?</h2>
        <RouterLink to="/contact" class="btn">Start a conversation</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.work-hero {
  padding-top: clamp(5rem, 12vw, 7rem);
}

.work-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 900px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .work-grid :deep(.project--wide) {
    grid-column: span 2;
  }
}

@media (max-width: 640px) {
  .work-grid :deep(.project-visual:has(.card-project-media--stack-peek-multi)) {
    min-height: 320px;
  }
}

.cta-mini {
  text-align: center;
}

.cta-mini .btn {
  margin-top: 1.5rem;
}
</style>
