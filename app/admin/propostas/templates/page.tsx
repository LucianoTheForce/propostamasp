'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Plus,
  Edit,
  Eye,
  Copy,
  FileText,
  FolderOpen,
  Code,
  ShoppingCart,
  Briefcase,
  Palette,
} from 'lucide-react';

interface Template {
  slug: string;
  name: string;
  description: string;
  category: string;
}

export default function TemplatesDashboard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/propostas/templates');
      const data = await res.json();
      setTemplates(data.templates);
    } catch (error) {
      toast.error('Failed to fetch templates');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      web: <Code className="w-4 h-4" />,
      mobile: <FolderOpen className="w-4 h-4" />,
      ecommerce: <ShoppingCart className="w-4 h-4" />,
      consulting: <Briefcase className="w-4 h-4" />,
      design: <Palette className="w-4 h-4" />,
    };
    return icons[category] || <FileText className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      web: 'bg-blue-500',
      mobile: 'bg-green-500',
      ecommerce: 'bg-purple-500',
      consulting: 'bg-yellow-500',
      design: 'bg-pink-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/admin/propostas">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Proposals
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Proposal Templates</h1>
            <p className="text-gray-500 mt-1">Manage and customize your proposal templates</p>
          </div>
          <Link href="/admin/keystatic#collection=proposal_templates">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </Link>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading templates...</div>
          ) : templates.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
                  <p className="text-gray-500 mb-4">Create your first template to get started</p>
                  <Link href="/admin/keystatic#collection=proposal_templates">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            templates.map((template) => (
              <Card key={template.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(template.category)}
                      <Badge className={`${getCategoryColor(template.category)} text-white`}>
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{template.name}</CardTitle>
                  <CardDescription>{template.description || 'No description provided'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setPreviewDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Link
                      href={`/admin/keystatic#collection=proposal_templates&item=${template.slug}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>About Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">How to use templates:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Create or edit templates using the Keystatic editor</li>
                <li>Templates include default content structure and formatting</li>
                <li>When creating a new proposal, select a template as the starting point</li>
                <li>The proposal will be created with the template's content, which you can then customize</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium mb-2">Template categories:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500 text-white">Web Development</Badge>
                <Badge className="bg-green-500 text-white">Mobile App</Badge>
                <Badge className="bg-purple-500 text-white">E-commerce</Badge>
                <Badge className="bg-yellow-500 text-white">Consulting</Badge>
                <Badge className="bg-pink-500 text-white">Design</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Template Preview: {selectedTemplate?.name}</DialogTitle>
              <DialogDescription>
                This is how the template will appear when used to create a new proposal
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Category:</span> {selectedTemplate?.category}
                </div>
                <div>
                  <span className="font-medium">Description:</span> {selectedTemplate?.description || 'N/A'}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  To view the full template content, edit it in the Keystatic editor.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
                Close
              </Button>
              <Link href={`/admin/keystatic#collection=proposal_templates&item=${selectedTemplate?.slug}`}>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Template
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}