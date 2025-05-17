/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        table(data) {
          console.table(data);
          return null;
        }
      });
    },
    baseUrl: "http://localhost:5173",
  },
});
