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
        this.props.dispatch({type:'locales/setLocale', payload:{locale:window.Wallet.language}});
        this.props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.language.currency}})
        this.props.dispatch({type: 'sockets/unlocked'});
        Toast.hide()
      })
  }

  goToDex = () => {
    routeActions.gotoPath('/test')
  }

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.goToDex}>进去DEX</Button>
      </div>
    )
  }
}
