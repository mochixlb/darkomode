import type { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
  title: string;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <div className="mt-3 text-slate-800 dark:text-slate-200 leading-7 sm:leading-8 space-y-5">
        {children}
      </div>
    </section>
  );
}


