import React from 'react'
import Imtoken from './Imtoken'
import {Toast, Button} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'

export default class Routes extends React.Component {

  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        Toast.hide()
      })
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
         Toast.hide()
        })
      })
    }
  }

  goToDex = () => {
    routeActions.gotoPath('/dex');
  }
  render () {
    return (
      <div>
        <Button type="primary"  onClick={this.goToDex}>进去DEX</Button>
      </div>
    )
  }

}
