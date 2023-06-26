import { Component } from 'react'

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      this.props.children
    )
  }
}

export default App
