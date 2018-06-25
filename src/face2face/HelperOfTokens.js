import React from 'react';
import { Modal,List,Button,SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import intl from 'react-intl-universal';

function HelperOfTokens(props) {
  return (
    <div className="" >
        <SearchBar placeholder="Search" maxLength={8} />
        <div style={{maxHeight:'50vh',overflow:'auto'}}>
          <List className="popup-list">
            {
              Array(10).fill({symbol:'LRC'}).map((item,index)=>{
                return (
                  <List.Item key={index} arrow="horizontal" extra="10.00 LRC">
                  <i className={`mr10 icon icon-${item.symbol}`}></i>
                  {item.symbol}
                  </List.Item>
                )
              })
            }
          </List>
        </div>
    </div>
  )
}
export default connect(({
  sockets,
  face2face,
})=>({
 balance:sockets.balance,
}))(HelperOfTokens)
