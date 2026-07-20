import { FAQS_QUERY } from "./lib/queries";
import { schema } from "./schemaTypes";

interface TestSchemaField {
  name: string;
  options?: {
    list?: Array<{ title: string; value: string }>;
  };
}

interface TestDocumentSchema {
  name: string;
  type: string;
  fields: TestSchemaField[];
}

it("registers a Sanity FAQ document type with required page targeting", () => {
  const faqType = schema.types.find((type) => type.name === "faq") as
    TestDocumentSchema | undefined;

  expect(faqType).toBeDefined();
  expect(faqType?.type).toBe("document");

  const fields = faqType?.fields ?? [];
  expect(fields.map((field) => field.name)).toEqual([
    "question",
    "answer",
    "order",
    "pageType",
  ]);

  const pageTypeField = fields.find((field) => field.name === "pageType");
  expect(pageTypeField?.options?.list).toEqual([
    { title: "Lot Owners", value: "lot-owners" },
    { title: "Drivers", value: "drivers" },
  ]);
});

it("defines a typed FAQ query scoped by page type and ordered for display", () => {
  expect(FAQS_QUERY).toContain('_type == "faq"');
  expect(FAQS_QUERY).toContain("pageType == $pageType");
  expect(FAQS_QUERY).toContain(
    "order(coalesce(order, 9999) asc, _createdAt asc)",
  );
  expect(FAQS_QUERY).toContain("question");
  expect(FAQS_QUERY).toContain("answer");
});
