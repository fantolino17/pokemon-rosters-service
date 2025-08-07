import { supabase } from "../clients/supabaseClient"
import type { Roster } from "../types/roster.js"

// TODO: Implement server side sorting and pagination.
// https://supabase.com/docs/reference/javascript/order
export const getRosters = async (): Promise<Roster[]> => {
  const { data: rosters, error } = await supabase
    .from('Rosters')
    .select()
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    throw new Error(`[getRosters] Unable to get rosters ${error}`)
  };

  return rosters;
}

export const getRoster = async (id: string): Promise<Roster> => {
  const { data: roster, error } = await supabase
    .from('Rosters')
    .select()
    .eq('id', id);

  if (error) {
    console.error(error)
    throw new Error(`[getRoster] Unable to get roster: ${id} ${error}`)
  }

  return roster[0];
}

export const createRoster = async (name: string, team: string[]): Promise<Roster> => {
  const { data: roster, error } = await supabase
    .from('Rosters')
    .insert({ name, team })
    .select();

  if (error) {
    console.error(error)
    throw new Error(`[createRoster] Unable to create roster: ${name} ${team.join(',')} ${error}`)
  }

  return roster[0];
}

export const updateRoster = async (id: string, name: string, team: string[]): Promise<Roster> => {
  const { data: roster, error } = await supabase
    .from('Rosters')
    .update({ name, team })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error)
    throw new Error(`[updateRoster] Unable to update roster: ${name} ${team.join(',')} ${error}`)
  }

  return roster[0];
}

export const deleteRoster = async (id: string): Promise<any> => {
  const { data: roster, error } = await supabase
    .from('Rosters')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error(error)
    throw new Error(`[deleteRoster] Unable to delete roster: ${id} ${error}`)
  }

  return roster;
}