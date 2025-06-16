# Dous - SafeTemplateParser

A lightweight and flexible JavaScript templating engine designed for seamless string interpolation with custom placeholder syntax. It enables developers to create dynamic templates using a simple, intuitive format, supporting both direct property access and function calls with dynamic arguments.

---

## Installation

```bash
npm install @apcmncs/dous
```

---

## Usage

```js
const { parseTemplate } = require("@apcmncs/dous");

const data = {
	firstname: "Aphichat",
	lastname: "Maneechansuk",
	sum: (a, b) => a + b,
};

const str = "{firstname} {lastname}";
const obj = { sum: "{sum[15, 15]}" };

console.log(parseTemplate(str, data)); // => Aphichat Maneechansuk
console.log(parseTemplate(obj, data)); // => { sum: "30" }
```
