import './global.css'

import Typography from 'typography'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const typographyTheme = {
  title: 'from 청소하면서 듣는 음악',
  baseFontSize: '18px',
  baseLineHeight: 1.875,
  scaleRatio: 1.3,
  headerFontFamily: ['PT Serif', 'Nanum Myeongjo', 'serif'],
  bodyFontFamily: ['PT Serif', 'Nanum Myeongjo', 'serif'],
  bodyColor: 'var(--textNormal)',
  headerWeight: 800,
  bodyWeight: 700,
  boldWeight: 800,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    body: {
      wordBreak: 'keep-all',
    },
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
      fontWeight: 800,
      '::hober': {
        textDecoration: 'underline',
      },
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'a.bold': {
      color: 'var(--textTitle)',
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
    [MOBILE_MEDIA_QUERY]: {
      body: {
        fontSize: '16px',
      },
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
