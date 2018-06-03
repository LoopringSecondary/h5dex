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
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >LRC-WETH</NavBar>
        <WingBlank>
          <WhiteSpace />
          <SegmentedControl values={['Buy LRC', 'Sell LRC']} style={{ height: '40px'}} />
          <WhiteSpace />
        </WingBlank>
        <List className="bg-grey-50">
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="0.00085"
            clear
            moneyKeyboardAlign="right"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<span> + </span>}
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

          {
            false &&
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
          }
          <Item className="bg-grey-100">
            <Button type="primary">Place Buy Order</Button>
          </Item>
        </List>
        {
          false &&
          <List renderHeader={()=>"Notes"}>
            <Item extra="1.5 LRC" arrow="horizontal" onClick={() => {}}>LRC Fee</Item>
            <Item extra="06-10 10:22" arrow="horizontal" onClick={() => {}}>Time To Live</Item>
          </List>
        }

        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{height: '150px', backgroundColor: '#fff' }}>
            <div className="row">
              <div className="col-6">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-left bg-grey-50">Buy</th>
                      <th className="text-right bg-grey-50">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      [1,2,3].map((item,index)=>
                        <tr key={index}>
                          <td className="text-left text-up">0.00095</td>
                          <td className="text-right">1000.00</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-left bg-grey-50">Buy</th>
                      <th className="text-right bg-grey-50">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      [1,2,3].map((item,index)=>
                        <tr key={index}>
                          <td className="text-left text-down">0.00095</td>
                          <td className="text-right">1000.00</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>

            </div>
          </div>
          <div style={{height: '150px', backgroundColor: '#fff' }}>
            <table className="w-100">
              <thead>
                <tr>
                  <th className="text-left bg-grey-50">Side</th>
                  <th className="text-right bg-grey-50">Price</th>
                  <th className="text-right bg-grey-50">Amount</th>
                  <th className="text-right bg-grey-50">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  [1,2,3].map((item,index)=>
                    <tr key={index}>
                      <td className="text-left text-down">Sell</td>
                      <td className="text-right">0.00095</td>
                      <td className="text-right">1000</td>
                      <td className="text-right">Open</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </Tabs>
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

