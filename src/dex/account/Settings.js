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
    { value: 0, label: 'English',checked:true},
    { value: 1, label: 'Chinese',checked:false},
  ];
  const currencys = [
    { value: 0, label: 'USD',checked:true},
    { value: 1, label: 'CNY',checked:false },
  ];
  const ttls = [
    { value: 0, label: '1 Month',checked:true},
    { value: 1, label: '1 Week',checked:false },
    { value: 2, label: '1 Day',checked:false },
    { value: 3, label: '1 Hour',checked:false },
    { value: 4, label: 'Custom',checked:false },
  ];


  const languageChange = ()=>{}
  return (
    <div className="bg-white position-relative" style={{height:'100vh',overflow:'auto',padding:'76px 0px 30px'}}>
      <NavBar
        className="bg-white position-absolute w-100"
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
      <div className="pt45"></div>
      <div className="bg-white settings pb10">
        <div className="divider 1px zb-b-t"></div>
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5 mt15 pl5">Language</div>}>
            {languages.map(i => (
              <RadioItem className="zb-b-b" key={i.value} checked={i.checked} onChange={() => languageChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5 mt15 pl5">Currency</div>}>
            {currencys.map(i => (
              <RadioItem className="zb-b-b" key={i.value} checked={i.checked} onChange={() => languageChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5 mt15 pl5">Trading Fee Ratio</div>}>
            <List.Item className="">
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
            <List.Item className="" style={{height:'auto'}}>
              <div className="row no-gutters ml0 mr0 fs13 color-black-2">
               <div className="col-auto">Slow</div>
               <div className="col text-center">0.1%</div>
               <div className="col-auto">Fast</div>
              </div>
            </List.Item>

          </List>
          {
            false &&
            <List className="m10 no-border text-left" renderHeader={() => <div className="fs13 color-black-4 mb5">Currency</div>}>
              {ttls.map(i => (
                <RadioItem className="zb-b-b" key={i.value} checked={i.checked} onChange={() => languageChange(i.value)}>
                  {i.label}
                </RadioItem>
              ))}
            </List>
          }
          
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



