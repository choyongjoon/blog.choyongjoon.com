import React from 'react'
import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>Not Found</h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/GPitngSI5UQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
      </Layout>
    )
  }
}

export default NotFoundPage
