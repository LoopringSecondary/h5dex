import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Card } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import {OpenOrderList,HistoryOrderList} from './ListOrders';
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
          <SegmentedControl values={['Orders', 'Fills']} style={{width:'180px',height:'32px'}}/>
        </NavBar>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <div className="fs16 pt5 pb5">Open Orders</div> },
                { title: <div className="fs16 pt5 pb5">History Orders</div> },
              ]
            }
            tabBarBackgroundColor={'#fff'}
            tabBarInactiveTextColor={"rgba(0, 0, 0, 0.35)"}
            tabBarActiveTextColor={"#000"}
            tabBarTextStyle={{}}
            initialPage={0}
            swipeable={false}
            onChange={(tab, index) => { }}
            onTabClick={(tab, index) => { }}
          >
            <div className="" style={{minHeight: '150px'}}>
              <OpenOrderList />
            </div>
            <div className="">
              <HistoryOrderList />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default connect(({layers})=>({layers}))(MarketDetail)





