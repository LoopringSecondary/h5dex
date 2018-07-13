import React from 'react'
import Imtoken from './Imtoken'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import storage from 'modules/storage';

export default class TermsOfPrivacy extends React.Component {
  render () {
    return (
      <div>
        <NavBar
          className=""
          mode="light"
          leftContent={[
            <span onClick={()=>{routeActions.goBack()}} className="color-black-1" key="1"><WebIcon type="left" /></span>,
          ]}
        >
          <div>
            Terms
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="p35">
          TODO
        </div>
      </div>
    )
  }
}

