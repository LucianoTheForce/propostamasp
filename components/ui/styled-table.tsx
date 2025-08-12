"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface StyledTableProps {
  children: React.ReactNode
  className?: string
}

export function StyledTable({ children, className }: StyledTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-white/10", className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

interface StyledTableHeaderProps {
  children: React.ReactNode
  className?: string
}

export function StyledTableHeader({ children, className }: StyledTableHeaderProps) {
  return (
    <thead className={cn("border-b border-white/10 bg-white/5", className)}>
      {children}
    </thead>
  )
}

interface StyledTableBodyProps {
  children: React.ReactNode
  className?: string
}

export function StyledTableBody({ children, className }: StyledTableBodyProps) {
  return <tbody className={cn("divide-y divide-white/10", className)}>{children}</tbody>
}

interface StyledTableRowProps {
  children: React.ReactNode
  className?: string
}

export function StyledTableRow({ children, className }: StyledTableRowProps) {
  return (
    <tr className={cn("transition-colors hover:bg-white/5", className)}>
      {children}
    </tr>
  )
}

interface StyledTableCellProps {
  children: React.ReactNode
  className?: string
  isHeader?: boolean
}

export function StyledTableCell({ children, isHeader, className }: StyledTableCellProps) {
  const Component = isHeader ? "th" : "td"
  return (
    <Component
      className={cn(
        "px-4 py-3 text-left",
        isHeader ? "font-medium text-white" : "text-white/80",
        className
      )}
    >
      {children}
    </Component>
  )
}