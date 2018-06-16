import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'

class Todo extends React.Component {
  render() {
    return (
      <div className="bg-white">
        <NavBar
          className=""
          mode="light"
          onLeftClick={() => routeActions.goBack()}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1 " onClick={()=>{}}><WebIcon key="1" type="info-circle-o" /></span>
          ]}
        >
        Todo
        </NavBar>
        <div className="p50 zb-b-t">TODO</div>
      </div>
    );
  }
}
export default Todo





