import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Card } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import {DepthList,FillList} from '../orders/PlaceOrderAmountHelper';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
const Item = List.Item;
const Brief = Item.Brief;

class MarketDetail extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }
  render() {
    const dispatch = this.props.dispatch
    const goBack = ()=>{
      routeActions.goBack()
    }
    const gotoTrade = ()=>{
      routeActions.gotoPath('/placeOrder/stand')
    }

    return (
      <div className="bg-grey-100">
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
        LRC-WETH
        </NavBar>
        <div className="bg-white">
          <div className="p10 zb-b-b">
            <span className="fs28 font-weight-bold color-green-600">0.00089000</span>
            <span className="fs16 color-green-600 ml10">
              +12.00%
            </span>
            <span className="fs16 color-green-600 ml10">￥3.35</span>
          </div>
          <div className="p10 zb-b-b">
            <div className="row ml0 mr0 pt5 pb5 no-gutters align-items-center fs16">
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H涨跌幅
              </div>
              {
                false &&
                <div className="col color-green-600 font-weight-bold fs18">
                  +12.00%
                </div>
              }
              <div className="col color-black-2">
                0.00092350
              </div>
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H最高价
              </div>
              <div className="col-auto color-black-2">
                0.00092350
              </div>
            </div>
            <div className="row ml0 mr0 pt5 pb5 no-gutters align-items-center fs16">
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H交易量
              </div>
              <div className="col color-black-2">
                1347.65 WETH
              </div>
              <div className="col-auto pr5 color-black-3" style={{minWidth:'70px'}}>
                24H最低价
              </div>
              <div className="col-auto color-black-2">
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
              <DepthList depth={{items:Array(15).fill(1)}} maxRows={8} />
            </div>
            <div className="" style={{minHeight: '150px'}}>
              <FillList fill={{items:Array(15).fill(1)}} maxRows={10} />
            </div>
            <div className="" style={{minHeight: '150px'}}>
              <div className="p10">Infomation</div>
            </div>
          </Tabs>
        </div>
        <div className="position-fixed p5 w-100 bg-white" style={{bottom:'0'}}>
          <div className="row ml0 mr0 no-gutters">
            <div className="col-6">
              <Button onClick={gotoTrade} className="bg-green-500 color-white m5">Buy LRC</Button>
            </div>
            <div className="col-6">
              <Button onClick={gotoTrade} className="bg-red-500 color-white m5">Sell LRC</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({layers})=>({layers}))(MarketDetail)





