import React from 'react'
import { Switch, Redirect } from 'dva/router'
import { message } from 'antd'
import MockWallet from './MockWallet'
import { Toast, Button } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'

export default class Routes extends React.Component {

  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    const {params} = this.props.match
    if (params && params.pk) {
      window.Wallet = new MockWallet(params.pk)
      window.Wallet.setConfigs().then(res => {
        Toast.hide()
      })
    } else {
      message.warn('please provide with your private key')
    }
  }

  goToDex = () => {
    routeActions.gotoPath('/dex')
  }

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.goToDex}>进去DEX</Button>
      </div>
    )
  }

}
