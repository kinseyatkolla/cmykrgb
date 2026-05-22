<script setup>
import { site } from "@/data/site";
</script>

<template>
  <div class="page contact-page">
    <section class="section contact-hero">
      <div class="container reveal">
        <p class="section-label">Contact</p>
        <h1 class="heading-xl">Start a project</h1>
        <p class="lead">
          Tell us about your timeline, budget range, and what you're building. We
          typically reply within two business days.
        </p>
      </div>
    </section>

    <div class="rgb-bar" aria-hidden="true"><span /><span /><span /></div>

    <section class="section">
      <div class="container contact-grid reveal">
        <form
          class="contact-form"
          action="mailto:hello@cmykrgb.com"
          method="post"
          enctype="text/plain"
        >
          <label>
            <span>Name</span>
            <input type="text" name="name" required autocomplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required autocomplete="email" />
          </label>
          <label>
            <span>Project type</span>
            <select name="type">
              <option>Brand &amp; identity</option>
              <option>Website or app</option>
              <option>Campaign &amp; print</option>
              <option>Creative development</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="6" required />
          </label>
          <button type="submit" class="btn">Send inquiry</button>
          <p class="form-note">
            Opens your email client. Prefer a form backend? Wire Formspree or
            Railway env vars later.
          </p>
        </form>

        <aside class="contact-aside">
          <div class="aside-block">
            <h2>Email</h2>
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          </div>
          <div class="aside-block">
            <h2>Location</h2>
            <p>{{ site.location }}</p>
          </div>
          <div class="aside-block">
            <h2>Good fit</h2>
            <ul>
              <li>Rebrands &amp; new ventures</li>
              <li>Vue.js products &amp; marketing sites</li>
              <li>Civic &amp; nonprofit campaigns</li>
              <li>Design systems &amp; dashboards</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero {
  padding-top: clamp(5rem, 12vw, 7rem);
}

.contact-grid {
  display: grid;
  gap: 3rem;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-form label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-form label span {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  padding: 0.85rem 1rem;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 0;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

.form-note {
  font-size: 0.82rem;
  color: var(--muted);
}

.contact-aside {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.aside-block h2 {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.aside-block a {
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 600;
}

.aside-block ul {
  list-style: none;
  color: var(--muted);
}

.aside-block li {
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--line);
}

.aside-block li::before {
  content: "→ ";
  color: var(--c-cyan);
}
</style>
