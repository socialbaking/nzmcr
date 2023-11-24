/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.r2.cloudflarestorage.com"
            }
        ]
    }
}

module.exports = nextConfig

typescript: {
    ignoreBuildErrors: true
}