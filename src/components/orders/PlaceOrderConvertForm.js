import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import {MenuItem} from './PlaceOrderPriceHelper';
import ConvertForm from '../tokens/ConvertForm'
const Item = List.Item;
const Brief = Item.Brief;

const tabs = [
  { title: <Badge count={2}>Balances</Badge> },
  { title: <Badge >Related Orders</Badge> },
];

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class PlaceOrderConvert extends React.Component {
  state = {
    type: 'money',
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div className="bg-grey-100">
        <NavBar
          mode="light"
          icon={null && <Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          leftContent={[
            <WebIcon key="1" type="left" />,
          ]}
          rightContent={null && [
            <WebIcon key="1" type="left" />,
          ]}
        >
        Convert
        </NavBar>
        <ConvertForm />
        <ConvertAmountHelperPopup />
      </div>
    );
  }
}

const PlaceOrderConvertForm = createForm()(PlaceOrderConvert);
export default PlaceOrderConvertForm

const ConvertAmountHelperPopup = ()=>{
  return (
    <Modal
      popup
      visible={false}
      onClose={()=>{}}
      animationType="slide-up"
    >
      <ConvertAmountHelper />
    </Modal>
  )
}

const ConvertAmountHelper = ()=>{
  return (
    <div className="tc">
      <MenuItem label="" />
    </div>
  )
}





