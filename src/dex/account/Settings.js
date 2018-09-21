import React from 'react'
import { connect } from 'dva'
import { NavBar, Slider,List,Radio } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { toNumber } from 'LoopringJS/common/formatter'
import Worth from 'modules/settings/Worth'
import intl from 'react-intl-universal'
const RadioItem = Radio.RadioItem;

function Settings(props) {
  const {gas,settings,dispatch} = props
  
  const hideLayer = (payload = {}) => {
    dispatch({
      type: 'layers/hideLayer',
      payload: {
        ...payload
      }
    })
  }
  const languages = [
    { value: 0, label: 'English' },
    { value: 1, label: 'Chinese' },
  ];
  const currencys = [
    { value: 0, label: 'USD' },
    { value: 1, label: 'CNY' },
  ];
  const ttls = [
    { value: 0, label: '1 Month' },
    { value: 1, label: '1 Week' },
    { value: 2, label: '1 Day' },
    { value: 3, label: '1 Hour' },
    { value: 4, label: 'Custom' },
  ];


  const languageChange = ()=>{}
  return (
    <div className="bg-white" style={{maxHeight:'100vh',height:'auto'}}>
      <NavBar
        className="zb-b-b bg-white"
        mode="light"
        onLeftClick={()=>hideLayer({id:'settings'})}
        leftContent={[
          <span key='1' className=""><WebIcon type="close"/></span>,
        ]}
        rightContent={null && [
          <WebIcon key="1" type="question-circle-o"/>,
        ]}
      >
        <div className="color-black">Settings</div>
      </NavBar>
      <div className="divider 1px zb-b-t"></div>
      <div className="bg-white settings pb10">
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5">Language</div>}>
            {languages.map(i => (
              <RadioItem className="zb-b-b" key={i.value} checked={0} onChange={() => languageChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5">Currency</div>}>
            {currencys.map(i => (
              <RadioItem className="zb-b-b" key={i.value} checked={0} onChange={() => languageChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5">Trading Fee</div>}>
            <List.Item className="" style={{height:'auto'}}>
              <div className="pt10 pb10">
                <Slider
                  style={{ }}
                  defaultValue={26}
                  min={0}
                  max={30}
                  onChange={()=>{}}
                  onAfterChange={()=>{}}
                />
              </div>
            </List.Item>
          </List>
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5">Currency</div>}>
            {ttls.map(i => (
              <RadioItem className="zb-b-b" key={i.value} checked={0} onChange={() => languageChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          {
            false &&
            <List className="m10 no-border text-left settings" renderHeader={() => <div className="fs13 color-black-4 mb5">Order TTL</div>}>
              <List.Item className="">
                <select defaultValue="1" className="color-black-1">
                  <option value="1">1 Month</option>
                  <option value="2">1 Week</option>
                  <option value="3">1 Day</option>
                  <option value="3">1 Hour</option>
                  <option value="3">Custom</option>
                </select>
               </List.Item>
            </List>
          }
      </div>
    </div>
  )
}
export default connect(({settings})=>({settings}))(Settings)



