import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Proposal slug is required', success: false },
        { status: 400 }
      );
    }

    // Get proposal from database
    const proposal = await db.getProposalBySlug(slug);
    
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found', success: false },
        { status: 404 }
      );
    }

    // Generate HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${proposal.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 40px;
    }
    
    .header {
      border-bottom: 3px solid #0066cc;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    h1 {
      color: #0066cc;
      font-size: 32px;
      margin-bottom: 10px;
    }
    
    .metadata {
      display: flex;
      gap: 30px;
      margin-top: 15px;
      font-size: 14px;
      color: #666;
    }
    
    .metadata-item {
      display: flex;
      flex-direction: column;
    }
    
    .metadata-label {
      font-weight: 600;
      color: #333;
      margin-bottom: 2px;
    }
    
    .content {
      margin-top: 30px;
      font-size: 14px;
      line-height: 1.8;
    }
    
    h2 {
      color: #0066cc;
      font-size: 24px;
      margin-top: 30px;
      margin-bottom: 15px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 5px;
    }
    
    h3 {
      color: #333;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    p {
      margin-bottom: 12px;
    }
    
    ul, ol {
      margin-left: 25px;
      margin-bottom: 12px;
    }
    
    li {
      margin-bottom: 5px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    
    blockquote {
      border-left: 4px solid #0066cc;
      padding-left: 15px;
      margin: 15px 0;
      font-style: italic;
      color: #666;
    }
    
    code {
      background-color: #f5f5f5;
      padding: 2px 5px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }
    
    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      margin: 15px 0;
    }
    
    pre code {
      background-color: transparent;
      padding: 0;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .header {
        page-break-after: avoid;
      }
      
      h2, h3 {
        page-break-after: avoid;
      }
      
      table {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${proposal.title}</h1>
    <div class="metadata">
      <div class="metadata-item">
        <span class="metadata-label">Client</span>
        <span>${proposal.client}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">Project Type</span>
        <span>${proposal.project_type || 'Web Development'}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">Timeline</span>
        <span>${proposal.timeline || '3 months'}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">Budget</span>
        <span>${proposal.currency || 'BRL'} ${(proposal.amount_total || 0).toLocaleString('pt-BR')}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">Date</span>
        <span>${new Date(proposal.updated_at || new Date()).toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
  </div>
  
  <div class="content">
    ${proposal.content ? convertMarkdownToHTML(proposal.content) : '<p>No content available</p>'}
  </div>
  
  <div class="footer">
    <p>Generated on ${new Date().toLocaleDateString('pt-BR')} at ${new Date().toLocaleTimeString('pt-BR')}</p>
    <p>© ${new Date().getFullYear()} - Confidential Proposal</p>
  </div>
</body>
</html>
    `;

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}-proposal.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return NextResponse.json(
      { error: 'Failed to export PDF', success: false },
      { status: 500 }
    );
  }
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Lists
  html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
  
  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  
  // Wrap in paragraphs
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }
  
  // Code blocks
  html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Blockquotes
  html = html.replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');
  
  // Tables (basic support)
  html = html.replace(/\|(.+)\|/g, function(match, p1) {
    const cells = p1.split('|').map((cell: string) => cell.trim());
    const row = cells.map((cell: string) => `<td>${cell}</td>`).join('');
    return `<tr>${row}</tr>`;
  });
  
  return html;
}