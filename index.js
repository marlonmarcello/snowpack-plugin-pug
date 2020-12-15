const pug = require("pug");
const path = require("path");

module.exports = function plugin(snowpackConfig, pluginOptions) {
  const extendsMaps = new Map();

  return {
    name: "@marlonmarcello/snowpack-plugin-pug",
    resolve: {
      input: [".pug"],
      output: [".html"],
    },
    onChange({ filePath }) {
      const listOfDeps = extendsMaps.get(filePath);

      if (!listOfDeps) return;

      // when a file update, if it's on the list of dependencies
      // mark all its children as changed
      for (let dep of listOfDeps) this.markChanged(dep);
    },
    load: ({ filePath }) => {
      if (!filePath) return;

      if (path.basename(filePath).startsWith("_")) return;

      const { data, ...pugOptions } = pluginOptions;
      const fn = pug.compileFile(filePath, pugOptions || {});
      const deps = fn.dependencies;

      // If a file `extends` another it will show as dependency
      // in that case if the depency updates, we need to update this too
      // this creates a map of dependencies and its children
      if (deps && deps.length > 0) {
        for (let dep of deps) {
          const listOfDeps = extendsMaps.get(dep);

          if (!listOfDeps) extendsMaps.set(dep, [filePath]);
          else if (!listOfDeps.includes(filePath))
            extendsMaps.set(dep, listOfDeps.concat([filePath]));
        }
      }

      const html = fn(data || {});

      return {
        ".html": html,
      };
    },
  };
};
