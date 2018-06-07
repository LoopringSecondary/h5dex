import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import PlaceOrderPreview from './PlaceOrderPreview';
import PlaceOrderAdvance from './PlaceOrderAdvance';
import {DepthList} from './PlaceOrderAmountHelper';
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
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    const side ="buy"
    return (
      <div className="bg-grey-100">
        <NavBar
          className="zb-b-b"
          mode="light"
          icon={null && <Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={null && [
            <Icon key="1" type="ellipsis" />,
          ]}
          leftContent={null && [
            <WebIcon key="1" type="menu-fold" />,
          ]}
        >
        LRC-WETH
        </NavBar>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <div className="fs20 pt5 pb5">Buy LRC</div> },
                { title: <div className="fs20 pt5 pb5">Sell LRC</div> },
              ]
            }
            tabBarBackgroundColor={'#fff'}
            tabBarActiveTextColor={side === 'buy' ? "#43a047" : "#f44336"}
            tabBarInactiveTextColor={"#000"}
            tabBarTextStyle={{}}
            initialPage={0}
            onChange={(tab, index) => { }}
            onTabClick={(tab, index) => { }}
          >

          </Tabs>
        </div>
        <div className="no-underline">
          <Tabs
            tabBarBackgroundColor="#f5f5f5"
            tabs={
              [
                { title: <Badge >Order Book</Badge> },
                { title: <Badge className="d-block w-100 text-right pr10">Fills</Badge> },
              ]
            }
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div className="bg-grey-100">
              <DepthList />
            </div>

            <div style={{minHeight: '150px'}}>
            </div>
          </Tabs>
        </div>
        <Containers.Layers id="placeOrderPreview">
          <UiContainers.Popups id="placeOrderPreview">
            <PlaceOrderPreview />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderAdvance">
          <UiContainers.Popups id="placeOrderAdvance">
            <PlaceOrderAdvance />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderPriceHelper">
          <UiContainers.Popups id="placeOrderPriceHelper">
            <PlaceOrderPriceHelper />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderAmountHelper">
          <UiContainers.Popups id="placeOrderAmountHelper">
            <PlaceOrderAmountHelper />
          </UiContainers.Popups>
        </Containers.Layers>
      </div>
    );
  }
}
export default connect(({layers})=>({layers}))(MarketDetail)





