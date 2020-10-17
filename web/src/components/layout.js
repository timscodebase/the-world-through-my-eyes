import React, {useState} from 'react'
import Header from './header'
import Footer from './footer'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {
  const [colors, setColors] = useState({})
  console.log(colors);
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { colors, setColors });
    }
    return child;
  });
  
  return (
    <>
      <Header colors={colors} siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <div className={styles.content}>{childrenWithProps}</div>
      <Footer colors={colors} siteTitle={siteTitle} />
    </>
  )
}

export default Layout
