import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/auth';
import type { SignupData } from '@/lib/auth';

export default function Index() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'salesmember' | 'salesmanager'>('salesmember');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
      e.preventDefault();
      handleAuth();
  };

  const handleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        const signupData: SignupData = { name, email, password, role };
        await authService.signup(signupData);
      } else {
        await authService.login({ email, password });
      }

      const user = authService.getUser();
      if (user) {
        if (user.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/dashboard', { state: { user } });
        }
      }
    } catch (error: any) {
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const useDemoAccount = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsSignup(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Dark Navy Section */}
      <div className="flex-1 bg-navy-dark text-white p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
        {/* Logo */}
        <div className="mb-8 lg:mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12  bg-white rounded-sm flex items-center justify-center">
            <img
  src='./logoheader.jpg'

  alt="Bristle logo"
  className="w-full h-full rounded-sm object-contain"
  />
              <div className="w-10 h-10 bg-navy-dark rounded-xs"></div>
            </div>
            <h1 className="text-3xl font-semibold">BRISTLETECH</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-10 lg:mb-11">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6">
            UNLOCKING HYPER REALITY
          </h2>
          <p className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-md">
            Manage leads, track performance, and drive revenue growth
            with our comprehensive CRM solution.
          </p>
        </div>

        {/* Features - Hidden on small screens, visible on larger screens */}
        <div className="hidden md:block space-y-6 lg:space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 mt-1 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 11L19 13L23 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Team Management</h3>
              <p className="text-gray-300 text-sm lg:text-base">
                Assign leads, track performance, and manage your sales team effectively.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-6 h-6 mt-1 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M9 17H15M9 13H15M9 9H15M4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
              <p className="text-gray-300 text-sm lg:text-base">
                Get insights into sales performance with detailed reports and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          {/* Welcome Back Header */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {isSignup ? 'Create your CRM account to get started' : 'Sign in to your CRM account to continue'}
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSignIn} className="space-y-4 lg:space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {isSignup && (
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                placeholder="Enter your password"
                minLength={6}
              />
            </div>
            
            {isSignup && (
              <div>
                <Label htmlFor="role" className="text-sm font-medium text-gray-700 mb-2 block">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'salesmember' | 'salesmanager')}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-dark focus:border-transparent"
                  required
                >
                  <option value="salesmember">Sales Member</option>
                  <option value="salesmanager">Sales Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 lg:h-12 bg-navy-dark hover:bg-navy-light text-white font-medium rounded-lg transition-colors text-sm lg:text-base disabled:opacity-50"
            >
              {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setName('');
                setEmail('');
                setPassword('');
                setRole('salesmember');
              }}
              className="text-sm text-navy-dark hover:text-navy-light font-medium"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          {/* Demo Accounts Section - Only show when not in signup mode */}
          {!isSignup && (
            <div className="mt-8 lg:mt-12">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Demo Accounts</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 lg:mb-6">
                Use these credentials to test different user roles
              </p>

              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm lg:text-base">Admin</div>
                    <div className="text-xs lg:text-sm text-gray-600 truncate">admin@company.com</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useDemoAccount('admin@company.com', 'password123')}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-3 text-xs lg:text-sm px-3 lg:px-4"
                  >
                    Use
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm lg:text-base">Sales Member</div>
                    <div className="text-xs lg:text-sm text-gray-600 truncate">alice@company.com</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useDemoAccount('alice@company.com', 'password123')}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-3 text-xs lg:text-sm px-3 lg:px-4"
                  >
                    Use
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm lg:text-base">Sales Member</div>
                    <div className="text-xs lg:text-sm text-gray-600 truncate">bob@company.com</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useDemoAccount('bob@company.com', 'password123')}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-3 text-xs lg:text-sm px-3 lg:text-sm px-3 lg:px-4"
                  >
                    Use
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full h-11 lg:h-12 bg-navy-dark hover:bg-navy-light text-white font-medium rounded-lg transition-colors text-sm lg:text-base"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Accounts Section */}
          <div className="mt-8 lg:mt-12">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Demo Accounts</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 lg:mb-6">
              Use these credentials to test different user roles
            </p>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 text-sm lg:text-base">Admin</div>
                  <div className="text-xs lg:text-sm text-gray-600 truncate">admin@company.com</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => useDemoAccount('admin@company.com', 'password123')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-3 text-xs lg:text-sm px-3 lg:px-4"
                >
                  Use
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 text-sm lg:text-base">Sales Member</div>
                  <div className="text-xs lg:text-sm text-gray-600 truncate">alice@company.com</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => useDemoAccount('alice@company.com', 'password123')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-3 text-xs lg:text-sm px-3 lg:px-4"
                >
                  Use
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 text-sm lg:text-base">Sales Member</div>
                  <div className="text-xs lg:text-sm text-gray-600 truncate">bob@company.com</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => useDemoAccount('bob@company.com', 'password123')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 ml-3 text-xs lg:text-sm px-3 lg:px-4"
                >
                  Use
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
