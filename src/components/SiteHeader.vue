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
  <div class="site-header" :class="{ 'site-header--open': open }">
    <header class="header" :class="{ 'header--scrolled': scrolled }">
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
      </div>
    </header>

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
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
}

.header {
  position: relative;
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
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.menu-icon {
  position: relative;
  display: block;
  width: 1.15rem;
  height: 2px;
  background: var(--ink);
  transition:
    background 0.25s var(--ease),
    transform 0.25s var(--ease);
}

.menu-icon::before,
.menu-icon::after {
  content: "";
  position: absolute;
  left: 0;
  width: 1.15rem;
  height: 2px;
  background: var(--ink);
  transition:
    transform 0.25s var(--ease),
    top 0.25s var(--ease);
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  top: 6px;
}

.site-header--open .menu-icon {
  background: transparent;
}

.site-header--open .menu-icon::before,
.site-header--open .menu-icon::after {
  top: 0;
}

.site-header--open .menu-icon::before {
  transform: rotate(45deg);
}

.site-header--open .menu-icon::after {
  transform: rotate(-45deg);
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

@media (min-width: 769px) {
  .nav {
    position: fixed;
    top: calc(var(--bar-h) + var(--header-h) / 2);
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(100% - 2.5rem, var(--max));
    justify-content: flex-end;
    pointer-events: none;
  }

  .nav > * {
    pointer-events: auto;
  }
}

@media (max-width: 768px) {
  .site-header--open .header {
    position: relative;
    z-index: 101;
    border-bottom-color: transparent;
  }

  .menu-btn {
    display: grid;
    place-items: center;
  }

  .nav {
    position: fixed;
    inset: 0;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 1.5rem;
    background: var(--paper);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.35s var(--ease),
      visibility 0.35s var(--ease);
  }

  .nav--open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .nav-link {
    padding: 0.75rem 1rem;
    text-align: center;
  }

  .nav-cta {
    margin-top: 1.25rem;
    padding: 0.85rem 1.35rem;
    background: var(--ink);
    color: var(--paper);
    text-align: center;
  }

  .nav-cta:hover {
    background: var(--ink);
    color: var(--paper);
  }
}
</style>
