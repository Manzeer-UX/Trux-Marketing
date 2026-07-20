import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/env";

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    enabled: true,
    path: "../src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../src/sanity/types.ts",
    overloadClientMethods: true,
  },
});
