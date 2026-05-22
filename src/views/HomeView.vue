<script setup>
import { computed } from "vue";
import { site, founder } from "@/data/site";
import { services, processSteps } from "@/data/services";
import { featuredProjects, capabilities } from "@/data/projects";
import AwardsList from "@/components/AwardsList.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ServicesColorField from "@/components/ServicesColorField.vue";
import ctaPaperBg from "@/assets/paper/black2.jpeg";

const homeTeaserProjects = computed(() =>
  featuredProjects.filter((p) => p.id !== "manitou-arts").slice(0, 3),
);

const serviceAccents = {
  brand: "var(--c-cyan)",
  digital: "var(--r-blue)",
  campaign: "var(--c-magenta)",
  creative: "var(--r-green)",
};
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

    <section class="section services-showcase" id="services-preview">
      <Teleport to="body">
        <ServicesColorField />
      </Teleport>

      <div class="services-intro-band">
        <div class="container services-intro reveal">
          <p class="section-label">What we do</p>
          <h2 class="heading-lg">Services</h2>
          <p class="lead services-lead">
            Identity, software, print, and custom creative work — designed and
            built together under one studio practice.
          </p>
        </div>
      </div>

      <div class="services-mosaic reveal" role="list">
        <article
          v-for="(s, i) in services"
          :key="s.id"
          class="service-row"
          :class="{ 'service-row--flip': i % 2 === 1 }"
          role="listitem"
          :style="{ '--accent': serviceAccents[s.id] }"
        >
          <div class="mosaic-cell mosaic-cell--art" aria-hidden="true">
            <div class="mosaic-cell__glass" />
          </div>
          <div class="mosaic-cell mosaic-cell--copy">
            <h3 class="mosaic-cell__title">{{ s.title }}</h3>
            <p class="mosaic-cell__summary">{{ s.summary }}</p>
            <RouterLink :to="`/services#${s.id}`" class="mosaic-cell__link">
              Explore <span aria-hidden="true">↗</span>
            </RouterLink>
          </div>
        </article>
      </div>

      <div class="services-foot-band">
        <div class="container services-mosaic-foot reveal">
          <RouterLink to="/services" class="btn btn--ghost btn--pill">
            All services <span aria-hidden="true">→</span>
          </RouterLink>
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

    <section class="section section--awards">
      <div class="awards-band">
        <div class="container awards-block reveal">
          <p class="section-label">Recognition</p>
          <AwardsList />
        </div>
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
  background: var(--paper);
}

.hero-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-headline {
  font-family: var(--font-hero);
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

.services-showcase {
  position: relative;
  z-index: 1;
  padding-block: 0;
}

.services-intro-band {
  position: relative;
  z-index: 1;
  width: 100%;
  background: var(--paper);
  padding-top: clamp(4rem, 10vw, 7rem);
  padding-bottom: clamp(2rem, 5vw, 3rem);
}

.services-foot-band {
  position: relative;
  z-index: 1;
  width: 100%;
  background: var(--paper);
  padding-top: clamp(2rem, 5vw, 2.5rem);
  padding-bottom: clamp(3rem, 8vw, 5rem);
}

.services-mosaic {
  position: relative;
  z-index: 1;
}

.services-lead {
  margin-top: 1rem;
}

.services-mosaic {
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}

.service-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid var(--ink);
}

.service-row:last-child {
  border-bottom: none;
}

.service-row--flip .mosaic-cell--art {
  order: 2;
  border-right: none;
}

.service-row--flip .mosaic-cell--copy {
  order: 1;
  border-right: 1px solid var(--ink);
}

.mosaic-cell {
  padding: clamp(1.25rem, 4vw, 4.5rem) clamp(1rem, 3vw, 3rem);
}

.mosaic-cell--art {
  position: relative;
  min-height: clamp(8rem, 28vw, 14rem);
  background: transparent;
  overflow: hidden;
  border-right: 1px solid var(--ink);
}

.mosaic-cell__glass {
  position: absolute;
  inset: 0;
  background: rgba(250, 250, 250, 0.42);
  backdrop-filter: blur(28px) saturate(1.2);
  -webkit-backdrop-filter: blur(28px) saturate(1.2);
}

@supports not (backdrop-filter: blur(1px)) {
  .mosaic-cell__glass {
    background: rgba(250, 250, 250, 0.88);
  }
}

.mosaic-cell--copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  background: #fff;
}

.mosaic-cell__title {
  font-size: clamp(1rem, 3.2vw, 2.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.mosaic-cell__summary {
  margin-top: 0.85rem;
  color: var(--muted);
  font-size: clamp(0.8rem, 2vw, 1.05rem);
  line-height: 1.5;
}

.mosaic-cell__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: clamp(1rem, 3vw, 2rem);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  border-bottom: 1px solid transparent;
  padding-bottom: 0.15rem;
  align-self: flex-start;
  transition:
    color 0.2s,
    gap 0.25s var(--ease),
    border-color 0.2s;
}

.mosaic-cell__link:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
  gap: 0.6rem;
}

.services-mosaic-foot {
  display: flex;
  justify-content: flex-end;
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
  color: var(--r-blue);
  line-height: 1;
}

.process-list h3 {
  font-size: 1rem;
  font-weight: 300;
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

.process-block .text-link:hover {
  color: var(--r-blue);
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
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.capabilities li::before {
  content: "— ";
  color: var(--c-cyan);
}

.section--awards {
  padding-block: 0;
}

.awards-band {
  position: relative;
  z-index: 1;
  width: 100%;
  background: #fff;
  padding-block: clamp(4rem, 10vw, 7rem);
}

.cta-band {
  position: relative;
  z-index: 1;
  background-color: var(--ink);
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
  background: transparent;
  border-color: var(--paper);
  color: var(--paper);
}

.cta-inner .btn:hover {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}

.inline-code {
  font-size: 0.85em;
  background: rgba(10, 10, 10, 0.06);
  padding: 0.1em 0.35em;
  border-radius: 2px;
}
</style>
