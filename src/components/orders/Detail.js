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
    <div className="row ml0 mr0 p10 pl15 pr15 zb-b-b no-gutters" style={{padding:'7px 0px'}}>
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
                  { title: <div className="text-center">Timeline</div> },
                  { title: <div className="text-center">Detail</div> },
                ]}
                tabBarActiveTextColor={"#000"}
                tabBarInactiveTextColor={"rgba(0,0,0,0.35)"}
                swipeable={false}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >

                <div className="pt15 pl20 pr20 bg-white text-left">
                  <WebSteps progressDot direction="vertical" size="small" current={5}>
                      <WebSteps.Step title="Submit Successfully" description="2018-06-10 10:00:00" />
                      <WebSteps.Step title="Match Start Failed" status="error" description={<div className="">
                        <Icon hidden type="exclamation-circle-o" /> <span hidden className="">Tokens are not enabled to trade.</span>
                        <br hidden />
                        <Icon type="exclamation-circle-o" /> <span className="">LRC balance is not sufficient .</span>
                        <br />
                        <Icon type="exclamation-circle-o" /> <span className="">WETH balance is not sufficient .</span>
                      </div>} />
                      <WebSteps.Step title="Match Start Successfully" description="2018-06-11 10:01:25" />
                      <WebSteps.Step title="Matched Successfully" description="2018-06-15 10:02:23" />
                      <WebSteps.Step title="Transfer tokens starts" description="2018-06-15 10:04:00" />
                      {false && <WebSteps.Step title="ETH Network is slow" status="error" description={<div className="fs18">
                      </div>} /> }
                      <WebSteps.Step title="Transfer Successfully" description=""/>
                      { false && <WebSteps.Step title="Expired" description="" /> }
                      { false && <WebSteps.Step title="Cancled" description="" /> }
                  </WebSteps>
                </div>
                <div className="p20 bg-white text-left">
                  <WebSteps progressDot direction="vertical" size="small" current={4}>
                      <WebSteps.Step description="2018-06-10 10:00" title="Submited Successfully" />
                      <WebSteps.Step description="2018-06-10 12:00" title="Match Starts" />
                      <WebSteps.Step description="2018-06-10 18:00" title="Match Successfully" />
                      <WebSteps.Step description="2018-06-10 20:00" title="Transfer Starts" />
                      <WebSteps.Step description="2018-06-10 21:00" title="Transfer Successfully" />
                      { false && <WebSteps.Step title="2018-06-10 22:00" description="Canceled" /> }
                      { false && <WebSteps.Step title="2018-06-10 24:00" description="Expired" /> }
                  </WebSteps>
                </div>
                <div className="bg-white">
                  <div className="">
                    <OrderMetaItem label="买入" value="10000 LRC" />
                    <OrderMetaItem label="卖出" value="25 ETH" />
                    <OrderMetaItem label="价格" value="0.00025 ETH" />
                    <OrderMetaItem label="矿工撮合费" value="2.2 LRC" />
                    <OrderMetaItem label="订单有效期" value="06-10 10:38 ~ 06-30 10:38" />
                    <OrderMetaItem label="成交记录" value="TODO" />
                  </div>
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
