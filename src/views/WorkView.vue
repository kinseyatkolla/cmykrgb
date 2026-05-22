<script setup>
import { featuredProjects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard.vue";
</script>

<template>
  <div class="page work-page">
    <section class="section work-hero">
      <div class="container reveal">
        <p class="section-label">Portfolio</p>
        <h1 class="heading-xl">Selected Work</h1>
        <p class="work-meta">
          Designer & Developer — Denver / Manitou Springs, Colorado
        </p>
        <div class="work-intro">
          <p>
            I began in design — branding, print, and websites — before moving
            deeper into the systems that bring them to life. Over time, that
            curiosity expanded into software development, publishing, and
            creative technology.
          </p>
          <p>
            Today, CMYK/RGB works across visual identity, digital products, native
            applications, and printed matter, designing and building projects from
            concept to release with equal attention to aesthetics, usability, and
            craft.
          </p>
        </div>
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

.work-meta {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: var(--muted);
  max-width: 42rem;
  margin-top: 1rem;
}

.work-intro {
  margin-top: 1.5rem;
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.work-intro p {
  color: var(--muted);
  line-height: 1.6;
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
