// Simple demo authService for admin dashboard
export const authService = {
  getUser() {
    // Return a demo admin user
    return {
      email: 'admin@company.com',
      role: 'admin',
      name: 'Admin User',
    };
  },
  async logout() {
    // Dummy logout function
    return Promise.resolve();
  },
};
