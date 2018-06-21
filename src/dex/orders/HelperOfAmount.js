import React from 'react';
import { connect } from 'dva';
import { Tabs,Slider } from 'antd-mobile';
import intl from 'react-intl-universal';
import HelperOfDepth from './HelperOfDepth'

function HelperOfAmount(props) {
  const tabs = [
    { title: <div className="text-center">Balance</div> },
    { title: <div className="text-center">Depth</div> },
  ]
  return (
    <div className="tabs-no-border">
      <div hidden className="pt15 pb15 fs18 color-black-1 zb-b-b text-center">Amount Helper</div>
      <Tabs tabs={tabs}
        tabBarActiveTextColor={"#000"}
        tabBarInactiveTextColor={"rgba(0,0,0,0.35)"}
        swipeable={false}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div className="bg-grey-100 pt15 pb15">
          <div className="row pt10 pb10 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10">
              <span className="d-inline-block" style={{width:'50px'}}>100%</span>
              <span className="color-black-3 ml25">1500.00 LRC</span>
            </div>
          </div>
          <div className="row pt10 pb10 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10">
              <span className="d-inline-block" style={{width:'50px'}}>75%</span>
              <span className="color-black-3 ml25">1125.00 LRC</span>
            </div>
          </div>
          <div className="row pt10 pb10 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10">
              <span className="d-inline-block" style={{width:'50px'}}>50%</span>
              <span className="color-black-3 ml25">750.00 LRC</span>
            </div>
          </div>
          <div className="row pt15 pb15 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10">
              <span className="d-inline-block" style={{width:'50px'}}>25%</span>
              <span className="color-black-3 ml25">375.00 LRC</span>
            </div>
          </div>
          <div className="row pt15 pb15 ml0 mr0">
            <div className="col color-black-1 text-left pl10">
              自定义
              <span className="ml5">10%</span>
              <span className="color-black-3 ml25">150.00 LRC</span>
            </div>
          </div>
          <div className="mt15 pb25">
            <Slider
              className="ml15 mr15"
              defaultValue={10}
              min={0}
              max={100}
              onChange={()=>{}}
              onAfterChange={()=>{}}
            />
          </div>
        </div>
        <div className="zb-b-t bg-grey-100" style={{maxHeight:'45vh',overflow:'auto'}}>
          <HelperOfDepth />
        </div>
      </Tabs>
    </div>
  )
}
export default connect(({
  placeOrder:{pair,side}
})=>({
  pair,side
}))(HelperOfAmount)



