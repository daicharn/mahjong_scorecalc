import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isProd ? '/product/mahjongScoreCalc' : '',
  assetPrefix: isProd ? '/product/mahjongScoreCalc' : '',
  
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
