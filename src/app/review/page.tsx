import Image from "next/image";
import Link from "next/link";

export default function ReviewPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full justify-between items-center mb-12">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <Link
            href="/"
            className="text-xs font-semibold text-aioncy hover:underline"
          >
            ← Back to Homepage
          </Link>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-heading-h2 text-neutral-black dark:text-zinc-50">
            Aioncy Style Guide
          </h1>
          <p className="max-w-md text-body-re-400 text-zinc-600 dark:text-zinc-400">
            Welcome to the brand styling review page. Here we list all the configured design variables, colors, and typography settings.
          </p>
        </div>

        {/* Color Palette Showcase */}
        <div className="w-full mt-12 mb-8">
          <h2 className="text-xl font-bold mb-4 text-neutral-black dark:text-elevation-light">
            Project Theme Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {/* Primary */}
            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-aioncy" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">aioncy</div>
              <div className="text-[10px] text-placeholder">bg-aioncy</div>
              <div className="text-[10px] font-mono text-placeholder">#A153FF</div>
            </div>

            {/* Neutral */}
            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-neutral-black border border-border-light" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Neutral Black</div>
              <div className="text-[10px] text-placeholder">bg-neutral-black</div>
              <div className="text-[10px] font-mono text-placeholder">#1C1C1C</div>
            </div>

            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-neutral-darkgrey" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Dark Grey</div>
              <div className="text-[10px] text-placeholder">bg-neutral-darkgrey</div>
              <div className="text-[10px] font-mono text-placeholder">#201D1D</div>
            </div>

            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-neutral-lightgrey" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Light Grey</div>
              <div className="text-[10px] text-placeholder">bg-neutral-lightgrey</div>
              <div className="text-[10px] font-mono text-placeholder">#757575</div>
            </div>

            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-neutral-offwhite border border-border-light" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Off White</div>
              <div className="text-[10px] text-placeholder">bg-neutral-offwhite</div>
              <div className="text-[10px] font-mono text-placeholder">#F4F4F4</div>
            </div>

            {/* Utility */}
            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-utility-yellow" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Utility Yellow</div>
              <div className="text-[10px] text-placeholder">bg-utility-yellow</div>
              <div className="text-[10px] font-mono text-placeholder">#FFFF62</div>
            </div>

            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-utility-bluishpurple" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Bluish Purple</div>
              <div className="text-[10px] text-placeholder">bg-utility-bluishpurple</div>
              <div className="text-[10px] font-mono text-placeholder">#6840FF</div>
            </div>

            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-light dark:border-neutral-darkgrey bg-neutral-offwhite dark:bg-neutral-black">
              <div className="w-full h-12 rounded bg-utility-green" />
              <div className="text-xs font-semibold text-neutral-black dark:text-neutral-offwhite">Utility Green</div>
              <div className="text-[10px] text-placeholder">bg-utility-green</div>
              <div className="text-[10px] font-mono text-placeholder">#98E891</div>
            </div>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="w-full mt-8 mb-12">
          <h2 className="text-xl font-bold mb-6 text-neutral-black dark:text-elevation-light">
            Project Typography Scale
          </h2>
          <div className="flex flex-col gap-8 w-full border border-border-light dark:border-neutral-darkgrey rounded-lg p-6 bg-neutral-offwhite dark:bg-neutral-black">
            <div>
              <div className="text-[10px] text-placeholder mb-1">Heading/H1 (.css-heading--h1) — 64px / 112% / ExtraBold / -2%</div>
              <div className="css-heading--h1 text-neutral-black dark:text-elevation-light">Heading/H1</div>
            </div>

            <hr className="border-border-light dark:border-neutral-darkgrey" />

            <div>
              <div className="text-[10px] text-placeholder mb-1">Heading/H2 (.text-heading-h2) — 48px / 120% / SemiBold / -2%</div>
              <div className="text-heading-h2 text-neutral-black dark:text-elevation-light">Heading/H2</div>
            </div>

            <hr className="border-border-light dark:border-neutral-darkgrey" />

            <div>
              <div className="text-[10px] text-placeholder mb-1">Heading/H3 (.text-heading-h3) — 32px / 120% / SemiBold / -2%</div>
              <div className="text-heading-h3 text-neutral-black dark:text-elevation-light">Heading/H3</div>
            </div>

            <hr className="border-border-light dark:border-neutral-darkgrey" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] text-placeholder mb-1">Body/xl--500 (.text-body-xl-500) — 24px / 140% / Medium / -2%</div>
                <div className="text-body-xl-500 text-neutral-black dark:text-elevation-light">Body/xl--500</div>
              </div>
              <div>
                <div className="text-[10px] text-placeholder mb-1">Body/xl--400 (.text-body-xl-400) — 24px / 140% / Regular / -2%</div>
                <div className="text-body-xl-400 text-neutral-black dark:text-elevation-light">Body/xl--400</div>
              </div>
            </div>

            <hr className="border-border-light dark:border-neutral-darkgrey" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] text-placeholder mb-1">Body/lg--500 (.text-body-lg-500) — 20px / 140% / Medium / -2%</div>
                <div className="text-body-lg-500 text-neutral-black dark:text-elevation-light">Body/lg--500</div>
              </div>
              <div>
                <div className="text-[10px] text-placeholder mb-1">Body/lg--400 (.text-body-lg-400) — 20px / 140% / Regular / -2%</div>
                <div className="text-body-lg-400 text-neutral-black dark:text-elevation-light">Body/lg--400</div>
              </div>
            </div>

            <hr className="border-border-light dark:border-neutral-darkgrey" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-[10px] text-placeholder mb-1">Body/md--400 (.text-body-md-400) — 18px / 140% / Regular / -2%</div>
                <div className="text-body-md-400 text-neutral-black dark:text-elevation-light">Body/md--400</div>
              </div>
              <div>
                <div className="text-[10px] text-placeholder mb-1">Body/re--400 (.text-body-re-400) — 16px / 140% / Regular / -2%</div>
                <div className="text-body-re-400 text-neutral-black dark:text-elevation-light">Body/re--400</div>
              </div>
              <div>
                <div className="text-[10px] text-placeholder mb-1">label (.text-label) — 12px / 120% / Medium / -2%</div>
                <div className="text-label text-neutral-black dark:text-elevation-light">Label Text</div>
              </div>
            </div>

            <hr className="border-border-light dark:border-neutral-darkgrey" />

            <div className="flex flex-wrap gap-8 items-center">
              <div>
                <div className="text-[10px] text-placeholder mb-1">button (.text-button) — 16px / 120% / Semi Bold / -4%</div>
                <button className="text-button px-4 py-2 bg-aioncy text-white rounded">Button Typography</button>
              </div>
              <div>
                <div className="text-[10px] text-placeholder mb-1">extra (.text-extra) — 20px / AUTO / Regular / 0% (Italic)</div>
                <div className="text-extra text-neutral-black dark:text-elevation-light">extra typography style</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
