import { Router } from "express";
import type { PokemonDetailResponse, PokemonListResponse, PokemonType } from "../types/pokemon.js";

const route = Router();
const pokemonBaseRoute = 'https://pokeapi.co/api/v2/pokemon';

route.get('/', async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;

  // Fetch paginated list of Pokemon
  const response = await fetch(`${pokemonBaseRoute}?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    return res.send("Failed to fetch Pokemon list");
  }
  const { results } = await response.json() as PokemonListResponse;

  // Kick off requests in parallel.
  const pokemonDetailsRequests = results.map(async ({ url }: { url: string }) => {
    const detailsResponse = await fetch(url);
    const details = await detailsResponse.json() as PokemonDetailResponse;

    const { name, types, sprites } = details;

    return {
      name,
      types: types?.map((type: PokemonType) => type.type?.name) ?? [],
      imageUrl: sprites?.front_default ?? '',
    }
  });

  const pokemonDetails = await Promise.all(pokemonDetailsRequests);

  res.json(pokemonDetails);

});
export default route;
