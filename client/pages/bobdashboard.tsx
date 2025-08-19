import { useState } from 'react';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function BobDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const stats = {
        totalLeads: 12,
        monthlyTarget: 80,
        activeSalesMembers: 1,
        totalRevenue: 8500,
        conversions: 3,
        newLeads: 4
    };
    const leadDistribution = {
        qualified: 5,
        proposal: 3,
        won: 3,
        total: 11
    };
    const recentLeads = [
        { id: '1', company: 'Acme Corp', contact: 'Jane Doe', status: 'qualified', value: 2000, lastActivity: '1 hour ago' },
        { id: '2', company: 'Beta LLC', contact: 'Sam Smith', status: 'proposal', value: 3000, lastActivity: '3 hours ago' },
        { id: '3', company: 'Gamma Inc', contact: 'Alex Lee', status: 'won', value: 3500, lastActivity: 'Yesterday' }
    ];
    const teamMembers = [
        { id: '1', name: 'Bob', role: 'Sales Member', performance: 80, deals: 3, revenue: 8500 }
    ];
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'qualified': return 'default';
            case 'proposal': return 'secondary';
            case 'won': return 'default';
            default: return 'outline';
        }
    };
    const handleSignOut = async () => {
        await authService.logout();
        window.location.href = '/';
    };
    return (
        <div className="min-h-screen bg-blue-50">
            <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-xs"></div>
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Bob's Dashboard</h1>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm" onClick={handleSignOut}>Sign Out</Button>
                </div>
            </header>
            <div className="bg-white border-b border-gray-200">
                <div className="px-3 sm:px-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="h-12 bg-transparent border-0 space-x-2 sm:space-x-8 overflow-x-auto">
                            <TabsTrigger value="dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Dashboard</TabsTrigger>
                            <TabsTrigger value="leads" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Leads</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dashboard" className="mt-0">
                            <div className="p-3 sm:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{stats.totalLeads}</div>
                                            <p className="text-xs text-gray-600 mt-1">+2 new this week</p>
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
                                            <CardTitle className="text-sm font-medium text-gray-600">Deals Closed</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{stats.conversions}</div>
                                            <p className="text-xs text-gray-600 mt-1">This month</p>
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
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                    <Card>
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
                                        <CardTitle className="text-lg font-semibold">Performance Summary</CardTitle>
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
                        <TabsContent value="leads" className="mt-0">
                            <div className="p-3 sm:p-6">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">Lead Management</h2>
                                <p className="text-gray-600">Lead management features coming soon...</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
