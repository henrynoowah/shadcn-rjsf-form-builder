'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../_components/site-header';

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
      <SiteHeader badge="docs" links={[{ href: '/playground', label: 'Playground' }]} />

      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 md:w-52">
          <nav className="space-y-1 md:sticky md:top-8">
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
