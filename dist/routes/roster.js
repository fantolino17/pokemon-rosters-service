import { Router } from "express";
import { createRoster, deleteRoster, getRoster, getRosters, updateRoster } from "../controllers/roster";
const route = Router();
route.get('/', async (_, res) => {
    const roster = await getRosters();
    res.send(roster);
});
route.get('/:rosterId', async (req, res) => {
    const { rosterId } = req.params;
    const roster = await getRoster(rosterId);
    res.send(roster);
});
route.post('/', async (req, res) => {
    const { name, team } = req.body;
    const roster = await createRoster(name, team);
    res.send(roster);
});
route.patch('/:rosterId', async (req, res) => {
    const { rosterId } = req.params;
    const { name, team } = req.body;
    const roster = await updateRoster(rosterId, name, team);
    res.send(roster);
});
route.delete('/:rosterId', async (req, res) => {
    const { rosterId } = req.params;
    const roster = await deleteRoster(rosterId);
    res.send(roster);
});
export default route;
