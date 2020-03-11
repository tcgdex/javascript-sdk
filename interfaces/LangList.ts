type LangList<T> = {
	[key in Langs]?: T
}

export type Langs = "en" | "fr"

namespace LangList {
	export function insert(from: LangList<any>, el: any, lang: Langs) {
		if (typeof from !== "object") from = {}
		from[lang] = el
		return from
	}
}

export default LangList
