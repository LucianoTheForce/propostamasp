'use client';

import { useState, useRef, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useChat } from '@ai-sdk/react';
import type { Message as AIMessage } from 'ai';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Sparkles, 
  Eye, 
  Code, 
  Download, 
  Save,
  Copy,
  RefreshCw,
  Settings,
  FileText,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ProposalData {
  title: string;
  client: string;
  projectType: string;
  budget: number;
  timeline: string;
  content: string;
  status: 'generating' | 'ready' | 'saved' | 'error';
  requirements?: string[];
  complexity?: 'simple' | 'medium' | 'complex';
}

interface ChatMessage extends AIMessage {
  timestamp?: Date;
  type?: 'prompt' | 'response' | 'system';
}

export default function ProposalsAIPage() {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [mdxContent, setMdxContent] = useState<string>('');
  const [activeView, setActiveView] = useState<'preview' | 'markdown'>('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  // AI Chat setup
  const { messages, input = '', handleInputChange, handleSubmit, isLoading, setMessages, setInput } = useChat({
    api: '/api/ai/chat',
    onResponse: async (response) => {
      if (response.ok) {
        const data = await response.json();
        if (data.proposal) {
          setProposalData(data.proposal);
          await renderMDX(data.proposal.content);
        }
      }
    },
    onError: (error) => {
      toast.error('Error generating proposal: ' + error.message);
      setIsGenerating(false);
    }
  });

  // Render MDX content
  const renderMDX = async (content: string) => {
    try {
      // For client-side, we'll just set the content and render it differently
      setMdxContent(content);
    } catch (error) {
      console.error('Error rendering MDX:', error);
      toast.error('Error rendering proposal preview');
    }
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Example prompts for quick start
  const examplePrompts = [
    {
      title: "E-commerce Platform",
      prompt: "Create a proposal for an e-commerce platform for TechStore Inc with budget of $50,000. Include payment gateway integration, inventory management, and customer accounts.",
      icon: "🛒"
    },
    {
      title: "Mobile App Development",
      prompt: "Generate a proposal for a mobile app for FoodCo restaurant chain with features like online ordering, table reservation, and loyalty program. Budget around $85,000.",
      icon: "📱"
    },
    {
      title: "SaaS Dashboard",
      prompt: "Create a comprehensive proposal for a SaaS analytics dashboard with real-time data processing, custom reports, and API integrations. Enterprise-level project.",
      icon: "📊"
    },
    {
      title: "Website Redesign",
      prompt: "Generate a proposal for a complete website redesign for a law firm. Focus on modern design, SEO optimization, and content management system.",
      icon: "🎨"
    }
  ];

  // Handle example prompt selection
  const handleExamplePrompt = (prompt: string) => {
    setInput(prompt);
    handleSubmit(new Event('submit') as any);
  };

  // Save proposal to database
  const handleSaveProposal = async () => {
    if (!proposalData) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/propostas/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: proposalData.title,
          client: proposalData.client,
          projectType: proposalData.projectType,
          status: 'draft',
          stage: 'draft',
          amount_total: proposalData.budget,
          currency: 'BRL',
          timeline: proposalData.timeline,
          content: proposalData.content
        })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Proposal saved successfully!');
        setProposalData({ ...proposalData, status: 'saved' });
      } else {
        throw new Error('Failed to save proposal');
      }
    } catch (error) {
      toast.error('Error saving proposal');
    } finally {
      setIsSaving(false);
    }
  };

  // Copy markdown to clipboard
  const handleCopyMarkdown = () => {
    if (proposalData?.content) {
      navigator.clipboard.writeText(proposalData.content);
      toast.success('Markdown copied to clipboard!');
    }
  };

  // Export as PDF
  const handleExportPDF = async () => {
    if (!proposalData) return;
    
    try {
      const response = await fetch('/api/propostas/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: proposalData.title,
          content: proposalData.content
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${proposalData.title.replace(/\s+/g, '-')}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('PDF exported successfully!');
      }
    } catch (error) {
      toast.error('Error exporting PDF');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Proposal Generator
            </h1>
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              Powered by OpenAI
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {proposalData && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyMarkdown}
                  disabled={!proposalData.content}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                  disabled={!proposalData.content}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveProposal}
                  disabled={isSaving || proposalData.status === 'saved'}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : proposalData.status === 'saved' ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {proposalData.status === 'saved' ? 'Saved' : 'Save Proposal'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Chat Panel */}
          <Panel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col border-r">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4" ref={chatContainerRef}>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="space-y-4">
                      <Card className="p-4 bg-muted/50">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-primary mt-0.5" />
                          <div className="space-y-2">
                            <p className="font-medium">Welcome to AI Proposal Generator!</p>
                            <p className="text-sm text-muted-foreground">
                              Simply describe your project and I'll generate a comprehensive proposal with all the details automatically filled in.
                            </p>
                          </div>
                        </div>
                      </Card>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
                        <div className="grid gap-2">
                          {examplePrompts.map((example, index) => (
                            <Card
                              key={index}
                              className="p-3 cursor-pointer hover:bg-accent transition-colors"
                              onClick={() => handleExamplePrompt(example.prompt)}
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">{example.icon}</span>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{example.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {example.prompt.substring(0, 80)}...
                                  </p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : ''
                          }`}
                        >
                          {message.role === 'assistant' && (
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Sparkles className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <Card className={`max-w-[80%] p-3 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </Card>
                          {message.role === 'user' && (
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                      <Card className="p-3 bg-muted">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-sm">Generating proposal...</span>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Describe your project and I'll generate a complete proposal..."
                    className="flex-1 min-h-[80px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />

          {/* Preview Panel */}
          <Panel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              {proposalData ? (
                <>
                  {/* Preview Header */}
                  <div className="border-b px-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
                          <TabsList>
                            <TabsTrigger value="preview" className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Preview
                            </TabsTrigger>
                            <TabsTrigger value="markdown" className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              Markdown
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        {proposalData.complexity && (
                          <Badge variant={
                            proposalData.complexity === 'simple' ? 'secondary' :
                            proposalData.complexity === 'medium' ? 'default' : 'destructive'
                          }>
                            {proposalData.complexity}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{proposalData.client}</span>
                        <span>•</span>
                        <span>{proposalData.projectType}</span>
                        <span>•</span>
                        <span>R$ {proposalData.budget.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <ScrollArea className="flex-1 p-6">
                    {activeView === 'preview' ? (
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {mdxContent ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {mdxContent}
                          </ReactMarkdown>
                        ) : (
                          <div className="flex items-center justify-center h-32">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <pre className="font-mono text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{proposalData.content}</code>
                      </pre>
                    )}
                  </ScrollArea>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No Proposal Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Start by describing your project in the chat panel. The AI will automatically generate a complete proposal with all details filled in.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}