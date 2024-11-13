import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

const sd = new StyleDictionary({
  // make sure to have source match your token files!
  // be careful about accidentally matching your package.json or similar files that are not tokens
  source: [
    "designTokens/GlobalToken.json",
    "designTokens/Light.json",
    "designTokens/Dark.json",
  ],

  preprocessors: ["tokens-studio"], // <-- since 0.16.0 this must be explicit
  expand: {
    typesMap: "expandTypesMap",
  },
  platforms: {
    css: {
      transformGroup: "tokens-studio", // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ["name/kebab"], // <-- add a token name transform for generating token names, default is camel
      buildPath: "src/app/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            // Look here 👇
            outputReferences: true,
          },
        },
      ],
    },
  },
  log: {
    verbosity: "verbose",
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
