import React, {createContext, useState} from 'react'

export const ColorContext = createContext(null)

export default ({ children }) => {
  const baseColors = {
    darkMuted: 'rgba(242, 242, 242, 1)',
    darkVibrant: '',
    lightMuted: '',
    lightVibrant: '#202123',
    muted: '',
    vibrant: '',
  }
  const {colors, setColors} = useState(baseColors)

  const store = {colors, setColors}

  return <ColorContext.Provider value={store}>{children}</ColorContext.Provider>
}