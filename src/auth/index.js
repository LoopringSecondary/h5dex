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
          <div className="color-black-1">
            登录
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="p15">
          <Button onClick={()=>{}} disabled className="m10" type="">Address</Button>
          <Button onClick={()=>{routeActions.gotoPath('/dex')}} className="m10" type="primary">登录</Button>
        </div>
        <div className="bg-white" style={{position:'absolute',left:'0',bottom:'0',width:"100%"}}>
          <div className="divider 1px zb-b-t"></div>
          <div className="p10">
            <div className="fs16 color-black-2 text-center">第三钱包登录</div>
          </div>
          <div className="divider 1px zb-b-t"></div>
          <div className="row pt15 pb15 align-items-center justify-content-center ml0 mr0">
            <div className="col-3">
              <div className="text-center" onClick={()=>{}}>
                  <div className="d-inline-block color-black-1 text-center" style={{
                    width: '40px',
                    height: '40px',
                  }}>
                    <img style={{borderRadius:"50em"}}  width="100%" src={require('../assets/images/loopr.png')} alt=""/>
                  </div>
                  <div className="pt5 fs14  color-black-3">Loopr</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={()=>{}}>
                  <div className="d-inline-block color-black-1 text-center" style={{
                    width: '40px',
                    height: '40px',
                  }}>
                    <img style={{borderRadius:"50em"}}  width="100%" src={require('../assets/images/imtoken.png')} alt=""/>
                  </div>
                  <div className="pt5 fs14 color-black-3">Imtoken</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={()=>{}}>
                  <div className="d-inline-block color-black-1 text-center" style={{
                    width: '40px',
                    height: '40px',
                  }}>
                    <img style={{borderRadius:"50em"}}  width="100%" src={require('../assets/images/imtoken.png')} alt=""/>
                  </div>
                  <div className="pt5 fs14 color-black-3">火币钱包</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={()=>{}}>
                  <div className="d-inline-block color-black-1 text-center" style={{
                    width: '40px',
                    height: '40px',
                  }}>
                    <img style={{borderRadius:"50em"}}  width="100%" src={require('../assets/images/imtoken.png')} alt=""/>
                  </div>
                  <div className="pt5 fs14 color-black-3">Kcash</div>
              </div>
            </div>

          </div>
          <div className="divider 1px zb-b-t"></div>
        </div>
      </div>
    )
  }

}

export default Auth
