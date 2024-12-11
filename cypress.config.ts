// cypress.config.js (compu: http://192.168.1.138/:8102) (duoc: http://10.20.5.128:8102)
// module.exports = {
//   e2e: {
//     baseUrl: 'http://192.168.1.138:8102',
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };
//
import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'rdsobp',
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
  },
});