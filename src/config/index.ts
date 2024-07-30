export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    is_public_key: process.env.IS_PUBLIC_KEY,
  },
});
