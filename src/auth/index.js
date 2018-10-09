import React from 'react'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'
import storage from 'modules/storage';

class Auth extends React.Component {
  render () {
    return (
      <div>
        <NavBar
          className="bg-white"
          mode="light"
        >
          <div className="color-black">
            Auth By Wallets
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="p30 text-center" onClick={()=>{routeActions.gotoPath('/auth/imtoken')}}>
            <div className="d-inline-block color-black-1 text-center" style={{
              width: '40px',
              height: '40px',
            }}>
              <img style={{borderRadius:"6px"}}  width="100%" src={require('../assets/images/imtoken.png')} alt=""/>
            </div>
            <div className="pt10 fs16 color-black">Imtoken Wallet</div>
        </div>
        <div className="divider 1px zb-b-t"></div>
        <div className="p30 text-center" onClick={()=>{routeActions.gotoPath('/auth/loopr')}}>
            <div className="d-inline-block color-black-1 text-center" style={{
              width: '40px',
              height: '40px',
            }}>
              <img style={{borderRadius:"6px"}}  width="100%" src={require('../assets/images/loopr.png')} alt=""/>
            </div>
            <div className="pt10 fs16 color-black">Loopr Wallet</div>
        </div>
        <div className="divider 1px zb-b-t"></div>
      </div>
    )
  }

}

export default Auth
