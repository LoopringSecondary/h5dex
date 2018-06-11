import React from 'react';
import { Input,Icon,Button as WebButton,Steps as WebSteps,Badge} from 'antd';
import { Modal,List,Button,Accordion,Steps,Tabs,NoticeBar} from 'antd-mobile';
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
    <div className="row ml0 mr0 pt10 pb10 pl15 pr15 zb-b-b no-gutters" style={{padding:'7px 0px'}}>
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
            <div className="bg-white no-underline">
              <div className="color-black-1 fs22 zb-b-b text-center">
                <div className="row ml0 mr0 pt15 pb15 no-gutters">
                  <div className="col text-left pl15 pr15">
                    <Icon type="close"/>
                  </div>
                  <div className="col-auto">Order Detail</div>
                  <div className="col text-left pl15 pr15 color-white">
                    <Icon type="close"/>
                  </div>
                </div>
              </div>
              <Tabs
                tabs={[
                  { title: <div className="text-center">Detail</div> },
                  { title: <div className="text-center">Fills</div> },
                  { title: <div className="text-center">Logs</div> },
                  // { title: <div className="text-center">Status</div> },
                ]}
                tabBarActiveTextColor={"#000"}
                tabBarInactiveTextColor={"rgba(0,0,0,0.35)"}
                swipeable={false}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
                <div className="bg-white">
                  <div className="">
                    <NoticeBar className="text-left t-error s-lg" icon={<Icon type="close-circle-o"/>} mode="link" marqueeProps={{ loop: true}} action={<span>撮合生效<Icon type="right" /></span>}>
                        该订单现在无法进行撮合<span hidden>Token未授权交易</span>
                    </NoticeBar>
                    <NoticeBar className="text-left t-waring s-lg" icon={<Icon type="exclamation-circle-o"/>} mode="link" marqueeProps={{ loop: true}} action={<span>撮合全部<Icon type="right" /></span>}>
                        该订单只有部分正在进行撮合<span hidden>Token余额不足</span>
                    </NoticeBar>
                    <NoticeBar className="text-left t-info s-lg" mode="link" marqueeProps={{ loop: true}} action={<span>查看日志<Icon type="right" /></span>}>
                        该订单正在进行撮合
                    </NoticeBar>

                    <OrderMetaItem label="买入" value="10000 LRC" />
                    <OrderMetaItem label="卖出" value="25 ETH" />
                    <OrderMetaItem label="价格" value="0.00025 ETH" />
                    <OrderMetaItem label="矿工撮合费" value="2.2 LRC" />
                    <OrderMetaItem label="订单有效时间" value="06-10 10:38 ~ 06-30 10:38" />
                    <OrderMetaItem label="订单提交时间" value="06-10 10:38" />
                    <Button className="m15 color-white" type="warning">Cancel Order</Button>
                  </div>
                </div>
                <div className="p20 bg-white">
                  成交记录 todo
                </div>
                <div className="pt15 pl20 pr20 bg-white text-left">
                  <div className="pt15 pb0">
                    <div className="text-left pt20 pb35 zb-b-b">
                     <Steps direction="horizontal" size="" current={1}>
                         <Steps.Step description={<div className="color-black-3 fs14">06-10 10:00</div>} title={<div className="font-weight-normal fs18">Submited</div>} />
                         <Steps.Step description={<div className="color-black-3 fs14">80% filled</div>} title={<div className="font-weight-normal fs18">Matching</div>} />
                         <Steps.Step description={<div className="color-black-3 fs14">Wating</div>} title={<div className="font-weight-normal fs18">Completed</div>} />
                     </Steps>
                    </div>
                  </div>
                  <WebSteps progressDot direction="vertical" size="small" current={4}>
                      <WebSteps.Step description="2018-06-10 10:00" title="Submited Successfully" />
                      <WebSteps.Step description="2018-06-10 18:00" title="Match Successfully" />
                      <WebSteps.Step description="2018-06-10 20:00" title="Transfer Starts" />
                      <WebSteps.Step description="2018-06-10 21:00" title="Transfer Successfully" />
                      { false && <WebSteps.Step title="2018-06-10 22:00" description="Canceled" /> }
                      { false && <WebSteps.Step title="2018-06-10 24:00" description="Expired" /> }
                  </WebSteps>
                  {
                    false &&
                    <WebSteps progressDot direction="vertical" size="small" current={5}>
                        <WebSteps.Step title="Submited Successfully" description="2018-06-10 10:00:00" />
                        <WebSteps.Step title="Matching" description={
                          <div>
                            <div className="mb5">Miners are searching matched order</div>
                            <div className="color-red-500 mt5">
                              <Icon type="exclamation-circle-o" /> <span className="">LRC balance is not sufficient .</span>
                            </div>
                            <div className="color-red-500 mt5">
                              <Icon type="exclamation-circle-o" /> <span className="">WETH balance is not sufficient .</span>
                            </div>
                            <Button className="mt5 mr5 d-inline-block" type="warning" size="small">Cancel Order</Button>
                            <Button className="mt5 mr5 d-inline-block" type="warning" size="small">Cancel Order</Button>
                          </div>
                        } />
                        <WebSteps.Step title="Matched Failed" description={
                          <div>
                            <Icon type="exclamation-circle-o" /> <span className="">Tokens are not enabled to trade.</span>
                          </div>
                        } />
                        <WebSteps.Step title="Matched Successfully" description={
                          <div>
                            <div className="mb5">Miners found matched order</div>
                          </div>
                        } />
                        <WebSteps.Step title="Transfering" description={
                          <div>
                            <div className="mb5">Miner is transfering token to your address</div>
                          </div>
                        } />
                        <WebSteps.Step title="Transfered Successfully" description={
                          <div>
                            <div className="mb5">Your Order is </div>
                          </div>
                        } />
                        { false && <WebSteps.Step title="Matched Successfully" description="2018-06-15 10:02:23" /> }
                        { false && <WebSteps.Step title="Transfer tokens starts" description="2018-06-15 10:04:00" /> }
                        { false && <WebSteps.Step title="ETH Network is slow" status="error" description={<div className="fs18">
                        </div>} /> }
                    </WebSteps>
                  }
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
