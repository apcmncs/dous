# Dous - SafeTemplateParser

Dous is a lightweight and flexible JavaScript templating engine designed for seamless string interpolation with custom placeholder syntax. It enables developers to create dynamic templates using a simple, intuitive format, supporting both direct property access and function calls with dynamic arguments.

---

## Installation

```bash
npm install @apcmncs/dous
```

---

## Usage

```js
const { parseTemplate, parseTemplateObject } = require("../dist/index");

const data = {
	firstname: "Aphichat",
	lastname: "Maneechansuk",
	sum: (a, b) => Number(a) + Number(b),
};

const str = "{firstname} {lastname}";
const obj = { sum: "{sum[15, 15]}" };

console.log(parseTemplate(str, data)); // => Aphichat Maneechansuk
console.log(parseTemplateObject(obj, data)); // => { sum: "30" }
```
