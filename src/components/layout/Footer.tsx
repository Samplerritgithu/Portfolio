import { personal } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="section-container flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
        <p>
          © {year} {personal.name}. Built with Next.js.
        </p>
        <p className="text-xs">
          Python Full Stack · AI Engineering
        </p>
      </div>
    </footer>
  );
}
