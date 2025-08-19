// Authentication service for CRM Project

export type User = {
  name: string;
  email: string;
};

export const authService = {
  isAuthenticated: () => {
    // Implement authentication logic here
    return true;
  },
  getUser: (): User | null => {
    // Mock user for demo
    return { name: 'Max Manager', email: 'max@crm.com' };
  },
  logout: async () => {
    // Mock logout
    return true;
  },
};
