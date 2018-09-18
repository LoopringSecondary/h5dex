import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';

const HelperOfFAQ = (props)=>{
  return (
    <div className="fs20">
      <div className="zb-b-b p10">
        <div className="fs14 color-black-2 mb5">技巧提示</div>
        <div className="fs12 color-black-3 lh20">
          1. 余额不足也可以先下单：支持先下单后转入资产<br />
          1. 交易没有授权也可以先下单：支持先下单后进行交易授权<br />
          2. 点击深度里的 价格 和数量 可以快速完成下单<br />
        </div>
      </div>
            <div className="zb-b-b p10">
        <div className="fs14 color-black-2 mb5">交易手续费</div>
        <div className="fs12 color-black-3 lh20">
          1. 手续费比例多少？0.1% （LRC作为手续费） <br />
          2. 什么时候扣除手续费？成交时才会扣除 <br />
          3. 如何扣除手续费？智能合约从交易者地址转到矿工地址 <br />
        </div>
      </div>
            <div className="zb-b-b p10">
        <div className="fs14 color-black-2 mb5">操作说明</div>
        <div className="fs12 color-black-3 lh20">
          1. 挂单：不消耗 ETH 和 LRC<br />
          2. 取消挂单：不消耗 ETH 和 LRC<br />
          3. 成交：不消耗 ETH，消耗 LRC （作为矿工撮合费）<br />
          4. 未成交：不消耗 ETH 和 LRC<br />
          5. 代币授权：消耗 ETH 油费 <br />
        </div>
      </div>
      <div className="zb-b-b p10">
        <div className="fs14 color-black-2 mb5">交易体验特点</div>
        <div className="fs12 color-black-3 lh20">
          1. 资产0托管：交易过程中资产一直在你的钱包里<br />
          2. 下单0门槛：没有资产也可以下单，支持先下单后付款<br />
          3. 资产0冻结：下单后资产不冻结不锁定，可随时转出<br />
          4. 流程简单：无需充值，无需提现<br />
          5. 付款安全：不接触用户的私钥，支持扫码下单/授权下单<br />
          6. 买卖灵活：抄底和高抛两不耽误<a hidden className="text-primary ml5">更多交易技巧</a><br />
        </div>
      </div>
      <div className="zb-b-b p10">
        <div className="fs14 color-black-2 mb5">订单生效和失效</div>
        <div className="fs12 color-black-3 lh20">
          1. 资产未授权交易，订单自动失效<br />
          2. 资产已授权交易，账户无余额，订单自动失效 <br />
          3. 资产已授权交易，账户有余额，订单自动生效 <br />
          4. 资产已授权交易，账户余额不足，订单自动部分生效 <br />
          5. 失效的订单可通过上述操作使其自动生效
        </div>
      </div>
      <div hidden className="zb-b-b p10">
        <div className="fs14 color-black-2 mb5">订单撮合和成交</div>
        <div className="fs12 color-black-3 lh20">
          1. todo<br />
          2. todo<br />
        </div>
      </div>
    </div>
  )
}
export default HelperOfFAQ





