<script setup>
import { awards } from "@/data/projects";
</script>

<template>
  <ul class="awards-list">
    <li v-for="a in awards" :key="`${a.year}-${a.title}`">
      <span class="awards-list__year">{{ a.year }}</span>
      <a
        v-if="a.url"
        class="awards-list__link"
        :href="a.url"
        target="_blank"
        rel="noopener noreferrer"
        >{{ a.title }}</a
      >
      <span v-else class="awards-list__title">{{ a.title }}</span>
    </li>
  </ul>
</template>

<style scoped>
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

.awards-list__year {
  font-weight: 600;
  color: var(--r-blue);
}

.awards-list__link {
  text-decoration: none;
  color: var(--ink);
}

.awards-list__link:hover {
  color: var(--r-blue);
}

.awards-list__title {
  color: var(--ink);
}
</style>
