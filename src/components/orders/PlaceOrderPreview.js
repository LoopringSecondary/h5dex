import React from 'react';
import { Input,Icon } from 'antd';
import { Modal,List,Button,Accordion } from 'antd-mobile';
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

const OrderMetaItem = (props) => {
  const {label, value} = props
  return (
    <div className="row ml0 mr0 pt5 pb5 pl0 pr0">
      <div className="col">
        <div className="fs16 color-black-1 lh25 text-left">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs16 color-black-2 text-wrap lh25">{value}</div>
      </div>
    </div>
  )
}
const WalletItem = (props) => {
  const {title, description,icon,layout,showArrow} = props
  if(layout === 'vertical'){
    return (
      <div className="pl10 pr10 pt15 pb15">
        <div className="text-center text-primary">
          <i className={`fs28 icon-${icon}`}></i>
        </div>
        <div className="fs18">{title}</div>
      </div>
    )
  }else{
    return (
      <div className="row pt10 pb10 pl0 pr0 align-items-center zb-b-b">
        <div className="col-auto pr5 text-center text-primary" style={{minWidth:'40px'}}>
          <i className={`fs24 icon-${icon}`}></i>
        </div>
        <div className="col pl10">
          <div className="fs18 color-black-1 text-wrap text-left">{title}</div>
          { description && <div className="fs16 color-black-2">{description}</div> }
        </div>
        {showArrow &&
          <div className="col-auto text-right">
            <Icon type="right" />
          </div>
        }
      </div>
     )
  }
}

const PlaceOrderResult = ({
  }) => {
  return (
    <div className="">
        {
          true &&
          <div className="text-center p15">
            <i className={`fs50 icon-success`}></i>
            <div className="fs24 color-black-1">订单提交成功！</div>
            <div className="row no-gutters mt15">
              <div className="col-6">
                <Button className="m5 fs18" size="" type="default"> 查看订单 </Button>
              </div>
              <div className="col-6">
                <Button className="m5 fs18" size="" type="default"> 继续下单 </Button>
              </div>
            </div>
          </div>
        }
        {
          false &&
          <div className="text-center p15">
            <Icon type="close-circle" className="fs50 text-error" />
            <div className="fs18 color-black-1 mt15">您取消了订单提交</div>
            <div className="mt10">

            </div>
          </div>
        }
    </div>
  );
};
function PlaceOrderPreview(props) {
  const {placeOrderPreview} = props
  const {side} = placeOrderPreview
  return (
    <div className="">
        {false && <div className="pt15 pb15 color-black-1 fs22">{intl.get(`common.${side}`)} LRC</div>}
        <Accordion defaultActiveKey="0" className="" onChange={()=>{}}>
          <Accordion.Panel header={<div className="text-left">1. 确认订单信息</div>}>
            <div className="pt10 pb10 bg-grey-100">
              <OrderMetaItem label="买入" value="10000 LRC" />
              <OrderMetaItem label="卖出" value="25 ETH" />
              <OrderMetaItem label="价格" value="0.00025 ETH" />
              <OrderMetaItem label="矿工撮合费" value="2.2 LRC" />
              <OrderMetaItem label="订单有效期" value="06-10 10:38 ~ 06-30 10:38" />
            </div>
          </Accordion.Panel>
          <Accordion.Panel header={<div className="text-left">2. 选择下单钱包</div>} className="pad">
            <div className="row ml0 mr0 bg-grey-100">
              <div className="col-4 zb-b-r">
                <WalletItem icon="metamaskwallet" title="Loopr" layout="vertical" />
              </div>
              <div className="col-4 zb-b-r">
                <WalletItem icon="ledgerwallet" title="imToken" layout="vertical" />
              </div>
              <div className="col-4">
                <WalletItem icon="trezorwallet" title="MyToken" layout="vertical" />
              </div>
            </div>
          </Accordion.Panel>
          <Accordion.Panel header={<div className="text-left">3. 等待下单结果</div>} className="pad">
            <div className="bg-grey-100">
              <PlaceOrderResult />
            </div>
          </Accordion.Panel>

        </Accordion>
        {
          false &&
          <List className="popup-list">
            <List.Item>
              {
                side === 'buy' &&
                <Button type="" className="bg-green-500 color-white" onClick={()=>{}}>Place Order Now</Button>
              }
              {
                side === 'sell' &&
                <Button className="bg-red-500 color-white" onClick={()=>{}}>Place Order Now</Button>
              }
              <Button className="mt10" default="ghost" onClick={()=>{}}>No,Thanks</Button>
            </List.Item>
          </List>
        }

    </div>
  )
}
export default PlaceOrderPreview
