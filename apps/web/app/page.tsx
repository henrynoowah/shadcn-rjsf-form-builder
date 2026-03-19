import { getAllRegistryItems } from '@/lib/registry';

export default function Home() {
  const items = getAllRegistryItems();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">shadcn RJSF Form Builder</h1>
      <p className="text-muted-foreground mb-10 text-lg">
        A shadcn registry for react-jsonschema-form components. Install any item with the shadcn CLI.
      </p>

      <div className="mb-8">
        <a
          href="/demo"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Live Demo →
        </a>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.name} className="border-border rounded-lg border p-6">
            <div className="mb-1 flex items-center gap-3">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                {item.type}
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
            <div className="bg-muted rounded-md p-3">
              <code className="text-sm">
                npx shadcn@latest add &quot;http://localhost:3000/r/{item.name}&quot;
              </code>
            </div>
            <div className="mt-3 text-xs">
              <span className="text-muted-foreground">Files: </span>
              <span>{item.files.length}</span>
              {item.dependencies && item.dependencies.length > 0 && (
                <>
                  <span className="text-muted-foreground ml-4">Dependencies: </span>
                  <span>{item.dependencies.join(', ')}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
