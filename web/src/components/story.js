import React, {useEffect} from 'react'
import {format, distanceInWords, differenceInDays} from 'date-fns'
import styled from 'styled-components'

import {buildImageObj, getTheme} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import AuthorList from './author-list'

import styles from './story.module.css'

const Article = styled.article`
  color: ${props => props.colors.textColor};
  background: ${props => props.colors.backgroundColor};
  
  .mainImage {
    background: ${props => props.colors.backgroundColor};
  }

    h1 {
      color: ${props => props.colors.highlightColor};
    }

  .categories {
    border-top: 1px solid var(--color-very-light-gray);
  }
`

export default function Story ({_rawBody, authors, categories, colors, setColors, title, mainImage, publishedAt}) {
  console.log(colors);

  useEffect(() => {
    setColors(getTheme(categories));
  }, [])

  return (
    <Article colors={colors}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
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
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do, YYYY')}
              </div>
            )}
            {authors && <AuthorList items={authors} title='Authors' />}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
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
