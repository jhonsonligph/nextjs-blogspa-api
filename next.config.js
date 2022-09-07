/** @type {import('next').NextConfig} */
const env = {
  GRAPHQL_SERVER: "http://10.211.55.4:4000/",
}

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  env
}

module.exports = nextConfig
