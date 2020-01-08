import * as React from 'react'
import { Subtract } from 'utility-types'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../apollo/withApollo'

interface ApolloProps {
  client: any
}

const withContext = withApollo(
  <T extends ApolloProps>(Component: React.ComponentType<T>) => {
    return class extends React.Component<Subtract<T, {}>> {
      constructor(props) {
        super(props)
        this.state = {}
      }

      async componentDidMount() {
        const things = ['hel']
        this.setState({ things })
      }

      render() {
        const { client } = this.props
        return <Component {...(this.props as T)} session={this.state} />
      }
    }
  }
)

export default withContext
