import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import styled from 'styled-components'

import {buildImageObj, getColorsFromMainImage} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import AuthorList from './author-list'

const Article = styled.article`
  color: ${props => props.colors.foregroundColor};
  background: ${props => props.colors.backgroundColor};
  
  .mainImage {
    display: block;
    position: relative;
    background: ${props => props.colors.backgroundColor};
    padding-bottom: calc(9 / 16 * 100%);

    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      vertical-align: top;
      object-fit: cover;
    }
  }

  .grid {
    @media (--media-min-medium) {
      display: grid;
      grid-template-columns: 1fr;
      grid-column-gap: 2em;
      grid-template-columns: 3fr 1fr;
    }
  }

  .mainContent {
    a {
      color: var(--color-accent);

      @media (hover: hover) {
        &:hover {
          color: inherit;
        }
      }
    }

    h2, h3, h4, h5, h6 {
      font-weight: 600;
    }

    figure {
      margin: 0;
      padding: 0;

      img {
        max-width: 100%;
      }
    }
  }

  .metaContent {
  }

  .publishedAt {
    composes: small from './typography.module.css';
    margin: 2rem 0 3rem;
    color: var(--color-gray);
  }

  .categories {
    border-top: 1px solid var(--color-very-light-gray);
    margin: 2rem 0 3rem;

    ul {
      list-style: none;
      margin: 0.75rem 0;
      padding: 0;
    }

    ul li {
      padding: 0.25rem 0;
    }
  }

  .categoriesHeadline {
    composes: base from './typography.module.css';
    margin: 0.5rem 0 0;
  }
`

export default function Story ({_rawBody, authors, categories, title, slug, mainImage, publishedAt}) {
  const url = typeof window !== 'undefined' ? window.location.origin : ''
  const colorsFromMainImage = getColorsFromMainImage(slug.current, url)
  return (
    <Article colors={colorsFromMainImage}>
      {mainImage && mainImage.asset && (
        <div className='mainImage'>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className='grid'>
          <div className='mainContent'>
            <h1 className='title'>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
          <aside className='metaContent'>
            {publishedAt && (
              <div className='publishedAt'>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do, YYYY')}
              </div>
            )}
            {authors && <AuthorList items={authors} title='Authors' />}
            {categories && (
              <div className='categories'>
                <h3 className='categoriesHeadline'>Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </Article>
  )
}
