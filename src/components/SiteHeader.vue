<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import CmykRgbMark from "@/components/CmykRgbMark.vue";

const route = useRoute();
const open = ref(false);
const scrolled = ref(false);

const links = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

function closeMenu() {
  open.value = false;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled, 'header--open': open }">
    <div class="cmyk-bar" aria-hidden="true">
      <span /><span /><span /><span />
    </div>
    <div class="header-inner container">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <CmykRgbMark borderless />
      </RouterLink>

      <button
        type="button"
        class="menu-btn"
        :aria-expanded="open"
        aria-controls="site-nav"
        @click="open = !open"
      >
        <span class="sr-only">Menu</span>
        <span class="menu-icon" />
      </button>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': open }">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: route.path === link.to }"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/contact" class="nav-cta" @click="closeMenu">
          Start a project
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  background: rgba(250, 250, 250, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s var(--ease);
}

.header--scrolled {
  border-bottom-color: var(--line);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
  gap: 1rem;
}

.logo {
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--ink);
}

.nav-cta {
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--ink);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
}

.nav-cta:hover {
  background: var(--ink);
  color: var(--paper);
}

.menu-btn {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--line);
  background: transparent;
  cursor: pointer;
}

.menu-icon,
.menu-icon::before,
.menu-icon::after {
  display: block;
  width: 1.1rem;
  height: 2px;
  margin: 0 auto;
  background: var(--ink);
  transition: transform 0.25s var(--ease);
}

.menu-icon::before,
.menu-icon::after {
  content: "";
  margin-top: 5px;
}

.menu-icon::after {
  margin-top: 5px;
}

.header--open .menu-icon {
  background: transparent;
}
.header--open .menu-icon::before {
  transform: translateY(7px) rotate(45deg);
}
.header--open .menu-icon::after {
  transform: translateY(-7px) rotate(-45deg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 768px) {
  .menu-btn {
    display: grid;
    place-items: center;
  }

  .nav {
    position: fixed;
    inset: var(--header-h) 0 auto;
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
    gap: 0;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
    transform: translateY(-110%);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.35s var(--ease),
      opacity 0.35s var(--ease);
  }

  .nav--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link,
  .nav-cta {
    padding: 1rem 0;
    border-bottom: 1px solid var(--line);
  }
}
</style>
