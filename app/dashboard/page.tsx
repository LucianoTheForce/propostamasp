import { Metadata } from 'next'

import { DashboardClient } from '@/components/dashboard/dashboard-client'
import { getProposals } from '@/lib/proposals-store'

export const metadata: Metadata = {
  title: 'Painel de Propostas',
}

export default async function DashboardPage() {
  const proposals = await getProposals()

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        <DashboardClient initialProposals={proposals} />
      </div>
    </div>
  )
}
