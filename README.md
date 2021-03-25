# @marlonmarcello/snowpack-plugin-pug

This plugin adds support for the [Pug](https://pugjs.org/) template engine to [Snowpack](https://www.snowpack.dev/).

### Install

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

You can pass all default [Pug options](https://pugjs.org/api/reference.html#options) plus:

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

### create-snowpack-app
If you've used `create-snowpack-app` to bootstrap your project you might have a `src/` and a `public/` directory.  
By default, the `/public` directory is set up as static, so Pug files there won't be compiled to HTML files.  
The solution is to change the `/public` directory to **not** be static in `snowpack.config.js`. Then Pug files will get compiled.
```js
mount: {
  public: { url: '/', static: false },
  src: { url: '/dist' },
}
```
