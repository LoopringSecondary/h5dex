import React from 'react';
import {Icon as WebIcon,Input,Button as WebButton} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'

export default class AuthByAddress extends React.Component{
  goToDex = () => {
    routeActions.gotoPath('/test')
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
            Auth By address
          </div>
        </NavBar>
        <div className="p15">
          <Input />
          <Button type="primary" >输入地址</Button>
          <div className="mt10">
            <WebButton shape="">
              <i className="icon-LRC"></i>
              Loopr Wallet
            </WebButton>
            <WebButton shape="">
              <i className="icon-imtoken"></i>
              ImToken Wallet
            </WebButton>
          </div>
        </div>
      </div>
    )
  }
}
