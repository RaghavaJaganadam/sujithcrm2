import React, { useState } from 'react';
import AddLeadModal from '../components/leads/AddLeadModal';

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await fetch('/api/leads');
    const data = await res.json();
    setLeads(data.leads || []);
  };

  React.useEffect(() => {
    fetchLeads();
  }, []);

  const handleLeadAdded = () => {
    fetchLeads();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + Add Lead
        </button>
      </div>
      <AddLeadModal open={modalOpen} onClose={() => setModalOpen(false)} onLeadAdded={handleLeadAdded} />
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Leads</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Company</th>
              <th className="text-left">Contact</th>
              <th className="text-left">Email</th>
              <th className="text-left">Status</th>
              <th className="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id}>
                <td>{lead.companyName}</td>
                <td>{lead.contactName}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
                <td>${lead.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
