import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  color: ${props => props.colors.textColor};
  background: ${props => props.colors.backgroundColor};
  border-top: 1px solid var(--color-very-light-gray);

  a {
    color: inherit;
    text-decoration: none;

    :hover {
      color: var(--color-accent);
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

.siteInfo {
  text-align: center;
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
}
`

export default function Footer({colors}) {
  console.log(colors);
  return (
    <StyledFooter colors={colors.data}>
      <div className="footerWrapper">
        <div className="siteInfo">
          &copy; {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
          &amp;
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
      </div>
    </StyledFooter>
  )
}