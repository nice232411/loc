import { supabase } from '../lib/supabase';
import { AppData } from '../types';
import { loadData as loadLocalData } from './storage';

const RECORD_ID = 1;

export const loadDataFromSupabase = async (): Promise<AppData | null> => {
  try {
    const { data, error } = await supabase
      .from('product_tree_data')
      .select('data')
      .eq('id', RECORD_ID)
      .maybeSingle();

    if (error) {
      console.error('Error loading from Supabase:', error);
      return null;
    }

    if (data && data.data && Object.keys(data.data).length > 0) {
      return data.data as AppData;
    }

    return null;
  } catch (error) {
    console.error('Error loading from Supabase:', error);
    return null;
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

export const migrateLocalStorageToSupabase = async (): Promise<AppData> => {
  const localData = loadLocalData();

  const supabaseData = await loadDataFromSupabase();

  if (!supabaseData || Object.keys(supabaseData).length === 0) {
    await saveDataToSupabase(localData);
    return localData;
  }

  return supabaseData;
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
