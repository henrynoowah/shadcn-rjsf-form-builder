'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../_components/site-header';
import { getChangelog, versionAnchor } from '@/lib/changelog';

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
      { label: 'Prerequisites', hash: 'prerequisites' },
      { label: 'Installation', hash: 'installation' },
      { label: 'Quick Start: FormRenderer', hash: 'quick-start-formrenderer' },
      { label: 'Quick Start: FormBuilder', hash: 'quick-start-formbuilder' },
      { label: 'Locale Setup', hash: 'locale-setup' },
      { label: 'Updating', hash: 'updating' },
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
      { label: 'Pages', hash: 'pages' },
      { label: 'Settings', hash: 'settings' },
    ],
  },
  {
    label: 'API Reference',
    href: '/docs/api',
    sections: [
      { label: 'FormRenderer', hash: 'formrenderer' },
      { label: 'FormBuilder', hash: 'formbuilder' },
      { label: 'Validation helpers', hash: 'validation-helpers' },
      { label: 'Schema helpers', hash: 'schema-helpers' },
    ],
  },
  {
    label: 'Examples',
    href: '/docs/examples',
    sections: [
      { label: 'Contact Form', hash: 'contact-form' },
      { label: 'Conditional Fields', hash: 'conditional-fields' },
      { label: 'Multi-page Form', hash: 'multi-page-form' },
      { label: 'Multi-locale Form', hash: 'multi-locale-form' },
      { label: 'Custom Validation', hash: 'custom-validation' },
      { label: 'Controlled FormBuilder', hash: 'controlled-formbuilder' },
    ],
  },
  {
    label: 'Changelog',
    href: '/docs/changelog',
    sections: getChangelog().map((entry) => ({ label: `v${entry.version}`, hash: versionAnchor(entry.version) })),
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLElement>(null);

  // Keep the current page visible in the horizontally scrolling mobile nav.
  useEffect(() => {
    const active = mobileNavRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (active) mobileNavRef.current!.scrollLeft = active.offsetLeft - 24;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader badge="docs" links={[{ href: '/playground', label: 'Playground' }]} />

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-6 md:flex-row md:gap-10 md:py-10">
        {/* Mobile: one scrollable row of pages */}
        <nav ref={mobileNavRef} aria-label="Docs" className="-mx-6 flex gap-1 overflow-x-auto border-b border-border px-6 pb-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: pages, with sections only under the active one */}
        <aside className="hidden w-52 shrink-0 md:block">
          <nav aria-label="Docs" className="sticky top-24 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {isActive && item.sections.length > 0 && (
                    <div className="ml-3 mt-0.5 mb-2 space-y-0.5 border-l border-border pl-3">
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
