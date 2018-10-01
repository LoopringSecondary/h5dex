import React from 'react'
import { Button } from 'antd-mobile'
import { toBig, toFixed } from 'LoopringJS/common/formatter'
import intl from 'react-intl-universal'

const HelperOfBalance = (props) => {
  const {dispatch, token, gasFee} = props
  const setMax = () => {
    let max = token.balance
    if (token.symbol.toUpperCase() === 'ETH') {
      max = toBig(token.balance).minus(gasFee).minus(0.1).isPositive() ? toBig(token.balance).minus(gasFee).minus(0.1) : toBig(0)
    }
    dispatch({type: 'convert/setMax', payload: {amount: max, amount1: max}})
  }
  return (
    <div className="fs20">
      <table className="w-100 fs13">
        <thead>
        <tr className="">
          <th
            className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3 text-nowrap">{intl.get('common.token')}</th>
          <th
            className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3 text-nowrap">{intl.get('common.balance')}</th>
          <th
            className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.actions')}</th>
        </tr>
        </thead>
        <tbody>
            <tr>
              <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
                {token.symbol}
              </td>
              <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{toFixed(token.balance, 8)}</td>
              <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right text-nowrap">
                <Button onClick={setMax}type="ghost" style={{height: '24px', lineHeight: '24px'}} className="bg-primary-light text-primary border-none ml10 d-inline-block" size="small">
                  {intl.get('convert.actions_max')}
                </Button>
              </td>
            </tr>
            <tr>
              <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
                {token.symbol.toUpperCase() === 'ETH' ? 'WETH' : 'ETH'}
              </td>
              <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{toFixed(token.balance2, 8)}</td>
              <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default HelperOfBalance




