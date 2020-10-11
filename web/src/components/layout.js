import React from 'react'
import Header from './header'
import styled from 'styled-components'

import '../styles/layout.css'
import styles from './layout.module.css'
import ColorContext from '../context/colorContext'

const LayoutWrapper = styled.div`
  @import '../styles/custom-media.css';
  @import '../styles/custom-properties.css';

  .content {
    background: var(--color-white);
    min-height: calc(100% - 73px - 120px);

    @media (--media-min-small) {
      min-height: calc(100% - 91px - 155px);
    }
  }

  .footer {
    border-top: 1px solid var(--color-very-light-gray);

    @nest & a {
      color: inherit;
      text-decoration: none;

      @media (hover: hover) {
        @nest &:hover {
          color: var(--color-accent);
        }
      }
    }
  }

  .footerWrapper {
    box-sizing: border-box;
    max-width: 960px;
    padding: 4.5em 1.5em 1.5em;
    margin: 0 auto;

    @media (--media-min-small) {
      padding: 6em 2em 2em;
    }
  }

  .companyAddress {
    text-align: center;
    margin: 0 0 1rem;
  }

  .siteInfo {
    text-align: center;
    font-size: var(--font-small-size);
    line-height: var(--font-small-line-height);
  }
`

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {
  const [colors, setColors] = React.useContext(ColorContext)
  return (
    <>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.siteInfo}>
            &copy; {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
            &amp;
            {` `}
            <a href='https://www.gatsbyjs.org'>Gatsby</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
