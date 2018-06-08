import React from 'react';
import {Link} from 'dva/router';
import Layout from '../../layout';
import Footer from '../../layout/Footer';
import intl from 'react-intl-universal';
import Tickers from '../tickers';
import Orders from '../orders';
import { TabBar,NavBar,Icon,Tabs,Badge } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';

class HomeTabs extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'markets',
        hidden: false,
        fullScreen: false,
      };
  }
  render(){
    const tabs = [
      { title: <Badge text={null && '3'}>Markets</Badge> },
      { title: <Badge text={null && '今日(20)'}>Trade</Badge> },
      { title: <Badge dot={null}>Me</Badge> },
    ];
    return (
      <div className="no-underline">
        <Tabs tabs={tabs}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div>
            <div className=""  style={{height:'100%'}}>
              <div style={{height:'45px'}}></div>
              <NavBar
                style={{top:'0px',position:'absolute',zIndex:10}}
                className="w-100 zb-b-b"
                mode="dark"
                icon={null && <Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                leftContent={[
                  <WebIcon key="1" type="menu-fold" />,
                ]}
                rightContent={[
                  <WebIcon key="1" type="" />,
                ]}
              >
              Markets
              </NavBar>
              <Tickers.ListTickers />
            </div>
          </div>
          <div>
            <Orders.PlaceOrderFormStand />
          </div>
          <div>
            Content of third tab
          </div>
        </Tabs>
      </div>
    )
  }
}

export default HomeTabs
