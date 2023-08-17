/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
          {
            source : '/api/:path*',
            destination : 'https://webbackend.cdsc.com.np/api/:path*',
          },
        ]
      },

    

}

module.exports = nextConfig
