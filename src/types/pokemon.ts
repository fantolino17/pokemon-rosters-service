export interface PokemonListItems {
  name: string,
  url: string,
}

export interface PokemonListResponse {
  results: PokemonListItems[]
}

export interface PokemonDetailResponse {
  name: string,
  types: PokemonType[],
  sprites: PokemonSprites,
}

export interface PokemonType {
  type: { name: string }
}

export interface PokemonSprites {
  front_default: string,
}