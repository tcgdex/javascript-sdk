import LangList, { Langs } from "./interfaces/LangList";
import AbilityType from "./interfaces/AbilityType";
import Category from "./interfaces/Category";
import Rarity from "./interfaces/Rarity";
import Tag from "./interfaces/Tag";
import Type from "./interfaces/Type";

import atTrans from './translations/abilityType'
import cTrans from './translations/category'
import rTrans from './translations/rarity'
import taTrans from './translations/tag'
import tyTrans from './translations/type'

type possibilities = "abilityType" | "category" | "rarity" | "tag" | "type"

export default class TranslationUtil {
	public static translate(master: "abilityType",a: AbilityType, lang: Langs): string|undefined;
	public static translate(master: "category",a: Category, lang: Langs): string|undefined;
	public static translate(master: "rarity",a: Rarity, lang: Langs): string|undefined;
	public static translate(master: "tag",a: Tag, lang: Langs): string|undefined;
	public static translate(master: "type",a: Type, lang: Langs): string|undefined;
	public static translate(master: possibilities,a: number, lang: Langs): string|undefined {
		let langlist: LangList<Array<string>>|undefined
		switch (master) {
			case 'abilityType':
				langlist = atTrans
				break
			case 'category':
				langlist = cTrans
				break

			case 'rarity':
				langlist = rTrans
				break

			case 'tag':
				langlist = taTrans
				break

			case 'type':
				langlist = tyTrans
				break
			default:
				break;
		}
		if (!langlist) return
		const tmp = langlist[lang]
		if (!tmp) return
		return tmp[a]
	}
}

export type translations = LangList<Array<string>>
