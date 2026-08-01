import Link from "next/link";
import { Youtube, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcons } from "@/components/brand/SocialIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Stats } from "@/components/home/Stats";
import { BRAND } from "@/lib/brand";
import { HOSTS, SHOWS, SITE, SOCIAL } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${BRAND.assets.heroNavy}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 md:justify-center md:px-6 md:pb-20">
          <div className="animate-rise max-w-xl">
            <Logo
              variant="light"
              mark="full"
              href={null}
              priority
              className="h-16 w-auto max-w-full md:h-24"
            />
          </div>
          <h1 className="animate-rise-delay mt-6 font-chant text-3xl leading-tight text-yellow sm:text-4xl md:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="animate-fade mt-4 max-w-lg text-base font-light text-ice/75 md:text-lg">
            Fan-first football storytelling — debate, quizzes, and match energy
            that lives beyond the whistle.
          </p>
          <div className="animate-fade mt-8 flex flex-wrap gap-3">
            <Link
              href="/subscribe"
              className="bg-yellow px-7 py-3.5 text-base font-bold uppercase tracking-wide text-navy-deep transition hover:bg-yellow-deep hover:-translate-y-0.5"
            >
              Join the list
            </Link>
            <Link
              href="/apply"
              className="border border-ice/25 bg-ice/5 px-7 py-3.5 text-base font-bold uppercase tracking-wide text-ice transition hover:border-yellow hover:text-yellow"
            >
              Apply to be on a show
            </Link>
          </div>
        </div>
      </section>

      <Stats />

      <section className="section-pad mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-bright">
              Original formats
            </p>
            <h2 className="mt-2 font-display text-4xl text-ice md:text-5xl">
              Stories that live beyond the match
            </h2>
          </div>
          <Link
            href="/shows"
            className="hidden items-center gap-1 text-sm font-medium uppercase tracking-wide text-ice/70 hover:text-yellow md:inline-flex"
          >
            See all shows <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SHOWS.map((show, i) => {
            const accents = [
              "hover:border-yellow/60",
              "hover:border-green-bright/60",
              "hover:border-blue-bright/60",
            ];
            return (
              <article
                key={show.slug}
                className={`group border border-ice/10 bg-navy/40 p-6 transition ${accents[i % accents.length]}`}
              >
                <h3 className="font-display text-3xl text-ice group-hover:text-yellow">
                  {show.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ice/65">
                  {show.blurb}
                </p>
                <Link
                  href={`/apply?type=${show.applyType}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-yellow"
                >
                  {show.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ice/10 bg-navy">
        <div className="section-pad mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
              Newsletter
            </p>
            <h2 className="mt-2 font-display text-4xl text-ice md:text-5xl">
              Weekly fan drops
            </h2>
            <p className="mt-4 font-light text-ice/65">
              Transfers chatter, show invites, and the takes that matter —
              straight to your inbox.
            </p>
          </div>
          <NewsletterForm source="home" />
        </div>
      </section>

      <section className="section-pad mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-bright">
          Watch
        </p>
        <h2 className="mt-2 font-display text-4xl text-ice md:text-5xl">
          Latest on YouTube
        </h2>
        <p className="mt-3 max-w-xl font-light text-ice/65">
          Catch the newest uploads from{" "}
          <a
            href={SOCIAL.youtube}
            target="_blank"
            rel="noreferrer"
            className="text-yellow underline"
          >
            @FutbolfansZone
          </a>
          .
        </p>
        <a
          href={SOCIAL.youtube}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex aspect-video w-full flex-col items-center justify-center border border-ice/10 bg-gradient-to-br from-navy to-navy-deep transition hover:border-yellow/50"
        >
          <Youtube className="h-14 w-14 text-yellow" />
          <span className="mt-4 font-display text-3xl text-ice md:text-4xl">
            Watch on YouTube
          </span>
          <span className="mt-2 text-sm text-ice/50">@FutbolfansZone</span>
        </a>
        <SocialIcons labeled iconClassName="h-4 w-4" className="mt-8" />
      </section>

      <section className="border-t border-ice/10 bg-navy/50">
        <div className="section-pad mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-bright">
            The voices
          </p>
          <h2 className="mt-2 font-display text-4xl text-ice md:text-5xl">
            Hosts & creators
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOSTS.map((host, i) => (
              <article
                key={`${host.role}-${i}`}
                className="overflow-hidden border border-ice/10"
              >
                <div className="flex aspect-[4/5] items-end bg-gradient-to-br from-navy via-navy-deep to-black p-5">
                  <div>
                    <Logo
                      variant="light"
                      mark="badge"
                      href={null}
                      className="mb-4 h-14 w-auto opacity-80"
                    />
                    <p className="text-xs uppercase tracking-[0.18em] text-yellow">
                      {host.role}
                    </p>
                    <h3 className="mt-1 font-display text-3xl text-ice">
                      {host.name}
                    </h3>
                  </div>
                </div>
                <p className="p-5 text-sm font-light text-ice/60">{host.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
