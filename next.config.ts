import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            { source: "/index.php", destination: "/", permanent: true },
            { source: "/about-us.php", destination: "/about", permanent: true },
            { source: "/about.php", destination: "/about", permanent: true },
            { source: "/service.php", destination: "/services", permanent: true },
            { source: "/services.php", destination: "/services", permanent: true },
            { source: "/product.php", destination: "/products", permanent: true },
            { source: "/products.php", destination: "/products", permanent: true },
            { source: "/contact.php", destination: "/contact", permanent: true },
        ];
    },
};

export default nextConfig;
