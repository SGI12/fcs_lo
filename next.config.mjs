/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    redirects() {
        return [{
            source: '/',
            destination: '/home',
            permanent: true,
        }];
    }

};

export default nextConfig;
