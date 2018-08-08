import React from 'react'
import { Icon as WebIcon } from 'antd'
import { Toast, Button, NavBar } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import { connect } from 'dva'
import storage from 'modules/storage'
import uuidv4 from 'uuid/v4'

class Auth extends React.Component {


  componentWillReceiveProps(newProps){
    const {uuid,item} = newProps
    if(uuid === item.uuid){
      Toast.success("登录成功,即将进入",3)
      storage.wallet.storeUnlockedAddress('address', item.address)
      window.RELAY.account.register(item.address)
      routeActions.gotoPath('/dex')
      this.props.dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid:""}}
      })
    }
  }

  authByThirdPartyWallet = (wallet) => {
    const {dispatch} = this.props
    const uuid = uuidv4().substring(0, 8)
    dispatch({
      type: 'sockets/extraChange',
      payload: {id: 'addressUnlock', extra: {uuid}}
    })
    dispatch({type:'sockets/fetch',payload:{id:'addressUnlock'}});
    const data = {type: 'UUID', value: uuid}
    window.location = `${wallet}://${JSON.stringify(data)}`
  }

  render () {
    const {uuid,item} = this.props

    return (
      <div>
        <NavBar
          className=""
          mode="light"
        >
          <div className="color-black-1">
            登录
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="p15">
          <Button onClick={() => {}} disabled className="m10" type="">Address</Button>
          <Button onClick={() => {routeActions.gotoPath('/dex')}} className="m10" type="primary">登录</Button>
        </div>
        <div>{item.uuid}</div>
        {(!uuid  || uuid !== item.uuid) && <div className="bg-white" style={{position: 'absolute', left: '0', bottom: '0', width: '100%'}}>
          <div className="divider 1px zb-b-t"></div>
          <div className="p10">
            <div className="fs16 color-black-2 text-center">第三钱包登录</div>
          </div>
          <div className="divider 1px zb-b-t"></div>
          <div className="row pt15 pb15 align-items-center justify-content-center ml0 mr0">
            <div className="col-3">
              <div className="text-center" onClick={() => this.authByThirdPartyWallet('loopr-ios')}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/loopr.png')} alt=""/>
                </div>
                <div className="pt5 fs14  color-black-3">Loopr</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={() => {}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/imtoken.png')}
                       alt=""/>
                </div>
                <div className="pt5 fs14 color-black-3">Imtoken</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={() => {}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/imtoken.png')}
                       alt=""/>
                </div>
                <div className="pt5 fs14 color-black-3">火币钱包</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={() => {}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/imtoken.png')}
                       alt=""/>
                </div>
                <div className="pt5 fs14 color-black-3">Kcash</div>
              </div>
            </div>

          </div>
          <div className="divider 1px zb-b-t"></div>
        </div>}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    item: state.sockets.addressUnlock.item,
    uuid:state.sockets.addressUnlock.extra.uuid
  }
}

export default connect(mapStateToProps)(Auth)
