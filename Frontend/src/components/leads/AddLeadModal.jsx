import React, { useState } from 'react';

const initialForm = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  industry: '',
  source: 'Website',
  value: 0,
  status: 'New',
  priority: 'Medium',
  notes: '',
};

const sources = ['Website', 'Referral', 'Social Media', 'Event', 'Other'];
const statuses = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const priorities = ['High', 'Medium', 'Low'];

export default function AddLeadModal({ open, onClose, onLeadAdded }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.companyName) errs.companyName = 'Required';
    if (!form.contactName) errs.contactName = 'Required';
    if (!form.email) errs.email = 'Required';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        onLeadAdded(data.lead);
        setForm(initialForm);
        onClose();
      } else {
        setErrors({ api: data.message || 'Failed to add lead' });
      }
    } catch (err) {
      setErrors({ api: 'Server error' });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
        {errors.api && <div className="text-red-500 mb-2">{errors.api}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Company Name<span className="text-red-500">*</span></label>
            <input name="companyName" value={form.companyName} onChange={handleChange} className="input" />
            {errors.companyName && <div className="text-red-500 text-xs">{errors.companyName}</div>}
          </div>
          <div>
            <label className="block font-medium">Contact Name<span className="text-red-500">*</span></label>
            <input name="contactName" value={form.contactName} onChange={handleChange} className="input" />
            {errors.contactName && <div className="text-red-500 text-xs">{errors.contactName}</div>}
          </div>
          <div>
            <label className="block font-medium">Email<span className="text-red-500">*</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="input" />
            {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium">Industry</label>
            <input name="industry" value={form.industry} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium">Source</label>
            <select name="source" value={form.source} onChange={handleChange} className="input">
              {sources.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-medium">Expected Value ($)</label>
            <input name="value" type="number" value={form.value} onChange={handleChange} className="input" min="0" />
          </div>
          <div>
            <label className="block font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="input">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-medium">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className="input">
              {priorities.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="input" rows={2} />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Lead'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
