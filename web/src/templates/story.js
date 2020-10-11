import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Story from '../components/story'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {toPlainText} from '../lib/helpers'

export const query = graphql`
  query StoryTemplateQuery($id: String!) {
    story: sanityStory(id: {eq: $id}) {
      id
      publishedAt
      categories {
        _id
        title
      }
      mainImage {
        ...SanityImage
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: {maxDepth: 5})
      _rawBody(resolveReferences: {maxDepth: 5})
      authors {
        _key
        author {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
        }
      }
    }
  }
`

const StoryTemplate = props => {
  const {data, errors} = props
  const story = data && data.story
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {story && <SEO title={story.title || 'Untitled'} description={toPlainText(story._rawExcerpt)} image={story.mainImage} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {story && <Story {...story} />}
    </Layout>
  )
}

export default StoryTemplate;
