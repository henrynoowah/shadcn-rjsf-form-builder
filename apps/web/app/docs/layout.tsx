'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '../_components/theme-toggle';

type Section = { label: string; hash: string };

type NavItem = {
  label: string;
  href: string;
  sections: Section[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Get Started',
    href: '/docs',
    sections: [
      { label: 'Overview', hash: 'overview' },
      { label: 'Prerequisites', hash: 'prerequisites' },
      { label: 'Installation', hash: 'installation' },
      { label: 'Quick Start: FormRenderer', hash: 'quick-start-formrenderer' },
      { label: 'Quick Start: FormBuilder', hash: 'quick-start-formbuilder' },
      { label: 'Locale Setup', hash: 'locale-setup' },
    ],
  },
  {
    label: 'Schema Reference',
    href: '/docs/schema',
    sections: [
      { label: 'FormSchema', hash: 'formschema' },
      { label: 'FormFieldDefinition', hash: 'formfielddefinition' },
      { label: 'Field Types', hash: 'field-types' },
      { label: 'LocalizedString', hash: 'localizedstring' },
      { label: 'Validation', hash: 'validation' },
      { label: 'Conditions', hash: 'conditions' },
      { label: 'Settings', hash: 'settings' },
    ],
  },
  {
    label: 'Examples',
    href: '/docs/examples',
    sections: [
      { label: 'Contact Form', hash: 'contact-form' },
      { label: 'Conditional Fields', hash: 'conditional-fields' },
      { label: 'Multi-locale Form', hash: 'multi-locale-form' },
      { label: 'Custom Validation', hash: 'custom-validation' },
      { label: 'Controlled FormBuilder', hash: 'controlled-formbuilder' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight hover:opacity-80"
            >
              shadcn-rjsf
            </Link>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              docs
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/playground"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Playground
            </Link>
            <ThemeToggle />
            <a
              href="https://github.com/henrynoowah/shadcn-rjsf-form-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex max-w-5xl gap-10 px-6 py-10">
        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          <nav className="sticky top-8 space-y-1">
            <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Documentation
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Section links */}
                  {item.sections.length > 0 && (
                    <div className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-3">
                      {item.sections.map((section) => (
                        <Link
                          key={section.hash}
                          href={`${item.href}#${section.hash}`}
                          className="block py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {section.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 max-w-3xl flex-1">{children}</main>
      </div>
    </div>
  );
}
