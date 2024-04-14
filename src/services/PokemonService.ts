import axios from "axios";
import { PokemonDetails } from "../types/Pokemon";
import { PokemonAPI } from "../types/Pokemon";

export interface APIData{
    previous: string,
    next: string,
    pokemonList: PokemonAPI[]
}

export async function fetchPokemonList(url: string): Promise<APIData> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response = await axios.get(url);
    const modifiedResults = await Promise.all(response.data.results.map(async (pokemon: PokemonAPI) => {
        return fetchPokemonDetails(pokemon);
    }));
    return {
        previous: response.data.previous,
        next: response.data.next,
        pokemonList: modifiedResults
    }
}

async function fetchPokemonDetails(pokemon: PokemonAPI): Promise<PokemonAPI> {
    const response = await axios.get<PokemonDetails>(pokemon.url);
    const id = Number.parseInt(extractPokemonId(pokemon.url))
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractPokemonId(pokemon.url)}.png`;
    const types = response.data.types.map(type => type.type.name);
    return {
        ...pokemon,
        id: id,
        image: image,
        types: types,
    };
}


function extractPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
}
