import React from 'react'
import Imtoken from './Imtoken'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'
import storage from 'modules/storage';

class AuthByImtoken extends React.Component {

  componentWillMount(){
    const address = storage.wallet.getUnlockedAddress()
    if(address){
      routeActions.gotoPath('/dex');
    }
  }
  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    const _props = this.props
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        storage.wallet.storeUnlockedAddress("imtoken", window.Wallet.address)
        window.RELAY.account.register(window.Wallet.address)
        _props.dispatch({type:'locales/setLocale', payload:{locale:window.Wallet.language}});
        _props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.Wallet.currency}})
        _props.dispatch({type: 'sockets/unlocked'});
        Toast.hide()
      })
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
          storage.wallet.storeUnlockedAddress("imtoken", window.Wallet.address)
          window.RELAY.account.register(window.Wallet.address)
          _props.dispatch({type:'locales/setLocale', payload:{locale:window.Wallet.language}});
          _props.dispatch({type:'settings/preferenceChange',payload:{language:window.Wallet.language,currency:window.Wallet.currency}})
          _props.dispatch({type: 'sockets/unlocked'});
         Toast.hide()
        })
      })
    }
  }

  goToDex = () => {
    routeActions.gotoPath('/dex');
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
            Auth By Imtoken
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="bg-white">
          <div className="pt35 pb35">
            <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
              <div className="col text-center">
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius:"6px"}}  width="100%" src={require('../../assets/images/imtoken.png')} alt=""/>
                </div>
              </div>
              <div className="col-auto text-center" style={{width: '30px'}}>
                <i className={`icon-long-arrow-right color-black-1 fs20`}/>
              </div>
              <div className="col text-center">
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius:"6px"}} width="100%" src={require('../../assets/images/loopr.png')} alt=""/>
                </div>
              </div>
            </div>
            <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center lh1">
              <div className="col text-center">
                <div className="color-black-2 fs16">imToken</div>
              </div>
              <div className="col-auto text-center position-relative" style={{width: '30px'}}>
                <div className="color-black-3 fs16"></div>
              </div>
              <div className="col text-center">
                <div className="color-black-2 fs16">Loopring Dex</div>
              </div>
            </div>
          </div>

          <div className="divider 1px zb-b-t"></div>
          <div className="p15">
            <Button type="primary" onClick={this.goToDex}>授权登录</Button>
            { false && <Button type="primary"  onClick={this.goToDex}>进入DEX</Button> }
            { false && <Button type="primary"  onClick={this.goToFace2Face}>Face2Face</Button> }
          </div>
        </div>

      </div>
    )
  }

}

export default connect()(AuthByImtoken)
