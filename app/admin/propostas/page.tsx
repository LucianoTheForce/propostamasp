'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  PlusCircle, 
  FileText, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Copy, 
  Archive,
  ArrowUpRight,
  RefreshCw,
  CheckCircle,
  Clock,
  Send,
  FileSignature,
  BarChart3,
  DollarSign
} from 'lucide-react';

interface Proposal {
  id: number;
  slug: string;
  title: string;
  client: string;
  status?: string;
  stage?: 'draft' | 'review' | 'sent' | 'approved' | 'signed';
  project_type?: string;
  amount_total?: number;
  currency?: string;
  timeline?: string;
  content?: string;
  public_token?: string;
  open_count?: number;
  archived?: boolean;
  last_edited_by?: string;
  created_at?: string;
  updated_at?: string;
}

interface Template {
  id: number;
  slug: string;
  name: string;
  description?: string;
  category?: string;
  content: string;
}

interface ProposalStats {
  total: number;
  by_stage: Record<string, number>;
  total_value: number;
  conversion_rate: number;
}

const stageConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: Edit3 },
  review: { label: 'Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  sent: { label: 'Sent', color: 'bg-blue-100 text-blue-700', icon: Send },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  signed: { label: 'Signed', color: 'bg-purple-100 text-purple-700', icon: FileSignature },
};

