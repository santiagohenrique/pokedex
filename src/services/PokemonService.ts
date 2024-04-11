import axios from "axios";
import { PokemonDetails } from "../types/Pokemon";

import { PokemonAPI } from "../types/Pokemon";

export async function fetchPokemonList(): Promise<PokemonAPI[]> {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const modifiedResults = await Promise.all(response.data.results.map(async (pokemon: PokemonAPI) => {
        return fetchPokemonDetails(pokemon);
    }));
    console.log(modifiedResults)
    return modifiedResults;
}

async function fetchPokemonDetails(pokemon: PokemonAPI): Promise<PokemonAPI> {
    const response = await axios.get<PokemonDetails>(pokemon.url);
    const types = response.data.types.map(type => type.type.name);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractPokemonId(pokemon.url)}.png`;
    return {
        ...pokemon,
        image: image,
        types: types
    };
}

function extractPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
}
