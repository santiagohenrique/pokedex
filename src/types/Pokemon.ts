export interface Pokemon {
    name: string;
    image: string;
    types: string[];
}

export interface PokemonAPI extends Pokemon {
    url: string;
}


export interface PokemonDetails {
    types: {
        type: {
        name: string;
        };
    }[];
}