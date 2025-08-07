import { supabase } from "../clients/supabaseClient";
// TODO: Implement server side sorting and pagination.
// https://supabase.com/docs/reference/javascript/order
export const getRosters = async () => {
    const { data: rosters, error } = await supabase
        .from('Rosters')
        .select()
        .order('created_at', { ascending: false });
    if (error) {
        console.error(error);
        throw new Error(`[getRosters] Unable to get rosters ${error}`);
    }
    ;
    return rosters;
};
export const getRoster = async (id) => {
    const { data: roster, error } = await supabase
        .from('Rosters')
        .select()
        .eq('id', id);
    if (error) {
        console.error(error);
        throw new Error(`[getRoster] Unable to get roster: ${id} ${error}`);
    }
    return roster[0];
};
export const createRoster = async (name, team) => {
    const { data: roster, error } = await supabase
        .from('Rosters')
        .insert({ name, team })
        .select();
    if (error) {
        console.error(error);
        throw new Error(`[createRoster] Unable to create roster: ${name} ${team.join(',')} ${error}`);
    }
    return roster[0];
};
export const updateRoster = async (id, name, team) => {
    const { data: roster, error } = await supabase
        .from('Rosters')
        .update({ name, team })
        .eq('id', id)
        .select();
    if (error) {
        console.error(error);
        throw new Error(`[updateRoster] Unable to update roster: ${name} ${team.join(',')} ${error}`);
    }
    return roster[0];
};
export const deleteRoster = async (id) => {
    const { data: roster, error } = await supabase
        .from('Rosters')
        .delete()
        .eq('id', id)
        .select();
    if (error) {
        console.error(error);
        throw new Error(`[deleteRoster] Unable to delete roster: ${id} ${error}`);
    }
    return roster;
};
