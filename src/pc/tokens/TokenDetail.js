import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs,NavBar,Icon,SegmentedControl  } from 'antd-mobile'
import { Switch,Icon as WebIcon} from 'antd'

const data = [
  {
    type: 'enable',
    title: 'Enable LRC To Trade',
    value: '',
    gas: '0.00015 eth',
    status:'success',
  },
  {
    type: 'send',
    title: 'Sent LRC',
    value: '- 1000.0000',
    gas: '0.000125 eth',
    status:'success',
  },
  {
    type: 'receive',
    title: 'Received LRC',
    value: '+ 3566.0000',
    gas: '0.000135 eth',
    status:'success',
  },
  {
    type: 'buy',
    title: 'Bought LRC',
    value: '+ 2688.0000',
    gas: '0.000135 eth',
    status:'failed',
  },
  {
    type: 'sell',
    title: 'Sold LRC',
    value: '- 6233.0000',
    gas: '0.000135 eth',
    status:'pending',
  },
];

const TxItem = ({item={},actions,key,index})=>{
    // if(!item){ return null }
    // const tickerFm = new TickerFm(item)
    console.log('todo item',item)
    const gotoDetail = ()=>{
      routeActions.gotoPath('/trade/detail')
    }
    return (
      <div className="">
        <div className="row ml0 mr0 pl10 pr10 pt15 pb15 align-items-center zb-b-b no-gutters" onClick={()=>{}}>
          <div className="col-auo pr10 color-black text-center">
              {item.type === "sell" && <i className={`loopring-icon loopring-icon-trade fs24`} style={{}}></i> }
              {item.type === "buy" && <i className={`loopring-icon loopring-icon-trade fs24`} style={{}}></i> }
              {item.type === "send" && <i className={`loopring-icon loopring-icon-transfer fs24`} style={{}}></i> }
              {item.type === "receive" && <i className={`loopring-icon loopring-icon-receive fs24`} style={{}}></i> }
              {item.type === "enable" && <i className={`loopring-icon loopring-icon-success fs24`} style={{}}></i> }
          </div>
          <div className="col text-left">
            <div>
              <div className="fs14 color-black-2">
                {item.title}
                { item.status === 'success' && <WebIcon className="ml5 fs14 color-success" type="check-circle-o" /> }
                { item.status === 'failed' && <WebIcon className="ml5 fs14 color-error" type="exclamation-circle-o" /> }
                { item.status === 'pending' && <WebIcon className="ml5 fs14 color-blue-500" type="clock-circle-o" /> }
              </div>
              <div className="fs12 color-black-3">
                06-03 10:00:00
              </div>
            </div>
          </div>
          <div className="col-auto text-right">
            <div className="color-black-2 fs14">
              {item.value && item.value}
            </div>
            <div className="color-black-3 fs12">
              {item.gas}
            </div>

          </div>
        </div>

      </div>

    )
}

const NUM_ROWS = 15;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

const TxListHeader = ()=>{
  return (
    <div className="color-black-2">
      <div className="row ml0 mr0 fs14 zb-b-t">
        <div className="col text-center pt10 pb10 zb-b-r">
          Status <WebIcon className="fs12" type="down" />
        </div>
        <div className="col text-center pt10 pb10 zb-b-r">
          Types <WebIcon className="fs12" type="down" />
        </div>
        <div className="col text-center pt10 pb10 ">
          Sides <WebIcon className="fs12" type="down" />
        </div>
      </div>
    </div>
  )
}

export class TxList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      // this.rData = genData();
      this.rData = data;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }
  onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      console.log('reach end', event);
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.rData = { ...this.rData, ...genData(++pageIndex) };
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      }, 1000);
  }
  render(){
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <TxItem key={rowID} index={rowID} item={obj} />
      );
    };
    return (
       <ListView
         ref={el => this.lv = el}
         dataSource={this.state.dataSource}
         renderHeader={() => null}
         renderFooter={() => (<div className="text-center pt10 pb45 mb10">{this.state.isLoading ? 'Loading...' : 'Loaded'}</div>)}
         renderRow={row}
         className="am-list-bg-none"
         pageSize={5}
         useBodyScroll={true}
         style={{
            height: "100%",
            overflow: 'auto',
         }}
         onScroll={() => { console.log('scroll'); }}
         scrollRenderAheadDistance={300}
         onEndReached={this.onEndReached}
         onEndReachedThreshold={10}
       />
    )
  }
}

class TokenDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }
  componentDidMount() {
  }
  render(){
      const goBack = ()=>{
        routeActions.goBack()
      }
      return (
          <div className=""  style={{height:'100%'}}>
            <NavBar
              className="w-100 zb-b-b"
              mode="light"
              onLeftClick={() => console.log('onLeftClick')}
              leftContent={ [
                <WebIcon key="1" type="left" className="color-black-1" onClick={goBack}/>,
              ]}
              rightContent={[
                <WebIcon key="1" type="ellipsis" className="color-black-1" />,
              ]}
            >
            LRC
            {
              false &&
              <SegmentedControl values={['Transactions', 'Trade']} style={{width:'210px',height:'32px'}}/>
            }
            </NavBar>
            <div className="pt30 pb30 pl15 pr15 text-center bg-white">
                <i className="icon-LRC fs26 color-black-1 d-inline-block mb5" style={{width:"40px",height:'40px',lineHeight:"38px",borderRadius:'50em',border:"1px solid #eee"}}></i>
                <div className="fs24 color-black-1">
                  0.000000
                </div>
                <div className="fs16 color-black-3">
                  $ 0.000000
                </div>
            </div>
            <div className="divider 1px zb-b-t"></div>
            <div hidden className="p10 bg-white">
              <SegmentedControl values={['Transactions','Orders','Fills']} style={{height:'40px'}}/>
            </div>
            <div className="no-underline">
              <Tabs
                tabs={
                  [
                    { title: <div className="am-tabs-item-wrapper zb-b-r"><div className="fs16 am-tabs-item-bak">Transactions</div></div> },
                    { title: <div className="am-tabs-item-wrapper"><div className="fs16 am-tabs-item-bak">Trade</div></div> },
                  ]
                }
                swipeable={false}
                tabBarBackgroundColor={"#fff"}
                tabBarActiveTextColor={"#000"}
                tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
                tabBarTextStyle={{}}
                initialPage={0}
                onChange={(tab, index) => {}}
                onTabClick={(tab, index) => { }}
              >
                <div className="">
                  <TxListHeader />
                  <TxList />
                </div>
                <div className="p15">
                  Trades
                </div>
              </Tabs>
            </div>

            <div className="position-fixed bg-white p5" style={{bottom:'0',left:'0',right:'0',zIndex:10}}>
              <div className="row ml0 mr0 no-gutters">
                <div className="col-6">
                  <Button onClick={routeActions.gotoPath.bind(this,'/wallet/send')} type="primary" className="m5 fs16" style={{height:'44px',lineHeight:'44px'}}>
                    <i className="fs24 loopring-icon loopring-icon-transfer mr10"></i>
                    <span className="d-inline-block position-relative" style={{top:'-3px'}}>Send</span>
                  </Button>
                </div>
                <div className="col-6">
                  <Button onClick={routeActions.gotoPath.bind(this,'/wallet/receive')} type="ghost" className="m5 fs16" style={{height:'44px',lineHeight:'44px'}}>
                    <i className="fs24 loopring-icon loopring-icon-receive mr10"></i>
                    <span className="d-inline-block position-relative" style={{top:'-3px'}}>Receive</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
      )
  }
}
export default connect()(TokenDetail)

