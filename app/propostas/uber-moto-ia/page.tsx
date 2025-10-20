import type { Metadata } from "next"
import UberMotoClient from "./ubermoto-client"

export const metadata: Metadata = {
  title: "Uber Moto IA - Se essa música fosse minha | The Force",
  description: "Proposta de experiência digital com IA para Uber Moto e Wieden + Kennedy",
}

export default function UberMotoPage() {
  return <UberMotoClient />
}