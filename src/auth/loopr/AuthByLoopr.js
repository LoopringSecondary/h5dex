import React from 'react';
import Loopr from './loopr'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'
import storage from 'modules/storage';
import {init} from '../../init'
import intl from 'react-intl-universal'
import Notification from 'LoopringUI/components/Notification'


class Routes extends React.Component{


  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
     Toast.success('Load complete !!!')
    })
    const _this = this
      window.Wallet = new Loopr();
      window.Wallet.setConfigs().then(res => {
        storage.wallet.storeUnlockedAddress("loopr", window.Wallet.address)
        _this.props.dispatch({type:'locales/setLocale', payload:{locale:'en-US'}});
        _this.props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.Wallet.currency}})
        _this.props.dispatch({type: 'sockets/unlocked'});
        Toast.hide()
      })
  }

  goToDex = () => {
    init().then(res=>{
      console.log('tokens_res',JSON.stringify(res))
      const tokens = []
      tokens.push({
        "symbol": "ETH",
        "digits": 18,
        "address": "",
        "precision": 6,
      })
      res.result.forEach(item=>{
        if(!item.deny) {
          const digit = Math.log10(item.decimals)
          tokens.push({
            "symbol": item.symbol,
            "digits": digit,
            "address": item.protocol,
            "precision": Math.min(digit, 6),
          })
        }
      })
      storage.settings.setTokensConfig(tokens)
      this.props.dispatch({type:'tokens/itemsChange', payload:{items:tokens}})
    }).catch(error=> {
      console.log(error)
      Notification.open({
        message:intl.get('notifications.title.init_failed'),
        description:intl.get('notifications.message.failed_fetch_data_from_server'),
        type:'error'
      })
    })
    window.RELAY.market.getSupportedMarket().then(res => {
      console.log('market_res',JSON.stringify(res))
    })

    window.RELAY.market.getTicker().then(res => {
      console.log('ticker_res',JSON.stringify(res))
    })
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
