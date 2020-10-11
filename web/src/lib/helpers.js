import {format, isFuture} from 'date-fns'
import {usePalette} from 'react-palette'

export function getColorsFromMainImage(slug, url) {
  return usePalette(`${url}/img/${slug}.jpg`)
}

export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes (data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs ({slug}) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture ({publishedAt}) {
  return !isFuture(publishedAt)
}

export function getBlogUrl (publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`
}

export function getStoryUrl (publishedAt, slug) {
  return `/stories/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`
}

export function buildImageObj (source = {asset: {}}) {
  const imageObj = {
    asset: {_ref: source.asset._ref || source.asset._id}
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function buildImageUrl(imageObj) {
  const rawImage = imageObj.asset._id
  const newImage = rawImage.replace('image-', '')
  const image = newImage.replace('-jpg', '.jpg')
  return `https://cdn.sanity.io/images/obcamsw6/content/${image}?rect=0,0,850,478&w=1200&h=675&fit=crop&auto=format`
}

export function toPlainText (blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
