import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm,sorterByMarket,sorterByVolume,sorterByPirce,sorterByChange} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs } from 'antd-mobile'
import { Spin,Icon } from 'antd'
import { getMarketTickersBySymbol } from './formatters'
import Worth from 'modules/settings/Worth'
import {formatPrice} from 'modules/orders/formatters'
import markets from 'modules/storage/markets'

export const Sorter = ({className,style={},isActive,direction})=>{
  return (
    <div className={`${className}`} style={{paddingLeft:'1px',...style}}>
      <div style={{position:'absolute',top:'0.1rem'}} className={`lh10 fs6 ${isActive && direction=== 'up' ? 'text-primary' : ''}`} >▲</div>
      <div style={{position:'absolute',top:'0.8rem'}} className={`lh10 fs6 ${isActive && direction=== 'down' ? 'text-primary': ''}`}>▼</div>
    </div>
  )
  // return (
  //   <div className={`${className} ${active}`}>
  //     <Icon hidden type="up" style={{position:'absolute',top:'2px'}} className="lh10" ></Icon>
  //     <Icon hidden type="down" style={{position:'absolute',top:'12px'}} className="lh10"></Icon>
  //     <Icon type={`arrow-${direction}`} className=""></Icon>
  //   </div>
  // )

}
export const TickerHeader = ({sort,dispatch})=>{
  const sortByType = (type) => {
    dispatch({
      type:'sockets/extraChange',
      payload:{
        id:'tickersOfSource',
        extra:{
          sort: {
            sortBy:type ,
            orderBy:sort.orderBy === 'ASC' ? 'DESC' : 'ASC'
          }
        }
      }
    })
  }
  let direction
  if(sort.orderBy === 'ASC'){direction = 'up'}
  if(sort.orderBy === 'DESC'){direction = 'down'}
  if(!sort.sortBy){
    sort.sortBy = 'volume'
    direction = 'down'
  }
  return (
    <div className="row ml0 mr0 pl10 pr10 align-items-center no-gutters">
      <div className="col-4 fs12 color-black-4 text-left hover-default pt5 pb5" onClick={sortByType.bind(this, 'volume')}>
        <span className="position-relative">
        {intl.get('common.volume')} <Sorter className="d-inline-block " isActive={sort.sortBy === 'volume'} direction={direction}></Sorter>
        </span>
      </div>
      <div className="col-auto pr10 fs16 pt5 pb5">
        <Icon type="star-o" className="color-black-4" style={{opacity:0}}/>
      </div>
      <div className="col text-left pl5 pr10 hover-default pt5 pb5" onClick={sortByType.bind(this, 'price')}>
        <div className="fs12 color-black-4 position-relative">
          {intl.get('common.price')} <Sorter className="d-inline-block " isActive={sort.sortBy === 'price'} direction={direction}></Sorter>
        </div>
      </div>
      <div className="col-3 text-right hover-default pt5 pb5" onClick={sortByType.bind(this, 'change')}>
        <div className="fs12 color-black-4 mr5 position-relative">
          {intl.get('ticker.change')} <Sorter className="d-inline-block " isActive={sort.sortBy === 'change'} direction={direction}></Sorter>
        </div>
      </div>
    </div>
  )
}

