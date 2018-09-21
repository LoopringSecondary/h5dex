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
import {getTokensByMarket} from 'modules/formatter/common'
import intl from 'react-intl-universal'
import Worth from 'modules/settings/Worth'
import {formatPrice} from 'modules/orders/formatters'
import markets from 'modules/storage/markets'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from 'modules/storage'
const Item = List.Item;
const Brief = Item.Brief;

const TickerItem = connect(({sockets:{tickers}})=>({tickers}))(({tickers,dispatch})=>{
  const tickerFm = new TickerFm(tickers.item.coinmarketcap || {})
  const tokens = tickerFm.getTokens()
  const direction = tickerFm.getChangeDirection()
  const price = tickerFm.getLast() && formatPrice(tokens.left, tokens.right, tickerFm.getLast())
  let color,prefix
  if(direction === 'up'){
    color = "color-success"
    prefix = '+'
  }
  if(direction === 'down'){
    color = "color-error"
    // prefix = '-' // no need minus
  }
  if(direction === 'none'){
    color = "text-primary"
  }


  return (
    <div className="bg-white">
      <div className={`p10 ${color} pb0`}>
        <span className="fs24">
          {price}
        </span>
        <span className="fs16 ml10">
          {prefix}{tickerFm.getChange()}
        </span>
        <span className="fs16 ml10">
          <Worth amount={price} symbol={tokens.right}/>
        </span>
      </div>
      <div className="p10 zb-b-b">
        <div className="row ml0 mr0 no-gutters align-items-center fs13">
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            {intl.get('ticker.change')}
          </div>
          <div className="col color-black-2">
            {prefix}{tickerFm.getChange()}
          </div>
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            {intl.get('ticker.high')}
          </div>
          <div className="col-auto color-black-2">
            {tickerFm.getHigh()}
          </div>
        </div>
        <div className="row ml0 mr0 pt5 no-gutters align-items-center fs13">
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            {intl.get('ticker.vol')}
          </div>
          <div className="col color-black-2">
            {tickerFm.getVol()} {tokens.right}
          </div>
          <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
            {intl.get('ticker.low')}
          </div>
          <div className="col-auto color-black-2">
            {tickerFm.getLow()}
          </div>
        </div>
      </div>
    </div>
  )
})

class MarketDetail extends React.Component {
  render() {
    const {tickersOfSource:list,dispatch} = this.props
    const {extra:{favored={},keywords}} = list
    const params = routeActions.match.getParams(this.props)
    if(!params.market) return null
    const market = params.market
    const tokens = getTokensByMarket(market)
    const gotoTrade = ({side})=>{
      dispatch({
        type:"placeOrder/sideChangeEffects",
        payload:{side}
      })
      routeActions.gotoPath(`/dex/placeOrder/${market}`)
    }
    const toggleTickerFavored = (item)=>{
      dispatch({
        type:'sockets/extraChange',
        payload:{
          id:'tickersOfSource',
          extra:{
            favored:{...favored,[item]:!favored[item]},
          }
        }
      })
      markets.toggleFavor(item)
    }
    const menu1 = `${intl.get("common.buy")} ${tokens.left}`
    const menu2 = `${intl.get("common.sell")} ${tokens.left}`
    const left = storage.wallet && storage.wallet.getUnlockedType() === 'imtoken' ? '' : <Icon key="1" type="left" className="" />
    return (
      <div className="">
        <NavBar
          className="bg-white"
          mode="light"
          icon={null && <Icon type="left" />}
          onLeftClick={routeActions.goBack}
          leftContent={[
            left,
          ]}
          rightContent={[
            <i className={`icon-${favored[market] ? "star" : "star-o"}`} key="1"  onClick={toggleTickerFavored.bind(this, market)}/>
          ]}
        >
          <div className="color-black">{market}</div>
        </NavBar>
        <div className="bg-white"><div className="divider 1px zb-b-t"></div></div>
        <TickerItem />
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <div className="fs16 pt5 pb5">{intl.get("market.tab_charts")}</div> },
                { title: <div className="fs16 pt5 pb5">{intl.get("market.tab_depth")}</div> },
                { title: <div className="fs16 pt5 pb5">{intl.get("market.tab_fills")}</div> },
              ]
            }
            tabBarTextStyle={{}}
            initialPage={1}
            swipeable={false}
            onChange={(tab, index) => { }}
            onTabClick={(tab, index) => { }}
          >
            <div className="" style={{minHeight: '150px'}}>
              <div className="p15 color-black-3 fs14">{intl.get('common.comingsoon')} !</div>
            </div>
            <div className="">
              <ListDepth />
            </div>
            <div className="" style={{minHeight: '150px'}}>
              <ListFills />
            </div>
          </Tabs>
        </div>
        <div className="position-fixed w-100 bg-white segmented-fs16" style={{bottom:'0'}}>
          <div className="divider 1px zb-b-t"></div>
            <div className="row ml0 mr0 no-gutters p10">
              <div className="col-6 pr5">
                <Button type="primary" onClick={gotoTrade.bind(this,{side:'buy'})} className="bg-success border-none">{intl.get("common.buy")} {tokens.left}</Button>
              </div>
              <div className="col-6 pl5">
                <Button type="primary" onClick={gotoTrade.bind(this,{side:'sell'})} className="bg-error border-none">{intl.get("common.sell")} {tokens.left}</Button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
export default connect(
  ({sockets:{tickersOfSource}})=>({tickersOfSource})
)(MarketDetail)







