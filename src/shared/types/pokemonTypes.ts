export type PokemonResponse = {
  pokemon_v2_pokemon: PokemonFetched[];
  pokemon_v2_pokemon_aggregate: { nodes: { id: number }[] }
}

export type PokemonDetailsResponse = {
  pokemon_v2_pokemon: PokemonFetched[];
}

export type PokemonTypeResponse = {
  pokemon_v2_type: {
    name: string;
    generation_id: number;
    id: number;
    move_damage_class_id: number;
  }[];
}

export type PokemonFetched = {
  height: number;
  id: number;
  name: string;
  order: number;
  pokemon_v2_pokemonsprites: [{ sprites: string }];
  pokemon_v2_pokemontypes: {
    id: number,
    pokemon_v2_type:
      {
        name: string,
        move_damage_class_id: number | null,
        generation_id: number,
        id: number
      },
    slot: number,
    type_id: number
  }[];
  weight: number;
  pokemon_v2_pokemonstats?: {
    base_stat: number;
    effort: number
    id: number
    stat_id: number
    pokemon_v2_stat: {
      name: string;
      move_damage_class_id: number;
      is_battle_only: boolean;
      id: number;
      game_index: number;
    }
}[];
}

export type Pokemon = {
  height: number;
  id: number;
  name: string;
  order: number;
  sprites: Sprites;
  types: Type[];
  weight: number;
  stats?: Stat[];
}

export type GenerationV = {
  'black-white': Sprites;
}

export type GenerationIv = {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

export type Versions = {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: Home };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export type Sprites = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export type GenerationI = {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

export type RedBlue = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export type GenerationIi = {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export type Crystal = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export type Gold = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export type GenerationIii = {
  emerald: OfficialArtwork;
  'firered-leafgreen': Gold;
  'ruby-sapphire': Gold;
}

export type OfficialArtwork = {
  front_default: string;
  front_shiny: string;
}

export type Home = {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export type GenerationVii = {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
}

export type DreamWorld = {
  front_default: string;
  front_female: null;
}

export type GenerationViii = {
  icons: DreamWorld;
}

export type Other = {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}

export type Stat = {
  base_stat: number;
  effort: number;
  name: string;
}

export type Type = {
  id: number;
  slot: number;
  name: string;
}