import React from 'react'
import { connect } from 'dva'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Button, Icon, Modal, NavBar, NoticeBar, SegmentedControl, Switch, Toast } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { toBig, toHex, toNumber } from 'LoopringJS/common/formatter'
import TokenFormatter, { getBalanceBySymbol } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import Contracts from 'LoopringJS/ethereum/contracts/Contracts'
import eachLimit from 'async/eachLimit'
import each from 'async/each'
import { isApproving } from '../../modules/transactions/formatters'
import storage from 'modules/storage'
import { signTx } from '../../common/utils/signUtils'


function ListMessages (props) {
  return (
    <LayoutDexHome {...props}>
      <div className="">
        <NavBar
          className="w-100 zb-b-b bg-white"
          mode="light"
          icon={null && <Icon type="left"/>}
          onLeftClick={() => routeActions.goBack()}
          leftContent={null && [
            <WebIcon key="1" type="left" className="color-black-1" onClick={goBack}/>,
          ]}
          rightContent={null && [
            <WebIcon onClick={() => window.Toast.info('Coming Soon', 1)} key="1" type="question-circle-o"
                     className=""/>,
          ]}
        >
          <SegmentedControl
            values={[intl.get('todo_list.todo_list_title'), intl.get('message_list.message_list_title')]}
            style={{width: '180px', height: '32px'}}/>

        </NavBar>
        <div className="pt50"></div>
      </div>
    </LayoutDexHome>
  )
}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
    txs: state.sockets.pendingTx.items,
    allocates: state.sockets.orderAllocateChange.items,
    gasPrice: state.gas.gasPrice.estimate
  }
}

export default connect(mapStateToProps)(ListMessages)

