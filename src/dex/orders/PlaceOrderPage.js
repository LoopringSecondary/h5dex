import React from 'react'
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile'
import { Icon as WebIcon,Switch as WebSwitch} from 'antd'
import { connect } from 'dva'
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'
import {getTokensByMarket} from 'modules/formatter/common'
import HelperOfMyMarketOrders from './HelperOfMyMarketOrders'
import HelperOfMyMarketFills from './HelperOfMyMarketFills'
import HelperOfBalance from './HelperOfBalance'
import HelperOfFAQ from './HelperOfFAQ'
import HelperOfDepth from './HelperOfDepth'
import PlaceOrderForm from './PlaceOrderForm'
import {toBig,toHex,getDisplaySymbol} from 'LoopringJS/common/formatter'
import intl from 'react-intl-universal';

const Item = List.Item;
class PlaceOrderPage extends React.Component {
  render() {
    const {dispatch,placeOrder} = this.props
    const {side,pair} = placeOrder
    const params = routeActions.match.getParams(this.props)
    if(!params.market) {
      if(!pair){
        const defaultMarket = "LRC-WETH" // TODO
        routeActions.gotoPath(`/dex/placeOrder/${defaultMarket}`)
      }else{
        routeActions.gotoPath(`/dex/placeOrder/${pair}`)
      }
    }
    const pairTokens = getTokensByMarket(pair)
    const showLayer = (payload={})=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          ...payload
        }
      })
    }
    const hideLayer = (payload={})=>{
      dispatch({
        type:'layers/hideLayer',
        payload:{
          ...payload
        }
      })
    }
    const sideChange = (side)=>{
      dispatch({
        type:'placeOrder/sideChangeEffects',
        payload:{
          side
        }
      })
   }

    const gotoTrade = ()=>{
      routeActions.gotoPath(`/dex/markets/${pair}`)
    }

    const tabChange = (tab) => {
      if(tab === 'fills') {
        dispatch({type:"fills/fetch", payload:{id:"MyFills"}})
      }
    }

    return (
      <LayoutDexHome {...this.props}>
        <div className="">
          <NavBar
            className="bg-white"
            mode="light"
            leftContent={null && [
              <span onClick={()=>{}} className="" key="1"><WebIcon type="question-circle-o" /></span>,
            ]}
            rightContent={[
              <span className="" key="1"  onClick={() => routeActions.gotoPath(`/dex/markets/${pair}`) }><i className="icon-chart"></i></span>
            ]}
          >
            <div className="color-black" onClick={showLayer.bind(this,{id:'helperOfMarket'})}>
              {pair}<i className="ml5 icon-chevron-down"></i>
            </div>
          </NavBar>
          <div className="no-underline tabs-no-border h-50 place-order-form bg-white" style={{marginTop:'0px'}}>
            <div className="divider 1px zb-b-t"></div>
            <PlaceOrderForm showLayer={showLayer} />
          </div>
          <div className="mt0">
            <Tabs
              tabs={
                [
                  { title: <div className="am-tabs-item-bak-wrapper"><div className="fs16 am-tabs-item-bak">{intl.get('place_order.depth')}</div></div>, tab:'depth' },
                  { title: <div className="am-tabs-item-bak-wrapper"><div className="fs16 am-tabs-item-bak">{intl.get('place_order.orders')}</div></div>, tab:'orders' },
                  { title: <div className="am-tabs-item-bak-wrapper"><div className="fs16 am-tabs-item-bak">{intl.get('place_order.assets')}</div></div>, tab:'assets' },
                  { title: <div className="am-tabs-item-bak-wrapper"><div className="fs16 am-tabs-item-bak">{intl.get('place_order.help')}</div></div>, tab:'help' },
                ]
              }
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => tabChange(tab.tab)}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div className="zb-b-t">
                <HelperOfDepth />
              </div>
              <div className="zb-b-t">
                <HelperOfMyMarketOrders />
              </div>
              <div className="zb-b-t">
                <HelperOfBalance />
              </div>
              <div className="zb-b-t">
                <HelperOfFAQ />
              </div>
            </Tabs>
          </div>
        </div>
        <div className="pb50"></div>
        <div className="pb20"></div>
      </LayoutDexHome>
    );
  }
}
export default connect(({placeOrder})=>({placeOrder}))(PlaceOrderPage)





