import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import "server-only"

import type { ProposalRecord, ProposalStatus } from '@/types/proposal'

const DATA_PATH = path.join(process.cwd(), 'data', 'proposals.json')

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf8')
  }
}

async function readProposals(): Promise<ProposalRecord[]> {
  await ensureStore()
  const raw = await fs.readFile(DATA_PATH, 'utf8')
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeProposals(records: ProposalRecord[]): Promise<void> {
  await ensureStore()
  await fs.writeFile(DATA_PATH, JSON.stringify(records, null, 2), 'utf8')
}

export async function getProposals(): Promise<ProposalRecord[]> {
  const records = await readProposals()
  return records.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export async function getProposalBySlug(slug: string): Promise<ProposalRecord | undefined> {
  const records = await readProposals()
  return records.find((record) => record.slug === slug)
}

export async function createProposal(input: {
  title: string
  client: string
  sections: ProposalRecord['sections']
  hero?: ProposalRecord['hero']
  metadata?: ProposalRecord['metadata']
  status?: ProposalStatus
  sentAt?: string
}): Promise<ProposalRecord> {
  const records = await readProposals()
  const now = new Date().toISOString()

  let slugBase = input.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
  if (!slugBase) {
    slugBase = 'proposta'
  }

  let slug = slugBase
  let suffix = 2
  while (records.some((r) => r.slug === slug)) {
    slug = `${slugBase}-${suffix++}`
  }

  const record: ProposalRecord = {
    id: randomUUID(),
    slug,
    title: input.title,
    client: input.client,
    status: input.status ?? 'draft',
    sentAt: input.sentAt,
    createdAt: now,
    updatedAt: now,
    hero: input.hero,
    sections: input.sections,
    metadata: input.metadata,
  }

  records.push(record)
  await writeProposals(records)
  return record
}
export async function updateProposal(id: string, update: Partial<Omit<ProposalRecord, 'id' | 'createdAt'>>): Promise<ProposalRecord | undefined> {
  const records = await readProposals()
  const index = records.findIndex((record) => record.id === id)
  if (index === -1) {
    return undefined
  }

  const existing = records[index]
  const updated: ProposalRecord = {
    ...existing,
    ...update,
    slug: update.slug ?? existing.slug,
    updatedAt: new Date().toISOString(),
  }

  records[index] = updated
  await writeProposals(records)
  return updated
}

export async function deleteProposal(id: string): Promise<boolean> {
  const records = await readProposals()
  const filtered = records.filter((record) => record.id !== id)
  if (filtered.length === records.length) {
    return false
  }
  await writeProposals(filtered)
  return true
}
