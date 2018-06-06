import React from 'react';
import {Link} from 'dva/router';
import Layout from '../../layout';
import Footer from '../../layout/Footer';
import intl from 'react-intl-universal';
import Tickers from '../tickers';
import Orders from '../orders';
import { TabBar,NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';

class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'redTab',
        hidden: false,
        fullScreen: false,
      };
  }
  render(){
    return (
      <div style={{ position:"fiexd",height: "100vh", width: '100%', top: "0",}}>
              <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
              >
                <TabBar.Item
                  title="Markets"
                  key="markets"
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                  />
                  }
                  selected={this.state.selectedTab === 'markets'}
                  badge={null && 1}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'markets',
                    });
                  }}
                  data-seed="logId"
                >
                <div className="position-relative"  style={{paddingTop:'45px'}}>
                  <NavBar
                    style={{top:'0px',position:'fixed',zIndex:10}}
                    className="w-100"
                    mode="light"
                    icon={null && <Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={null && [
                      <Icon key="1" type="ellipsis" />,
                    ]}
                    leftContent={[
                      <WebIcon key="1" type="menu-fold" />,
                    ]}
                  >
                  Markets
                  </NavBar>
                  <Tickers.ListTickers />
                </div>

                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                    />
                  }
                  title="Trade"
                  key="trade"
                  badge={null && 'new'}
                  selected={this.state.selectedTab === 'trade'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'trade',
                    });
                  }}
                  data-seed="logId1"
                >
                  <Orders.PlaceOrderFormStand />
                </TabBar.Item>
                <TabBar.Item
                  icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                  selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                  title="My"
                  key="my"
                  selected={this.state.selectedTab === 'my'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'my',
                    });
                  }}
                >
                  333
                </TabBar.Item>
              </TabBar>
      </div>
    )
  }
}



export default Home
