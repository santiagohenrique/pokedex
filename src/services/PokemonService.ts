import axios from "axios";
import { PokemonDetails } from "../types/Pokemon";
import { PokemonAPI } from "../types/Pokemon";

export interface APIData{
    previous: string | null,
    next: string | null,
    pokemonList: (PokemonAPI)[];
}

export async function fetchPokemonList(url: string): Promise<APIData> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    try{
        const response = await axios.get(url);
        let modifiedResults: PokemonAPI[] = [];
        modifiedResults = await Promise.all(response.data.results.map(async (pokemon: PokemonAPI) => {
            return await fetchPokemonDetails(pokemon);
        }));
        return {
            previous: response.data.previous,
            next: response.data.next,
            pokemonList: modifiedResults
        };
    } catch (error) {
        console.error('Erro ao buscar lista de Pokémon:', error);
        throw error;
    }
}

export async function fetchAllPokemons(url: string): Promise<APIData>{
    try{
        let response = await axios.get(url);
        let modifiedResults: PokemonAPI[] = [];
        let pokemonList: PokemonAPI[] = [];
        let nextUrl: string | null = url;
        while (nextUrl) {
            await new Promise(resolve => setTimeout(resolve, 10));
            response = await axios.get(nextUrl);
            pokemonList = [...pokemonList, ...response.data.results];
            console.log(pokemonList)
            nextUrl = response.data.next;
        }
        modifiedResults = await Promise.all(pokemonList.map(async (pokemon: PokemonAPI) => {
            return await fetchPokemonDetails(pokemon);
        }));
        return{
            previous: null,
            next: null,
            pokemonList: modifiedResults
        }
    } catch (error){
        console.error('Erro ao buscar todos os pokémons:', error);
        throw error;
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
