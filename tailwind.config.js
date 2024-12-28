const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-15': '#151515',
        'black-17': '#171717',
        'black-19': '#191919',
        'black-20': '#1a1a1a',
        'black-25': '#2B2B2B',
        'black-28': '#282828',
        'black-140': '#92008C',
        'gray-42': '#2A2A2A',
        'gray-57': '#575757',
        'gray-666': '#666666',
        'gray-78': '#787878',
        'gray-90': '#919090',
        'gray-130': '#ACACAC',
        'gray-150': '#A7A7A7',
        'gray-180': '#BCBCBC',
        'red-255': '#FF6363',
        'purple-500': "#E789FF",
        "gray-32": "#323232"
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        poppins: ['var(--font-poppins)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        pressStart2P: ['var(--font-press-start-2p)', 'ui-sans-serif', 'system-ui'],
        chakraPetch: ['var(--font-chakra-petch)', 'ui-sans-serif', 'system-ui'],
      },
      maxHeight: {
        'edit-preview': 'calc(100vh - 180px)'
      },
      backgroundImage: {
        'gradient-text-1': 'linear-gradient(to bottom, #E789FF, #9299FF)',
        'gradient-home-text-1': 'linear-gradient(180deg, #E789FF 0%, #9299FF 100%)',
        'gradient-home-bg-1': 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 27.52%, #000 100%)',
        'gradient-button-1': 'linear-gradient(180deg, #E789FF 0%, #9299FF 100%)',
        'gradient-home-section-1': 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 27.52%, #000 100%)',
        'radial-gradient-1': 'radial-gradient(50% 50% at 50% 50%, #A2A2A2 0%, rgba(162, 162, 162, 0.50) 100%)',
        'gradient-rewards-history': 'linear-gradient(180deg, #FFF, #939393)',
      },
      fontWeight: {
        light: '200',
        normal: '300',
        medium: '400',
        semibold: '500',
        bold: '600',
        'extra-bold': '700',
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          'gray-a5': '#666',
          'co-bg': {
            default: '#FFFFFF',
            1: '#FFFFFF',
            2: '#333333',
          },
          'co-gray': {
            1: '#EDEDED',
            2: '#999999',
            3: '#666666',
            4: '#474747',
            5: '#333333',
            6: '#212121',
            7: '#666666',
            8: '#3A3A3A'
          },
          'co-purple': {
            1: '#4E46DC',
            2: '#716BE3',
            3: '#9A96EB',
            4: '#F0EDFD',
            5: '#3F3D54',
          },
          'co-green': {
            1: '#01C521',
            2: '#71FF81',
            3: '#34D399',
            4: '#047857',
            5: '#D1FAE5'
          },
          'co-light-green': '#00550E',
          'co-alert': '#EC5C5C',
          'co-tag': {
            'bg-1': '#183E38',
            'text-1': '#85D3C3',
            'bg-2': '#6F281E',
            'text-2': '#FF8E8E',
            'bg-3': '#4D3C28',
            'text-3': '#FDA948',
            'bg-4': '#183E38',
            'text-4': '#85D3C3',
            'bg-5': '#4D3C28',
            'text-5': '#FDA948',
          },
          'co-button': {
            'primary-bg': '#4E46DC',
            'primary-text': '#FFFFFF',
            'default-bg': 'transparent',
            'default-border': '#474747',
            'default-text': '#E4E4E4',
            'ghost-text': '#716BE3',
          },
          'co-card': {
            title: '#9A96EB',
          },
          'co-text-primary': '#000000',
          'co-text-secondary': '#ffffff',
        }
      },
      dark: {
        colors: {
          'gray-a5': '#A5A5A5',
          'co-bg': {
            default: '#000000',
            1: '#1E1E1E',
            2: '#333333',
          },
          'co-gray': {
            1: '#EDEDED',
            2: '#999999',
            3: '#666666',
            4: '#474747',
            5: '#333333',
            6: '#212121',
            7: '#A5A5A5',
            8: '#3A3A3A'
          },
          'co-purple': {
            1: '#4E46DC',
            2: '#716BE3',
            3: '#9A96EB',
            4: '#F0EDFD',
            5: '#3F3D54',
          },
          'co-green': {
            1: '#01C521',
            2: '#71FF81',
            3: '#34D399',
            4: '#047857',
            5: '#D1FAE5'
          },
          'co-light-green': '#00550E',
          'co-alert': '#EC5C5C',
          'co-tag': {
            'bg-1': '#183E38',
            'text-1': '#85D3C3',
            'bg-2': '#6F281E',
            'text-2': '#FF8E8E',
            'bg-3': '#4D3C28',
            'text-3': '#FDA948',
            'bg-4': '#183E38',
            'text-4': '#85D3C3',
            'bg-5': '#4D3C28',
            'text-5': '#FDA948',
          },
          'co-button': {
            'primary-bg': '#4E46DC',
            'primary-text': '#FFFFFF',
            'default-bg': 'transparent',
            'default-border': '#474747',
            'default-text': '#E4E4E4',
            'ghost-text': '#716BE3',
          },
          'co-card': {
            title: '#9A96EB',
          },
          'co-text-primary': '#ffffff',
          'co-text-secondary': '#000000',
        }
      }
    }
  })],
}
