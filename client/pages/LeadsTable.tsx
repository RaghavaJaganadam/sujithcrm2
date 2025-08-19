import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ company: '', contact: '', status: '', value: '', lastActivity: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
function convertToCSV(data) {
  if (!data || data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];
  for (const row of data) {
    const values = headers.map(h => {
      const val = row[h] === null || row[h] === undefined ? "" : row[h];
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
}

function downloadCSV(data, filename = "leads.csv") {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchLeads = () => {
    setLoading(true);
    setError(null);
    fetch('/api/leads?all=true')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leads');
        return res.json();
      })
      .then(data => setLeads(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ company: '', contact: '', status: '', value: '', lastActivity: '' });
    fetch('/api/leads').then(res => res.json()).then(setLeads);
  };

  const handleEdit = (lead: any) => {
    setEditingId(lead._id);
    setForm({ ...lead });
  };

  const handleUpdate = async () => {
    await fetch(`/api/leads/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditingId(null);
    setForm({ company: '', contact: '', status: '', value: '', lastActivity: '' });
    fetch('/api/leads').then(res => res.json()).then(setLeads);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    fetch('/api/leads').then(res => res.json()).then(setLeads);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leads</h2>
      <div className="flex gap-2 mb-2">
        <Button onClick={() => downloadCSV(leads)}>Export CSV</Button>
        <Button variant="outline" onClick={fetchLeads} disabled={loading}>Refresh</Button>
      </div>
      {loading && <div className="text-blue-600">Loading leads...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 border border-gray-200 rounded shadow-sm bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Contact</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Value</th>
                  <th className="px-4 py-2 border">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{lead.company}</td>
                    <td className="px-4 py-2 border">{lead.contact}</td>
                    <td className="px-4 py-2 border">{lead.status}</td>
                    <td className="px-4 py-2 border">{lead.value}</td>
                    <td className="px-4 py-2 border">{lead.lastActivity ? new Date(lead.lastActivity).toLocaleString() : ''}</td>
                  </tr>
                ))}
                {(!loading && leads.length === 0) && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">No leads found.</td>
                  </tr>
                )}
              </tbody>
            </table>
      </div>
    </div>
  );
}
