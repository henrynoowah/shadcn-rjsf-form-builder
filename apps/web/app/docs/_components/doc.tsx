// Shared docs primitives — one definition for inline code, section headings and reference tables.

export const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
);

export const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-20 text-xl font-semibold border-b border-border pb-2 mb-4">
    {children}
  </h2>
);

export const DocTable = ({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-border text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/50">
          {columns.map((c) => (
            <th key={c} className="px-4 py-2 text-left font-medium">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((cells, r) => (
          <tr key={r}>
            {cells.map((cell, c) => (
              <td key={c} className={`px-4 py-2 align-top ${c === 0 ? 'whitespace-nowrap' : 'text-muted-foreground'}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export type PropRow = { name: string; type: string; required?: boolean; description: React.ReactNode };

/** Name / Type / Description table; `*` marks required entries. */
export const PropsTable = ({ rows, firstColumn = 'Prop' }: { rows: PropRow[]; firstColumn?: string }) => (
  <DocTable
    columns={[firstColumn, 'Type', 'Description']}
    rows={rows.map((row) => [
      <>
        <Code>{row.name}</Code>
        {row.required && <span className="text-destructive ml-0.5">*</span>}
      </>,
      <span className="font-mono text-xs">{row.type}</span>,
      row.description,
    ])}
  />
);
