"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import type { ProposalRecord, ProposalSection } from '@/types/proposal'

interface DashboardClientProps {
  initialProposals: ProposalRecord[]
}

type ProposalPreview = {
  title: string
  client: string
  hero?: {
    headline: string
    subheadline?: string
    ctaLabel?: string
  }
  sections: ProposalSection[]
  summary?: string
}

const DEFAULT_BACKGROUNDS = [
  '/takes/ice takes.png',
  '/takes/ice takes2.png',
  '/takes/ice takes3.png',
  '/takes/ice takes4.png',
  '/takes/ice takes5.png',
  '/takes/ice takes6.png',
]

export function DashboardClient({ initialProposals }: DashboardClientProps) {
  const [proposals, setProposals] = useState(initialProposals)
  const [prompt, setPrompt] = useState('')
  const [preview, setPreview] = useState<ProposalPreview | null>(null)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const debounceRef = useRef<number | null>(null)
  const previewRequestRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
      debounceRef.current = null
    }

    if (previewRequestRef.current) {
      previewRequestRef.current.abort()
      previewRequestRef.current = null
    }

    setSaveError(null)
    setSaveSuccess(null)

    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) {
      setPreview(null)
      setPreviewError(null)
      setIsPreviewLoading(false)
      return
    }

    debounceRef.current = window.setTimeout(async () => {
      const controller = new AbortController()
      previewRequestRef.current = controller

      setIsPreviewLoading(true)
      setPreviewError(null)

      try {
        const response = await fetch('/api/proposals/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: trimmedPrompt }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          throw new Error(payload.error || 'Falha ao gerar prévia com IA.')
        }

        const data = await response.json()
        setPreview(data.preview)
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }
        setPreview(null)
        setPreviewError(error instanceof Error ? error.message : 'Erro desconhecido ao gerar a prévia.')
      } finally {
        if (previewRequestRef.current === controller) {
          previewRequestRef.current = null
        }
        setIsPreviewLoading(false)
      }
    }, 600)

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      if (previewRequestRef.current) {
        previewRequestRef.current.abort()
        previewRequestRef.current = null
      }
    }
  }, [prompt])

  const refreshProposals = async () => {
    const res = await fetch('/api/proposals', { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Não foi possível atualizar a lista de propostas.')
    }
    const data = await res.json()
    setProposals(data.proposals ?? [])
  }

  const handleSaveProposal = async () => {
    if (!preview) {
      setSaveError('Gere uma prévia antes de salvar a proposta no histórico.')
      return
    }

    setSaveError(null)
    setSaveSuccess(null)
    setIsSaving(true)

    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: preview.title,
          client: preview.client,
          sections: preview.sections,
          hero: preview.hero,
          metadata: {
            summary: preview.summary,
            prompt,
          },
          useAI: false,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'Falha ao salvar a proposta gerada.')
      }

      await refreshProposals()
      setSaveSuccess('Proposta salva no histórico com sucesso.')
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Erro desconhecido ao salvar a proposta.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClear = () => {
    setPrompt('')
    setPreview(null)
    setPreviewError(null)
    setSaveError(null)
    setSaveSuccess(null)
  }

  const heroBackground = preview?.sections?.[0]?.backgroundImage || DEFAULT_BACKGROUNDS[0]

  const renderPreviewHero = () => (
    <div
      className="relative flex min-h-[260px] items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(6,6,6,0.55), rgba(6,6,6,0.55)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 mx-auto max-w-2xl space-y-4 px-8 text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">Experiência Imersiva</p>
        <h2 className="text-3xl font-semibold uppercase md:text-4xl">{preview?.hero?.headline ?? preview?.title}</h2>
        {preview?.hero?.subheadline && (
          <p className="text-sm text-white/75">{preview.hero.subheadline}</p>
        )}
        {preview?.hero?.ctaLabel && (
          <span className="inline-flex items-center rounded-full border border-white/30 px-5 py-1.5 text-[0.65rem] uppercase tracking-[0.35em] text-white/80">
            {preview.hero.ctaLabel}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-10">
      <section className="bg-white shadow-sm border border-black/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Painel de Propostas</h1>
            <p className="text-sm text-gray-500">Edite prompts avançados e visualize o resultado em tempo real.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 transition"
          >
            Ver landing
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-gray-50/60 p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Prompt avançado</p>
              <h2 className="text-lg font-medium text-gray-900">Descreva a experiência que deseja criar</h2>
            </div>
            <textarea
              className="min-h-[280px] w-full flex-1 resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Ex: Proposta para lançamento da linha Hypersport da Nike em São Paulo. Tom futurista, destaque para tecnologia wearable, incluir budget modular em três faixas e ativação interativa com realidade aumentada."
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />

            {previewError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {previewError}
              </div>
            )}

            {saveError && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                {saveError}
              </div>
            )}

            {saveSuccess && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {saveSuccess}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
                {isPreviewLoading ? 'Gerando prévia com IA…' : preview ? 'Prévia sincronizada' : 'Pronto para gerar prévia'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-600 hover:bg-gray-100"
                  disabled={!prompt && !preview}
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={handleSaveProposal}
                  disabled={isSaving || isPreviewLoading || !preview}
                  className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition disabled:cursor-not-allowed disabled:bg-black/40"
                >
                  {isSaving ? 'Salvando…' : 'Salvar proposta'}
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-[#050505] text-white shadow-md">
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/50">Pré-visualização</p>
                  <h3 className="text-lg font-semibold">{preview?.title ?? 'Aguardando prompt'}</h3>
                  <p className="text-xs text-white/60">{preview?.client ?? 'Cliente indefinido'}</p>
                </div>
                {preview?.summary && (
                  <div className="max-w-xs rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-[0.7rem] text-white/80">
                    {preview.summary}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {!preview && !previewError ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-8 py-16 text-center text-white/60">
                  <div className="h-20 w-20 rounded-full border border-dashed border-white/20" />
                  <div>
                    <p className="text-base font-medium">Sem prévia ainda</p>
                    <p className="mt-2 text-sm text-white/50">
                      Digite um prompt detalhado para gerar uma proposta automática com IA.
                    </p>
                  </div>
                </div>
              ) : null}

              {preview && (
                <div className="space-y-8">
                  {renderPreviewHero()}

                  <div className="space-y-10 px-6 pb-12">
                    {preview.sections.map((section, index) => (
                      <div
                        key={section.id || `${section.title}-${index}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
                            Seção {index + 1}
                          </span>
                          {section.backgroundImage && (
                            <span className="rounded-full border border-white/15 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
                              {section.backgroundImage.replace('/takes/', '').replace('.png', '')}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-3 text-xl font-semibold uppercase text-white">{section.title}</h4>
                        <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/75">
                          {section.body.split('\n').map((paragraph, paragraphIndex) => (
                            <p key={`${section.id}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewError && !preview && (
                <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center text-red-200">
                  <p className="text-base font-medium">Não foi possível gerar a prévia</p>
                  <p className="mt-2 text-sm text-red-200/80">{previewError}</p>
                </div>
              )}

              {isPreviewLoading && !preview && (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-8 py-16 text-white/60">
                  <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <p className="text-sm">Construindo pré-visualização…</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Histórico</h2>
        {proposals.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma proposta cadastrada ainda.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4">
            {proposals.map((proposal) => (
              <li
                key={proposal.id}
                className="bg-white border border-black/10 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{proposal.title}</h3>
                  <p className="text-sm text-gray-500">{proposal.client}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Atualizado em {new Date(proposal.updatedAt).toLocaleDateString('pt-BR')} às {new Date(proposal.updatedAt).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                    {proposal.status}
                  </span>
                  <Link
                    href={`/propostas/${proposal.slug}`}
                    className="text-sm font-medium text-black hover:underline"
                  >
                    Abrir proposta
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
