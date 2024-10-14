/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    fontSize: {
      'heading-1': ['64px', '80px'],
      'heading-2': ['48px', '56px'],
      'heading-3': ['32px', '40px'],
      'heading-4': ['24px', '32px'],
      'heading-5': ['20px', '24px'],
      'heading-6': ['16px', '24px'],
      'body-large': ['20px', '32px'],
      'body-regular': ['16px', '24px'],
      'body-small': ['14px', '24px'],
      'body-xs': ['12px', '24px'],
      caption: ['14px', '16px'],
    },
    extend: {
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

