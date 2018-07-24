import React from 'react'
import Imtoken from './Imtoken'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'
import storage from 'modules/storage';

class AuthByImtoken extends React.Component {

  goToDex = () => {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    const _props = this.props
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        storage.wallet.storeUnlockedAddress("imtoken", window.Wallet.address)
        window.RELAY.account.register(window.Wallet.address)
        _props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.Wallet.currency}})
        _props.dispatch({type: 'sockets/unlocked'});
        this.props.dispatch({type:'locales/setLocale', payload:{locale:window.Wallet.language}});
        Toast.hide()
        routeActions.gotoPath('/dex');
      })
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
          storage.wallet.storeUnlockedAddress("imtoken", window.Wallet.address)
          window.RELAY.account.register(window.Wallet.address)
          _props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.Wallet.currency}})
          _props.dispatch({type: 'sockets/unlocked'});
          this.props.dispatch({type:'locales/setLocale', payload:{locale:window.Wallet.language}});
          Toast.hide()
          routeActions.gotoPath('/dex');
        })
      })
    }


  }
  goToFace2Face = () => {
    routeActions.gotoPath('/face2face');
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
            Loopring DEX
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="bg-white">
          <div className="pt40 pb20 text-center">
           <div className="d-inline-block color-black-1 text-center" style={{
             width: '60px',
             height: '60px',
           }}>
             <img style={{borderRadius:"50em"}} width="100%" src={require('../../assets/images/loopr.png')} alt=""/>
           </div>
           <div className="text-center">
             <div className="color-black-1 fs20 pt20 pb20">欢迎来到 路印 去中心化交易所</div>
             <div className="color-black-2 fs14 pl20 pr20">
              您即将进入的dApp是一个运行在以太坊区块链上去中心化交易所。
              通过点击"我同意"，即表示您同意我们的
              <a href = 'https://github.com/Loopring/loopring.org/blob/master/terms.md' className="text-primary"> 用户服务协议 </a> 和 <a href="https://github.com/Loopring/loopring.org/blob/master/privacyPolicy.md" className="text-primary"> 用户隐私政策 </a>
              。
             </div>
             <Button className="m20" type="primary" onClick={this.goToDex}>我同意</Button>
           </div>
          </div>
          <div className="divider 1px zb-b-t"></div>
        </div>

      </div>
    )
  }

}

export default connect()(AuthByImtoken)
