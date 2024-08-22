import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['designTokens/tokens.json'],
  preprocessors: ['tokens-studio'], 
  platforms: {
    css: {
      transformGroup: 'tokens-studio', 
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
	log: {
    warnings: 'warn', // 'warn' | 'error' | 'disabled'
    verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
    errors: {
      brokenReferences: 'throw', // 'throw' | 'console'
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();