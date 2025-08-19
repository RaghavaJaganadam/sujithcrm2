import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/lib/auth';
import type { User } from '@/lib/auth';
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign,
  Building2,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Upload,
  Plus,
  Search,
  ChevronDown
} from 'lucide-react';

interface DashboardStats {
  totalLeads: number;
  monthlyTarget: number;
  activeSalesMembers: number;
  totalRevenue: number;
  conversions: number;
  newLeads: number;
}

interface LeadDistribution {
  qualified: number;
  proposal: number;
  won: number;
  total: number;
}

interface RecentLead {
  id: string;
  company: string;
  contact: string;
  status: 'qualified' | 'proposal' | 'won' | 'pending';
  value: number;
  lastActivity: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  performance: number;
  deals: number;
  revenue: number;
}

const leads = [
  {
    company: "Tech Innovators Inc",
    category: "Technology",
    contact: "Sarah Johnson",
    email: "sarah@techinnovators.com",
    phone: "+1 555-0123",
    value: "$50,000",
    status: "Qualified",
    priority: "high",
    assigned: "Alice Sales",
  },
  {
    company: "Global Solutions Ltd",
    category: "Manufacturing",
    contact: "Mike Chen",
    email: "mike@globalsolutions.com",
    phone: "+1 555-0124",
    value: "$75,000",
    status: "Proposal",
    priority: "high",
    assigned: "Bob Sales",
  },
  {
    company: "Startup Ventures",
    category: "Startups",
    contact: "Lisa Park",
    email: "lisa@startupventures.com",
    phone: "+1 555-0125",
    value: "$25,000",
    status: "New",
    priority: "medium",
    assigned: "Carol Sales",
  },
];

