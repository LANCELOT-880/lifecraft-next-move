type NamespaceListener = () => void;

let currentUserId: string | null = null;
const listeners = new Set<NamespaceListener>();

export function getUserStorageKey(baseKey: string): string {
  const namespace = currentUserId ? encodeURIComponent(currentUserId) : "guest";
  return `${baseKey}.${namespace}`;
}

export function setStorageUserId(userId: string | null): void {
  if (currentUserId === userId) return;
  currentUserId = userId;
  listeners.forEach((listener) => listener());
}

export function subscribeStorageUser(listener: NamespaceListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
