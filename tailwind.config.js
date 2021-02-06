module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.njk']
  },
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
};
