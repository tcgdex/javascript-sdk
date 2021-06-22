/**
 * ESLint custom configuration v1.0.0
 * packages needed:
 * eslint
 * for Typescript
 * @typescript-eslint/parser
 * @typescript-eslint/eslint-plugin
 */

 module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		"eslint:all",
		"plugin:@typescript-eslint/recommended",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json"
	},
	plugins: [
		"@typescript-eslint"
	],
	root: true,
	rules: {
		// Tab indent and force switch to have one too
		indent: [
			"error",
			"tab",
			{SwitchCase: 1}
		],

		// \n linebreak
		"linebreak-style": [
			"error",
			"unix"
		],

		// Disable eslint default quote because Typescript replace it
		quotes: "off",
		"@typescript-eslint/quotes": [
			"error",
			"single",
			{ avoidEscape: true }
		],

		// Simply diallow using ';' unless mandatory
		semi: "off",
		"@typescript-eslint/semi": [
			"error",
			"never",
			{ "beforeStatementContinuationChars": "always"}
		],

		// Disallow things that do nothing in the end
		"no-unused-expressions": "off",
		"@typescript-eslint/no-unused-expressions": [
			"error",
			{ "enforceForJSX": true,}
		],

		// force overloads to be next to one another
		"@typescript-eslint/adjacent-overload-signatures": "error",

		// Force to use `Array<thing>
		"@typescript-eslint/array-type": [
			"error",
			{ default: 'generic' }
		],

		// Warn when no return type is specified
		"@typescript-eslint/explicit-module-boundary-types": "warn",

		// disallow certain types not safe
		"@typescript-eslint/ban-types": [
			"error",
			{
				"types": {
					"{}": false
				}
			}
		],
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/consistent-type-definitions": "error",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit"
			}
		],
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				multiline: {
					delimiter: "none",
					requireLast: true
				},
				singleline: {
					delimiter: "comma",
					requireLast: false
				}
			}
		],
		"@typescript-eslint/member-ordering": "error",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-namespace-keyword": "error",

		"@typescript-eslint/triple-slash-reference": "error",
		"@typescript-eslint/type-annotation-spacing": "error",
		"@typescript-eslint/unified-signatures": "error",
		"arrow-body-style": "error",
		"arrow-parens": [
			"error",
			"always"
		],

		camelcase: "error",
		complexity: "off",
		"constructor-super": "error",
		curly: "error",
		"dot-notation": "error",
		"eol-last": "error",
		eqeqeq: [
			"error",
			"smart"
		],
		"guard-for-in": "warn",
		"id-blacklist": [
			"error",
			"any",
			"Number",
			"number",
			"String",
			"string",
			"Boolean",
			"boolean",
			"Undefined"
		],
		"id-match": "error",
		"max-classes-per-file": [
			"error",
			1
		],
		"max-len": [
			"warn",
			{
				code: 200
			}
		],
		"@typescript-eslint/no-inferrable-types": "off",
		"new-parens": "error",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-cond-assign": "error",
		"no-debugger": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-fallthrough": "off",
		"no-invalid-this": "off",
		"no-multiple-empty-lines": "error",
		"no-new-wrappers": "error",
		"no-shadow": [
			"error",
			{
				hoist: "all"
			}
		],
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-underscore-dangle": "error",
		"no-unsafe-finally": "error",
		"no-unused-labels": "error",
		"no-unused-vars": "off",
		"no-var": "error",
		"object-shorthand": "error",
		"one-var": [
			"error",
			"never"
		],
		"prefer-const": "error",
		"quote-props": [
			"error",
			"consistent-as-needed"
		],
		"radix": "error",

		"space-before-function-paren": "off",
		"@typescript-eslint/space-before-function-paren": ["error", {
			asyncArrow: "always",
			anonymous: "never",
			named: "never"
		}],
		"spaced-comment": "error",
		"use-isnan": "error",
		"valid-typeof": "off",

		// some tests from eslint:all
		"no-tabs": "off",
		"padded-blocks": [
			"error",
			{
				"blocks": "never",
				"classes": "always",
				"switches": "never"
			}
		],
		"sort-imports": "off",
		"no-console": "off",
		"function-call-argument-newline": [
			"error",
			"consistent"
		],
		"dot-location": [
			"error",
			"property"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"array-element-newline": [
			"error",
			"consistent"
		],
		"function-paren-newline": [
			"error",
			"consistent"
		],
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": "error",
		"capitalized-comments": "off",
		"multiline-comment-style": "off",
		"no-extra-parens": "off",
		"@typescript-eslint/no-extra-parens": [
			"error",
			"all",
			{ "ignoreJSX": "multi-line" }
		],
		"func-style": [
			"error",
			"declaration",
			{ "allowArrowFunctions": true }
		],
		"no-ternary": "off",
		"multiline-ternary": "off",
		"no-magic-numbers": "off",
		"max-lines-per-function": [
			"warn",
			{
				"skipBlankLines": true,
				"skipComments": true
			}
		],
		"prefer-promise-reject-errors": "warn",
		"object-property-newline": [
			"error",
			{ "allowAllPropertiesOnSameLine": true }
		],
		"no-await-in-loop": "warn",
		"no-undefined": "off",
		"id-length": "warn",
		"class-methods-use-this": "off",
		"array-bracket-newline": [
			"error",
			"consistent"
		],
		"no-confusing-arrow": "off",
		"no-nested-ternary": "off",
		"no-mixed-operators": "off",
		"max-statements": [
			"warn",
			15
		],
		"semi-style": [
			"error",
			"first"
		],
		"no-useless-constructor": "off",
		"@typescript-eslint/no-useless-constructor": "error",
		"lines-between-class-members": "off",
		"@typescript-eslint/lines-between-class-members": "error",
		"max-lines": [
			"warn",
			{
				"max": 500,
				"skipBlankLines": true,
				"skipComments": true
			}
		],
		"no-plusplus": "off",
		"id-length": [
			"warn",
			{ "exceptions": ["_"] }
		],
		"default-param-last": "off",
		// "@typescript-eslint/default-param-last": "error",
		// Temporary OFF
		"@typescript-eslint/default-param-last": "off",
		"no-continue": "off",
		"require-atomic-updates": "off",
		"require-await": "off",
		"prefer-destructuring": "off",
		"max-params": ["warn", 5]
	}
};
