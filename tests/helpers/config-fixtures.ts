import { test as base } from '@playwright/test';

export type EnvConfig = {
  envName: string;
  appUrl:string;
  dbConfig:{};
  apiUrl:string;
};

export const test = base.extend<EnvConfig>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  envName: ["test", { option: true }],
  appUrl: ["<provide url>", { option: true }],
  dbConfig: [{}, { option: true }],
  apiUrl: ["<provide url>", { option: true }],

});