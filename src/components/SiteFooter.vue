<script setup>
import CmykRgbMark from "@/components/CmykRgbMark.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="rgb-bar footer-rgb-bar" aria-hidden="true">
      <span /><span /><span />
    </div>
    <div class="footer-inner container">
      <div class="footer-brand">
        <CmykRgbMark borderless />
        <p class="footer-tagline">
          Design &amp; creative development — Denver &amp; Manitou Springs, CO
        </p>
      </div>
      <div class="footer-links">
        <a href="mailto:hello@cmykrgb.com">hello@cmykrgb.com</a>
        <RouterLink to="/work">Work</RouterLink>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>
      <p class="footer-copy">© {{ year }} CMYK/RGB. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  background: #fff;
  color: var(--ink);
}

.footer-rgb-bar {
  border-top: 1px solid rgba(250, 250, 250, 0.5);
}

.footer-inner {
  display: grid;
  gap: 2rem;
  padding: 3rem 0 2.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-tagline {
  color: var(--muted);
  max-width: 22rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2rem;
}

.footer-links a {
  color: var(--ink);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-links a:hover {
  color: var(--c-magenta);
}

.footer-copy {
  font-size: 0.8rem;
  color: var(--muted);
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

@media (min-width: 768px) {
  .footer-inner {
    grid-template-columns: auto 1fr;
    align-items: start;
  }

  .footer-brand {
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
  }

  .footer-links {
    justify-content: flex-end;
    align-self: center;
  }

  .footer-copy {
    grid-column: 1 / -1;
  }
}
</style>
