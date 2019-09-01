import './global.css'

import Typography from 'typography'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const typographyTheme = {
  title: 'from 청소하면서 듣는 음악',
  baseFontSize: '18px',
  baseLineHeight: 1.625,
  scaleRatio: 1.3,
  headerFontFamily: ['Crimson+Text', 'Nanum Myeongjo', 'serif'],
  bodyFontFamily: ['Crimson+Text', 'Nanum Myeongjo', 'serif'],
  bodyColor: 'var(--textNormal)',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    blockquote: {
      ...scale(1 / 5),
      fontStyle: 'italic',
      paddingLeft: rhythm(1),
      marginLeft: rhythm(-1),
      marginRight: 0,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    ul: {
      listStyle: 'square',
      marginLeft: rhythm(0.6),
    },
    [MOBILE_MEDIA_QUERY]: {
      'ul,ol': {
        marginLeft: rhythm(1),
      },
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(1.6),
      marginBottom: rhythm(0.342),
      lineHeight: 1.625,
      wordBreak: 'keep-all',
    },
    h6: {
      fontStyle: 'italic',
    },
    a: {
      textDecoration: 'none',
      color: 'var(--a)',
      fontWeight: 'bold',
      '::hober': {
        textDecoration: 'underline',
      },
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'mark,ins': {
      background: '#007acc',
      color: 'white',
      padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
      textDecoration: 'none',
    },
    hr: {
      background: 'var(--textNormal)',
    },
    'td,th': {
      borderBottom: '1px solid var(--textNormal)',
    },
  }),
}

const typography = new Typography(typographyTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
