import React from 'react';
import { Input,Icon as WebIcon } from 'antd';
import { Modal,List,Button,NavBar } from 'antd-mobile';
import intl from 'react-intl-universal';
import ListPlaceOrderTickers from '../tickers/ListPlaceOrderTickers'
import routeActions from 'common/utils/routeActions'

function HelperOfMarket(props) {
  const {helperOfMarket} = props
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
          <i onClick={()=>routeActions.gotoPath('/dex/markets/search')} key="1" className="icon-search" />,
        ]}
      >
        Market
      </NavBar>
      <ListPlaceOrderTickers />
    </div>
  )
}
export default HelperOfMarket