export default function ProposalsDashboard() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [stats, setStats] = useState<ProposalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  
  // Edit proposal dialog state
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editClient, setEditClient] = useState('');
  const [editProjectType, setEditProjectType] = useState('');
  const [editTimeline, setEditTimeline] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCurrency, setEditCurrency] = useState('BRL');
  const [contentTab, setContentTab] = useState<'editor' | 'preview'>('editor');

  // Create proposal dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newProposalTitle, setNewProposalTitle] = useState('');
  const [newProposalClient, setNewProposalClient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const fetchProposals = useCallback(async () => {
    try {
      const response = await fetch('/api/propostas/list');
      if (!response.ok) throw new Error('Failed to fetch proposals');
      const data = await response.json();
      setProposals(data.proposals || []);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      toast.error('Failed to load proposals');
    }
  }, []);

  const fetchTemplates = useCallback(async () => {
    try {
      const response = await fetch('/api/propostas/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/propostas/statistics');
      if (!response.ok) throw new Error('Failed to fetch statistics');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchProposals(), fetchTemplates(), fetchStats()])
      .finally(() => setLoading(false));
  }, [fetchProposals, fetchTemplates, fetchStats]);

  const handleCreateProposal = async () => {
    if (!newProposalTitle || !newProposalClient) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/propostas/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProposalTitle,
          client: newProposalClient,
          templateSlug: selectedTemplate || 'theforce-base'
        }),
      });

      if (!response.ok) throw new Error('Failed to create proposal');
      
      const data = await response.json();
      toast.success('Proposal created successfully');
      setCreateDialogOpen(false);
      setNewProposalTitle('');
      setNewProposalClient('');
      setSelectedTemplate('');
      fetchProposals();
      
      // Open the new proposal for editing
      const newProposal = data.proposal;
      if (newProposal) {
        setEditingProposal(newProposal);
        setEditTitle(newProposal.title);
        setEditClient(newProposal.client);
        setEditContent(newProposal.content || '');
        setEditProjectType(newProposal.project_type || 'Web Development');
        setEditTimeline(newProposal.timeline || '3 months');
        setEditAmount(newProposal.amount_total?.toString() || '0');
        setEditCurrency(newProposal.currency || 'BRL');
        setEditDialogOpen(true);
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('Failed to create proposal');
    }
  };

  const handleUpdateProposal = async () => {
    if (!editingProposal) return;

    try {
      const response = await fetch('/api/propostas/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProposal.id,
          title: editTitle,
          client: editClient,
          content: editContent,
          project_type: editProjectType,
          timeline: editTimeline,
          amount_total: parseFloat(editAmount) || 0,
          currency: editCurrency,
        }),
      });

      if (!response.ok) throw new Error('Failed to update proposal');
      
      toast.success('Proposal updated successfully');
      setEditDialogOpen(false);
      fetchProposals();
    } catch (error) {
      console.error('Error updating proposal:', error);
      toast.error('Failed to update proposal');
    }
  };

  const handleDuplicateProposal = async (proposal: Proposal) => {
    try {
      const response = await fetch('/api/propostas/duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: proposal.slug }),
      });

      if (!response.ok) throw new Error('Failed to duplicate proposal');
      
      toast.success('Proposal duplicated successfully');
      fetchProposals();
    } catch (error) {
      console.error('Error duplicating proposal:', error);
      toast.error('Failed to duplicate proposal');
    }
  };

  const handleDeleteProposal = async (proposal: Proposal) => {
    if (!confirm(`Are you sure you want to delete "${proposal.title}"?`)) return;

    try {
      const response = await fetch('/api/propostas/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proposal.id }),
      });

      if (!response.ok) throw new Error('Failed to delete proposal');
      
      toast.success('Proposal deleted successfully');
      fetchProposals();
    } catch (error) {
      console.error('Error deleting proposal:', error);
      toast.error('Failed to delete proposal');
    }
  };

  const handleArchiveProposal = async (proposal: Proposal) => {
    try {
      const response = await fetch('/api/propostas/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: proposal.id,
          archived: !proposal.archived
        }),
      });

      if (!response.ok) throw new Error('Failed to archive proposal');
      
      toast.success(proposal.archived ? 'Proposal unarchived' : 'Proposal archived');
      fetchProposals();
    } catch (error) {
      console.error('Error archiving proposal:', error);
      toast.error('Failed to archive proposal');
    }
  };

  const handleStageChange = async (proposal: Proposal, newStage: string) => {
    try {
      const response = await fetch('/api/propostas/stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: proposal.id,
          stage: newStage
        }),
      });

      if (!response.ok) throw new Error('Failed to update stage');
      
      toast.success('Stage updated successfully');
      fetchProposals();
      fetchStats();
    } catch (error) {
      console.error('Error updating stage:', error);
      toast.error('Failed to update stage');
    }
  };

  const handleExportPDF = async (proposal: Proposal) => {
    try {
      const response = await fetch('/api/propostas/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: proposal.slug }),
      });

      if (!response.ok) throw new Error('Failed to export PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${proposal.slug}-proposal.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  const openEditDialog = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setEditTitle(proposal.title);
    setEditClient(proposal.client);
    setEditContent(proposal.content || '');
    setEditProjectType(proposal.project_type || 'Web Development');
    setEditTimeline(proposal.timeline || '3 months');
    setEditAmount(proposal.amount_total?.toString() || '0');
    setEditCurrency(proposal.currency || 'BRL');
    setEditDialogOpen(true);
    setContentTab('editor');
  };

  // Filter proposals
  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'active' && proposal.archived) return false;
    if (filter === 'archived' && !proposal.archived) return false;
    if (selectedStage !== 'all' && proposal.stage !== selectedStage) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        proposal.title.toLowerCase().includes(query) ||
        proposal.client.toLowerCase().includes(query) ||
        proposal.slug.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Proposals Dashboard</h1>
        <p className="text-gray-600">Manage and track your business proposals</p>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {stats.total_value.toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversion_rate.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats.by_stage.sent || 0) + (stats.by_stage.review || 0)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Select value={selectedStage} onValueChange={setSelectedStage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {Object.entries(stageConfig).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
              <DialogDescription>
                Start with a template or create from scratch
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProposalTitle}
                  onChange={(e) => setNewProposalTitle(e.target.value)}
                  placeholder="e.g., Website Redesign Proposal"
                />
              </div>
              <div>
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={newProposalClient}
                  onChange={(e) => setNewProposalClient(e.target.value)}
                  placeholder="e.g., Acme Corp"
                />
              </div>
              <div>
                <Label htmlFor="template">Template (Optional)</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No template</SelectItem>
                    {templates.map((template) => (
                      <SelectItem key={template.slug} value={template.slug}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProposal}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProposals.map((proposal) => {
          const stage = stageConfig[proposal.stage || 'draft'];
          return (
            <Card key={proposal.id} className={proposal.archived ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <CardDescription>{proposal.client}</CardDescription>
                  </div>
                  <Badge className={stage.color}>
                    <stage.icon className="mr-1 h-3 w-3" />
                    {stage.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span>{proposal.project_type || 'Web Development'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Value:</span>
                    <span>
                      {proposal.currency || 'BRL'} {proposal.amount_total?.toLocaleString('pt-BR') || '0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Views:</span>
                    <span>{proposal.open_count || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Updated:</span>
                    <span>{new Date(proposal.updated_at || '').toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(proposal)}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`/propostas/${proposal.slug}`, '_blank')}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExportPDF(proposal)}
                >
                  <Download className="h-3 w-3" />
                </Button>
                <Select
                  value={proposal.stage}
                  onValueChange={(value) => handleStageChange(proposal, value)}
                >
                  <SelectTrigger className="h-8 w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(stageConfig).map(([value, config]) => (
                      <SelectItem key={value} value={value}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDuplicateProposal(proposal)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleArchiveProposal(proposal)}
                >
                  <Archive className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => handleDeleteProposal(proposal)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Proposal</DialogTitle>
            <DialogDescription>
              Update proposal details and content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-client">Client</Label>
                <Input
                  id="edit-client"
                  value={editClient}
                  onChange={(e) => setEditClient(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Project Type</Label>
                <Input
                  id="edit-type"
                  value={editProjectType}
                  onChange={(e) => setEditProjectType(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-timeline">Timeline</Label>
                <Input
                  id="edit-timeline"
                  value={editTimeline}
                  onChange={(e) => setEditTimeline(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-currency">Currency</Label>
                <Select value={editCurrency} onValueChange={setEditCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">BRL</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Content (Markdown)</Label>
              <Tabs value={contentTab} onValueChange={(v) => setContentTab(v as any)}>
                <TabsList>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[400px] font-mono"
                    placeholder="Write your proposal content in Markdown..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Supports Markdown formatting: **bold**, *italic*, # Headers, - Lists, [links](url), etc.
                  </p>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-lg p-4 min-h-[400px] prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: editContent.replace(/\n/g, '<br />') 
                    }} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProposal}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}