import type { StorageProvider } from '@/types/providers';
import { LocalStorageProvider } from './local-provider';

/**
 * Returns the appropriate StorageProvider based on environment config.
 *
 * STORAGE_PROVIDER=local → LocalStorageProvider (MVP, filesystem)
 * STORAGE_PROVIDER=azure → AzureBlobStorageProvider (future)
 * STORAGE_PROVIDER=vercel → VercelBlobProvider (alternative MVP)
 */
export function createStorageProvider(): StorageProvider {
  const provider = process.env.STORAGE_PROVIDER || 'local';

  switch (provider) {
    case 'local':
      return new LocalStorageProvider();
    // case 'azure':
    //   return new AzureBlobStorageProvider();
    // case 'vercel':
    //   return new VercelBlobProvider();
    default:
      throw new Error(`Unknown storage provider: ${provider}`);
  }
}
