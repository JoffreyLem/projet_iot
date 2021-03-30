import React, { Component } from 'react'
import RowData from './RowData'

import logo from './logo.svg'
import io from 'socket.io-client'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      temp:null,
      hum:null,
    }

    this.socket = io.connect('http://localhost:8080')
    this.updateHum = this.updateHum.bind(this)
    this.updateTemp= this.updateTemp.bind(this)
    this.createId = this.createId.bind(this)
  }

  createId () {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  componentDidMount () {
    this.socket.on('temp', (received) => {
      this.updateTemp(received)
    })

    this.socket.on('hum', (received) => {
      this.updateHum(received)
    })
  }

  componentWillUnmount () {
    this.socket.close()
  }

  updateHum (received) {
    console.log("hum", received);
    this.setState(
      (prevState, props) => ({ hum: received })
    )
  }

  updateTemp(received){
    console.log("temp", received);
    this.setState(
      (prevState, props) => ({ temp: received })
    )
  }

  render () {

    return (
      <div className='container'>
        <div className='mt-3 text-center'>
          <img src={logo} className='logo' alt='logo' />
        </div>
        <span className='spacer' />
        <div className='row'>
          <RowData data={this.state}/>
        </div>
      </div>
    )
  }
}

export default App
