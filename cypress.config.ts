import { defineConfig } from "cypress";
import * as fs from "fs";
import * as path from "path";

export default defineConfig({
  video: false,
  e2e: {
    supportFile: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on) {
      on("task", {
        // Imprime no terminal (console) onde o Cypress está rodando
        log(message: string) {
          console.log(message);
          return null;
        },
        // Salva o resultado em arquivo dentro de /resultados
        saveFile({ name, content }: { name: string; content: string }) {
          const dir = path.join(__dirname, "resultados");
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, name), content, "utf-8");
          return null;
        },
      });
    },
  },
});
