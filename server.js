import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { sendContactEmail, validateContactBody } from "./server/contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const useVite = process.env.USE_VITE === "1";
const port = Number(process.env.PORT) || 4173;

const app = express();
app.use(express.json({ limit: "32kb" }));

app.post("/api/contact", async (req, res) => {
  const parsed = validateContactBody(req.body);

  if (!parsed.ok) {
    return res.status(400).json({ ok: false, error: parsed.error });
  }

  if (parsed.silent) {
    return res.json({ ok: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return res.json({ ok: true });
  } catch (err) {
    if (err.message === "CONTACT_NOT_CONFIGURED") {
      console.error("Missing RESEND_API_KEY");
      return res.status(503).json({
        ok: false,
        error: "Contact form is not configured yet. Email us directly.",
      });
    }
    console.error("Contact send failed:", err);
    return res.status(500).json({
      ok: false,
      error:
        "We could not send your message. Please try again or email us directly.",
    });
  }
});

async function attachFrontend(httpServer) {
  if (useVite) {
    const { createServer } = await import("vite");
    const hmrPort = Number(process.env.VITE_HMR_PORT) || 24700;

    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: httpServer
          ? { server: httpServer }
          : { port: hmrPort, clientPort: port },
        strictPort: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
    return "Vite dev + API";
  }

  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, { index: false }));
    app.get(/^(?!\/api).*/, (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
    return "static + API";
  }

  return "API only (run npm run build for static files)";
}

function logDevReady(mode) {
  const url = `http://localhost:${port}/`;
  console.log("");
  console.log(`  ➜  Local:   ${url}`);
  if (useVite) {
    console.log("  ➜  Network: use --host to expose");
  }
  console.log(`  (${mode})`);
  console.log("");
}

const server = app.listen(port, "0.0.0.0");

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\nPort ${port} is already in use (a previous dev server may still be running).`,
    );
    console.error(`Free it with:  npm run dev:stop`);
    console.error(`Or use another port:  PORT=5174 npm run dev\n`);
  } else {
    console.error("Server failed to start:", err);
  }
  process.exit(1);
});

const mode = await attachFrontend(server);

if (server.listening) {
  logDevReady(mode);
} else {
  server.on("listening", () => logDevReady(mode));
}
