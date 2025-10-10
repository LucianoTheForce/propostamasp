import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProposalBySlug } from '@/lib/proposals-store'

interface ProposalPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProposalPageProps): Promise<Metadata> {
  const proposal = await getProposalBySlug(params.slug)

  if (!proposal) {
    return {
      title: 'Proposta não encontrada',
    }
  }

  return {
    title: `${proposal.title} — Proposta`,
    description: `Proposta personalizada para ${proposal.client}`,
  }
}

const overlayClass = 'absolute inset-0 z-0 bg-black/15'
const DEFAULT_BACKGROUNDS = [
  '/takes/ice takes.png',
  '/takes/ice takes2.png',
  '/takes/ice takes3.png',
  '/takes/ice takes4.png',
  '/takes/ice takes5.png',
  '/takes/ice takes6.png',
]

export default async function ProposalSlugPage({ params }: ProposalPageProps) {
  const proposal = await getProposalBySlug(params.slug)

  if (!proposal) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#060606]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Proposta</p>
            <h1 className="text-2xl font-semibold">{proposal.title}</h1>
            <p className="text-sm text-white/60">{proposal.client}</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white hover:bg-white/10"
          >
            Voltar ao dashboard
          </Link>
        </div>
      </header>

      <main className="space-y-24 py-16">
        {proposal.hero && (
          <section className="relative overflow-hidden">
            <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-8 px-6 py-24">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Overview</p>
                <h2 className="text-4xl font-bold uppercase md:text-6xl">{proposal.hero.headline}</h2>
                {proposal.hero.subheadline && (
                  <p className="max-w-2xl text-lg text-white/70">{proposal.hero.subheadline}</p>
                )}
              </div>
              {proposal.hero.ctaLabel && (
                <div>
                  <span className="inline-flex items-center rounded-full border border-white/20 px-6 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
                    {proposal.hero.ctaLabel}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {proposal.sections.map((section, index) => {
          const imageSource = section.backgroundImage || DEFAULT_BACKGROUNDS[index % DEFAULT_BACKGROUNDS.length]
          const backgroundStyle = imageSource
            ? {
                backgroundImage: `linear-gradient(rgba(6,6,6,0.4), rgba(6,6,6,0.4)), url(${imageSource})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined

          return (
            <section
              key={section.id}
              className="relative flex min-h-screen items-center py-24"
              style={backgroundStyle}
            >
              {!backgroundStyle && <div className={overlayClass}></div>}
              <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Seção</p>
                  <h3 className="text-3xl font-semibold uppercase md:text-4xl">{section.title}</h3>
                </div>
                <div className="prose prose-invert max-w-3xl leading-relaxed text-white/80">
                  {section.body.split('\n').map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
