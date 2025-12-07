/**
 * Mock API utilities for demonstrating Suspense
 * Simulates network requests with artificial delays
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Manager' },
];

/**
 * Fetch user data with simulated delay
 * Used by both TanStack Query and pure React Suspense examples
 */
export async function fetchUser(userId: number): Promise<User> {
  // Simulate network delay (1-2 seconds)
  await delay(1000 + Math.random() * 1000);

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    throw new Error(`User ${userId} not found`);
  }

  return user;
}

/**
 * Fetch all users with simulated delay
 */
export async function fetchUsers(): Promise<User[]> {
  await delay(1500);
  return mockUsers;
}
