import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/env";
import { schemaTypes } from "./src/schemaTypes";
import { structure } from "./src/structure";

export default defineConfig({
  name: "default",
  title: "TRUX Marketing",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
