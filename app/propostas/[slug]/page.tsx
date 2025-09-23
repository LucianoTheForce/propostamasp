import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { db } from '@/lib/db/client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import crypto from 'crypto';

interface ProposalPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    token?: string;
  };
}

// Custom MDX components
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mb-4 mt-8 text-gray-800" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-700" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-600 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 text-gray-600" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 text-gray-600" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50" {...props} />,
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600" {...props} />,
  code: (props: any) => {
    // Inline code
    if (!props.className) {
      return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />;
    }
    // Code blocks are handled by pre
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  a: (props: any) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold text-gray-900" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
};

async function trackView(proposalId: number) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Hash IP for privacy
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    
    await db.trackView(proposalId, ipHash, userAgent);
  } catch (error) {
    console.error('Error tracking view:', error);
  }
}

export default async function ProposalPage({ params, searchParams }: ProposalPageProps) {
  const { slug } = params;
  const { token } = searchParams;

  // Try to find the proposal
  let proposal = await db.getProposalBySlug(slug);

  // If not found, check if it's an old slug that was renamed
  if (!proposal) {
    const newSlug = await db.findRedirect(slug);
    if (newSlug) {
      redirect(`/propostas/${newSlug}${token ? `?token=${token}` : ''}`);
    }
  }

  // If still not found, check if accessing with token
  if (!proposal && token) {
    proposal = await db.getProposalByToken(token);
    if (proposal) {
      redirect(`/propostas/${proposal.slug}?token=${token}`);
    }
  }

  // Not found
  if (!proposal) {
    notFound();
  }

  // Check if proposal requires token
  if (proposal.public_token && proposal.public_token !== token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h1>
          <p className="text-gray-600">
            This proposal requires a valid access token. Please check your email for the correct link.
          </p>
        </div>
      </div>
    );
  }

  // Track view (only for proposals with ID)
  if (proposal.id) {
    await trackView(proposal.id);
  }

  // Get view stats
  const viewStats = proposal.id ? await db.getViewStats(proposal.id) : null;

  // Prepare content - use default if empty
  const content = proposal.content || `
# ${proposal.title}

**Client:** ${proposal.client}  
**Project Type:** ${proposal.project_type || 'Web Development'}  
**Timeline:** ${proposal.timeline || '3 months'}  
**Budget:** ${proposal.currency || 'BRL'} ${proposal.amount_total?.toLocaleString('pt-BR') || '0'}

## Project Overview

This proposal outlines our approach to delivering your project requirements.

---

*Proposal content is being prepared. Please check back soon.*
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{proposal.title}</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {proposal.client}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {proposal.stage || 'draft'}
                </span>
                {proposal.project_type && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {proposal.project_type}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Views: {proposal.open_count || 0}
              </p>
              {viewStats && viewStats.unique_views > 0 && (
                <p className="text-xs text-gray-400">
                  {viewStats.unique_views} unique
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="prose prose-lg max-w-none p-8">
            <MDXRemote 
              source={content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: {new Date(proposal.updated_at || new Date()).toLocaleDateString('pt-BR')}</p>
          {proposal.public_token && (
            <p className="mt-2">
              This is a private proposal. Do not share the access link.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ params, searchParams }: ProposalPageProps) {
  const { slug } = params;
  const { token } = searchParams;

  let proposal = await db.getProposalBySlug(slug);
  
  if (!proposal && token) {
    proposal = await db.getProposalByToken(token);
  }

  if (!proposal) {
    return {
      title: 'Proposal Not Found',
    };
  }

  return {
    title: `${proposal.title} - Proposal`,
    description: `Proposal for ${proposal.client} - ${proposal.project_type || 'Web Development'}`,
    robots: proposal.public_token ? 'noindex, nofollow' : 'index, follow',
  };
}