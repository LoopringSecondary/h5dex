import React from 'react';
import {Link} from 'dva/router';
import intl from 'react-intl-universal';
import ListMarketTickers from './ListMarketTickers';
import { NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'

class Markets extends React.Component {
  render(){
    return (
      <LayoutDexHome {...this.props}>
        <div className="tabs-no-border no-underline"  style={{height:'100%'}}>
          { true && <div style={{height:'45px'}}></div> }
          {
            true &&
            <NavBar
              style={{top:'0px',position:'absolute',zIndex:10}}
              className="w-100 bg-black"
              mode="dark"
              icon={null && <Icon type="left" />}
              onLeftClick={() => routeActions.gotoPath('/wallet/trade')}
              leftContent={ [
                <WebIcon key="1" type="home" className="" />,
              ]}
              rightContent={[
                <WebIcon key="1" type="search" className="" />,
              ]}
            >
              {intl.get('common.markets')}
            </NavBar>
          }
          <ListMarketTickers />
        </div>
      </LayoutDexHome>
    )
  }
}
export default Markets
