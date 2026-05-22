<script setup>
import { site, founder, studioIdentity, aboutLead, studioAbout } from "@/data/site";
import { capabilities } from "@/data/projects";
import AwardsList from "@/components/AwardsList.vue";
</script>

<template>
  <div class="page about-page">
    <section class="section about-hero">
      <div class="container reveal">
        <p class="section-label">Studio</p>
        <h1 class="heading-xl">About {{ site.name }}</h1>
        <p class="about-identity">{{ studioIdentity }}</p>
        <p class="lead about-lead">{{ aboutLead }}</p>
      </div>
    </section>

    <div class="rgb-bar" aria-hidden="true"><span /><span /><span /></div>

    <section class="section">
      <div class="container about-split reveal">
        <div>
          <h2 class="heading-lg">Why CMYK/RGB?</h2>
          <p v-for="(text, i) in studioAbout" :key="i" class="body-text">
            {{ text }}
          </p>
        </div>
        <aside class="founder-card">
          <p class="founder-label">Leadership</p>
          <p class="founder-name">{{ founder.name }}</p>
          <p class="founder-role">{{ founder.role }}</p>
          <p class="founder-edu">
            Parsons Communication Design &amp; Technology · Galvanize Full Stack
          </p>
        </aside>
      </div>
    </section>

    <section class="section values-section">
      <div class="container">
        <p class="section-label reveal">Principles</p>
        <div class="values-grid reveal">
          <article>
            <h3>Design &amp; build together</h3>
            <p>No throw-over-the-wall handoffs. The person who prototypes ships.</p>
          </article>
          <article>
            <h3>Purpose-driven work</h3>
            <p>Civic tools, cultural organizations, and brands with something real to say.</p>
          </article>
          <article>
            <h3>Clarity for stakeholders</h3>
            <p>We translate complex systems for teams who need to make decisions, not read specs.</p>
          </article>
          <article>
            <h3>Accessible &amp; fast</h3>
            <p>Vue.js frontends, semantic HTML, and performance as part of the aesthetic.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container reveal">
        <p class="section-label">Capabilities</p>
        <ul class="cap-grid">
          <li v-for="c in capabilities" :key="c">{{ c }}</li>
        </ul>
      </div>
    </section>

    <section class="section awards-section">
      <div class="container reveal">
        <p class="section-label">Recognition</p>
        <AwardsList />
      </div>
    </section>

    <section class="section cta-mini">
      <div class="container reveal">
        <h2 class="heading-lg">Work with us</h2>
        <RouterLink to="/contact" class="btn">Get in touch</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero {
  padding-top: clamp(5rem, 12vw, 7rem);
}

.about-identity {
  margin-top: 1.5rem;
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.02em;
  max-width: 28rem;
}

.about-lead {
  margin-top: 1.5rem;
}

.about-split {
  display: grid;
  gap: 3rem;
}

@media (min-width: 768px) {
  .about-split {
    grid-template-columns: 1.5fr 1fr;
  }
}

.body-text {
  color: var(--muted);
  margin-top: 1rem;
  max-width: 40rem;
}

.founder-card {
  border: 1px solid var(--line);
  padding: 2rem;
  background: #fff;
  align-self: start;
}

.founder-label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.founder-name {
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 0.5rem;
}

.founder-role {
  margin-top: 0.25rem;
  color: var(--r-blue);
  font-size: 0.9rem;
}

.founder-edu {
  margin-top: 1rem;
  font-size: 0.88rem;
  color: var(--muted);
}

.values-section {
  background: #fff;
  border-block: 1px solid var(--line);
}

.values-grid {
  display: grid;
  gap: 2rem;
  margin-top: 1.5rem;
}

@media (min-width: 640px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.values-grid h3 {
  font-size: 1.1rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
}

.values-grid p {
  color: var(--muted);
  font-size: 0.92rem;
}

.cap-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.cap-grid li {
  padding: 0.75rem 1rem;
  border: 1px solid var(--line);
  font-size: 0.88rem;
}

@media (max-width: 768px) {
  .cap-grid {
    grid-template-columns: 1fr;
  }
}

.cta-mini {
  text-align: center;
}

.cta-mini .btn {
  margin-top: 1.5rem;
}
</style>
