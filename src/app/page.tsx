import Link from "next/link";
import { ArrowRight, Play, Sparkles, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcons } from "@/components/brand/SocialIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Stats } from "@/components/home/Stats";
import { BRAND } from "@/lib/brand";
import { HOSTS, SHOWS, SITE, SOCIAL } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-navy-deep md:min-h-[88vh]">
        <div
          className="home-hero-art absolute inset-0"
          style={{ backgroundImage: `url('${BRAND.assets.heroNavy}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/10 md:via-navy-deep/70 md:to-navy/30" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-end px-5 pb-10 pt-16 md:min-h-[88vh] md:justify-center md:px-6 md:pb-20 md:pt-24">
          <div className="animate-fade mb-5 inline-flex w-fit items-center gap-2 border border-ice/15 bg-navy-deep/55 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ice/70 backdrop-blur-sm md:text-xs">
            <span className="h-2 w-2 bg-green-bright shadow-[0_0_12px_rgba(64,216,64,0.8)]" />
            Fan-first football media
          </div>
          <div className="animate-rise max-w-xl">
            <Logo
              variant="light"
              mark="full"
              href={null}
              priority
              className="w-52 sm:w-64 md:w-[360px]"
            />
          </div>
          <h1 className="animate-rise-delay mt-4 font-chant text-4xl leading-none text-yellow sm:text-5xl md:mt-6 md:text-6xl">
            {SITE.tagline}
          </h1>
          <p className="animate-fade mt-4 max-w-lg text-[17px] font-light leading-7 text-ice/75 md:text-lg">
            Fan-first football storytelling — debate, quizzes, and match energy
            that lives beyond the whistle.
          </p>
          <div className="animate-fade mt-7 grid w-full gap-3 sm:flex sm:flex-wrap md:mt-8">
            <Link
              href="/subscribe"
              className="inline-flex min-h-14 items-center justify-center gap-2 bg-yellow px-7 text-base font-bold uppercase tracking-wide text-navy-deep transition active:bg-yellow-deep sm:w-auto md:hover:-translate-y-0.5 md:hover:bg-yellow-deep"
            >
              Join the list <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex min-h-14 items-center justify-center border border-ice/25 bg-ice/5 px-7 text-center text-sm font-bold uppercase tracking-wide text-ice transition active:bg-ice/10 sm:w-auto md:text-base md:hover:border-yellow md:hover:text-yellow"
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
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-bright">
              <Sparkles className="h-4 w-4" />
              Original formats
            </p>
            <h2 className="text-balance mt-2 max-w-3xl font-display text-3xl leading-[1.05] text-ice sm:text-4xl md:text-5xl">
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
        <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {SHOWS.map((show, i) => {
            const accents = [
              "border-t-yellow md:hover:border-yellow/60",
              "border-t-green-bright md:hover:border-green-bright/60",
              "border-t-blue-bright md:hover:border-blue-bright/60",
            ];
            return (
              <article
                key={show.slug}
                className={`group min-w-[82vw] max-w-[330px] snap-center border border-t-4 border-ice/10 bg-navy/40 p-5 transition sm:min-w-[320px] md:min-w-0 md:max-w-none md:p-6 ${accents[i % accents.length]}`}
              >
                <p className="mb-8 font-chant text-2xl text-ice/30">
                  0{i + 1}
                </p>
                <h3 className="font-display text-3xl text-ice group-hover:text-yellow">
                  {show.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ice/65">
                  {show.blurb}
                </p>
                <Link
                  href={`/apply?type=${show.applyType}`}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow"
                >
                  {show.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between md:hidden">
          <span className="text-xs uppercase tracking-[0.16em] text-ice/45">
            Swipe to explore
          </span>
          <Link
            href="/shows"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-bold uppercase tracking-wide text-yellow"
          >
            All shows <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-ice/10 bg-navy">
        <div className="section-pad mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
              Newsletter
            </p>
            <h2 className="mt-2 font-display text-3xl text-ice sm:text-4xl md:text-5xl">
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
        <h2 className="mt-2 font-display text-3xl text-ice sm:text-4xl md:text-5xl">
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
          className="group mt-7 flex aspect-[4/3] w-full flex-col items-center justify-center border border-ice/10 bg-gradient-to-br from-navy to-navy-deep px-5 text-center transition active:border-yellow/50 sm:aspect-video md:mt-8 md:hover:border-yellow/50"
        >
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-yellow/30 bg-yellow text-navy-deep transition md:group-hover:scale-105">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
          <span className="mt-5 font-display text-3xl text-ice md:text-4xl">
            Watch on YouTube
          </span>
          <span className="mt-2 inline-flex items-center gap-1 text-sm text-ice/50">
            <Youtube className="h-4 w-4" /> @FutbolfansZone
          </span>
        </a>
        <SocialIcons labeled iconClassName="h-4 w-4" className="mt-8" />
      </section>

      <section className="border-t border-ice/10 bg-navy/50">
        <div className="section-pad mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-bright">
            The voices
          </p>
          <h2 className="mt-2 font-display text-3xl text-ice sm:text-4xl md:text-5xl">
            Hosts & creators
          </h2>
          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {HOSTS.map((host, i) => (
              <article
                key={`${host.role}-${i}`}
                className="min-w-[76vw] max-w-[300px] snap-center overflow-hidden border border-ice/10 sm:min-w-[280px] md:min-w-0 md:max-w-none"
              >
                <div className="flex aspect-[4/5] items-end bg-gradient-to-br from-navy via-navy-deep to-black p-5">
                  <div>
                    <Logo
                      variant="light"
                      mark="badge"
                      href={null}
                      className="mb-4 w-10 opacity-80"
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
