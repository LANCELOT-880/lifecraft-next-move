import type { VocabularyEntry } from "@/lib/journey/lessons";

export function VocabularyList({ entries }: { entries: VocabularyEntry[] }) {
  return (
    <section className="surface-panel mt-4 p-5 sm:p-6" aria-labelledby="vocabulary-heading">
      <div>
        <h2 id="vocabulary-heading" className="text-eyebrow text-muted-foreground">
          Vocabulary practice
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Read, recall, then use each word in context.</p>
      </div>

      <ul className="mt-4 divide-y divide-border/60 rounded-lg border border-border">
        {entries.map((entry) => {
          return (
            <li key={entry.term} className="flex items-center gap-3 px-3 py-3 sm:px-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-medium text-foreground">{entry.term}</p>
                {entry.reading ? <p className="mt-0.5 truncate text-xs text-primary/80">{entry.reading}</p> : null}
                <p className="mt-1 text-xs text-muted-foreground">{entry.meaning}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
