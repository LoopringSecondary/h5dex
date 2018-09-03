import React from 'react';
import { Modal,List,Button } from 'antd-mobile';
import intl from 'react-intl-universal';

function HelperOfAdvance(props) {
  return (
    <div className="">
        <List renderHeader={() => <div className="pt15 pb15 fs18 color-black-1">高级选项</div>} className="popup-list">
          <List.Item arrow="horizontal" extra="0.05 LRC">{intl.get('common.lrc_fee')}</List.Item>
          <List.Item arrow="horizontal" extra="06-10 10:00">{intl.get('order.validSince')}</List.Item>
          <List.Item arrow="horizontal" extra="06-10 10:00">{intl.get('order.validUntil')}</List.Item>
        </List>
    </div>
  )
}
export default HelperOfAdvance
