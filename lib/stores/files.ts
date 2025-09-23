import { atom, map, type MapStore } from 'nanostores';
import type { WebContainer } from '@webcontainer/api';
import { getLanguageFromExtension } from '@/utils/getLanguageFromExtension';

export interface FileInfo {
  type: 'file' | 'directory';
  content?: string;
  isBinary?: boolean;
}

export type FileMap = Record<string, FileInfo | undefined>;

export class FilesStore {
  #webcontainer?: WebContainer;
  files: MapStore<FileMap> = map({});
  filesCount = atom(0);
  
  constructor(webcontainerPromise?: Promise<WebContainer>) {
    if (webcontainerPromise) {
      webcontainerPromise.then(container => {
        this.#webcontainer = container;
      });
    }
  }
  
  async createFile(filePath: string, content: string | Uint8Array = '') {
    const fileInfo: FileInfo = {
      type: 'file',
      content: typeof content === 'string' ? content : '',
      isBinary: content instanceof Uint8Array
    };
    
    this.files.setKey(filePath, fileInfo);
    this.filesCount.set(this.filesCount.get() + 1);
    
    if (this.#webcontainer) {
      await this.#webcontainer.fs.writeFile(filePath, content);
    }
    
    return true;
  }
  
  async saveFile(filePath: string, content: string) {
    const file = this.files.get()[filePath];
    
    if (file?.type === 'file') {
      this.files.setKey(filePath, { ...file, content });
      
      if (this.#webcontainer) {
        await this.#webcontainer.fs.writeFile(filePath, content);
      }
    }
  }
  
  getFile(filePath: string) {
    return this.files.get()[filePath];
  }
  
  async deleteFile(filePath: string) {
    const files = this.files.get();
    if (files[filePath]) {
      const newFiles = { ...files };
      delete newFiles[filePath];
      this.files.set(newFiles);
      this.filesCount.set(Math.max(0, this.filesCount.get() - 1));
      
      if (this.#webcontainer) {
        await this.#webcontainer.fs.rm(filePath);
      }
      
      return true;
    }
    return false;
  }
  
  async createFolder(folderPath: string) {
    const fileInfo: FileInfo = {
      type: 'directory'
    };
    
    this.files.setKey(folderPath, fileInfo);
    
    if (this.#webcontainer) {
      await this.#webcontainer.fs.mkdir(folderPath, { recursive: true });
    }
    
    return true;
  }
  
  async deleteFolder(folderPath: string) {
    const files = this.files.get();
    const newFiles = { ...files };
    let deletedCount = 0;
    
    // Delete folder and all its contents
    for (const path in files) {
      if (path === folderPath || path.startsWith(folderPath + '/')) {
        delete newFiles[path];
        deletedCount++;
      }
    }
    
    if (deletedCount > 0) {
      this.files.set(newFiles);
      this.filesCount.set(Math.max(0, this.filesCount.get() - deletedCount));
      
      if (this.#webcontainer) {
        await this.#webcontainer.fs.rm(folderPath, { recursive: true });
      }
      
      return true;
    }
    
    return false;
  }
  
  getFileModifications() {
    // Returns current file state
    return this.files.get();
  }
  
  getModifiedFiles() {
    // Returns current file state
    return this.files.get();
  }
  
  resetFileModifications() {
    // Reset modifications tracking if needed
  }
  
  lockFile(filePath: string) {
    // File locking implementation
    return false;
  }
  
  unlockFile(filePath: string) {
    // File unlocking implementation
    return false;
  }
  
  lockFolder(folderPath: string) {
    // Folder locking implementation
    return false;
  }
  
  unlockFolder(folderPath: string) {
    // Folder unlocking implementation
    return false;
  }
  
  isFileLocked(filePath: string) {
    return { locked: false, mode: null, lockedBy: null };
  }
  
  isFolderLocked(folderPath: string) {
    return { locked: false, mode: null, lockedBy: null };
  }
}