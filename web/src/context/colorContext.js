import React from 'react'

export const ColorContext = React.createContext(null)

export default ({ children }) => {
  const baseColor = {
    darkMuted: 'rgba(242, 242, 242, 1)',
    darkVibrant: '',
    lightMuted: '',
    lightVibrant: '#202123',
    muted: '',
    vibrant: '',
  }
  const [colors, setColors] = React.useState(baseColor)

  const store = {colors, setColors}

  return <ColorContext.Provider value={store}>{children}</ColorContext.Provider>
}