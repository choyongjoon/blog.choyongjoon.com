import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
// import Signup from '../components/Signup'
import { rhythm, scale } from '../utils/typography'

// const GITHUB_USERNAME = 'choyongjoon'
// const GITHUB_REPO_NAME = 'blog.choyongjoon.com'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next, slug } = this.props.pageContext
    // const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${slug.replace(
    //   /\//g,
    //   ''
    // )}.md`
    // const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    //   `https://choyongjoon.com${slug}`
    // )}`
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={`${post.frontmatter.title} - ${siteTitle}`}
          description={post.frontmatter.spoiler}
          image={
            post.frontmatter.thumbnail &&
            post.frontmatter.thumbnail.childImageSharp.resolutions.src
          }
          slug={post.fields.slug}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          <small>{post.frontmatter.date}</small>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {/* <p>
          <a href={discussUrl} target="_blank" rel="noopener noreferrer">
            트위터로
          </a>
        </p> */}
        {/* <div style={{ margin: '90px 0 40px 0' }}>
          <Signup />
        </div> */}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY. M. D.")
        spoiler
        thumbnail {
          childImageSharp {
            resolutions(width: 600) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
