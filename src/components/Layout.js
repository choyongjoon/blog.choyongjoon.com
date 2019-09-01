import React from 'react'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'

import DarkModeToggle from './DarkModeToggle'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            fontFamily: 'Gothic A1, sans-serif',
            fontWeight: 800,
            fontSize: '1rem',
            marginTop: 0,
            marginBottom: rhythm(1.5),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'black',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h4
          style={{
            fontFamily: 'Gothic A1, sans-serif',
            fontWeight: 800,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'black',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h4>
      )
    }
    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.3s ease-out, background 0.3s ease-out',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <div style={{ float: 'right' }}>
            <DarkModeToggle />
          </div>
          {header}
          {children}
        </div>
      </div>
    )
  }
}

export default Layout
