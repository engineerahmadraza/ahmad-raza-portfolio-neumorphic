import { Redis } from '@upstash/redis';

/**
 * Persistence layer for admin-editable content.
 *
 * Works with either:
 *  - Vercel "Storage" tab → Create Database → Redis (auto-injects KV_REST_API_URL / KV_REST_API_TOKEN)
 *  - Manual Upstash Redis (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
 *
 * If neither is configured, reads fall back to the seed data in lib/data.ts
 * (read-only) so the site still works before storage is set up.
 */

let client: Redis | null = null;
let checked = false;

function getClient(): Redis | null {
  if (checked) return client;
  checked = true;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  client = new Redis({ url, token });
  return client;
}

export function isDbConfigured(): boolean {
  return getClient() !== null;
}

/** Ordered list collections (projects / experience / research / messages) */
export async function getCollection<T>(name: string, fallback: T[]): Promise<T[]> {
  const r = getClient();
  if (!r) return fallback;
  try {
    const data = await r.get<T[]>(`collection:${name}`);
    if (data === null || data === undefined) {
      await r.set(`collection:${name}`, fallback);
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}

export async function setCollection<T>(name: string, data: T[]): Promise<void> {
  const r = getClient();
  if (!r) throw new Error('DB_NOT_CONFIGURED');
  await r.set(`collection:${name}`, data);
}

export async function addItem<T extends { id: string }>(name: string, item: T, fallback: T[]): Promise<T> {
  const current = await getCollection<T>(name, fallback);
  const updated = [item, ...current];
  await setCollection(name, updated);
  return item;
}

export async function updateItem<T extends { id: string }>(
  name: string,
  id: string,
  patch: Partial<T>,
  fallback: T[]
): Promise<T | null> {
  const current = await getCollection<T>(name, fallback);
  let found: T | null = null;
  const updated = current.map((it) => {
    if (it.id === id) {
      found = { ...it, ...patch, id };
      return found;
    }
    return it;
  });
  if (!found) return null;
  await setCollection(name, updated);
  return found;
}

export async function deleteItem<T extends { id: string }>(name: string, id: string, fallback: T[]): Promise<void> {
  const current = await getCollection<T>(name, fallback);
  const updated = current.filter((it) => it.id !== id);
  await setCollection(name, updated);
}

/** Singleton object collections (site stats) */
export async function getSingleton<T>(name: string, fallback: T): Promise<T> {
  const r = getClient();
  if (!r) return fallback;
  try {
    const data = await r.get<T>(`singleton:${name}`);
    if (data === null || data === undefined) {
      await r.set(`singleton:${name}`, fallback);
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}

export async function setSingleton<T>(name: string, data: T): Promise<void> {
  const r = getClient();
  if (!r) throw new Error('DB_NOT_CONFIGURED');
  await r.set(`singleton:${name}`, data);
}
