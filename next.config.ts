const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/aibxkdr2/marketing_insights123/**",
      },
    ],
  },
} satisfies import("next").NextConfig;

export default nextConfig;
