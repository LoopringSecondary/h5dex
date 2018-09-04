import React from 'react';
import {Link} from 'dva/router';
import intl from 'react-intl-universal';
import ListMarketTickers from './ListMarketTickers';
import { NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import routeActions from 'common/utils/routeActions'
import LayoutPCDEX from '../../layout/LayoutPCDEX'
import {connect} from 'dva'

class Markets extends React.Component {
  render(){
    const search = () => {
      routeActions.gotoPath('/dex/markets/search/fromMarkets')
    }
    return (
      <LayoutPCDEX {...this.props}>
        <div className=""  style={{height:'100%'}}>
          <div style={{height:'45px'}}></div>
          <NavBar
            style={{top:'0px',position:'absolute',zIndex:10}}
            className="w-100 zb-b-t bg-white"
            mode="light"
            icon={null && <Icon type="left" />}
            leftContent={ [
            ]}
            rightContent={[
              <i style={{width:'32px',height:'32px',lineHeight:'32px',textAlign:'right'}} onClick={search} key="1" className="icon-search" />,
            ]}
          >
            <div className="color-black">{intl.get('common.markets')}</div>
          </NavBar>
          <div className="bg-white">
            <div className="divider 1px zb-b-t "></div>
          </div>
          <ListMarketTickers />
          <div className="pb50"></div>
          <div className="pb15"></div>
        </div>
      </LayoutPCDEX>
    )
  }
}
export default connect() (Markets)
