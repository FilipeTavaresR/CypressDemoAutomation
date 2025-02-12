const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.automationtesting.in",
    chromeWebSecurity: false, // Evita problemas de CORS e permite cookies de terceiros
    experimentalSessionAndOrigin: true, // Mantém sessões e cookies corretamente
    experimentalModifyObstructiveThirdPartyCode: true,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});
