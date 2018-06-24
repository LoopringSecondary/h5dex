import React from 'react';
import Loopr from './loopr'
import {Toast, Button} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'

export default class Routes extends React.Component{


  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
     Toast.success('Load complete !!!')
    })
      window.Wallet = new Loopr();
      window.Wallet.setConfigs().then(res => {
        Toast.hide()
      })
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
