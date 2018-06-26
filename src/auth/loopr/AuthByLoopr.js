import React from 'react';
import Loopr from './loopr'
import {Toast, Button} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'

class Routes extends React.Component{


  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
     Toast.success('Load complete !!!')
    })
    const _this = this
      window.Wallet = new Loopr();
      window.Wallet.setConfigs().then(res => {
        _this.props.dispatch({type:'locales/setLocale', payload:{locale:window.Wallet.language}});
        _this.props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.Wallet.currency}})
        _this.props.dispatch({type: 'sockets/unlocked'});
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

export default connect()(Routes)
