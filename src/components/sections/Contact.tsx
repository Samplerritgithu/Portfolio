"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { personal } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-border bg-bg-surface/90 px-4 py-2.5 text-sm text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-border-hover focus:ring-2 focus:ring-primary/15";

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    const subject =
      payload.subject.trim() ||
      `Portfolio message from ${payload.name.trim() || "visitor"}`;
    const messageBody = [
      payload.company.trim() ? `Company: ${payload.company.trim()}` : null,
      "",
      payload.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      // Web3Forms must run in the browser — Cloudflare blocks server-side fetch.
      if (accessKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: payload.name.trim(),
            email: payload.email.trim(),
            replyto: payload.email.trim(),
            subject,
            message: messageBody,
          }),
        });

        const data = (await res.json()) as {
          success?: boolean;
          message?: string;
        };

        if (res.ok && data.success) {
          setStatus("success");
          setFeedback("Message sent — I'll get back to you soon.");
          form.reset();
          return;
        }

        setFeedback(data.message ?? "Could not send. Please email directly below.");
        setStatus("error");
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        error?: string;
        ok?: boolean;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        setFeedback("Message sent — I'll get back to you soon.");
        form.reset();
        return;
      }

      setFeedback(
        data.error || "Could not send. Please use Email directly below.",
      );
      setStatus("error");
    } catch {
      setFeedback("Network error. Please try again or email directly.");
      setStatus("error");
    }
  }

  return (
    <AnimatedSection id="contact" className="pb-12 md:pb-16">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-surface/50 px-6 py-14 md:px-12 md:py-20">
          <div className="pointer-events-none absolute inset-0 gradient-mesh" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text md:text-4xl lg:text-5xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                Open to Python full-stack, React/React Native, and cloud
                engineering roles — plus freelance collaborations on production
                systems that solve real problems.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-4 text-left"
              noValidate
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted">Name *</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Your name"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted">Email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted">Company</span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                    placeholder="Optional"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted">Subject</span>
                  <input
                    name="subject"
                    type="text"
                    className={inputClass}
                    placeholder="What is this about?"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted">Message *</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={cn(inputClass, "resize-y min-h-[120px]")}
                  placeholder="Tell me about the role, project, or collaboration..."
                />
              </label>

              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-[var(--text-on-primary)] transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                <p className="text-center text-xs text-muted sm:text-right">
                  {personal.email} · {personal.location}
                </p>
              </div>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm text-primary"
                  role="status"
                >
                  {feedback}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-cta/20 bg-cta/5 px-4 py-3 text-center text-sm text-cta"
                  role="alert"
                >
                  {feedback}
                </motion.p>
              )}
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={`mailto:${personal.email}`}
                variant="secondary"
                size="lg"
              >
                Email directly
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
