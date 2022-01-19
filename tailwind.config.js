module.exports = {
  // mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      'sx': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        error: '#b73232',
        success: '#52a552',
        highlight: '#f5a400',
        dark: {
          primary: '#1E1E1E',
          secondary: '#191919',
          tertiary: '#121212',
          quaternary: '#313131',
          quinary: '#393939',
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#EAEAEA',
          tertiary: '#DCDCDC',
          quaternary: '#CECECE',
          quinary: '#c0c0c0',
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
