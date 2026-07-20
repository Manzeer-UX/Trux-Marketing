import { defineQuery } from "next-sanity";

const MANAGED_IMAGE_PROJECTION = /* groq */ `
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height }
      }
    },
    crop,
    hotspot
  },
  alt,
  caption
`;

const DECORATIVE_IMAGE_PROJECTION = /* groq */ `
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height }
      }
    },
    crop,
    hotspot
  },
  description
`;

const BRAND_PROJECTION = /* groq */ `
  brand {
    headerLogo { ${MANAGED_IMAGE_PROJECTION} },
    footerLogo { ${MANAGED_IMAGE_PROJECTION} },
    facebookIcon { ${DECORATIVE_IMAGE_PROJECTION} },
    linkedInIcon { ${DECORATIVE_IMAGE_PROJECTION} },
    instagramIcon { ${DECORATIVE_IMAGE_PROJECTION} }
  }
`;

export const BLOG_POSTS_QUERY = defineQuery(/* groq */ `
  *[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ]
  | order(publishedAt desc, _id asc)[$start...$end] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category->{
      title,
      "slug": slug.current
    },
    coverImage { ${MANAGED_IMAGE_PROJECTION} }
  }
`);

export const BLOG_POSTS_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ])
`);

export const BLOG_POST_QUERY = defineQuery(/* groq */ `
  *[
    _type == "blogPost" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category->{
      title,
      "slug": slug.current
    },
    author->{
      name,
      "slug": slug.current,
      role,
      image { ${MANAGED_IMAGE_PROJECTION} }
    },
    coverImage { ${MANAGED_IMAGE_PROJECTION} },
    body[]{
      ...,
      _type == "articleImage" => {
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions { width, height }
            }
          },
          crop,
          hotspot
        },
        alt,
        caption
      }
    },
    seo {
      title,
      description,
      image { ${MANAGED_IMAGE_PROJECTION} }
    }
  }
`);

export const BLOG_METADATA_QUERY = defineQuery(/* groq */ `
  *[
    _type == "blogPost" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    title,
    excerpt,
    seo {
      title,
      description,
      image { ${MANAGED_IMAGE_PROJECTION} }
    }
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(/* groq */ `
  *[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ]
  | order(_id asc) {
    "slug": slug.current
  }
`);

export const GLOBAL_WEBSITE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION}
  }
`);

export const HOME_PAGE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION},
    home {
      coverageMap { ${MANAGED_IMAGE_PROJECTION} },
      phoneApp { ${MANAGED_IMAGE_PROJECTION} },
      secureFeatureIcon { ${DECORATIVE_IMAGE_PROJECTION} },
      easyFeatureIcon { ${DECORATIVE_IMAGE_PROJECTION} },
      availabilityFeatureIcon { ${DECORATIVE_IMAGE_PROJECTION} },
      serviceFeatureIcon { ${DECORATIVE_IMAGE_PROJECTION} }
    }
  }
`);

export const ABOUT_PAGE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION},
    about {
      heroImage { ${MANAGED_IMAGE_PROJECTION} },
      teamDecoration { ${DECORATIVE_IMAGE_PROJECTION} }
    }
  }
`);

export const PARTNERS_PAGE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION},
    partners {
      heroImage { ${MANAGED_IMAGE_PROJECTION} },
      otrImage { ${MANAGED_IMAGE_PROJECTION} },
      marqueeImage { ${MANAGED_IMAGE_PROJECTION} },
      esImage { ${MANAGED_IMAGE_PROJECTION} }
    }
  }
`);

export const LOT_OWNERS_PAGE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION},
    lotOwners {
      revenueIcon { ${DECORATIVE_IMAGE_PROJECTION} },
      staffingIcon { ${DECORATIVE_IMAGE_PROJECTION} },
      paymentsIcon { ${DECORATIVE_IMAGE_PROJECTION} },
      tenantsIcon { ${DECORATIVE_IMAGE_PROJECTION} }
    }
  }
`);

export const LOCATIONS_PAGE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION},
    locations {
      primaryPhoto { ${MANAGED_IMAGE_PROJECTION} },
      gallery[]{
        _key,
        ${MANAGED_IMAGE_PROJECTION}
      }
    }
  }
`);

export const BLOG_PAGE_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_id == "websiteImages"][0] {
    ${BRAND_PROJECTION},
    blogDefaults {
      emptyStateImage { ${MANAGED_IMAGE_PROJECTION} }
    }
  }
`);
