/** @type {import('next').NextConfig} */
const env = {
  GRAPHQL_SERVER: "http://10.211.55.4:4000/",
  no_image: "https://dummyimage.com/1280x720/d6d6d6/fff.jpg&text=No+Image",
}

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  env
}

module.exports = nextConfig
