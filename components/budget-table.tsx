"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { budgetData as defaultBudgetData } from '@/lib/budget-data'
import { ChevronDown, ChevronRight, Edit3, Eye, Save, RefreshCw, AlertCircle, Lock, GripVertical, Bot, Check, Square } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface BudgetItem {
  id: string
  description: string
  detailedDescription: string
  status: boolean
  quantity: number
  days: number
  frequency: number
  unitPrice: number
  supplier: string
  invoice: string
  billingType: string
  notes?: string
}

interface BudgetCategory {
  id: string
  name: string
  description: string
  items: BudgetItem[]
}

interface BudgetData {
  title: string
  description: string
  observacoes?: string
  dataApresentacao?: string
  categories: BudgetCategory[]
  totals: {
    direto?: number
    faturamentoDireto?: number
    equipe?: number
    geral?: number
    categorias?: number
    planejamento?: number
    criacao?: number
    honorarios?: number
    impostos?: number
  }
  summary: {
    totalItems: number
    totalCategories: number
    activeItems: number
    currency: string
    lastUpdated: string
  }
  condicoesComerciais?: string[]
}

export function BudgetTable() {
  const [editMode, setEditMode] = useState(false) // Começa em modo cliente (somente leitura)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [editableData, setEditableData] = useState<BudgetData>(defaultBudgetData)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [clientViewMode, setClientViewMode] = useState<'complete' | 'category' | 'total'>('total')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiPrompt, setAIPrompt] = useState('')
  const [aiProcessing, setAiProcessing] = useState(false)
  const [globalAIPrompt, setGlobalAIPrompt] = useState('')
  const [globalAIProcessing, setGlobalAIProcessing] = useState(false)
  const [hoveredField, setHoveredField] = useState<string | null>(null)

  // Opções de tipo de billing disponíveis
  const billingTypes = ['Direto ao Cliente', 'Faturamento Direto', 'Equipe', 'Outros']

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadBudgetData()
  }, [])

  // Adicionar listener para Ctrl+E
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault()
      if (!editMode) {
        setShowPasswordModal(true)
      }
    }
  }, [editMode])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const handlePasswordSubmit = () => {
    if (password === '7299') {
      setEditMode(true)
      setShowPasswordModal(false)
      setPassword('')
      setPasswordError('')
    } else {
      setPasswordError('Senha incorreta. Tente novamente.')
      setPassword('')
    }
  }

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit()
    }
  }

  const exitEditMode = () => {
    setEditMode(false)
  }

  const loadBudgetData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/budget')
      if (response.ok) {
        const data = await response.json()
        setEditableData(data)
      } else {
        console.error('Erro ao carregar dados')
        setEditableData(defaultBudgetData)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setEditableData(defaultBudgetData)
    } finally {
      setLoading(false)
    }
  }

  const saveBudgetData = async () => {
    try {
      setSaving(true)
      setSaveStatus('idle')
      
      const response = await fetch('/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableData)
      })

      if (response.ok) {
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 5000)
    } finally {
      setSaving(false)
    }
  }

  const resetToOriginal = async () => {
    if (confirm('Tem certeza que deseja resetar todos os dados para os valores originais? Esta ação não pode ser desfeita.')) {
      try {
        setSaving(true)
        const response = await fetch('/api/budget', {
          method: 'PUT'
        })

        if (response.ok) {
          await loadBudgetData()
          setSaveStatus('success')
          setTimeout(() => setSaveStatus('idle'), 3000)
        } else {
          setSaveStatus('error')
          setTimeout(() => setSaveStatus('idle'), 5000)
        }
      } catch (error) {
        console.error('Erro ao resetar dados:', error)
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 5000)
      } finally {
        setSaving(false)
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const calculateItemTotal = (item: BudgetItem) => {
    return item.quantity * item.days * item.frequency * item.unitPrice
  }

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  // Função para adicionar novo item em uma categoria
  const addNewItem = (categoryId: string) => {
    const newItem: BudgetItem = {
      id: `item_${Date.now()}`,
      description: 'Novo Item',
      detailedDescription: 'Descrição detalhada do novo item',
      status: true,
      quantity: 1,
      days: 1,
      frequency: 1,
      unitPrice: 0,
      supplier: 'Novo Fornecedor',
      invoice: 'Nova Fatura',
      billingType: 'Direto ao Cliente',
      notes: ''
    }

    setEditableData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    }))
  }

  // Função para excluir item
  const deleteItem = (categoryId: string, itemId: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      setEditableData(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === categoryId
            ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
            : cat
        )
      }))
    }
  }

  // Função para adicionar nova categoria
  const addNewCategory = () => {
    const newCategory: BudgetCategory = {
      id: `category_${Date.now()}`,
      name: 'Nova Categoria',
      description: 'Descrição da nova categoria',
      items: []
    }

    setEditableData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }))
  }

  // Função para excluir categoria
  const deleteCategory = (categoryId: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria e todos os seus itens?')) {
      setEditableData(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.id !== categoryId)
      }))
    }
  }

  const updateItem = useCallback((categoryId: string, itemId: string, field: keyof BudgetItem, value: string | number | boolean) => {
    setEditableData(prevData => {
      const newData = { ...prevData }
      const categoryIndex = newData.categories.findIndex(cat => cat.id === categoryId)
      if (categoryIndex !== -1) {
        const itemIndex = newData.categories[categoryIndex].items.findIndex(item => item.id === itemId)
        if (itemIndex !== -1) {
          newData.categories = [...newData.categories]
          newData.categories[categoryIndex] = { ...newData.categories[categoryIndex] }
          newData.categories[categoryIndex].items = [...newData.categories[categoryIndex].items]
          newData.categories[categoryIndex].items[itemIndex] = {
            ...newData.categories[categoryIndex].items[itemIndex],
            [field]: value
          }
        }
      }
      return newData
    })
  }, [])

  const updateCategory = useCallback((categoryId: string, field: keyof BudgetCategory, value: string) => {
    setEditableData(prevData => {
      const newData = { ...prevData }
      const categoryIndex = newData.categories.findIndex(cat => cat.id === categoryId)
      if (categoryIndex !== -1) {
        newData.categories = [...newData.categories]
        newData.categories[categoryIndex] = {
          ...newData.categories[categoryIndex],
          [field]: value
        }
      }
      return newData
    })
  }, [])

  // Handle AI selection
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const toggleSelectAll = () => {
    const allItemIds = editableData.categories.flatMap(cat => cat.items.map(item => item.id))
    setSelectedItems(prev =>
      prev.length === allItemIds.length ? [] : allItemIds
    )
  }

  const openAIModal = (itemIds: string[] = []) => {
    setSelectedItems(itemIds.length > 0 ? itemIds : selectedItems)
    setShowAIModal(true)
    setAIPrompt('')
  }

  const closeAIModal = () => {
    setShowAIModal(false)
    setAIPrompt('')
    setAiProcessing(false)
  }

  const processAIEdit = async () => {
    if (!aiPrompt.trim() || selectedItems.length === 0) return
    
    setAiProcessing(true)
    try {
      // Get the selected items data
      const selectedItemsData = selectedItems.map(itemId => {
        for (const category of editableData.categories) {
          const item = category.items.find(item => item.id === itemId)
          if (item) {
            return {
              id: item.id,
              description: item.description,
              quantity: item.quantity,
              unitValue: item.unitPrice,
              billingType: item.billingType
            }
          }
        }
        return null
      }).filter(Boolean)

      if (selectedItemsData.length === 0) {
        alert('Erro: Nenhum item válido selecionado')
        return
      }

      // Call the AI API
      const response = await fetch('/api/ai-edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: selectedItemsData,
          prompt: aiPrompt
        })
      })

      const result = await response.json()

      if (!result.success) {
        alert(`Erro na edição com IA: ${result.error}`)
        return
      }

      if (!result.editedItems || result.editedItems.length === 0) {
        alert('Nenhuma alteração foi retornada pela IA')
        return
      }

      // Apply the AI edits to the budget data
      const newData = { ...editableData }
      for (const editedItem of result.editedItems) {
        for (const category of newData.categories) {
          const itemIndex = category.items.findIndex(item => item.id === editedItem.id)
          if (itemIndex !== -1) {
            category.items[itemIndex] = {
              ...category.items[itemIndex],
              description: editedItem.description,
              quantity: editedItem.quantity,
              unitPrice: editedItem.unitValue,
              billingType: editedItem.billingType
            }
          }
        }
      }

      // Update the state and save
      setEditableData(newData)
      saveBudgetData()

      // Close modal and clear selection
      closeAIModal()
      setSelectedItems([])
      
      // Show success message
      alert(`${result.editedItems.length} ${result.editedItems.length === 1 ? 'item editado' : 'itens editados'} com sucesso pela IA!`)

    } catch (error) {
      console.error('AI processing error:', error)
      alert('Erro de conexão com a API de IA. Verifique sua conexão e tente novamente.')
    } finally {
      setAiProcessing(false)
    }
  }

  const processGlobalAI = async () => {
    if (!globalAIPrompt.trim()) return
    
    setGlobalAIProcessing(true)
    try {
      // Get all items data from the entire spreadsheet
      const allItemsData = editableData.categories.flatMap(category =>
        category.items.map(item => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          unitValue: item.unitPrice,
          billingType: item.billingType
        }))
      )

      if (allItemsData.length === 0) {
        alert('Erro: Nenhum item encontrado na planilha')
        return
      }

      // Call the AI API with all items
      const response = await fetch('/api/ai-edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: allItemsData,
          prompt: globalAIPrompt
        })
      })

      const result = await response.json()

      if (!result.success) {
        alert(`Erro na edição global com IA: ${result.error}`)
        return
      }

      if (!result.editedItems || result.editedItems.length === 0) {
        alert('Nenhuma alteração foi retornada pela IA')
        return
      }

      // Apply the AI edits to the budget data
      const newData = { ...editableData }
      for (const editedItem of result.editedItems) {
        for (const category of newData.categories) {
          const itemIndex = category.items.findIndex(item => item.id === editedItem.id)
          if (itemIndex !== -1) {
            category.items[itemIndex] = {
              ...category.items[itemIndex],
              description: editedItem.description,
              quantity: editedItem.quantity,
              unitPrice: editedItem.unitValue,
              billingType: editedItem.billingType
            }
          }
        }
      }

      // Update the state and save
      setEditableData(newData)
      saveBudgetData()

      // Clear global AI prompt
      setGlobalAIPrompt('')
      
      // Show success message
      alert(`IA Global: ${result.editedItems.length} ${result.editedItems.length === 1 ? 'item editado' : 'itens editados'} com sucesso!`)

    } catch (error) {
      console.error('Global AI processing error:', error)
      alert('Erro de conexão com a API de IA Global. Verifique sua conexão e tente novamente.')
    } finally {
      setGlobalAIProcessing(false)
    }
  }

  const recalculateTotals = () => {
    let principal = 0
    let equipe = 0

    editableData.categories.forEach(category => {
      category.items.forEach(item => {
        const total = calculateItemTotal(item)
        if (item.billingType === 'Direto ao Cliente' || item.billingType === 'Faturamento Direto') {
          principal += total
        } else if (item.billingType === 'Equipe') {
          equipe += total
        }
      })
    })

    return {
      principal: principal * 100,
      equipe: equipe * 100,
      geral: (principal + equipe) * 100
    }
  }

  const totals = recalculateTotals()

  // Drag and drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    // Find the active item and its category
    let activeItem: BudgetItem | null = null
    let activeCategoryId: string | null = null

    editableData.categories.forEach(category => {
      const item = category.items.find(item => item.id === activeId)
      if (item) {
        activeItem = item
        activeCategoryId = category.id
      }
    })

    if (!activeItem || !activeCategoryId) return

    // Find the target category (either the overId is a category or an item within a category)
    let targetCategoryId: string | null = null
    let targetIndex = 0

    // Check if overId is a category
    const targetCategory = editableData.categories.find(cat => cat.id === overId)
    if (targetCategory) {
      targetCategoryId = overId
      targetIndex = targetCategory.items.length // Add to end of category
    } else {
      // Find which category contains the target item
      editableData.categories.forEach(category => {
        const itemIndex = category.items.findIndex(item => item.id === overId)
        if (itemIndex !== -1) {
          targetCategoryId = category.id
          targetIndex = itemIndex
        }
      })
    }

    if (!targetCategoryId) return

    setEditableData(prevData => {
      const newCategories = [...prevData.categories]

      // Remove item from source category
      const sourceCategoryIndex = newCategories.findIndex(cat => cat.id === activeCategoryId)
      if (sourceCategoryIndex !== -1) {
        newCategories[sourceCategoryIndex] = {
          ...newCategories[sourceCategoryIndex],
          items: newCategories[sourceCategoryIndex].items.filter(item => item.id !== activeId)
        }
      }

      // Add item to target category
      const targetCategoryIndex = newCategories.findIndex(cat => cat.id === targetCategoryId)
      if (targetCategoryIndex !== -1) {
        const newItems = [...newCategories[targetCategoryIndex].items]
        newItems.splice(targetIndex, 0, activeItem!)
        newCategories[targetCategoryIndex] = {
          ...newCategories[targetCategoryIndex],
          items: newItems
        }
      }

      return {
        ...prevData,
        categories: newCategories
      }
    })
  }

  const handleDragOver = (event: DragOverEvent) => {
    // This can be used for visual feedback during drag
  }

  // Get all item IDs for sortable context
  const getAllItemIds = () => {
    const ids: string[] = []
    editableData.categories.forEach(category => {
      ids.push(...category.items.map(item => item.id))
    })
    return ids
  }

  // Generate sequential item number based on position
  const getItemNumber = (currentItemId: string) => {
    let itemNumber = 1
    for (const category of editableData.categories) {
      for (const item of category.items) {
        if (item.id === currentItemId) {
          return itemNumber.toString().padStart(3, '0')
        }
        itemNumber++
      }
    }
    return '001'
  }

  // Sortable Item Component
  const SortableItem = ({ item, category, children }: {
    item: BudgetItem,
    category: BudgetCategory,
    children: React.ReactNode
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    return (
      <tr
        ref={setNodeRef}
        style={style}
        className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
          isDragging ? 'bg-white/10' : ''
        }`}
      >
        {children}
        {editMode && (
          <td className="py-3 px-2 text-center">
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="w-4 h-4 text-white/40 hover:text-white/70" />
            </div>
          </td>
        )}
      </tr>
    )
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="text-white flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Carregando dados do orçamento...
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold text-white mb-4">Acesso ao Modo de Edição</h3>
            <p className="text-sm text-white/60 mb-4">Digite a senha para acessar o modo de edição:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyDown}
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 mb-4"
              placeholder="Digite a senha"
              autoFocus
            />
            {passwordError && (
              <p className="text-white/80 text-sm mb-4">{passwordError}</p>
            )}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPassword('')
                  setPasswordError('')
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-white">
            {editMode ? 'Modo de Edição' : ''}
          </h3>
          {saveStatus === 'success' && (
            <div className="text-white/80 text-sm flex items-center gap-1">
              ✓ Dados salvos com sucesso!
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="text-white/80 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Erro ao salvar dados
            </div>
          )}
          {editMode && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={globalAIPrompt}
                  onChange={(e) => setGlobalAIPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && globalAIPrompt.trim()) {
                      processGlobalAI()
                    }
                  }}
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-white/50 w-80 pr-10"
                  placeholder="IA Global: Editar toda a planilha..."
                  disabled={globalAIProcessing}
                />
                <button
                  onClick={processGlobalAI}
                  disabled={globalAIProcessing || !globalAIPrompt.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors disabled:opacity-50"
                  title="Processar com IA Global"
                >
                  {globalAIProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!editMode ? (
            <div className="flex items-center gap-2">
              {/* No modo cliente, sem seletor de visualização */}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mr-4">
                <label className="text-sm text-white/60">Visualização do Cliente:</label>
                <select
                  value={clientViewMode}
                  onChange={(e) => setClientViewMode(e.target.value as 'complete' | 'category' | 'total')}
                  className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white"
                >
                  <option value="complete">Valores Completos</option>
                  <option value="category">Apenas Totais por Categoria</option>
                  <option value="total">Apenas Total Geral</option>
                </select>
              </div>
              <button
                onClick={exitEditMode}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Modo Cliente
              </button>
              <button
                onClick={saveBudgetData}
                disabled={saving}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                onClick={resetToOriginal}
                disabled={saving}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={addNewCategory}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
              >
                + Categoria
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {editMode && selectedItems.length > 0 && (
        <div className="mb-4 bg-white/5 border border-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                {selectedItems.length} {selectedItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAIModal()}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
              >
                <Bot className="w-4 h-4" />
                Editar com IA
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
              >
                Limpar Seleção
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Edit Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Edição com IA</h3>
            
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-2">
                Itens selecionados ({selectedItems.length}):
              </p>
              <div className="bg-white/5 border border-white/10 rounded p-3 max-h-32 overflow-y-auto">
                {selectedItems.map(itemId => {
                  const item = editableData.categories
                    .flatMap(cat => cat.items)
                    .find(item => item.id === itemId)
                  return item ? (
                    <div key={itemId} className="text-xs text-white/80 mb-1">
                      • {item.description}
                    </div>
                  ) : null
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white/60 mb-2">
                Prompt para edição:
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 min-h-[120px]"
                placeholder="Descreva como você quer que os itens sejam editados..."
                rows={5}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={closeAIModal}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                disabled={aiProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={processAIEdit}
                disabled={aiProcessing || !aiPrompt.trim()}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {aiProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    Processar com IA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <SortableContext items={getAllItemIds()} strategy={verticalListSortingStrategy}>
              {/* Tabela sempre visível - apenas os valores são ocultados baseado no clientViewMode */}
              <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      {editMode && (
                        <th className="text-center py-4 px-2 text-sm font-medium text-white/60 uppercase tracking-wider w-12">
                          <button
                            onClick={toggleSelectAll}
                            className="text-white/60 hover:text-white transition-colors"
                            title="Selecionar todos"
                          >
                            {selectedItems.length === editableData.categories.flatMap(cat => cat.items).length && selectedItems.length > 0 ?
                              <Check className="w-4 h-4 text-white" /> :
                              <Square className="w-4 h-4" />
                            }
                          </button>
                        </th>
                      )}
                      <th className="text-left py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider w-16"></th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Item</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider min-w-[300px]">Descrição</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider min-w-[320px]">Descrição Detalhada</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider min-w-[200px]">Observações</th>
                      <th className="text-center py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Qtd</th>
                      <th className="text-center py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Dias</th>
                      <th className="text-center py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Freq</th>
                      {editMode && (
                        <th className="text-right py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Unitário</th>
                      )}
                      {editMode && (
                        <th className="text-right py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Total</th>
                      )}
                      {editMode && (
                        <th className="text-left py-4 px-4 text-sm font-medium text-white/60 uppercase tracking-wider">Tipo</th>
                      )}
                      {editMode && (
                        <th className="text-center py-4 px-2 text-sm font-medium text-white/60 uppercase tracking-wider w-12">Mover</th>
                      )}
                    </tr>
                  </thead>
              <tbody>
                {editableData.categories.map((category) => (
                  <React.Fragment key={category.id}>
                  <tr className="bg-white/5">
                    <td colSpan={editMode ? 13 : 8} className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {editMode ? (
                            <input
                              type="text"
                              value={category.name}
                              onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                              className="text-lg font-bold bg-white/10 border border-white/20 rounded px-2 py-1 text-white"
                            />
                          ) : (
                            <span className="text-lg font-bold text-white">{category.name}</span>
                          )}
                          {editMode ? (
                            <input
                              type="text"
                              value={category.description}
                              onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                              className="text-sm bg-white/10 border border-white/20 rounded px-2 py-1 text-white/90"
                              placeholder="Descrição da categoria"
                            />
                          ) : (
                            <span className="text-sm text-white/60">({category.description})</span>
                          )}
                        </div>
                        {editMode && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addNewItem(category.id)}
                              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                            >
                              + Item
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  {category.items.map((item) => (
                    <React.Fragment key={item.id}>
                      {editMode ? (
                        <SortableItem item={item} category={category}>
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() => toggleItemSelection(item.id)}
                              className="text-white/60 hover:text-white transition-colors"
                              title="Selecionar item"
                            >
                              {selectedItems.includes(item.id) ?
                                <Check className="w-4 h-4 text-white" /> :
                                <Square className="w-4 h-4" />
                              }
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => toggleItemExpansion(item.id)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              {expandedItems.includes(item.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-sm text-white/80">{getItemNumber(item.id)}</td>
                          <td className="py-3 px-4">
                            <div
                              className="relative group"
                              onMouseEnter={() => setHoveredField(`${item.id}-description`)}
                              onMouseLeave={() => setHoveredField(null)}
                            >
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(category.id, item.id, 'description', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white pr-8"
                              />
                              {hoveredField === `${item.id}-description` && (
                                <button
                                  onClick={() => openAIModal([item.id])}
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100"
                                  title="Editar campo com IA"
                                >
                                  <Bot className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              <div
                                className="relative group"
                                onMouseEnter={() => setHoveredField(`${item.id}-supplier`)}
                                onMouseLeave={() => setHoveredField(null)}
                              >
                                <input
                                  type="text"
                                  value={item.supplier}
                                  onChange={(e) => updateItem(category.id, item.id, 'supplier', e.target.value)}
                                  className="w-full bg-white/10 border border-white/20 rounded px-1 text-xs text-white/80 pr-6"
                                  placeholder="Fornecedor"
                                />
                                {hoveredField === `${item.id}-supplier` && (
                                  <button
                                    onClick={() => openAIModal([item.id])}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Editar campo com IA"
                                  >
                                    <Bot className="w-2 h-2" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                          {/* Descrição Detalhada (edição inline) */}
                          <td className="py-3 px-4">
                            <div
                              className="relative group"
                              onMouseEnter={() => setHoveredField(`${item.id}-detailedDescription`)}
                              onMouseLeave={() => setHoveredField(null)}
                            >
                              <textarea
                                value={item.detailedDescription}
                                onChange={(e) => updateItem(category.id, item.id, 'detailedDescription', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white resize-none pr-8"
                                rows={2}
                              />
                              {hoveredField === `${item.id}-detailedDescription` && (
                                <button
                                  onClick={() => openAIModal([item.id])}
                                  className="absolute right-1 top-1 text-white/60 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100"
                                  title="Editar campo com IA"
                                >
                                  <Bot className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div
                              className="relative group"
                              onMouseEnter={() => setHoveredField(`${item.id}-notes`)}
                              onMouseLeave={() => setHoveredField(null)}
                            >
                              <textarea
                                value={item.notes || ''}
                                onChange={(e) => updateItem(category.id, item.id, 'notes', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white resize-none pr-8"
                                placeholder="Observações adicionais"
                                rows={2}
                              />
                              {hoveredField === `${item.id}-notes` && (
                                <button
                                  onClick={() => openAIModal([item.id])}
                                  className="absolute right-1 top-1 text-white/60 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100"
                                  title="Editar campo com IA"
                                >
                                  <Bot className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div
                              className="relative group inline-block"
                              onMouseEnter={() => setHoveredField(`${item.id}-quantity`)}
                              onMouseLeave={() => setHoveredField(null)}
                            >
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(category.id, item.id, 'quantity', parseInt(e.target.value) || 0)}
                                className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white text-center pr-6"
                              />
                              {hoveredField === `${item.id}-quantity` && (
                                <button
                                  onClick={() => openAIModal([item.id])}
                                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100"
                                  title="Editar campo com IA"
                                >
                                  <Bot className="w-2 h-2" />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="number"
                              value={item.days}
                              onChange={(e) => updateItem(category.id, item.id, 'days', parseInt(e.target.value) || 0)}
                              className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white text-center"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="number"
                              value={item.frequency}
                              onChange={(e) => updateItem(category.id, item.id, 'frequency', parseInt(e.target.value) || 0)}
                              className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white text-center"
                            />
                          </td>
                          {editMode && (
                            <td className="py-3 px-4 text-right">
                              <div
                                className="relative group inline-block"
                                onMouseEnter={() => setHoveredField(`${item.id}-unitPrice`)}
                                onMouseLeave={() => setHoveredField(null)}
                              >
                                <input
                                  type="number"
                                  value={item.unitPrice}
                                  onChange={(e) => updateItem(category.id, item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                  className="w-24 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white text-right pr-6"
                                />
                                {hoveredField === `${item.id}-unitPrice` && (
                                  <button
                                    onClick={() => openAIModal([item.id])}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Editar campo com IA"
                                  >
                                    <Bot className="w-2 h-2" />
                                  </button>
                                )}
                              </div>
                            </td>
                          )}
                          {editMode && (
                            <td className="py-3 px-4 text-right text-sm font-medium text-white">
                              {formatCurrency(calculateItemTotal(item))}
                            </td>
                          )}
                          {editMode && (
                            <td className="py-3 px-4 text-sm">
                              <div className="flex items-center gap-2">
                                <select
                                  value={item.billingType}
                                  onChange={(e) => updateItem(category.id, item.id, 'billingType', e.target.value)}
                                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white"
                                >
                                  {billingTypes.map(type => (
                                    <option key={type} value={type} className="bg-gray-800 text-white">
                                      {type}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => openAIModal([item.id])}
                                  className="text-white/60 hover:text-white/80 transition-colors"
                                  title="Editar item com IA"
                                >
                                  <Bot className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteItem(category.id, item.id)}
                                  className="text-white/60 hover:text-white/80 text-xs transition-colors"
                                  title="Excluir item"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          )}
                        </SortableItem>
                      ) : (
                        <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => toggleItemExpansion(item.id)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              {expandedItems.includes(item.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-sm text-white/80">{getItemNumber(item.id)}</td>
                          <td className="py-3 px-4 min-w-[300px]">
                            <div className="text-sm text-white">{item.description}</div>
                          </td>
                          <td className="py-3 px-4 min-w-[320px]">
                            <div className="text-sm text-white/80">{item.detailedDescription}</div>
                          </td>
                          <td className="py-3 px-4 min-w-[200px]">
                            <div className="text-sm text-white/80">{item.notes || '-'}</div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-white/80">{item.quantity}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-white/80">{item.days}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-white/80">{item.frequency}x</span>
                          </td>
                        </tr>
                      )}
                      {expandedItems.includes(item.id) && (
                        <tr className="bg-black/30">
                          <td colSpan={editMode ? 13 : 8} className="p-4">
                            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                              <div>
                                <span className="text-white/60">Fornecedor:</span>
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={item.supplier}
                                    onChange={(e) => updateItem(category.id, item.id, 'supplier', e.target.value)}
                                    className="ml-2 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white"
                                  />
                                ) : (
                                  <span className="ml-2 text-white">{item.supplier}</span>
                                )}
                              </div>
                              <div>
                                <span className="text-white/60">Status:</span>
                                <span className="ml-2 text-white">{item.status ? 'Ativo' : 'Inativo'}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  <tr className="bg-white/10">
                    <td colSpan={editMode ? 10 : 7} className="py-3 px-4 text-right font-medium text-white">
                      Subtotal {category.name}:
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-white">
                      {clientViewMode === 'total' ? '•••••' :
                       formatCurrency(category.items.reduce((total, item) => total + calculateItemTotal(item), 0))}
                    </td>
                    {editMode && <td colSpan={2}></td>}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-white/20">
                <td colSpan={editMode ? 13 : 8} className="py-6">
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white/20 p-4 rounded-lg border border-white/30 text-center">
                      <p className="text-sm text-white mb-1">TOTAL GERAL</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(1143000)}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="mb-6 text-right">
          <p className="text-sm text-white/60">Data de Apresentação: {editableData.dataApresentacao || '31/07/2025'}</p>
        </div>
        
        <div className="p-6 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-md font-bold text-white mb-3">Observações</h4>
          <p className="text-sm text-white/80 mb-4">{editableData.observacoes}</p>
          
          <h4 className="text-md font-bold text-white mb-3">Condições Comerciais</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {editableData.condicoesComerciais?.map((condicao: string, index: number) => (
              <li key={index}>{condicao}</li>
            )) || [
              "1. Os direitos autorais deste projeto pertencem a THE FORCE.CC e serão remunerados pelos honorários que constam nesta planilha.",
              "2. Todos os custos são orçados, podendo haver alterações conforme mudanças de projeto após sua aprovação.",
              "3. Eventuais licenças, autorizações e taxas junto à Prefeitura serão negociadas após aprovação deste projeto.",
              "4. Os custos de criação e editoração incluem até 2 (duas) refações. A partir da 3ª (terceira) refação, se esta ocorrer por responsabilidade ou vontade do cliente, será cobrada taxa de 50% dos custos referentes à criação e/ou editoração dos lay-outs refeitos.",
              "5. No caso de mudança de briefing, será cobrado 100% do custo de criação.",
              "6. A assinatura desta planilha implica na contratação dos serviços nela descritos.",
              "7. Este documento possui o valor de título jurídico extrajudicial.",
              "8. Os valores desta planilha contemplam os impostos vigentes na data de sua emissão. Caso ocorra modificações na legislação tributária que acarrete um aumento dessa carga tributária até a data de realização do evento, será emitido faturamento complementar para cobrir eventuais diferenças de custos causado por majorações de impostos."
            ].map((condicao, index) => (
              <li key={index}>{condicao}</li>
            ))}
            {editMode && (
              <li className="text-white/80">• Modo de edição ativo - Clique em "Modo Cliente" antes de enviar ao cliente</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}