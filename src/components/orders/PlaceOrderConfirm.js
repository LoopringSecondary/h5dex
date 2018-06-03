import React from 'react';
import { Input,Icon } from 'antd';
import { Modal,List,Button } from 'antd-mobile';
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
import QRCode from 'qrcode.react';
import Alert from 'LoopringUI/components/Alert'

function PlaceOrderConfirm(props) {
  const isUnlocked = true
  const order_type = 'market_order'

  return (
    <div className="">
        <List renderHeader={() => <div>委托买入</div>} className="popup-list">
          <List.Item extra="10000 LRC">{intl.get('common.sell')}</List.Item>
          <List.Item extra="10 WETH">{intl.get('common.buy')}</List.Item>
          <List.Item extra="0.00100">{intl.get('common.price')}</List.Item>
          {false && <List.Item extra={intl.get('order_type.market_order')}>{intl.get('place_order.order_type')}</List.Item> }
          <List.Item extra="10LRC">{intl.get('common.lrc_fee')}</List.Item>
          {false && <List.Item extra="30%">{intl.get('common.margin_split')}</List.Item> }
          { false && <List.Item extra="2018-06-10 10:00">{intl.get('place_order.order_since')}</List.Item> }
          <List.Item extra="06-11 10:00">{intl.get('place_order.order_until')}</List.Item>
          <List.Item>
            <Button type="primary" onClick={()=>{}}>买入</Button>
          </List.Item>
        </List>
    </div>
  )
}
export default PlaceOrderConfirm
