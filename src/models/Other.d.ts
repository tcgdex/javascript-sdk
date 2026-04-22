import { SupportedLanguages } from "../interfaces"

export interface variants {
	/**
	 * Card base version
	 */
	normal?: boolean
	/**
	 * Holo Reverse
	 * (colored Background holographic)
	 */
	reverse?: boolean
	/**
	 * Holo Card
	 * (illustration holographic)
	 */
	holo?: boolean

	/**
	 * can have a first Edition stamp
	 */
	firstEdition?: boolean

	/**
	 * Can be found in Jumob Format
	 */
	jumbo?: boolean

	/**
	 * Card has a pre-release stamp
	 */
	preRelease?: boolean

	/**
	 * Card has a W stamp
	 */
	wPromo?: true
}

export type VariantType =  'normal' | 'holo' | 'reverse' | 'metal' | 'lenticular'
export type VariantStamps = '1st-edition' | 'w-promo' | 'pre-release' | 'pokemon-center' | 'set-logo' | 'staff' | 'pikachu-tail'
	| 'wotc' | 'd-edition-error' | '1st-edition-scratch-error' | "1st-edition-error" | '1st-movie' | '1st-movie-inverted'
	| 'pokemon-4-ever' | 'pokemon-center-ny' | "winner" | '25th-celebration' | 'chris-fulop' | 'tsuguyoshi-yamato'
	| 'reed-weichler' | 'kevin-nguyen' | 'professor-program' | 'takashi-yoneda' | 'michael-gonzalez' | 'curran-hill'
	| 'jeremy-maron' | 'jimmy-ballard' | 'miska-saari' | 'hiroki-yano' | 'jason-klaczynski' | 'state-championships'
	| 'national-championships' | 'gym-challenge' | 'city-championships' | 'jeremy-scharff-kim' | 'destiny-deoxys'
	| 'pokemon-day' | 'regional-championships' | 'international-championships' | 'stadium-challenge' | '10th-anniversary' | 'wizard-world-philadelphia'
	| 'wizard-world-chicago' | 'comic-con' | 'nintendo-world' | 'gen-con' | 'akira-miyazaki' | 'tom-roos'
	| 'pokemon-rocks-america' | 'jun-hasebe' | 'origins' | 'games-expo' | 'kraze-club' | 'dylan-lefavour'
	| 'tristan-robinson' | 'paul-atanassov' | 'david-cohen' | 'tsubasa-nakamura' | 'worlds-2007' | 'finalist'
	| 'quarter-finalist' | 'semi-finalist' | 'top-sixteen' | 'top-thirty-two' | 'worlds-2008' | 'worlds-2009'
	| 'countdown-calendar' | 'michael-pramawat' | 'distributor-meeting' | 'mychael-bryan' | "stephen-silvestro"
	| 'yuka-furusawa' | 'jason-martinez' | 'yuta-komatsuda' | 'origins-2008' | 'platinum' | 'worlds-2010'
	| 'ross-cawthorn' | 'gustavo-wada' | 'christopher-kan' | 'player-rewards-program' | 'igor-costa'
	| 'zachary-bokhari' | 'shuto-itagaki' | 'snowflake' | 'trick-or-trade' | 'horizons' | 'gamestop' | 'eb-games'
	| 'illustration-contest-2024' | 'worlds-2025' | 'top-eight' | "champion" | "master-ball-league" | "ultra-ball-league" | "judge" | "asia-promo"
	| "international-championship-europe" | "international-championship-latin-america" | "international-championship-north-america" | 'ace-trainer'
	| 'pikachu' | 'bulbasaur' | 'squirtle' | 'charmander' | 'pokeball' | 'mcdonalds'

export interface variant_detailed {
	/**
	 * define the variant type
	 * - normal: no holographic elements
	 * - holo: the illustration has a foil
	 * - reverse: everything but the illustration is foiled
	 */
	type: VariantType;
	/**
	 * Some older sets had specific subtypes for the cards
	 * i.e Base Set had shadowless with and without a 1st-edition stamp.
	 * and the Unlimited version of the set had no shadow.
	 */
	subtype?: 'shadowless' | 'unlimited' | '1999-2000-copyright' | 'missing-expansion-symbol' | 'gold-border'
		| 'missing-hp' | 'aoki-error' | '1999-copyright' | 'evolution-box-error' | 'no-holo-error' | 'd-ink-dot-error'
		| 'energy-symbol-error' | 'text-error' | 'shifted-energy-cost' | 'japanese-back' | 'no-e-reader' | 'rarity-error'
		| 'cosmos' | 'blue-border'
/**
	 * define the size of the card
	 * - standard: the classic size of a card
	 * - jumbo: also said oversized, big card.
	 */
	size?: 'standard' | 'jumbo'

	// TODO: rename to 'stamps' on v3
	/**
	 * indicate that this variant has a stamp
	 * a card may have multiple stamps, example "Ethan's Typhlosion pre-release staff"
	 * this was a pre-release card only given to staff and has both the set-logo and the staff stamp.
	 * - 1st-edition: a 1st-edition card (mostly for the first series of the game)
	 * - w-promo:
	 * - pre-release:
	 * - pokemon-center: a card that is stamped with the Pokémon Center logo
	 * - set-promo: a card that is stamped with the set logo
	 * - staff: a card that is stamped with the staff text
	 * - gamestop: a card that is stamped with the GameStop logo
	 * - eb-games: a card that is stamped with the EB Games logo
	 * - snowflake: a card that is stamped with a snowflake, available in the yearly advent calendar
	 * - trick-or-trade: a card that is stamped with a pikachu-pumpkin, available in the yearly halloween/trick-or-trade boosters
	 * - ace-trainer: a card that is stamped with a golden ACE TRAINER, won by getting 200 championship points in the season since 2025 season.
	 * - player-rewards-program: a card that is stamped with the player reward logo, available in the yearly player rewards program (play! pokemon prize pack)
	 */
	stamp?: Array<VariantStamps>

	/**
	 * for the holo & reverse, **optional** indicate which foil is used on the card
	 */
	foil?: 'pokeball' | 'greatball' | 'ultraball' | 'masterball' | 'gold' | 'cosmos' | 'galaxy' | 'starlight' | 'energy' | 'cracked-ice'
	| 'mirror' | 'league' | 'player-reward' | 'professor-program' | 'tinsel' | 'loveball' | 'friendball' | 'quickball' | 'team-rocket' | 'duskball'

	/**
	 * list of languages for which this variant is available
	 * if not set, the variant is available in all languages
	 */
	languages?: SupportedLanguages[]

	thirdParty?: {
		tcgplayer?: number
		cardmarket?: number
	}
}

export interface Booster {

	id: string
	name: string
	logo?: string
	artwork_front?: string
	artwork_back?: string
}