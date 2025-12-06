'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function BillingForm() {
  const { user, loading } = useAuth();
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'IN',
  });
  const [gstin, setGstin] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setBillingAddress(user.billing_address || billingAddress);
      setGstin(user.gstin || '');
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    // API call to update user profile with billing info will go here
    console.log('Saving:', { billingAddress, gstin });
    await new Promise(res => setTimeout(res, 1000)); // Simulate API call
    setIsSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 rounded-2xl glass-card border border-white/5">
      <h3 className="text-lg font-semibold text-white mb-4">Billing Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-white mb-2">Street Address</label>
          <input type="text" value={billingAddress.street} onChange={e => setBillingAddress({...billingAddress, street: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">City</label>
          <input type="text" value={billingAddress.city} onChange={e => setBillingAddress({...billingAddress, city: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">State</label>
          <input type="text" value={billingAddress.state} onChange={e => setBillingAddress({...billingAddress, state: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">ZIP Code</label>
          <input type="text" value={billingAddress.zip} onChange={e => setBillingAddress({...billingAddress, zip: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">GSTIN (Optional)</label>
          <input type="text" value={gstin} onChange={e => setGstin(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white" />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
