import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript"],
    },
  },
};
export default config;
