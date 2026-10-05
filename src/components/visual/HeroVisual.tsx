"use client";

import { motion } from "framer-motion";

const snippets = [
  {
    code: "from rest_framework import serializers",
    x: "3%",
    y: "3%",
    delay: 0,
  },
  {
    code: '@api_view(["GET"])',
    x: "68%",
    y: "4%",
    delay: 0.4,
  },
  {
    code: "flutter build apk",
    x: "3%",
    y: "58%",
    delay: 0.8,
  },
  {
    code: "git push origin main",
    x: "68%",
    y: "58%",
    delay: 1.2,
  },
];

type Node = {
  id: string;
  cx: number;
  cy: number;
  label: string;
  sub?: string;
  r: number;
  hub?: boolean;
  muted?: boolean;
};

/** Wider canvas — more breathing room between nodes */
const nodes: Node[] = [
  { id: "hub", cx: 280, cy: 175, label: "Full Stack", r: 42, hub: true },
  {
    id: "web",
    cx: 280,
    cy: 48,
    label: "React / Next.js",
    sub: "Web",
    r: 30,
  },
  {
    id: "django",
    cx: 80,
    cy: 175,
    label: "Django / DRF",
    sub: "Backend · APIs",
    r: 30,
  },
  {
    id: "mobile",
    cx: 480,
    cy: 175,
    label: "Flutter / RN",
    sub: "Mobile",
    r: 30,
  },
  {
    id: "cloud",
    cx: 280,
    cy: 300,
    label: "AWS / Firebase",
    sub: "Cloud",
    r: 28,
  },
  {
    id: "node",
    cx: 145,
    cy: 300,
    label: "Node.js",
    sub: "Services",
    r: 26,
  },
  {
    id: "cicd",
    cx: 415,
    cy: 300,
    label: "GitHub CI/CD",
    sub: "Delivery",
    r: 26,
  },
  {
    id: "ai",
    cx: 280,
    cy: 410,
    label: "AI Exploration",
    sub: "Currently learning",
    r: 24,
    muted: true,
  },
  {
    id: "llm",
    cx: 140,
    cy: 455,
    label: "LLMs",
    r: 18,
    muted: true,
  },
  {
    id: "rag",
    cx: 280,
    cy: 470,
    label: "RAG",
    r: 18,
    muted: true,
  },
  {
    id: "embed",
    cx: 420,
    cy: 455,
    label: "Embeddings",
    r: 18,
    muted: true,
  },
];

const edges: [string, string][] = [
  ["hub", "web"],
  ["hub", "django"],
  ["hub", "mobile"],
  ["hub", "cloud"],
  ["hub", "node"],
  ["hub", "cicd"],
  ["cloud", "ai"],
  ["ai", "llm"],
  ["ai", "rag"],
  ["ai", "embed"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function HeroVisual() {
  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:max-w-none aspect-[5/6] min-h-[420px] md:min-h-[480px]"
      role="img"
      aria-label="Full stack architecture diagram with Django, React, Flutter, AWS and Firebase around Full Stack, plus AI exploration as a learning area"
    >
      <div className="absolute inset-0 rounded-2xl border border-border bg-bg-surface shadow-[var(--shadow-soft)] overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-80" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" />

        <svg
          viewBox="0 0 560 520"
          className="absolute inset-x-0 top-0 h-[78%] w-full px-3 pt-4 md:px-5 md:pt-5"
          aria-hidden
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="aiLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map(([fromId, toId], i) => {
            const a = getNode(fromId);
            const b = getNode(toId);
            const isAi = a.muted || b.muted;
            return (
              <motion.line
                key={`${fromId}-${toId}`}
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke={isAi ? "url(#aiLineGrad)" : "url(#lineGrad)"}
                strokeWidth={isAi ? 1.25 : 1.75}
                strokeDasharray={isAi ? "4 5" : "7 6"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isAi ? 0.45 : 0.8 }}
                transition={{ duration: 1.1, delay: i * 0.07, ease: "easeOut" }}
              />
            );
          })}

          {nodes.map((node, i) => {
            const labelY = node.cy + node.r + (node.sub ? 16 : 18);
            const subY = labelY + 14;
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill={
                    node.hub ? "#F0FDFA" : node.muted ? "#F8FAFC" : "#ffffff"
                  }
                  stroke={node.muted ? "#94A3B8" : "#0D9488"}
                  strokeWidth={node.hub ? 2 : 1.25}
                  strokeOpacity={node.muted ? 0.45 : node.hub ? 0.6 : 0.45}
                  filter={node.muted ? undefined : "url(#glow)"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: node.muted ? 0.85 : 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.45 }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.hub ? 9 : node.muted ? 4 : 6}
                  fill={node.muted ? "#67E8F9" : "#14B8A6"}
                  fillOpacity={node.muted ? 0.75 : 1}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    delay: 0.6 + i * 0.08,
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <text
                  x={node.cx}
                  y={labelY}
                  textAnchor="middle"
                  fill={
                    node.hub ? "#0F172A" : node.muted ? "#64748B" : "#334155"
                  }
                  fontSize={node.hub ? 14 : node.muted ? 11 : 12}
                  fontWeight={node.hub ? 600 : 500}
                  fontFamily="var(--font-geist-sans)"
                >
                  {node.label}
                </text>
                {node.sub && (
                  <text
                    x={node.cx}
                    y={subY}
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="10"
                    fontFamily="var(--font-geist-mono)"
                  >
                    {node.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {snippets.map((snippet) => (
          <motion.div
            key={snippet.code}
            className="pointer-events-none absolute z-10 rounded-lg border border-border bg-bg-surface/95 px-2.5 py-1.5 font-mono text-[9px] text-primary shadow-[var(--shadow-soft)] backdrop-blur-sm md:text-[10px]"
            style={{ left: snippet.x, top: snippet.y }}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 6,
              delay: snippet.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {snippet.code}
          </motion.div>
        ))}

        <motion.div
          className="absolute bottom-4 left-4 right-4 z-20 rounded-xl border border-border bg-bg-surface/95 p-3.5 shadow-[var(--shadow-soft)] backdrop-blur-md md:bottom-5 md:left-5 md:right-5 md:p-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55 }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 font-mono text-[10px] text-muted">
              shiva@dev ~ stack
            </span>
          </div>
          <div className="space-y-1 font-mono text-[11px] leading-relaxed md:text-xs">
            <p>
              <span className="text-secondary">→</span>{" "}
              <span className="text-muted">Core:</span>{" "}
              <span className="text-primary">Python · Django · React · Flutter</span>
            </p>
            <p>
              <span className="text-secondary">→</span>{" "}
              <span className="text-muted">Exploring:</span>{" "}
              <span className="text-text">AI · LLMs · RAG</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
