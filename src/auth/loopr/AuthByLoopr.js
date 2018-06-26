import React from 'react';
import Loopr from './loopr'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
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
        <NavBar
          className=""
          mode="light"
          leftContent={null &&[
            <span onClick={()=>{}} className="color-black-1" key="1"><WebIcon type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1" key="1"  onClick={()=>{}}><WebIcon type="question-circle-o" /></span>
          ]}
        >
          <div>
            Auth By Loopr
          </div>
        </NavBar>
        <div className="p15">
          <Button type="primary" onClick={this.goToDex}>进去DEX</Button>
        </div>
      </div>
    )
  }
}

export default connect()(Routes)
