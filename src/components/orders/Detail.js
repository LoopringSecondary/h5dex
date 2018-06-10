import React from 'react';
import { Input,Icon,Button as WebButton,Steps as WebSteps } from 'antd';
import { Modal,List,Button,Accordion,Steps,Tabs} from 'antd-mobile';
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
import {Pages,Page} from 'LoopringUI/components/Pages'
import {connect} from 'dva'

const OrderMetaItem = (props) => {
  const {label, value} = props
  return (
    <div className="row ml0 mr0 p15 zb-b-b no-gutters" style={{padding:'7px 0px'}}>
      <div className="col">
        <div className="fs18 color-black-1 lh25 text-left">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs18 color-black-2 text-wrap lh25 text-left">{value}</div>
      </div>
    </div>
  )
}
function OrderDetail(props) {
  const {OrderDetail} = props

  return (
    <div className="">
        <Pages active="order">
          <Page id="order" render={({page})=>
            <div className="bg-white">
              <div className="p15 color-black-1 fs22 zb-b-b text-center">
                <div className="row ml0 mr0">
                  <div className="col text-left">
                    <Icon type="close"/>
                  </div>
                  <div className="col-auto">Order Detail</div>
                  <div className="col"></div>
                </div>
              </div>
              <Tabs
                tabs={[
                  { title: <div className="text-center">Status</div> },
                  { title: <div className="text-center">Basic</div> },
                  { title: <div className="text-center">Related</div> },
                ]}
                tabBarActiveTextColor={"#000"}
                tabBarInactiveTextColor={"rgba(0,0,0,0.35)"}
                swipeable={false}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
                <div className="p20 bg-white">
                  <WebSteps direction="vertical" size="small" current={1}>
                      <WebSteps.Step title="Submited Successfully" description="This is a description." />
                      <WebSteps.Step title="Confirmed Failed" status="error" description={<div className="">
                        <Icon  type="close-circle" /> Tokens are not enabled .
                        <br />
                        <Icon  type="close-circle" /> Tokens balance are not sufficient .
                      </div>} />
                      <WebSteps.Step title="Matched Successfully" description="Miner found the ring " />
                      <WebSteps.Step title="Transfed Successfully" description="Miner transferd all tokens" />
                      <WebSteps.Step title="Completed"/>
                      { false && <WebSteps.Step title="Expired" description="" /> }
                      { false && <WebSteps.Step title="Cancled" description="" /> }
                  </WebSteps>
                </div>
                <div className="bg-white">
                  <div className="">
                    <OrderMetaItem label="买入" value="10000 LRC" />
                    <OrderMetaItem label="卖出" value="25 ETH" />
                    <OrderMetaItem label="价格" value="0.00025 ETH" />
                    <OrderMetaItem label="矿工撮合费" value="2.2 LRC" />
                    <OrderMetaItem label="订单有效期" value="06-10 10:38 ~ 06-30 10:38" />
                  </div>
                </div>
                <div className="p50 bg-white ">
                  Related Fills Todo
                </div>
              </Tabs>


            </div>
          }/>
          <Page id="wallet" render={({page})=>
            <div className="div">
              <div className="p15 color-black-1 fs22 zb-b-b text-center no-gutters">
                <div className="row">
                  <div className="col-auto text-left pl20 pr20" onClick={page.gotoPage.bind(this,{id:'order'})}>
                    <Icon type="left"/>
                  </div>
                  <div className="col">Select Wallet</div>
                  <div className="col-auto color-white pl20 pr20">
                    <Icon type="left"/>
                  </div>
                </div>
              </div>
              <div className="bg-white">
              </div>
            </div>
          }/>
        </Pages>
    </div>
  )
}
export default connect()(OrderDetail)
