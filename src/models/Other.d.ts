export interface Variants {
	normal?: boolean
	reverse?: boolean
	holo?: boolean
	firstEdition?: boolean
}

export interface Booster {

	id: string
	name: string
	logo?: string
	artwork_front?: string
	artwork_back?: string
}

/**
 * A better version of variants with additionnal details on each variants
 */
export interface VariantsDetailed {
	/**
	 * define the variant type
	 * - normal: no holographic elements
	 * - holo: the illustration has a foil
	 * - reverse: everything but the illustration is foiled
	 */
	type: string
	/**
	 * Some older sets had specific subtypes for the cards
	 * i.e Base Set had shadowless with and without a 1st-edition stamp.
	 * and the Unlimited version of the set had no shadow.
	 */
	subtype?: string
	/**
	 * define the size of the card
	 * - standard: the classic size of a card
	 * - jumbo: also said oversized, big card.
	 */
	size?: string
	/**
	 * indicate that this variant has stamps
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
	 * - etc...
	 */
	stamp?: Array<string>
	/**
	 * for the holo & reverse, **optional** indicate which foil is used on the card
	 */
	foil?: string
	/**
	 * IDs from third part websites
	 */
	thirdParty?: {
		cardmarket?: number
		tcgplayer?: number
	}
	/**
	 * A unique ID defining this variant
	 */
	variantId: string
}
