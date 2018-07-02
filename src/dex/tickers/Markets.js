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
        <div className=""  style={{height:'100%'}}>
          <div style={{height:'45px'}}></div>
          <NavBar
            style={{top:'0px',position:'absolute',zIndex:10}}
            className="w-100 zb-b-t bg-white"
            mode="light"
            icon={null && <Icon type="left" />}
            onLeftClick={() => routeActions.gotoPath('/wallet/trade')}
            leftContent={ [
              <i key="1" className="icon-home" />,
            ]}
            rightContent={[
              <i onClick={()=>window.Toast.info('Coming Soon', 1)} key="1" className="icon-search" />,
            ]}
          >
            {intl.get('common.markets')}
          </NavBar>
          <div className="divider 1px zb-b-t"></div>
          <ListMarketTickers />
        </div>
      </LayoutDexHome>
    )
  }
}
export default Markets
