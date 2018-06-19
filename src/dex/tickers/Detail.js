import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Card } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import ListDepth from '../orders/ListDepth';
import ListFills from '../fills/ListMarketFills';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import {TickerFm} from 'modules/tickers/formatters'
import intl from 'react-intl-universal'
const Item = List.Item;
const Brief = Item.Brief;

const TickerItem = connect(({sockets:{tickers}})=>({tickers}))(({tickers,dispatch})=>{
  const looprTickerFm = new TickerFm(tickers.item.loopr || {})
  const tokens = looprTickerFm.getTokens()
  const goBack = ()=>{
    routeActions.goBack()
  }
  return (
    <div className="bg-white">
      <NavBar
        className="zb-b-b"
        mode="light"
        icon={null && <Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        leftContent={[
          <Icon key="1" type="left" onClick={goBack} className="color-black-1" />,
        ]}
        rightContent={null && [
          <Icon key="1" type="search" />,
        ]}

      >
      {tickers.filters.market}
      </NavBar>
      <div className="p10 zb-b-b">
        <span className="fs24 font-weight-bold color-green-600">
          {looprTickerFm.getLast()}
        </span>
        <span className="fs16 color-green-600 ml10">
          {looprTickerFm.getChange()}
        </span>
        <span className="fs16 color-green-600 ml10">
          $1.5
        </span>
      </div>
      <div className="pl10 pr10 pt15 pb15 zb-b-b">
        <div className="row ml0 mr0 no-gutters align-items-center fs13">
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            24H涨跌幅
          </div>
          <div className="col color-black-2">
            {looprTickerFm.getChange()}
          </div>
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            24H最高价
          </div>
          <div className="col-auto color-black-2">
            {looprTickerFm.getHigh()}
          </div>
        </div>
        <div className="row ml0 mr0 pt5 pb5 no-gutters align-items-center fs13">
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            24H交易量
          </div>
          <div className="col color-black-2">
            {looprTickerFm.getVol()} {tokens.right}
          </div>
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            24H最低价
          </div>
          <div className="col-auto color-black-2">
            {looprTickerFm.getLow()}
          </div>
        </div>
      </div>
    </div>
  )
})

class MarketDetail extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }
  render() {
    const dispatch = this.props.dispatch
    return (
      <div className="bg-grey-100">
        <TickerItem />
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <div className="fs16 pt5 pb5">Charts</div> },
                { title: <div className="fs16 pt5 pb5">Depth</div> },
                { title: <div className="fs16 pt5 pb5">Fills</div> },
              ]
            }
            tabBarBackgroundColor={'#fff'}
            tabBarInactiveTextColor={"rgba(0, 0, 0, 0.35)"}
            tabBarActiveTextColor={"#000"}
            tabBarTextStyle={{}}
            initialPage={1}
            swipeable={false}
            onChange={(tab, index) => { }}
            onTabClick={(tab, index) => { }}
          >
            <div className="" style={{minHeight: '150px'}}>
              <div className="p10">Charts</div>
            </div>
            <div className="">
              <ListDepth depth={{items:Array(15).fill(1)}} maxRows={8} />
            </div>
            <div className="" style={{minHeight: '150px'}}>
              <ListFills />
            </div>
          </Tabs>
        </div>
        <div className="position-fixed p5 w-100 bg-white" style={{bottom:'0'}}>
          <div className="row ml0 mr0 no-gutters">
            <div className="col-6">
              <Button onClick={routeActions.gotoPath.bind(this,'/dex/placeOrder')} className="bg-green-500 color-white m5">Buy LRC</Button>
            </div>
            <div className="col-6">
              <Button onClick={routeActions.gotoPath.bind(this,'/dex/placeOrder')} className="bg-red-500 color-white m5">Sell LRC</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketDetail







