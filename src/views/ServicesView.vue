<script setup>
import { services, processSteps } from "@/data/services";
</script>

<template>
  <div class="page services-page">
    <section class="section services-hero">
      <div class="container reveal">
        <p class="section-label">Capabilities</p>
        <h1 class="heading-xl">Services</h1>
        <p class="lead">
          From strategy and identity systems to software, publishing, and
          production — design and development handled together under one studio
          practice.
        </p>
      </div>
    </section>

    <div class="rgb-bar" aria-hidden="true"><span /><span /><span /></div>

    <section class="section">
      <div class="container services-list">
        <article
          v-for="s in services"
          :key="s.id"
          :id="s.id"
          class="service-detail reveal"
        >
          <h2 class="heading-lg">{{ s.title }}</h2>
          <p class="service-summary">{{ s.summary }}</p>
          <ul class="deliverables">
            <li v-for="d in s.deliverables" :key="d">{{ d }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section section--process">
      <div class="container">
        <p class="section-label reveal">Method</p>
        <h2 class="heading-lg reveal">Our process</h2>
        <div class="process-timeline reveal">
          <div v-for="step in processSteps" :key="step.step" class="timeline-step">
            <span class="timeline-num">{{ step.step }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section engagement">
      <div class="container reveal">
        <h2 class="heading-lg">Engagement models</h2>
        <div class="engagement-grid">
          <div class="engagement-card">
            <h3>Project</h3>
            <p>Fixed scope for launches, rebrands, and campaign rollouts.</p>
          </div>
          <div class="engagement-card">
            <h3>Retainer</h3>
            <p>Ongoing design &amp; dev hours for teams that ship continuously.</p>
          </div>
          <div class="engagement-card">
            <h3>Advisory</h3>
            <p>Design systems audits, UX reviews, and technical translation.</p>
          </div>
        </div>
        <RouterLink to="/contact" class="btn" style="margin-top: 2rem">Request a quote</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-hero {
  padding-top: clamp(5rem, 12vw, 7rem);
}

.services-list {
  display: grid;
  gap: 4rem;
}

.service-detail {
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: calc(var(--header-h) + 1rem);
}

.service-detail:last-child {
  border-bottom: none;
}

.service-summary {
  margin-top: 1rem;
  color: var(--muted);
  max-width: 40rem;
  font-size: 1.15rem;
}

.deliverables {
  margin-top: 1.5rem;
  list-style: none;
  display: grid;
  gap: 0.6rem;
}

.deliverables li {
  padding-left: 1.25rem;
  position: relative;
}

.deliverables li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  background: var(--c-magenta);
}

.section--process {
  background: #fff;
  border-block: 1px solid var(--line);
}

.process-timeline {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .process-timeline {
    grid-template-columns: repeat(5, 1fr);
  }
}

.timeline-step {
  border-top: 2px solid var(--c-yellow);
  padding-top: 1rem;
}

.timeline-num {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--c-cyan);
  display: block;
  margin-bottom: 0.5rem;
}

.timeline-step h3 {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.timeline-step p {
  font-size: 0.85rem;
  color: var(--muted);
}

.engagement-grid {
  display: grid;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin-top: 1.5rem;
}

@media (min-width: 640px) {
  .engagement-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.engagement-card {
  background: #fff;
  padding: 1.75rem;
}

.engagement-card h3 {
  font-weight: 300;
  margin-bottom: 0.5rem;
}

.engagement-card p {
  color: var(--muted);
  font-size: 0.92rem;
}
</style>
