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
          className=""
          mode="light"
        >
          <div>
            Auth
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="p30">
            <div className="d-inline-block color-black-1 text-center" style={{
              width: '40px',
              height: '40px',
            }}>
              <img style={{borderRadius:"6px"}}  width="100%" src={require('../assets/images/imtoken.png')} alt=""/>
            </div>
            <div className="">Imtoken Wallet</div>
        </div>
        <div className="divider 1px zb-b-t"></div>
        <div className="p30">
            <div className="d-inline-block color-black-1 text-center" style={{
              width: '40px',
              height: '40px',
            }}>
              <img style={{borderRadius:"6px"}}  width="100%" src={require('../assets/images/tokenest.png')} alt=""/>
            </div>
            <div className="">Tokenest Wallet</div>
        </div>
        <div className="divider 1px zb-b-t"></div>
        <div className="p30">
            <div className="d-inline-block color-black-1 text-center" style={{
              width: '40px',
              height: '40px',
            }}>
              <img style={{borderRadius:"6px"}}  width="100%" src={require('../assets/images/loopr.png')} alt=""/>
            </div>
            <div className="">Loopr Wallet</div>
        </div>

      </div>
    )
  }

}

export default Auth
