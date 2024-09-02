// next.config.js
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP: process.env.NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP,
  },
};