const statusColors: Record<string, string> = {
  Qualified: "bg-blue-100 text-blue-700",
  Proposal: "bg-purple-100 text-purple-700",
  New: "bg-yellow-100 text-yellow-700",
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
};

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('lead-management');
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 247,
    monthlyTarget: 65,
    activeSalesMembers: 3,
    totalRevenue: 284590,
    conversions: 18,
    newLeads: 12
  });
  
  const [leadDistribution, setLeadDistribution] = useState<LeadDistribution>({
    qualified: 15,
    proposal: 8,
    won: 12,
    total: 35
  });

  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setRecentLeads(data))
      .catch(() => setRecentLeads([]));
  }, []);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alice Cole',
      role: 'Senior Sales Rep',
      performance: 92,
      deals: 12,
      revenue: 98400
    },
    {
      id: '2',
      name: 'Bob Johnson',
      role: 'Sales Rep',
      performance: 87,
      deals: 9,
      revenue: 76200
    },
    {
      id: '3',
      name: 'Carol Smith',
      role: 'Sales Rep',
      performance: 81,
      deals: 8,
      revenue: 65300
    }
  ]);

  useEffect(() => {
    const currentUser = authService.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSignOut = async () => {
    await authService.logout();
    window.location.href = '/';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified': return 'bg-blue-500';
      case 'proposal': return 'bg-yellow-500';
      case 'won': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'qualified': return 'default';
      case 'proposal': return 'secondary';
      case 'won': return 'default';
      default: return 'outline';
    }
  };

  const [selected, setSelected] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy-dark rounded-sm flex items-center justify-center">
              <img
  src='./logo32.png'

  alt="Bristle logo"
  className="w-full h-full rounded-sm object-contain"
  />
  
              <div className="w-4 h-4 bg-white rounded-xs"></div>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">BRISTLETECH CRM</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-medium text-gray-900">{user?.name || 'Max Manager'}</div>
              <div className="text-sm text-gray-600">Admin</div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-3 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-12 bg-transparent border-0 space-x-2 sm:space-x-8 overflow-x-auto">
              <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">
                Overview
              </TabsTrigger>
              <TabsTrigger value="lead-management" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">
                Lead Management
              </TabsTrigger>
              <TabsTrigger value="team-performance" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">
                Team Performance
              </TabsTrigger>
              <TabsTrigger value="revenue-analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">
                Revenue Analytics
              </TabsTrigger>
              <TabsTrigger value="targets" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">
                Targets
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap font-semibold text-blue-600"
                onClick={() => window.location.href = '/reports'}
              >
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Content */}
            <TabsContent value="dashboard" className="mt-0">
              <div className="p-3 sm:p-6">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
                      <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalLeads}</div>
                      <p className="text-xs text-gray-600 mt-1">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Monthly Target</CardTitle>
                      <Target className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.monthlyTarget}%</div>
                      <Progress value={stats.monthlyTarget} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Active Sales Members</CardTitle>
                      <Activity className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeSalesMembers}</div>
                      <p className="text-xs text-gray-600 mt-1">Team size</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-gray-600 mt-1">This month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Lead Status Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Lead Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Qualified</span>
                          <span className="font-medium">{leadDistribution.qualified}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Proposal</span>
                          <span className="font-medium">{leadDistribution.proposal}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Won</span>
                          <span className="font-medium">{leadDistribution.won}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between font-semibold">
                            <span>Total</span>
                            <span>{leadDistribution.total}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Lead Summary */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Recent Lead Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Contact Management</h2>
                        <p className="text-gray-600">Contact management features coming soon...</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              </TabsContent>

              <TabsContent value="lead-management" className="mt-0">
              <div className="p-3 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold">Lead Management</h2>
                  <div className="flex gap-2">
                    <Button className="bg-navy-dark hover:bg-navy-light">
                      + Add New Lead
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      onClick={() => window.location.href = '/LeadsTable'}
                    >
                      📊 Leads Spreadsheet
                    </Button>
                  </div>
                </div>

                {/* Lead Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">{stats.totalLeads}</div>
                      <div className="text-sm text-gray-600">Total Leads</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">{leadDistribution.qualified}</div>
                      <div className="text-sm text-gray-600">Qualified</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-yellow-600">{leadDistribution.proposal}</div>
                      <div className="text-sm text-gray-600">In Proposal</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">{leadDistribution.won}</div>
                      <div className="text-sm text-gray-600">Won</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lead Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        ...recentLeads,
                        {
                          id: '4',
                          company: 'Innovation Labs',
                          contact: 'Emily Davis',
                          status: 'qualified' as const,
                          value: 32000,
                          lastActivity: '3 hours ago'
                        },
                        {
                          id: '5',
                          company: 'Future Systems',
                          contact: 'David Brown',
                          status: 'proposal' as const,
                          value: 18000,
                          lastActivity: '1 day ago'
                        },
                        {
                          id: '6',
                          company: 'Digital Corp',
                          contact: 'Lisa Wilson',
                          status: 'won' as const,
                          value: 55000,
                          lastActivity: '2 days ago'
                        }
                      ].map((lead) => (
                        <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(lead.status)}`}></div>
                              <div>
                                <div className="font-semibold text-gray-900">{lead.company}</div>
                                <div className="text-sm text-gray-600 flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {lead.contact}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {lead.lastActivity}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="font-semibold text-green-600">
                                  ${lead.value.toLocaleString()}
                                </div>
                                <Badge variant={getStatusBadgeVariant(lead.status)} className="text-xs">
                                  {lead.status}
                                </Badge>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Phone className="h-4 w-4 mr-2" />
                          Schedule Follow-up Calls
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email Campaign
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Building2 className="h-4 w-4 mr-2" />
                          Import Leads from CSV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lead Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Website</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Referrals</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Social Media</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cold Outreach</span>
                          <span className="font-medium">10%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team-performance" className="mt-0">
              <div className="p-3 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Team Performance</h2>

                {/* Team Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Team Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Team Members</span>
                          <span className="font-semibold">{teamMembers.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Performance</span>
                          <span className="font-semibold">
                            {Math.round(teamMembers.reduce((acc, member) => acc + member.performance, 0) / teamMembers.length)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Deals</span>
                          <span className="font-semibold">
                            {teamMembers.reduce((acc, member) => acc + member.deals, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Team Revenue</span>
                          <span className="font-semibold">
                            ${teamMembers.reduce((acc, member) => acc + member.revenue, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Performer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🏆</span>
                        </div>
                        <div className="font-semibold text-lg">{teamMembers[0]?.name}</div>
                        <div className="text-gray-600 text-sm">{teamMembers[0]?.performance}% of target</div>
                        <div className="text-green-600 font-medium mt-2">
                          ${teamMembers[0]?.revenue.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">New Deals</span>
                          <span className="font-semibold text-green-600">+23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deals Closed</span>
                          <span className="font-semibold text-blue-600">18</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pipeline Value</span>
                          <span className="font-semibold">$456K</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Team Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Individual Performance Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="font-semibold text-lg">{member.name}</div>
                              <div className="text-gray-600">{member.role}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                ${member.revenue.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">{member.deals} deals closed</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Target Achievement</span>
                              <span className="font-medium">{member.performance}%</span>
                            </div>
                            <Progress value={member.performance} className="h-2" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                            <div className="text-center">
                              <div className="text-lg font-semibold">{Math.floor(Math.random() * 50) + 20}</div>
                              <div className="text-xs text-gray-600">Active Leads</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold">{Math.floor(Math.random() * 10) + 5}</div>
                              <div className="text-xs text-gray-600">Proposals</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold">{Math.floor(member.performance / 10)}</div>
                              <div className="text-xs text-gray-600">Won This Week</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Leaderboard */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Monthly Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamMembers
                        .sort((a, b) => b.performance - a.performance)
                        .map((member, index) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${member.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">{member.performance}% target</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue-analytics" className="mt-0">
              <div className="p-3 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Revenue Analytics</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Monthly Revenue Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Revenue Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Revenue chart visualization</p>
                          <p className="text-sm text-gray-500">$284K this month (+18%)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue by Source */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue by Source</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Source breakdown chart</p>
                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Direct Sales:</span>
                              <span className="font-medium">65%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Referrals:</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Marketing:</span>
                              <span className="font-medium">10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">$284,590</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                      <div className="text-xs text-green-600 mt-1">+18% vs last month</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">$45,200</div>
                      <div className="text-sm text-gray-600">Average Deal Size</div>
                      <div className="text-xs text-blue-600 mt-1">+5% vs last month</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">23</div>
                      <div className="text-sm text-gray-600">Deals Closed</div>
                      <div className="text-xs text-purple-600 mt-1">+3 vs last month</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-orange-600">18.5%</div>
                      <div className="text-sm text-gray-600">Conversion Rate</div>
                      <div className="text-xs text-orange-600 mt-1">+2.3% vs last month</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Performing Deals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Deals This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { company: 'Enterprise Corp', value: 95000, rep: 'Alice Cole', status: 'closed' },
                        { company: 'Global Solutions', value: 78000, rep: 'Bob Johnson', status: 'pending' },
                        { company: 'Tech Innovations', value: 65000, rep: 'Carol Smith', status: 'closed' },
                        { company: 'Future Systems', value: 52000, rep: 'Alice Cole', status: 'proposal' },
                      ].map((deal, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{deal.company}</div>
                            <div className="text-sm text-gray-600">Rep: {deal.rep}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">${deal.value.toLocaleString()}</div>
                            <Badge
                              variant={deal.status === 'closed' ? 'default' : deal.status === 'proposal' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {deal.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="mt-0">
              <div className="p-3 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Sales Pipeline</h2>
                <p className="text-gray-600">Pipeline management coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <div className="p-3 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Reports</h2>
                <p className="text-gray-600">Reporting features coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
