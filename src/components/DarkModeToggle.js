import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Switch from 'react-switch'

export default class DarkModeToggle extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label style={{ marginTop: '3px', display: 'block' }}>
            <Switch
              onChange={checked => toggleTheme(checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
              height={20}
              width={32}
              onColor="#ffffff"
              offColor="#282c34"
              onHandleColor="#abb2bf"
              offHandleColor="#abb2bf"
              checkedIcon={false}
              uncheckedIcon={false}
            />
          </label>
        )}
      </ThemeToggler>
    )
  }
}
