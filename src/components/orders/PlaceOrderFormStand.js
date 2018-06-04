import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import PlaceOrerConfirm from './PlaceOrderConfirm';
const Item = List.Item;
const Brief = Item.Brief;

const tabs = [
  { title: <Badge >My Tokens</Badge> },
  { title: <Badge >My Orders</Badge> },
  { title: <Badge >My Fills</Badge> },
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
          icon={null && <Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={null && [
            <Icon key="1" type="ellipsis" />,
          ]}
          leftContent={[
            <WebIcon key="1" type="menu-fold" />,
          ]}
        >
        LRC-WETH
        </NavBar>
        <div className="row ml0 mr0 bg-white zb-b-t" style={{positiom:'relative',zIndex:'10'}}>
          <div className="col-6 text-center fs20 color-black pt15 pb15 zb-b-b " >Buy LRC</div>
          <div className="col-6 text-center fs20 pt15 pb15 zb-b-l font-weight-bold color-red-600 " >Sell LRC</div>
        </div>
        <List className="bg-none no-border">
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            placeholder="0.00000000"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<WebIcon type="profile" />}
          >Price</InputItem>
          <InputItem
            type={type}
            placeholder="0.00000000"
            clear
            moneyKeyboardAlign="left"
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<WebIcon type="profile" />}
          >Amount</InputItem>
          {
            true &&
            <InputItem
              type={type}
              placeholder="0.00000000"
              extra={<span className="fs16 color-black-4">{null && "WETH"}</span>}
              clear
              moneyKeyboardAlign="left"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              editable={false}
            >Total</InputItem>
          }
          {
            false &&
            <Item>
              <div className="row align-items-center ml0 mr0">
                <div className="col color-black-1 fs24 pl0">Total</div>
                <div className="col-auto color-black-3 fs16 pr0">0 WETH</div>
              </div>
            </Item>
          }
          <Item>
            <div className="row align-items-center ml0 mr0 mb15 mt10">
              <div className="col color-black-3 fs16 pl0">Advanced</div>
              <div className="col-auto color-black-3 fs16 pr0"><WebSwitch size="small" /></div>
            </div>
            <Button className="w-100 d-block bg-red-600 border-none mb10" type="primary">Place Sell Order</Button>
          </Item>
        </List>

        <div className="mt20"></div>
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{backgroundColor: '#fff' }}>
            <table className="w-100">
              <thead>
                <tr>
                  <th className="text-left bg-grey-50 pl10 font-weight-normal color-black-3">Token</th>
                  <th className="text-right bg-grey-50 p5 font-weight-normal color-black-3">Balance</th>
                  <th className="text-right bg-grey-50 pr10 font-weight-normal color-black-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                  <tr >
                    <td className="p10 color-black-2 text-left">LRC</td>
                    <td className="p10 color-black-2 text-right">12680.0000</td>
                    <td className="p10 color-black-2 text-right">
                      <a className="ml5 mr5" href="">转入</a>
                      <a className="ml5 mr5" href="">买入</a>
                    </td>
                  </tr>
                  <tr >
                    <td className="p10 color-black-2 text-left">ETH</td>
                    <td className="p10 color-black-2 text-right">85.0000</td>
                    <td className="p10 color-black-2 text-right">
                      <a className="ml5 mr5" href="">转入</a>
                      <a className="ml5 mr5" href="">买入</a>
                    </td>
                  </tr>
                  <tr >
                    <td className="p10 color-black-2 text-left">WETH</td>
                    <td className="p10 color-black-2 text-right">21.3652</td>
                    <td className="p10 color-black-2 text-right">
                      <a className="ml5 mr5" href="">转换ETH</a>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
          <div style={{height: '150px', backgroundColor: '#fff' }}>
            <table className="w-100">
              <thead>
                <tr>
                  <th className="text-left bg-grey-50 p5 font-weight-normal color-black-3">Side</th>
                  <th className="text-right bg-grey-50 p5 font-weight-normal color-black-3">Price</th>
                  <th className="text-right bg-grey-50 p5 font-weight-normal color-black-3">Amount</th>
                  <th className="text-right bg-grey-50 p5 font-weight-normal color-black-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  [1,2,3].map((item,index)=>
                    <tr key={index}>
                      <td className="p5 text-left text-down">Sell</td>
                      <td className="p5 color-black-2 text-right">0.00095</td>
                      <td className="p5 color-black-2 text-right">1000</td>
                      <td className="p5 color-black-2 text-right">Open</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          <div style={{height: '150px', backgroundColor: '#fff' }}>

          </div>
        </Tabs>
        {
          false &&
          <div className="p10 bg-white" style={{position:'absolute',bottom:'0',left:'0',right:'0'}}>
            <Button className="w-100 d-block" type="primary">Place Buy Order</Button>
          </div>
        }
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

