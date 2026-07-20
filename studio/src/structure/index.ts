import { DocumentsIcon } from "@sanity/icons/Documents";
import { ImagesIcon } from "@sanity/icons/Images";
import { TagIcon } from "@sanity/icons/Tag";
import { UserIcon } from "@sanity/icons/User";
import type { StructureResolver } from "sanity/structure";

export const SINGLETON_TYPES = ["websiteImages"] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("TRUX Content")
    .items([
      S.listItem()
        .title("Website Images")
        .icon(ImagesIcon)
        .child(
          S.document()
            .schemaType("websiteImages")
            .documentId("websiteImages")
            .title("Website Images"),
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("blogPost")
                .title("Posts")
                .icon(DocumentsIcon),
              S.documentTypeListItem("author")
                .title("Authors")
                .icon(UserIcon),
              S.documentTypeListItem("category")
                .title("Categories")
                .icon(TagIcon),
            ]),
        ),
    ]);
