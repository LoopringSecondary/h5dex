import React from 'react';
import { Input,Icon as WebIcon } from 'antd';
import { Modal,List,Button,NavBar } from 'antd-mobile';
import intl from 'react-intl-universal';
import ListPlaceOrderTickers from '../tickers/ListPlaceOrderTickers'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'

function HelperOfMarket(props) {
  const {helperOfMarket, dispatch} = props
  const search = () => {
    routeActions.gotoPath('/dex/markets/search/fromMarket')
    dispatch({
      type:"layers/hideLayer",
      payload:{
        id:"helperOfMarket"
      }
    })
  }
  return (
    <div className="tabs-no-border" style={{height:'80vh'}}>
      <NavBar
        className="zb-b-b"
        mode="light"
        onLeftClick={() => console.log('onLeftClick')}
        leftContent={[
          <span className="color-black-1" key="1"  onClick={helperOfMarket.hideLayer.bind(this,{id:'helperOfMarket'})}><WebIcon type="close" /></span>
        ]}
        rightContent={[
          <i onClick={search} key="1" className="icon-search" />,
        ]}
      >
        Market
      </NavBar>
      <ListPlaceOrderTickers />
    </div>
  )
}
export default connect() (HelperOfMarket)
