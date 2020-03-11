import LangList, { Langs } from "./interfaces/LangList";
import AbilityType from "./interfaces/AbilityType";
import Category from "./interfaces/Category";
import Rarity from "./interfaces/Rarity";
import Tag from "./interfaces/Tag";
import Type from "./interfaces/Type";

type possibilities = "abilityType" | "category" | "rarity" | "tag" | "type"

export default class TranslationUtil {
	public static translate(master: "abilityType",a: AbilityType, lang: Langs): string|undefined;
	public static translate(master: "category",a: Category, lang: Langs): string|undefined;
	public static translate(master: "rarity",a: Rarity, lang: Langs): string|undefined;
	public static translate(master: "tag",a: Tag, lang: Langs): string|undefined;
	public static translate(master: "type",a: Type, lang: Langs): string|undefined;
	public static translate(master: possibilities,a: number, lang: Langs): string|undefined {
		const trans = require(`./translations/${master}`).default as translations
		const tmp = trans[lang]
		if (!tmp) return
		return tmp[a]
	}
}

export type translations = LangList<Array<string>>
