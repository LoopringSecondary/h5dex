import React from 'react';
import { List, InputItem,Button,WingBlank,Slider } from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

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

class H5NumberInputExample extends React.Component {
  state = {
    type: 'money',
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="0.00085"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ></InputItem>
          <InputItem
            type={type}
            placeholder="1000.00"
            clear
            moneyKeyboardAlign="left"
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ></InputItem>
          <Item>
            <Slider
              defaultValue={12}
              min={0}
              max={30}
              handleStyle={{
                height: '10px',
                width: '10px',
                marginLeft: '-7px',
                marginTop: '-4px',
              }}
            />
          </Item>
          <InputItem
            type={type}
            defaultValue="0.85 WETH"
            moneyKeyboardAlign="right"
            editable={false}
          >Total</InputItem>
          <Item extra="1.5 LRC" arrow="horizontal" onClick={() => {}}>LRC Fee</Item>
          <Item extra="06-10 10:22" arrow="horizontal" onClick={() => {}}>Time To Live</Item>

          <Item>
            <Button type="primary">Place Buy Order</Button>
          </Item>

        </List>
      </div>
    );
  }
}

const H5NumberInputExampleWrapper = createForm()(H5NumberInputExample);
export default H5NumberInputExampleWrapper

