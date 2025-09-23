import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';

export async function GET() {
  try {
    const templates = await db.getTemplates();
    
    return NextResponse.json({ 
      templates,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, category, content } = body;

    if (!name || !slug || !content) {
      return NextResponse.json(
        { error: 'Name, slug, and content are required', success: false },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await db.getTemplateBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'Template with this slug already exists', success: false },
        { status: 409 }
      );
    }

    const template = await db.createTemplate({
      name,
      slug,
      description: description || '',
      category: category || 'web',
      content
    });

    if (!template) {
      throw new Error('Failed to create template');
    }

    return NextResponse.json({ 
      template,
      success: true 
    });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required', success: false },
        { status: 400 }
      );
    }

    const template = await db.updateTemplate(id, updates);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found or update failed', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      template,
      success: true 
    });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required', success: false },
        { status: 400 }
      );
    }

    const success = await db.deleteTemplate(parseInt(id));

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete template', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template', success: false },
      { status: 500 }
    );
  }
}