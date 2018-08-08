import React from 'react'
import { Icon, NavBar, SegmentedControl, Tabs } from 'antd-mobile'
import { connect } from 'dva'
import routeActions from 'common/utils/routeActions'
import { HistoryOrderList, OpenOrderList } from './ListOrders'

class MarketDetail extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }

  render () {
    const goBack = () => {
      routeActions.goBack()
    }
    return (
      <div className="bg-grey-100">
        <NavBar
          className="zb-b-b"
          mode="light"
          icon={null && <Icon type="left"/>}
          onLeftClick={() => console.log('onLeftClick')}
          leftContent={[
            <Icon key="1" type="left" onClick={goBack} className="color-black-1"/>,
          ]}
          rightContent={null && [
            <Icon key="1" type="search"/>,
          ]}

        >
          <SegmentedControl values={['Orders', 'Fills']} style={{width: '180px', height: '32px'}}/>
        </NavBar>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                {title: <div className="fs16 pt5 pb5">Open Orders</div>},
                {title: <div className="fs16 pt5 pb5">History Orders</div>},
              ]
            }
            tabBarBackgroundColor={'#fff'}
            tabBarInactiveTextColor={'rgba(0, 0, 0, 0.35)'}
            tabBarActiveTextColor={'#000'}
            tabBarTextStyle={{}}
            initialPage={0}
            swipeable={false}
            onChange={(tab, index) => { }}
            onTabClick={(tab, index) => { }}
          >
            <div className="" style={{minHeight: '150px'}}>
              <OpenOrderList/>
            </div>
            <div className="">
              <HistoryOrderList/>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default connect(({layers}) => ({layers}))(MarketDetail)





