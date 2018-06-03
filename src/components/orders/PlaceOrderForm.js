import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl } from 'antd-mobile';
import { createForm } from 'rc-form';
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

class H5NumberInputExample extends React.Component {
  state = {
    type: 'money',
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div className="bg-white">
        <WingBlank>
          <WhiteSpace />
          <SegmentedControl values={['Buy LRC', 'Sell LRC']} style={{ height: '40px'}} />
          <WhiteSpace />
        </WingBlank>
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
        </List>
        <List renderHeader={()=>"Notes"}>
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
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{height: '150px', backgroundColor: '#fff' }}>
            <div className="row">
              <div className="col-6">
                <table class="w-100">
                  <thead>
                    <tr>
                      <th className="text-left bg-grey-50">Buy</th>
                      <th className="text-right bg-grey-50">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      [1,2,3].map((item,index)=>
                        <tr>
                          <td className="text-left text-up">0.00095</td>
                          <td className="text-right">1000.00</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <table class="w-100">
                  <thead>
                    <tr>
                      <th className="text-left bg-grey-50">Buy</th>
                      <th className="text-right bg-grey-50">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      [1,2,3].map((item,index)=>
                        <tr>
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
            <table class="w-100">
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
                    <tr>
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
      </div>
    );
  }
}

const H5NumberInputExampleWrapper = createForm()(H5NumberInputExample);
export default H5NumberInputExampleWrapper

