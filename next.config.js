/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    }))

    return config
},
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'files.edgestore.dev',
   
    },
  ],
},
}

module.exports = nextConfig
