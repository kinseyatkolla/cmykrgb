<script setup>
import { ref } from "vue";
import { site } from "@/data/site";

const status = ref("idle");
const errorMessage = ref("");

async function onSubmit(event) {
  event.preventDefault();
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;

  status.value = "sending";
  errorMessage.value = "";

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    type: form.type.value,
    message: form.message.value.trim(),
    website: form.website?.value ?? "",
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        data.error || "Something went wrong. Please try again or email us directly.",
      );
    }

    status.value = "success";
    form.reset();
  } catch (err) {
    status.value = "error";
    errorMessage.value =
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again or email us directly.";
  }
}
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
        <form class="contact-form" @submit="onSubmit">
          <label class="hp" aria-hidden="true">
            <span>Website</span>
            <input
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
            />
          </label>

          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              required
              autocomplete="name"
              :disabled="status === 'sending'"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              autocomplete="email"
              :disabled="status === 'sending'"
            />
          </label>
          <label>
            <span>Project type</span>
            <select name="type" :disabled="status === 'sending'">
              <option>Brand &amp; identity</option>
              <option>Website or app</option>
              <option>Campaign &amp; print</option>
              <option>Creative development</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows="6"
              required
              :disabled="status === 'sending'"
            />
          </label>

          <button type="submit" class="btn" :disabled="status === 'sending'">
            {{ status === "sending" ? "Sending…" : "Send inquiry" }}
          </button>

          <p
            v-if="status === 'success'"
            class="form-feedback form-feedback--success"
            role="status"
          >
            Thanks — your message was sent. We'll reply within a few business
            days.
          </p>
          <p
            v-else-if="status === 'error'"
            class="form-feedback form-feedback--error"
            role="alert"
          >
            {{ errorMessage }}
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          </p>
          <p v-else class="form-note">
            Your message is delivered directly — no email app required.
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

.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
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

.contact-form input:disabled,
.contact-form select:disabled,
.contact-form textarea:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.form-note {
  font-size: 0.82rem;
  color: var(--muted);
}

.form-feedback {
  font-size: 0.92rem;
  line-height: 1.5;
}

.form-feedback--success {
  color: var(--ink);
}

.form-feedback--error {
  color: var(--r-red);
}

.form-feedback--error a {
  display: inline-block;
  margin-top: 0.35rem;
  font-weight: 600;
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
