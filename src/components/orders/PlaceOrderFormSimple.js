import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import PlaceOrerConfirm from './PlaceOrderConfirm';
const Item = List.Item;
const Brief = Item.Brief;

const tabs = [
  { title: <Badge >OrderBook</Badge> },
  { title: <Badge dot>My Orders</Badge> },
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

class PlaceOrder extends React.Component {
  state = {
    type: 'money',
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div className="">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={null && [
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          <SegmentedControl values={['Buy LRC', 'Sell LRC']} style={{ height: '32px',width: '180px'}} />
        </NavBar>
        <List className="bg-grey-50">
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="0.00085"
            clear
            moneyKeyboardAlign="right"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<span className="bg-grey-200"> + </span>}
          >Price</InputItem>
          <InputItem
            type={type}
            placeholder="1000.00"
            clear
            moneyKeyboardAlign="right"
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >Amount</InputItem>
          <Item
            className="bg-grey-100"
            type={type}
            extra="0.85 WETH"
          >Total</Item>
          <Item
            className="bg-grey-100"
            type={type}
            arrow="horizontal"
          >Advanced</Item>
          <Item className="bg-grey-100">
            <Button type="primary">Place Buy Order</Button>
          </Item>
        </List>
        <PlaceOrderConfirmPopup />
      </div>
    );
  }
}

const PlaceOrderConfirmPopup = ()=>{
  return (
    <Modal
      popup
      visible={false}
      onClose={()=>{}}
      animationType="slide-up"
    >
      <PlaceOrerConfirm />
    </Modal>
  )
}

const PlaceOrderForm = createForm()(PlaceOrder);
export default PlaceOrderForm

