
import { createClient } from '@supabase/supabase-js';
import { ThreatLevel } from '@/types/alert';

// Te zmienne powinny być ustawione w panelu Supabase w produkcji
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentThreatLevel(): Promise<ThreatLevel | null> {
  try {
    const { data, error } = await supabase
      .from('threat_levels')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching threat level:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching threat level:', error);
    return null;
  }
}

export async function getThreatLevelHistory(limit = 5): Promise<ThreatLevel[]> {
  try {
    const { data, error } = await supabase
      .from('threat_levels')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching threat history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching threat history:', error);
    return [];
  }
}

export async function updateThreatLevel(threatCode: string, message?: string): Promise<ThreatLevel | null> {
  try {
    const newThreatLevel: ThreatLevel = {
      threat_code: threatCode as any,
      message: message || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('threat_levels')
      .insert([newThreatLevel])
      .select()
      .single();

    if (error) {
      console.error('Error updating threat level:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating threat level:', error);
    return null;
  }
}

export function subscribeToThreatLevels(callback: (payload: any) => void) {
  return supabase
    .channel('threat_levels_changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'threat_levels' }, callback)
    .subscribe();
}
