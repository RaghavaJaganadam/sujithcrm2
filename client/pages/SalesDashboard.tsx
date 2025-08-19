import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function SalesDashboard(props) {
  const location = useLocation();
  const user = location.state?.user || props.user || { name: 'Demo User', role: 'Sales Rep' };
  // Use fake data for stats/leads/teamMembers if not provided
  const stats = props.stats || { totalLeads: 20, monthlyTarget: 80, activeSalesMembers: 3, totalRevenue: 120000, conversions: 5, newLeads: 3 };
  const leadDistribution = props.leadDistribution || { qualified: 8, proposal: 6, won: 6, total: 20 };
  const recentLeads = props.recentLeads || [
    { id: "1", company: "Acme Corp", contact: "John Doe", status: "qualified", value: 10000, lastActivity: "1 hour ago" },
    { id: "2", company: "Beta Inc", contact: "Jane Smith", status: "proposal", value: 15000, lastActivity: "2 hours ago" }
  ];
  const teamMembers = props.teamMembers || [
    { id: "1", name: "Alice Cole", role: "Senior Sales Rep", performance: 92, deals: 12, revenue: 98400 },
    { id: "2", name: "Bob Johnson", role: "Sales Rep", performance: 87, deals: 9, revenue: 76200 }
  ];

  // Use AdminDashboard layout, but with props and user info
  const [activeTab, setActiveTab] = useState('dashboard');
  const getStatusColor = (status) => {
    switch (status) {
      case 'qualified': return 'bg-blue-500';
      case 'proposal': return 'bg-yellow-500';
      case 'won': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'qualified': return 'default';
      case 'proposal': return 'secondary';
      case 'won': return 'default';
      default: return 'outline';
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy-dark rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-xs"></div>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">SalesCRM Pro</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-600">{user.role}</div>
            </div>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm" onClick={() => window.location.href = '/'}>Sign Out</Button>
          </div>
        </div>
      </header>
      <div className="bg-white border-b border-gray-200">
        <div className="px-3 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-12 bg-transparent border-0 space-x-2 sm:space-x-8 overflow-x-auto">
              <TabsTrigger value="dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Dashboard</TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Contact</TabsTrigger>
              <TabsTrigger value="lead-management" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Lead Mgmt</TabsTrigger>
              <TabsTrigger value="team-performance" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Team</TabsTrigger>
              <TabsTrigger value="revenue-analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Revenue</TabsTrigger>
              <TabsTrigger value="pipeline" className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Pipeline</TabsTrigger>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold ml-2"
                style={{ marginTop: '2px' }}
                onClick={() => window.location.href = '/reports'}
              >
                Reports Page
              </button>
            </TabsList>
            <TabsContent value="dashboard" className="mt-0">
              <div className="p-3 sm:p-6">
                <div className="mb-6 flex justify-end">
                  <Button className="bg-blue-600 text-white font-semibold" onClick={() => window.location.href = '/reports'}>
                    Go to Reports & Analytics
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalLeads}</div>
                      <p className="text-xs text-gray-600 mt-1">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Monthly Target</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.monthlyTarget}%</div>
                      <Progress value={stats.monthlyTarget} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Active Sales Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeSalesMembers}</div>
                      <p className="text-xs text-gray-600 mt-1">Team size</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-gray-600 mt-1">This month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Recent Lead Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentLeads.map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div>
                                <div className="font-medium text-gray-900">{lead.company}</div>
                                <div className="text-sm text-gray-600">{lead.contact}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={getStatusBadgeVariant(lead.status)} className="mb-1">{lead.status}</Badge>
                              <div className="text-xs text-gray-600">{lead.lastActivity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Team Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.role}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${member.revenue.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">{member.deals} deals</div>
                            </div>
                          </div>
                          <Progress value={member.performance} className="h-2" />
                          <div className="text-xs text-gray-600 text-right">{member.performance}% of target</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            {/* Other tabs can be filled similarly if needed */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
