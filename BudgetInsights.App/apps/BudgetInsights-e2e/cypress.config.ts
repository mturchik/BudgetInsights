import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run BudgetInsights:serve:development',
        production: 'nx run BudgetInsights:serve:production',
      },
      ciWebServerCommand: 'nx run BudgetInsights:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
