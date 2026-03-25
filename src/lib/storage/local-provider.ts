import type { StorageProvider, ProjectMeta } from '@/types/providers';
import type { Project } from '@/types/project';

/**
 * Local filesystem storage provider (MVP)
 *
 * Stores projects as JSON files in ./data/projects/
 * Images stored alongside in ./data/projects/{id}/images/
 *
 * Switch to Azure: change STORAGE_PROVIDER env var
 * See: src/lib/storage/azure-provider.ts (future)
 */
export class LocalStorageProvider implements StorageProvider {
  async saveProject(id: string, data: Project): Promise<void> {
    // TODO: Implement with fs/promises
    // POST /api/projects/{id} → write to ./data/projects/{id}/project.json
    throw new Error('Not implemented — Phase 1');
  }

  async loadProject(id: string): Promise<Project> {
    // TODO: Implement with fs/promises
    // GET /api/projects/{id} → read ./data/projects/{id}/project.json
    throw new Error('Not implemented — Phase 1');
  }

  async listProjects(userId: string): Promise<ProjectMeta[]> {
    // TODO: Scan ./data/projects/ and read metadata
    throw new Error('Not implemented — Phase 1');
  }

  async deleteProject(id: string): Promise<void> {
    // TODO: Remove ./data/projects/{id}/
    throw new Error('Not implemented — Phase 1');
  }

  async duplicateProject(id: string, newName: string): Promise<string> {
    // TODO: Copy project folder with new ID
    throw new Error('Not implemented — Phase 1');
  }

  async uploadImage(projectId: string, file: File): Promise<string> {
    // TODO: Save to ./data/projects/{id}/images/{uuid}.{ext}
    throw new Error('Not implemented — Phase 1');
  }

  async deleteImage(url: string): Promise<void> {
    // TODO: Remove image file
    throw new Error('Not implemented — Phase 1');
  }

  async getShareUrl(projectId: string): Promise<string> {
    // TODO: Generate share token, save in metadata
    throw new Error('Not implemented — Phase 2');
  }

  async loadSharedProject(shareToken: string): Promise<Project> {
    // TODO: Resolve token → project ID → load
    throw new Error('Not implemented — Phase 2');
  }
}
