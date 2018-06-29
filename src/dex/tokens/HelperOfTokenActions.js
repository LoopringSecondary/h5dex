import React from 'react';
import { Modal,List,Button } from 'antd-mobile';
import intl from 'react-intl-universal';

function HelperOfTokenActions(props) {
  return (
    <div className="">
        <List renderHeader={() => <div className="pt15 pb15 fs18 color-black-1">LRC</div>} className="popup-list">
          <List.Item arrow="horizontal" extra="0.05 LRC">
            转换 ETH 为 WETH
          </List.Item>
          <List.Item arrow="horizontal" extra="0.05 LRC">
            转入 LRC
          </List.Item>
          <List.Item arrow="horizontal" extra="0.05 LRC">
            买入 LRC
          </List.Item>
          <List.Item arrow="horizontal" extra="0.05 LRC">
            切换到其他钱包
          </List.Item>
        </List>
    </div>
  )
}
export default HelperOfTokenActions
