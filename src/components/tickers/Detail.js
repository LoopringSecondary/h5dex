import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Card } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import {DepthList,FillList} from '../orders/PlaceOrderAmountHelper';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
const Item = List.Item;
const Brief = Item.Brief;

class MarketDetail extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }
  render() {
    const dispatch = this.props.dispatch
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
    const gotoConfirm= ()=>{

    }
    const showPriceHelper= ()=>{
      showLayer({id:'placeOrderPriceHelper'})
    }
    const side ="buy"
    return (
      <div className="bg-grey-100">
        <NavBar
          className="zb-b-b"
          mode="light"
          icon={null && <Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={null && [
            <Icon key="1" type="left" />,
          ]}
          leftContent={[
            <Icon key="1" type="left" />,
          ]}
        >
        LRC-WETH
        </NavBar>
        <div className="bg-white">
          <div className="p10 zb-b-b">
            <span className="fs28 font-weight-bold color-green-600">0.00089000</span>
            <span className="color-black-3 fs16 ml10">￥3.35</span>
          </div>
          <div className="p10 zb-b-b">
            <div className="row ml0 mr0 pt5 pb5 no-gutters align-items-center fs16">
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H涨跌幅
              </div>
              <div className="col color-green-600 font-weight-bold fs18">
                +12.00%
              </div>
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H最高价
              </div>
              <div className="col-auto color-black-1">
                0.00092350
              </div>
            </div>
            <div className="row ml0 mr0 pt5 pb5 no-gutters align-items-center fs16">
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H交易量
              </div>
              <div className="col color-black-1">
                1347.65 WETH
              </div>
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H最低价
              </div>
              <div className="col-auto color-black-1">
                0.00085800
              </div>
            </div>
          </div>
        </div>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <div className="fs20 pt5 pb5">Charts</div> },
                { title: <div className="fs20 pt5 pb5">Depth</div> },
                { title: <div className="fs20 pt5 pb5">Trades</div> },
                { title: <div className="fs20 pt5 pb5">Info</div> },
              ]
            }
            tabBarBackgroundColor={'#fff'}
            tabBarInactiveTextColor={"#000"}
            tabBarTextStyle={{}}
            initialPage={1}
            swipeable={false}
            onChange={(tab, index) => { }}
            onTabClick={(tab, index) => { }}
          >
            <div className="p10" style={{minHeight: '150px'}}>Charts</div>
            <div className="">
              <DepthList depth={{items:Array(15).fill(1)}} maxRows={8} />
            </div>
            <div className="p10" style={{minHeight: '150px'}}>
              <FillList fill={{items:Array(15).fill(1)}} maxRows={10} />
            </div>
            <div className="p10" style={{minHeight: '150px'}}>Info</div>
          </Tabs>
        </div>
        <div className="position-fixed p5 w-100 bg-white" style={{bottom:'0'}}>
          <div className="row ml0 mr0 no-gutters">
            <div className="col-6">
              <Button className="bg-green-500 color-white m5">Buy LRC</Button>
            </div>
            <div className="col-6">
              <Button className="bg-red-500 color-white m5">Sell LRC</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({layers})=>({layers}))(MarketDetail)





