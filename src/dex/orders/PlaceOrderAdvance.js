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

function PlaceOrderAdvance(props) {
  const isUnlocked = true
  const order_type = 'market_order'

  return (
    <div className="">
        <List renderHeader={() => <div className="pt15 pb15 fs18 color-black-1">高级选项</div>} className="popup-list">
          <List.Item arrow="horizontal" extra="0.05 LRC">{intl.get('common.lrc_fee')}</List.Item>
          <List.Item arrow="horizontal" extra="06-10 10:00">{intl.get('order.validSince')}</List.Item>
          <List.Item arrow="horizontal" extra="06-10 10:00">{intl.get('order.validUntil')}</List.Item>
        </List>
    </div>
  )
}
export default PlaceOrderAdvance
