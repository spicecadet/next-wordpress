// Hack - because .env files don't seem to be added to process.env sometimes....
process.env['WORDPRESS_API_URL'] = 'http://nextjs-headless-wp.local/graphql';
console.log(process.env);

if (!URL.canParse(process.env.WORDPRESS_API_URL)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(
  process.env.WORDPRESS_API_URL,
);

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: 'http',
        hostname: '1.gravatar.com',
      }
    ],
  },
};