export const TickerItem = ({item,actions,key,tickersList,dispatch})=>{
    if(!item){ return null }
    const {extra:{favored={}, sort={}, keywords}} = tickersList
    const tickerFm = new TickerFm(item)
    const tokens = tickerFm.getTokens()
    const direction = tickerFm.getChangeDirection()
    const gotoDetail = ()=>{
      routeActions.gotoPath(`/dex/markets/${item.market}`)
    }
    const toggleTickerFavored = (item, e)=>{
      e.stopPropagation();
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
    return (
      <div className="row ml0 mr0 p10 align-items-center no-gutters hover-default zb-b-b" onClick={gotoDetail}>
        <div className="col-auto pr10 fs14" onClick={toggleTickerFavored.bind(this, item.market)}>
          {
            favored[item.market] &&
            <i type="star" className="text-primary icon-star"/>
          }
          {
            !favored[item.market] &&
            <i className="color-black-4 icon-star-o"/>
          }
        </div>
        <div className="col-4 text-left">
          <div className="fs16 lh15">
            <span className="fs16 color-black-1">{tokens.left}</span>
            <span className="fs12 color-black-4"> / {tokens.right}</span>
          </div>
          <div className="fs12" style={{marginTop:'2px'}}>
              <span className="fs12 color-black-4">{intl.get('common.volume')} {tickerFm.getVol()} {false && tokens.right}</span>
          </div>
        </div>
        <div className="col text-left pr10 pl5">
          <div className="fs16 color-black-1 lh15">{formatPrice(tokens.left, tokens.right, tickerFm.getLast())}</div>
          <div className="fs12 color-black-4" style={{marginTop:'2px'}}><Worth amount={formatPrice(tokens.left, tokens.right, tickerFm.getLast())} symbol={tokens.right}/></div>
        </div>
        <div className="col-3 text-right">
          {
            direction === 'up' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-success color-white">
             +{tickerFm.getChange()}
            </Button>
          }
          {
            direction === 'down' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-error color-white">
             {tickerFm.getChange()}
            </Button>
          }
          {
            direction === 'none' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-grey-500 color-white">
             {tickerFm.getChange()}
            </Button>
          }
        </div>
      </div>
    )
}
export const TickerList = ({items,loading,dispatch, tickersList})=>{
  const {extra:{sort={}, keywords}} = tickersList
  const sortedItems = [...items]
  if(sort.sortBy) {
    switch(sort.sortBy) {
      case 'market':
        sortedItems.sort(sorterByMarket)
        if(sort.orderBy === 'DESC') {
          sortedItems.reverse()
        }
        break;
      case 'volume':
        sortedItems.sort(sorterByVolume)
        if(sort.orderBy === 'DESC') {
          sortedItems.reverse()
        }
        break;
      case 'price':
        sortedItems.sort(sorterByPirce)
        if(sort.orderBy === 'DESC') {
          sortedItems.reverse()
        }
        break;
      case 'change':
        sortedItems.sort(sorterByChange)
        if(sort.orderBy === 'DESC') {
          sortedItems.reverse()
        }
        break;
    }
  }

  return (
    <div className="bg-white" style={{minHeight:'50vh'}}>
      <div className="divider 1px zb-b-t"></div>
      <Spin spinning={loading}>
        {!loading && items.length > 0 &&
          <div>
            <TickerHeader sort={sort} dispatch={dispatch}/>
            <div className="divider 1px zb-b-t"></div>
            {sortedItems.map((item, index) => <TickerItem key={index} item={item} dispatch={dispatch} tickersList={tickersList}/>)}
          </div>
        }
        {!loading && items.length === 0 &&
          <div className="p10 text-center color-black-4">
            {intl.get('common.list.no_data')}
          </div>
        }
      </Spin>
    </div>
  )
}

class ListMarketTickers extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      const {tickersOfSource:list,dispatch} = this.props
      const tickersFm = new TickersFm(list)
      const allTickers = tickersFm.getAllTickers().filter(item=>item.label === 'whitelist')
      const favoredTickers = tickersFm.getFavoredTickers().filter(item=> {
        return allTickers.find((n)=>n.market === item.market)
      })
      const recentTickers = tickersFm.getRecentTickers()
      const sorter = (a,b)=>{
        if(a.vol === b.vol ){
          if(a.last === b.last){
            return b.market > a.market ? -1 : 1
          }else{
            return Number(b.last) - Number(a.last)
          }
        }else{
          return Number(b.vol) - Number(a.vol)
        }
      }
      allTickers.sort(sorter)
      const marketGroups = {}
      allTickers.forEach(item=>{
        const market = item.market.split('-')
        let group = marketGroups[market[1]]
        if(group){
          group.push(item)
        } else {
          group = [item]
        }
        marketGroups[market[1]] = group
      })
      favoredTickers.sort(sorter)
      const tabs = []
      const tickerItems = []
      if(marketGroups && Object.keys(marketGroups).length > 0) {
        tabs.push({ title: <div className="fs16">{intl.get('ticker_list.title_favorites')}</div> })
        tickerItems.push(<TickerList key={'fav'} items={favoredTickers} loading={list.loading} dispatch={dispatch} tickersList={list}/>)
        const keys = Object.keys(marketGroups)
        const wethIndex = keys.findIndex(item=> item === 'WETH')
        if(wethIndex > -1) {
          keys.splice(wethIndex, 1);
          tabs.push({title: <div className="fs16">{'WETH'}</div>})
          tickerItems.push(<TickerList key={'WETH'} items={getMarketTickersBySymbol('WETH',allTickers)} loading={list.loading} dispatch={dispatch} tickersList={list}/>)
        }
        const lrcIndex = keys.findIndex(item=> item === 'LRC')
        if(lrcIndex > -1) {
          keys.splice(lrcIndex, 1);
          tabs.push({title: <div className="fs16">{'LRC'}</div>})
          tickerItems.push(<TickerList key={'LRC'} items={getMarketTickersBySymbol('LRC',allTickers)} loading={list.loading} dispatch={dispatch} tickersList={list}/>)
        }
        keys.forEach(item => {
          tabs.push({title: <div className="fs16">{item}</div>})
          tickerItems.push(<TickerList key={item} items={getMarketTickersBySymbol(item,allTickers)} loading={list.loading} dispatch={dispatch} tickersList={list}/>)
        })
      }
      return (
        <Spin spinning={list.loading} className="pt50">
          <Tabs
            tabs={tabs}
            tabBarTextStyle={{}}
            initialPage={1}
            swipeable={false}
            onChange={(tab, index) => {}}
            onTabClick={(tab, index) => { }}
          >
            {tickerItems}
          </Tabs>
        </Spin>
      )
  }
}
export default connect(
  ({sockets:{tickersOfSource}})=>({tickersOfSource})
)(ListMarketTickers)

