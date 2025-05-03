import type { StorybookConfig } from '@storybook/nextjs';
import type { Configuration } from 'webpack';
import path from 'path'; // Import path for resolving alias
import webpack from 'webpack'; // Import webpack

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [{ from: '../public', to: '/' }],

  webpackFinal: async (config: Configuration) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
        // Remove the 'node:' prefix
        resource.request = resource.request.replace(/^node:/, '');
      })
    );

    // Keep the fallback just in case, but the plugin should handle the primary issue
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
};
export default config;
