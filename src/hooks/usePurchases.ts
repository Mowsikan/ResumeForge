
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Purchase {
  id: string;
  plan_type: string;
  status: string;
  downloads_remaining: number;
  expires_at: string | null;
  created_at: string;
}

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [canDownload, setCanDownload] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPurchases = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPurchases(data || []);
      
      // Check if user has any valid downloads remaining
      const hasValidPurchases = (data || []).some(purchase => {
        const isNotExpired = !purchase.expires_at || new Date(purchase.expires_at) > new Date();
        return purchase.downloads_remaining > 0 && isNotExpired;
      });
      
      setCanDownload(hasValidPurchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const consumeDownload = async () => {
    if (!user || !canDownload) return false;

    try {
      // Find the first valid purchase to consume from
      const validPurchase = purchases.find(purchase => {
        const isNotExpired = !purchase.expires_at || new Date(purchase.expires_at) > new Date();
        return purchase.downloads_remaining > 0 && isNotExpired;
      });

      if (!validPurchase) return false;

      const { error } = await supabase
        .from('purchases')
        .update({
          downloads_remaining: validPurchase.downloads_remaining - 1
        })
        .eq('id', validPurchase.id);

      if (error) throw error;

      // Refresh purchases after consuming
      await fetchPurchases();
      return true;
    } catch (error) {
      console.error('Error consuming download:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [user]);

  return {
    purchases,
    canDownload,
    loading,
    consumeDownload,
    refreshPurchases: fetchPurchases,
  };
};
