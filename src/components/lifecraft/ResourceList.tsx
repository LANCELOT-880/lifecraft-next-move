import { ExternalLink } from "lucide-react";
import { resourceTypeLabels, type Resource } from "@/lib/journey/resources";

export function ResourceList({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;

  return (
    <section className="surface-panel mt-4 p-5 sm:p-6" aria-labelledby="resources-heading">
      <h2 id="resources-heading" className="text-eyebrow text-muted-foreground">
        Additional resources
      </h2>
      <ul className="mt-4 space-y-2">
        {resources.map((resource) => (
          <li key={resource.id}>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer noopener"
              className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg border border-border bg-surface-2/60 px-3 py-3 transition-colors duration-200 hover:border-primary/40"
            >
              <span className="min-w-0">
                <span className="text-[10px] uppercase tracking-[0.16em] text-primary">
                  {resourceTypeLabels[resource.type]}
                </span>
                <span className="mt-1 block break-words text-sm text-foreground">
                  {resource.title}
                </span>
                <span className="mt-0.5 block break-words text-xs text-muted-foreground">
                  {resource.description}
                </span>
              </span>
              <ExternalLink className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden />
              <span className="sr-only">Opens in a new tab</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
