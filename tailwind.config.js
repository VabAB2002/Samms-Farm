/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Plus Jakarta Sans', 'Georgia', 'serif'],
        display: ['Plus Jakarta Sans', 'Georgia', 'serif'],
        sketchy: ['var(--font-architects-daughter)', 'cursive'],
        farm: ['var(--font-caveat)', 'cursive'],
        alt: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },

      
      colors: {

        gold: {
          50: '#FDF9EF',
          100: '#FCF4DF',
          200: '#F8E9BF',
          300: '#F5DE9F',
          400: '#F1D27F',
          500: '#D9B87E', // Primary gold accent
          600: '#C9A667',
          700: '#B08F4E',
          800: '#8D7238',
          900: '#6A5622'
        },
        sage: {
          50: '#F5F7F4',
          100: '#EBEFE9',
          200: '#D7DFD3',
          300: '#C3CFBD',
          400: '#B9C2B1', // Subtle sage accent
          500: '#A5B19D',
          600: '#8A9A7E',
          700: '#6F7D60',
          800: '#545F42',
          900: '#394124'
        },
        earth: {
          50: '#F8F5F0',
          100: '#F0EBE1',
          200: '#E0D6C2',
          300: '#CFBFA2',
          400: '#BEA983',
          500: '#AD9364',
          600: '#8C7650',
          700: '#6A593C',
          800: '#493C28',
          900: '#271E14'
        },
        brown: {
          50: '#F9F6F3',
          100: '#F2ECE7',
          200: '#E5D9CF',
          300: '#D8C6B7',
          400: '#C8B29E',
          500: '#B99F86',
          600: '#97816B',
          700: '#755E4D',
          800: '#3D2B1F',
          900: '#2C1C12'
        },
        cream: {
          50: '#FDFCFA',
          100: '#F9F6F1',
          200: '#F4EDE3',
          300: '#EFE4D5',
          400: '#E9DAC7',
          500: '#E4D1B9',
          600: '#D6B992',
          700: '#C9A16B',
          800: '#B07F3B',
          900: '#875E27'
        },
        terracotta: {
          50: '#FBF4F1',
          100: '#F6E8E3',
          200: '#EDD2C7',
          300: '#E3BBAA',
          400: '#D9A58E',
          500: '#CF8E72',
          600: '#C47553',
          700: '#A65A3C',
          800: '#7D4429',
          900: '#542C19'
        },
        moss: {
          50: '#F3F5F0',
          100: '#E7EBE0',
          200: '#D0D7C2',
          300: '#B8C3A3',
          400: '#A1AE85',
          500: '#899A66',
          600: '#6E7B52',
          700: '#525C3D',
          800: '#373E29',
          900: '#1B1F14'
        }
      },
      backgroundImage: {
        'grain': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==')",
        'radial-gradient': 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
      },
      boxShadow: {
        'rustic': '0 4px 14px -2px rgba(55, 48, 42, 0.12), 0 2px 6px -1px rgba(55, 48, 42, 0.05)',
        'rustic-lg': '0 10px 25px -3px rgba(55, 48, 42, 0.15), 0 4px 10px -2px rgba(55, 48, 42, 0.08)',
        'inner-rustic': 'inset 0 2px 4px 0 rgba(55, 48, 42, 0.1)',
      },
      borderRadius: {
        'natural': '0.5rem 0.75rem 0.5rem 0.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'grow': 'grow 0.3s ease-out',
        'slowZoom': 'slowZoom 30s ease-out infinite alternate',
      },

      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' }
      },
      fadeInLeft: {
        '0%': { opacity: '0', transform: 'translateX(-20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' }
      },
      slideUp: {
        '0%': { transform: 'translateY(10px)' },
        '100%': { transform: 'translateY(0)' }
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.8' }
      },
      // Add to animation
      'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
      'fade-in-left': 'fadeInLeft 0.6s cubic-bezier(0.0, 0.0, 0.2, 1)',
      'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
      'pulse': 'pulse 3s cubic-bezier(0.4, 0.0, 0.6, 1) infinite',


      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        grow: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}