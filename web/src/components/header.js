import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Icon from './icon'
import {cn} from '../lib/helpers'

import styles from './header.module.css'
import '../styles/custom-media.css';
import '../styles/custom-properties.css';

const Wrapper = styled.div`
  color: ${props => props.colors.textColor};
  background: ${props => props.colors.backgroundColor};

  .wrapper {
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 960px;
    padding: 1em;
    display: flex;

    @media (min-width: 450px) {
      padding: 1.5em 1.5em;
    }
  }

  .branding {
    font-weight: 600;
    flex: 1;

    a {
      display: inline-block;
      padding: 0.5em;
      color: inherit;
      text-decoration: none;

      @media (hover: hover) {
        :hover {
          color: var(--color-accent);
        }
      }
    }
  }

  .toggleNavButton {
    appearance: none;
    font-size: 25px;
    border: none;
    background: none;
    margin: 0;
    padding: calc(14 / 17 / 2 * 1rem);
    outline: none;
    color: inherit;

    & svg {
      display: block;
      fill: inherit;
    }

    @media (min-width: 450px) {
      display: none;
    }
  }

  .nav {
    display: none;

    ul {
      margin: 0;
      padding: 1rem;
      background: ${props => props.colors.backgroundColor};
      position: absolute;
      top: 72px;
      right: 0px;
    }

    ul li {
      list-style: none;
    }

    ul li a {
      display: block;
      color: inherit;
      text-decoration: none;
    }

    @media (hover: hover) {
      ul li a:hover {
        color: var(--color-accent);
      }
    }

    @media (min-width: 450px) {
      position: absolute;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      left: 0;
      right: 0;
      top: -4rem;

      ul {
        padding: 1rem 0;
      }

      ul li a {
        padding: 0.5rem 1.5rem;
      }
    }

    @media (min-width: 450px) {
      display: block;

      ul {
        list-style: none;
        display: flex;
        justify-content: flex-end;
      }

      ul li a {
        padding: 0.5rem;
      }
    }
  }

  .showNav {
    display: block;
  }
`

const Header = ({colors, onHideNav, onShowNav, showNav, siteTitle}) => (
  
    <div className={styles.root}>
      <Wrapper colors={colors}>
        <div className="wrapper">
        <div className="branding">
          <Link to='/'>{siteTitle}</Link>
        </div>

        <button className="toggleNavButton" onClick={showNav ? onHideNav : onShowNav}>
          <Icon symbol='hamburger' />
        </button>

        <nav className={cn(`nav`, showNav && `showNav`)}>
          <ul>
            <li>
              <Link to='/archive/'>Archive</Link>
            </li>
          </ul>
        </nav>
        </div>
      </Wrapper>
    </div>
)

export default Header
