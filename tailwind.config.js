const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-17': '#171717',
        'black-25': '#2B2B2B',
        'black-28': '#282828',
        'black-140': '#92008C',
        'gray-42': '#2A2A2A',
        'gray-57': '#575757',
        'gray-78': '#787878',
        'gray-90': '#919090',
        'gray-130': '#ACACAC',
        'gray-180': '#BCBCBC',
        'red-255': '#FF6363',
        'purple-500': "#E789FF",
        'gray-a5': '#A5A5A5'
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
        'radial-gradient-1': 'radial-gradient(50% 50% at 50% 50%, #A2A2A2 0%, rgba(162, 162, 162, 0.50) 100%)'
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
          primary: '#C4F360',
          'co-gray': {
            1: '#333333',
            2: '#666666',
            3: '#999999',
            4: '#EDEDED',
            5: '#F9FAFB',
            6: '#FFFFFF',
            7: '#A5A5A5'
          },
          'co-purple': {
            1: '#4E46DC',
            2: '#716BE3',
            3: '#F0EDFD',
            4: '#F5F4FA',
            5: '#F5F4FA',
          },
          'co-green': '#01C521',
          'co-light-green': '#93E7A1',
          'co-alert': '#EC5C5C',
          'co-tag': {
            'bg-1': '#183E38',
            'text-1': '#85D3C3',
            'bg-2': '#6F281E',
            'text-2': '#FF8E8E',
            'bg-3': '#4D3C28',
            'text-3': '#FDA948',
            'bg-4': '#EDFAF2',
            'text-4': '#007012',
            'bg-5': '#FEF7ED',
            'text-5': '#FDA948',
          },
          'co-card': {
            title: '#4E46DC',
          },

          'co-primary': '#C4F360',
          'co-primary-opacity-60': '#99C4F360',
          'co-text': {
            1: '#FFFFFF',
            2: '#9D9E9D',
            3: '#DBDBDB',
            4: '#C4F360',
            5: 'rgba(255,255,255, 0.6)',
            6: '#F3C160',
            7: '#7C7C7C',
            error: '#FF3838',
            shadow: '#161471',
            black: '#000000',
            success: '#0FB277',
            gray: '#BCBCBC',
          },
          'co-bg': {
            1: '#0B0C09',
            2: '#191A16',
            3: '#1E1E1E',
            black: '#000000',
            white: '#FFFFFF'
          },
          'co-button': {
            'primary-bg': '#C4F360',
            'primary-text': '#FFFFFF',
            'default-bg': '#FFFFFF',
            'default-border': '#EDEDED',
            'default-text': '#333333',
            'ghost-text': '#C4F360',
            'ghost-border': '#C4F360',
            'dark-bg': '#0B0C09',
            'dark-text': '#FFFFFF',
            'light-bg': 'transparent',
            'light-text': '#FFFFFF',
            'gradient-to': '#12FEE2',
            'gradient-from': '#FE37F1',
          },
          'co-border': {
            1: '#A2A2A2',
            gray: '#787878'
          },
          'co-bg-gradient-to': '#57F1BC',
          'co-bg-gradient-from': '#C4F360'
        }
      },
      dark: {
        colors: {
          'co-bg': {
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
            7: '#A5A5A5'
          },
          'co-purple': {
            1: '#4E46DC',
            2: '#716BE3',
            3: '#9A96EB',
            4: '#F0EDFD',
            5: '#3F3D54',
          },
          'co-green': '#01C521',
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
        }
      }
    }
  })],
}
