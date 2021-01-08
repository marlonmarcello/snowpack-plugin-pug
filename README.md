# @marlonmarcello/snowpack-plugin-pug

This plugin adds support for the [Pug](https://pugjs.org/) template engine to Snowpack.

### Install

Add a file named `.npmrc` to the root of your project, same level as `package.json`.
To that file, add the following:

```
@marlonmarcello:registry=https://npm.pkg.github.com
```

And then install with npm:

```
npm install --save-dev @marlonmarcello/snowpack-plugin-pug
```

### Usage

Add `@marlonmarcello/snowpack-plugin-pug` to your [Snowpack config file](https://www.snowpack.dev/reference/configuration):

```json
{
  "plugins": ["@marlonmarcello/snowpack-plugin-pug"]
}
```

### Options

You can pass all default [Pug Options](https://pugjs.org/api/reference.html#options) plus:

- `data: object` - Any data that you would like available globaly to templates

### Example

```json
{
  "plugins": [
    [
      "@marlonmarcello/snowpack-plugin-pug",
      {
        "data": {
          "meta": {
            "title": "My website"
          }
        }
      }
    ]
  ]
}
```

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title!=meta.title
  body
    //- template
```
