import React from 'react';
import { Input,Icon as WebIcon } from 'antd';
import { Modal,List,Button,NavBar } from 'antd-mobile';
import {toBig, toHex, clearHexPrefix} from 'LoopringJS/common/formatter'
import config from 'common/config'
import intl from 'react-intl-universal';
import * as datas from 'common/config/data'
import eachLimit from 'async/eachLimit';
import * as orderFormatter from 'modules/orders/formatters'
import Notification from 'LoopringUI/components/Notification'
import {createWallet} from 'LoopringJS/ethereum/account';
import * as uiFormatter from 'modules/formatter/common'
import * as fm from 'LoopringJS/common/formatter'
import Alert from 'LoopringUI/components/Alert'
import ListMarketTickers from '../tickers/ListMarketTickers'

function MarketHelperOfPlaceOrder(props) {
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
          <span className="color-black-1" key="1"><WebIcon type="search" /></span>,
        ]}
      >
        Market
      </NavBar>
      <ListMarketTickers />
    </div>
  )
}
export default MarketHelperOfPlaceOrder
