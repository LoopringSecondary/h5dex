import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';

const HelperOfFAQ = (props)=>{
  return (
    <div className="fs20">
      <div className="zb-b-b p10">
        <div className="fs14 color-black-1 mb5">订单提交和取消</div>
        <div className="fs12 color-black-2 lh20">
          1. 没有余额/余额不足也可以下单<br />
          2. 下单后资产不冻结不锁定，可随时转出<br />
          3. 下单不会消耗 ETH Gas <br />
          4. 取消订单不会消耗 ETH Gas <br />
          5. 取消的订单无法恢复
        </div>
      </div>
      <div className="zb-b-b p10">
        <div className="fs14 color-black-1 mb5">订单生效和失效</div>
        <div className="fs12 color-black-2 lh20">
          1. 资产未开启交易，订单自动失效<br />
          2. 资产已开启交易，账户无余额，订单自动失效 <br />
          3. 资产已开启交易，账户有余额，订单自动生效 <br />
          4. 资产已开启交易，账户余额不足，订单自动部分生效 <br />
          5. 失效的订单可通过操作使其自动生效
        </div>
      </div>
      <div className="zb-b-b p10">
        <div className="fs14 color-black-1 mb5">订单撮合和成交</div>
        <div className="fs12 color-black-2 lh20">
          1. todo<br />
          1. todo<br />
        </div>
      </div>

    </div>
  )
}
export default HelperOfFAQ





