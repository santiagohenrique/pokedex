export interface Pokemon {
    id: number
    name: string,
    image: string,
    types: string[],
    stats: Record<string, number>
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
    stats: {
        stat: {
            name: string
        }
        base_stat: number
    }[]
}
