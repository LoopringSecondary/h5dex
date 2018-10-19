import React from 'react'
import { NavBar, Tabs } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { connect } from 'dva'
import routeActions from 'common/utils/routeActions'
import { getTokensByMarket } from 'modules/formatter/common'
import Face2FaceOrders from './Face2FaceOrders'
import Face2FaceBalances from './Face2FaceBalances'
import Face2FaceForm from './Face2FaceForm'
import intl from 'react-intl-universal'

class Face2FacePage extends React.Component {
  render() {
    const {dispatch,placeOrder} = this.props
    const {side,pair} = placeOrder
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
    return (
        <div className="">
          <NavBar
            className="bg-white"
            mode="light"
            leftContent={null && [
              <span onClick={routeActions.goBack} className="color-black-1" key="1"><WebIcon type="left" /></span>,
            ]}
            rightContent={[
              <span className="text-primary" key="1"  onClick={()=>{}}><WebIcon type="question-circle-o" /></span>
            ]}
          >
            <div className="color-black">
              Face To Face
            </div>
          </NavBar>
          <div className="bg-white"><div className="divider 1px zb-b-t"></div></div>
          <div className="bg-white">
            <Face2FaceForm side="sell" showLayer={showLayer} />
          </div>
          <div className="bg-white"><div className="divider 1px zb-b-t"></div></div>
          <div className="no-underline tabs-no-border">
            <Tabs
              tabs={
                [
                  { title: <div className="am-tabs-item-wrapper-bak"><div className="fs16 am-tabs-item-bak">{intl.get('user_center.my_assets')}</div></div> },
                  { title: <div className="am-tabs-item-wrapper-bak"><div className="fs16 am-tabs-item-bak">{intl.get('user_center.my_orders')}</div></div> },
                ]
              }
              tabBarBackgroundColor="#fff"
              tabBarActiveTextColor={"#000"}
              tabBarInactiveTextColor={"#999"}
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div className="zb-b-t">
                <Face2FaceBalances />
              </div>
              <div className="">
                <Face2FaceOrders />
              </div>
            </Tabs>
            <div className="pb50"></div>
          </div>
        </div>
    );
  }
}
export default connect(({placeOrder})=>({placeOrder}))(Face2FacePage)





