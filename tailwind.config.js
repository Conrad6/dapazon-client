/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/!(*.stories|*.spec).{ts,html}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

