<script setup>
import { site, founder } from "@/data/site";
import { awards, capabilities } from "@/data/projects";
</script>

<template>
  <div class="page about-page">
    <section class="section about-hero">
      <div class="container reveal">
        <p class="section-label">Studio</p>
        <h1 class="heading-xl">About {{ site.name }}</h1>
        <p class="lead">
          A design and development practice rooted in print discipline and
          screen craft — founded {{ site.founded }} in Colorado.
        </p>
      </div>
    </section>

    <div class="cmyk-bar" aria-hidden="true"><span /><span /><span /><span /></div>

    <section class="section">
      <div class="container about-split reveal">
        <div>
          <h2 class="heading-lg">Why CMYK/RGB?</h2>
          <p class="body-text">
            Print thinks in subtractive color — cyan, magenta, yellow, and key.
            Screens think in additive light — red, green, blue. Great work lives
            in both worlds. We name the studio after that tension: brand systems
            that work on paper and in pixels, campaigns that feel tactile online,
            and code that respects the design intent.
          </p>
          <p class="body-text">
            {{ founder.bio }}
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
        <ul class="awards">
          <li v-for="a in awards" :key="a.year">
            <span>{{ a.year }}</span>
            <a v-if="a.url" :href="a.url" target="_blank" rel="noopener noreferrer">{{
              a.title
            }}</a>
            <span v-else>{{ a.title }}</span>
          </li>
        </ul>
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
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 0.5rem;
}

.founder-role {
  margin-top: 0.25rem;
  color: var(--c-magenta);
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
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.values-grid p {
  color: var(--muted);
  font-size: 0.92rem;
}

.cap-grid {
  list-style: none;
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

.awards {
  list-style: none;
  margin-top: 1rem;
}

.awards li {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
}

.awards li span:first-child {
  font-weight: 600;
  color: var(--c-magenta);
}

.awards a {
  text-decoration: none;
}

.cta-mini {
  text-align: center;
}

.cta-mini .btn {
  margin-top: 1.5rem;
}
</style>
