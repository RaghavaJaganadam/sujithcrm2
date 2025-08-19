import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ReportsNavbar() {
  return (
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
            <div className="font-medium text-gray-900">Admin</div>
            <div className="text-sm text-gray-600">Admin</div>
          </div>
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm" onClick={() => window.location.href = '/'}>
            Sign Out
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Tabs value="reports" className="w-full">
          <TabsList className="h-12 bg-transparent border-0 space-x-2 sm:space-x-8 overflow-x-auto">
            <TabsTrigger value="dashboard" onClick={() => window.location.href = '/admindashboard'} className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Dashboard</TabsTrigger>
            <TabsTrigger value="contact" onClick={() => window.location.href = '/admindashboard#contact'} className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Contact</TabsTrigger>
            <TabsTrigger value="lead-management" onClick={() => window.location.href = '/admindashboard#lead-management'} className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Lead Mgmt</TabsTrigger>
            <TabsTrigger value="team-performance" onClick={() => window.location.href = '/admindashboard#team-performance'} className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Team</TabsTrigger>
            <TabsTrigger value="revenue-analytics" onClick={() => window.location.href = '/admindashboard#revenue-analytics'} className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Revenue</TabsTrigger>
            <TabsTrigger value="pipeline" onClick={() => window.location.href = '/admindashboard#pipeline'} className="data-[state=active]:border-b-2 data-[state=active]:border-navy-dark rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap">Pipeline</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-xs sm:text-sm whitespace-nowrap font-semibold text-blue-600">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
export default function ReportsPage() {
  const [reportType, setReportType] = useState('Lead Report');
  const [dateRange, setDateRange] = useState('Last Month');
  const [teamMember, setTeamMember] = useState('All Members');

  // Fake data for demonstration
  const totalLeads = 25;
  const totalValue = 120000;
  const wonValue = 45000;
  const conversionRate = 18.5;

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportsNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
        <p className="mb-8 text-gray-600">Generate detailed reports for leads and team performance</p>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Report Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <select value={reportType} onChange={e => setReportType(e.target.value)} className="w-full border rounded p-2">
                <option>Lead Report</option>
                <option>Team Performance</option>
                <option>Revenue Analytics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full border rounded p-2">
                <option>Last Month</option>
                <option>This Month</option>
                <option>Last Quarter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Team Member</label>
              <select value={teamMember} onChange={e => setTeamMember(e.target.value)} className="w-full border rounded p-2">
                <option>All Members</option>
                <option>Alice Cole</option>
                <option>Bob Johnson</option>
                <option>Carol Smith</option>
              </select>
            </div>
          </div>
          <Button className="bg-blue-600 text-white font-semibold">Export Report</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-2">Total Leads</div>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-2">Total Value</div>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-2">Won Value</div>
            <div className="text-2xl font-bold">${wonValue.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-2">Conversion Rate</div>
            <div className="text-2xl font-bold">{conversionRate}%</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Lead Status Breakdown</h3>
            <p className="text-gray-500">Qualified: 10 | Proposal: 8 | Won: 7</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Lead Source Breakdown</h3>
            <p className="text-gray-500">Website: 12 | Referral: 8 | Event: 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
