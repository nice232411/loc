import { supabase } from '../lib/supabase';
import { AppData } from '../types';
import { loadData as getInitialData } from './storage';

const RECORD_ID = 1;

export const loadDataFromSupabase = async (): Promise<AppData> => {
  try {
    const { data, error } = await supabase
      .from('product_tree_data')
      .select('data')
      .eq('id', RECORD_ID)
      .maybeSingle();

    if (error) {
      console.error('Error loading from Supabase:', error);
      return getInitialData();
    }

    if (data && data.data && Object.keys(data.data).length > 0) {
      return data.data as AppData;
    }

    const initialData = getInitialData();
    await saveDataToSupabase(initialData);
    return initialData;
  } catch (error) {
    console.error('Error loading from Supabase:', error);
    return getInitialData();
  }
};

export const saveDataToSupabase = async (appData: AppData): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('product_tree_data')
      .upsert(
        {
          id: RECORD_ID,
          data: appData,
        },
        {
          onConflict: 'id',
        }
      );

    if (error) {
      console.error('Error saving to Supabase:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    return false;
  }
};

export const subscribeToChanges = (
  callback: (payload: AppData) => void
) => {
  const channel = supabase
    .channel('product_tree_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'product_tree_data',
        filter: `id=eq.${RECORD_ID}`,
      },
      (payload) => {
        if (payload.new && (payload.new as any).data) {
          callback((payload.new as any).data as AppData);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
