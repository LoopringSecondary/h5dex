import React from 'react';
import {Link} from 'dva/router';
import Layout from '../../layout';
import Footer from '../../layout/Footer';
import intl from 'react-intl-universal';
import Tickers from '../tickers';
import Orders from '../orders';
import My from '../orders/My';
import { TabBar,NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';

class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'markets',
        hidden: false,
        fullScreen: false,
      };
  }
  render(){
    return (
      <div style={{ position:"fixed",height: "100%", width: '100%', top: 0,overflow:'auto'}}>
              <TabBar
                unselectedTintColor="#949494"
                selectedTintColor="#000"
                tintColor="#000"
                barTintColor="white"
                hidden={this.state.hidden}
              >
                <TabBar.Item
                  title="Markets"
                  key="markets"
                  icon={
                    <WebIcon type="line-chart" className="fs22" style={{marginTop:'4px'}} />
                  }
                  selectedIcon={
                    <WebIcon type="line-chart" className="fs22" style={{marginTop:'4px'}} />
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
                  <div className="tabs-no-border no-underline"  style={{height:'100%'}}>
                    <div style={{height:'45px'}}></div>
                    <NavBar
                      style={{top:'0px',position:'absolute',zIndex:10}}
                      className="w-100 zb-b-b"
                      mode="light"
                      icon={null && <Icon type="left" />}
                      onLeftClick={() => console.log('onLeftClick')}
                      leftContent={ [
                        <Icon key="1" type="bars" />,
                      ]}
                      rightContent={[
                        <WebIcon key="1" type="search" className="color-black-1" />,
                      ]}
                    >
                    Markets
                    </NavBar>
                    <Tickers.ListTickers />
                  </div>
                </TabBar.Item>
                <TabBar.Item
                  icon={<WebIcon type="sync" className="fs22" style={{marginTop:'4px'}} />}
                  selectedIcon={<WebIcon type="sync" className="fs22" style={{marginTop:'4px'}} />}
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
                  icon={<WebIcon type="user" className="fs22" style={{marginTop:'4px'}} />}
                  selectedIcon={<WebIcon type="user" className="fs22" style={{marginTop:'4px'}} />}
                  title="My"
                  key="my"
                  selected={this.state.selectedTab === 'my'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'my',
                    });
                  }}
                >
                  <My />
                </TabBar.Item>
              </TabBar>
      </div>
    )
  }
}



export default Home
