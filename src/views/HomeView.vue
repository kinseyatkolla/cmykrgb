<script setup>
import { computed } from "vue";
import { site, founder } from "@/data/site";
import { services, processSteps } from "@/data/services";
import { featuredProjects, capabilities, awards } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard.vue";
import ctaPaperBg from "@/assets/paper/black2.jpeg";

const homeTeaserProjects = computed(() =>
  featuredProjects.filter((p) => p.id !== "manitou-arts").slice(0, 3),
);
</script>

<template>
  <div class="page home">
    <section class="hero section">
      <div class="container hero-grid reveal">
        <p class="section-label">DESIGN • DEVELOPMENT • PUBLISHING</p>
        <h1 class="hero-headline">Digital + Print</h1>
        <p class="lead hero-lead">
          {{ site.name }} creates thoughtful visual identities, websites, native
          apps, and printed work. From branding and logo systems to iOS apps,
          desktop software, and handmade artist books, every project is designed
          with clarity, craft, and longevity in mind.
        </p>
        <div class="hero-actions">
          <RouterLink to="/contact" class="btn">Start a project</RouterLink>
          <RouterLink to="/work" class="btn btn--ghost"
            >See our work</RouterLink
          >
        </div>
        <p class="hero-location">{{ site.location }}</p>
      </div>
    </section>

    <div class="rgb-bar" aria-hidden="true"><span /><span /><span /></div>

    <section class="section" id="services-preview">
      <div class="container">
        <p class="section-label reveal">What we do</p>
        <h2 class="heading-lg reveal">Services</h2>
        <div class="service-grid reveal">
          <article v-for="s in services" :key="s.id" class="service-card">
            <h3>{{ s.title }}</h3>
            <p>{{ s.summary }}</p>
            <RouterLink :to="`/services#${s.id}`" class="service-more"
              >Learn more →</RouterLink
            >
          </article>
        </div>
      </div>
    </section>

    <div class="rgb-bar" aria-hidden="true"><span /><span /><span /></div>

    <section class="section section--soft">
      <div class="container">
        <p class="section-label reveal">Selected work</p>
        <h2 class="heading-lg reveal">Case studies</h2>
        <p class="lead reveal">
          Enterprise platforms, civic campaigns, and products — designed and
          developed end to end.
        </p>
        <div class="project-grid reveal">
          <ProjectCard
            v-for="p in homeTeaserProjects"
            :key="p.id"
            :project="p"
          />
        </div>
        <div class="section-cta reveal">
          <RouterLink to="/work" class="btn btn--ghost"
            >All projects</RouterLink
          >
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container process-block reveal">
        <p class="section-label">How we work</p>
        <h2 class="heading-lg">Process</h2>
        <ol class="process-list">
          <li v-for="step in processSteps" :key="step.step">
            <span class="process-num">{{ step.step }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.body }}</p>
            </div>
          </li>
        </ol>
        <RouterLink to="/services" class="text-link"
          >Full process & services →</RouterLink
        >
      </div>
    </section>

    <section class="section section--about">
      <div class="container about-grid reveal">
        <div>
          <p class="section-label">Studio</p>
          <h2 class="heading-lg">About {{ site.name }}</h2>
          <p class="about-bio">{{ founder.bio }}</p>
          <RouterLink to="/about" class="text-link"
            >Meet the studio →</RouterLink
          >
        </div>
        <div class="capabilities">
          <p class="capabilities-label">Capabilities</p>
          <ul>
            <li v-for="c in capabilities" :key="c">{{ c }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container awards-block reveal">
        <p class="section-label">Recognition</p>
        <ul class="awards-list">
          <li v-for="a in awards" :key="a.year">
            <span class="award-year">{{ a.year }}</span>
            <a
              v-if="a.url"
              :href="a.url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ a.title }}</a
            >
            <span v-else>{{ a.title }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="section cta-band"
      :style="{ backgroundImage: `url(${ctaPaperBg})` }"
    >
      <div class="container cta-inner reveal">
        <h2 class="heading-lg">Have a project in mind?</h2>
        <p class="lead">
          Tell us what you're building — we'll reply within a few days.
        </p>
        <RouterLink to="/contact" class="btn">Get in touch</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding-top: clamp(5rem, 14vw, 9rem);
  min-height: 85vh;
  display: flex;
  align-items: flex-end;
}

.hero-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-headline {
  /* Alternates loaded: "Amarante", serif · "Bellota", sans-serif */
  font-family: "Aguafina Script", cursive;
  font-size: clamp(4.5rem, 18vw, 12rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0;
}

.hero-lead {
  max-width: 36rem;
  font-size: clamp(0.95rem, 1.65vw, 1.1rem);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.hero-location {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 1rem;
}

.service-grid {
  display: grid;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-card {
  background: var(--paper);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-card h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
}

.service-card p {
  color: var(--muted);
  flex: 1;
}

.service-more {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
}

.section--soft {
  background: #fff;
  border-block: 1px solid var(--line);
}

.project-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .project-grid :deep(.project--wide) {
    grid-column: span 2;
  }
}

.section-cta {
  margin-top: 2.5rem;
}

.process-list {
  list-style: none;
  margin-top: 2rem;
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .process-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.process-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--line);
}

.process-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--c-magenta);
  line-height: 1;
}

.process-list h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.process-list p {
  color: var(--muted);
  font-size: 0.92rem;
}

.text-link {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
}

.text-link:hover {
  color: var(--c-magenta);
}

.section--about {
  background: #fff;
  border-block: 1px solid var(--line);
}

.about-grid {
  display: grid;
  gap: 3rem;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1.4fr 1fr;
  }
}

.about-bio {
  margin-top: 1rem;
  color: var(--muted);
  max-width: 38rem;
}

.capabilities-label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
}

.capabilities ul {
  list-style: none;
  display: grid;
  gap: 0.5rem;
}

.capabilities li::before {
  content: "— ";
  color: var(--c-cyan);
}

.awards-list {
  list-style: none;
  margin-top: 1.5rem;
}

.awards-list li {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
}

.award-year {
  font-weight: 600;
  color: var(--c-magenta);
}

.awards-list a {
  text-decoration: none;
}

.cta-band {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--paper);
}

.cta-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cta-inner .lead {
  color: rgba(250, 250, 250, 0.85);
}

.cta-inner .btn {
  margin-top: 0.5rem;
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}

.cta-inner .btn:hover {
  background: transparent;
  color: var(--paper);
}

.inline-code {
  font-size: 0.85em;
  background: rgba(10, 10, 10, 0.06);
  padding: 0.1em 0.35em;
  border-radius: 2px;
}
</style>
