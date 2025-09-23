export function getLanguageFromExtension(extension: string): string {
  const ext = extension.toLowerCase();
  
  const languageMap: Record<string, string> = {
    // JavaScript/TypeScript
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'mjs': 'javascript',
    'cjs': 'javascript',
    
    // Web
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    
    // Data formats
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    
    // Programming languages
    'py': 'python',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'cpp': 'cpp',
    'c': 'c',
    'h': 'c',
    'java': 'java',
    'php': 'php',
    'swift': 'swift',
    'kt': 'kotlin',
    
    // Shell/Config
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell',
    'dockerfile': 'dockerfile',
    'sql': 'sql',
    
    // Documentation
    'md': 'markdown',
    'mdx': 'markdown',
    'txt': 'text',
    
    // Others
    'vue': 'vue',
    'svelte': 'svelte',
  };
  
  return languageMap[ext] || 'text';
}