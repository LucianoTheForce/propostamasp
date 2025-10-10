import type { Metadata } from "next"
import TimeWarpClient from "./timewarp-client"

export const metadata: Metadata = {
  title: "Time Warp Brasil 2026 - Direção Técnica e Criativa | The Force",
  description: "Proposta de Direção Técnica e Criativa de Palco para Time Warp Brasil 2026",
}

export default function TimeWarpBrasilPage() {
  return <TimeWarpClient />
}