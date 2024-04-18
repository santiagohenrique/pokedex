import axios from "axios";
import { PokemonDetails } from "../types/Pokemon";
import { PokemonAPI } from "../types/Pokemon";

export interface APIData{
    previous: string | null,
    next: string | null,
    pokemonList: (PokemonAPI)[];
}

export async function fetchPokemonList(url: string, pokemonFilteredName: string): Promise<APIData> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let response = await axios.get(url);
    let modifiedResults: PokemonAPI[] = [];
    const filterPokemonListByName: PokemonAPI[] = [];
    let nextUrl: string | null = url;
    if (pokemonFilteredName) {
        while (nextUrl) {
            response = await axios.get(nextUrl);
            const pokemonList: PokemonAPI[] = response.data.results;
            filterPokemonListByName.push(...pokemonList.filter((pokemon: PokemonAPI) => {
                return pokemon.name.toLowerCase().includes(pokemonFilteredName);
            }));
            nextUrl = response.data.next;
        }
        modifiedResults = await Promise.all(filterPokemonListByName.map(async (pokemon: PokemonAPI) => {
            return fetchPokemonDetails(pokemon);
        }));
        return {
            previous: null,
            next: null,
            pokemonList: modifiedResults
        };
    } else {
        response = await axios.get(url);
        modifiedResults = await Promise.all(response.data.results.map(async (pokemon: PokemonAPI) => {
            return fetchPokemonDetails(pokemon);
        }));
        return {
            previous: response.data.previous,
            next: response.data.next,
            pokemonList: modifiedResults
        };
    }
}

async function fetchPokemonDetails(pokemon: PokemonAPI): Promise<PokemonAPI> {
    const response = await axios.get<PokemonDetails>(pokemon.url);
    const types = response.data.types.map(type => type.type.name);
    const id = Number.parseInt(extractPokemonId(pokemon.url))
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const stats: Record<string, number> = {};
        response.data.stats.forEach(stat => {
            stats[stat.stat.name] = stat.base_stat;
        });
    return {
        ...pokemon,
        id: id,
        image: image,
        types: types,
        stats: stats
    };
}

function extractPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
}
