import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs,NavBar,Icon,SegmentedControl,Grid } from 'antd-mobile'
import { Switch,Icon as WebIcon,Badge} from 'antd'
import { TxList } from './TokenDetail'

const TokenItem = ({item={},actions,key,index})=>{
    // if(!item){ return null }
    // const tickerFm = new TickerFm(item)
    console.log('todo item',item)
    const gotoDetail = ()=>{
      routeActions.gotoPath('/tokenDetail')
    }
    return (
      <div>
        <div className="row ml0 mr0 pt15 pb15 pl10 pr10 align-items-center zb-b-b no-gutters" onClick={gotoDetail}>
          <div className="col-auo pr10 color-black text-center">
              <i className={`icon-${item.symbol} fs24 d-block color-black-1`} style={{width:'36px',height:'36px',lineHeight:'36px',border:'1px solid #eee',borderRadius:'50em'}}></i>
          </div>
          <div className="col text-left">
            <div>
              <div className="fs16 color-black-2">
                {item.symbol}
              </div>
              <div hidden className="fs14 color-black-3">
                {item.name}
              </div>

            </div>
          </div>
          <div className="col-auto text-right">
            <div className="color-black-2 fs16">
              0.000000
            </div>
            <div className="fs14 color-black-3">
              $ 0.0000
            </div>
          </div>
        </div>

      </div>

    )
}

const data = [
  {
    symbol: 'ETH',
    name: 'Ether',
  },
  {
    symbol: 'WETH',
    name: 'Wrapper Ether',
  },
  {
    symbol: 'LRC',
    name: 'Loopring',
  },
];
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


class ListTickers extends React.Component {
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
      const goBack = ()=>{
        routeActions.goBack()
      }
      let index = data.length - 1;
      const row = (rowData, sectionID, rowID) => {
        if (index < 0) {
          index = data.length - 1;
        }
        const obj = data[index--];
        return (
          <TokenItem key={rowID} index={rowID} item={obj} />
        );
      };
      const menus = [
        {
          icon: <WebIcon type="scan" className="fs20 color-black-1 mb5" />,
          text: <div className="fs14 color-black-1">Scan</div>,
          onClick: ()=>routeActions.gotoPath('/wallet/scan'),
        },
        {
          icon: <i className="fs20 lh1 color-black-1 loopring-icon loopring-icon-receive mb5"></i>,
          text: <div className="fs14 color-black-1">Receive</div>,
          onClick: ()=>routeActions.gotoPath('/wallet/receive'),
        },
        {
          icon: <i className="fs20 lh1 color-black-1 loopring-icon loopring-icon-transfer mb5"></i>,
          text: <div className="fs14 color-black-1">Send</div>,
          onClick: ()=>routeActions.gotoPath('/wallet/send'),
        },
        {
          icon: <i className="fs20 lh1 color-black-1 loopring-icon loopring-icon-trade mb5"></i>,
          text: <div className="fs14 color-black-1">Trade</div>,
          onClick: ()=>routeActions.gotoPath('/wallet/trade'),
        },
      ]
      return (
          <div className=""  style={{height:'100%'}}>
            <NavBar
              className="w-100"
              mode="light"
              icon={null && <Icon type="left" />}
              onLeftClick={() => console.log('onLeftClick')}
              leftContent={null && [
                <WebIcon key="1" type="bars" className="color-black-1" onClic={goBack}/>,
              ]}
              rightContent={[
                <WebIcon key="1" type="plus" className="color-black-1" />,
              ]}
            >
              Test <WebIcon className="ml5 " type="down" />
            </NavBar>
            <div className="divider 1px zb-b-t"></div>
            <div className="pt40 pb20 pl15 pr15 text-center bg-white">
                <div className="fs28 color-black-1">$ 0.00000</div>
                <div className="fs16 color-black-3">
                  0x6d4ee35d...52e75005
                  <WebIcon hidden className="ml5 fs16" type="qrcode" />
                </div>
            </div>
            <Grid className="my-dex-grid" data={menus} hasLine={false} square={false} activeStyle={false} carouselMaxRow={1} isCarousel={false} columnNum={4}
              renderItem={(item,index)=>{
                return (
                  <div onClick={item.onClick.bind(this,item)}>
                    {item.icon}
                    {item.text}
                  </div>
                )
              }}
            />
            <div className="divider 1px zb-b-t mb15"></div>
            <div className="divider 1px zb-b-t"></div>
            <div className="tabs-no-border no-underline">
              <Tabs
                tabs={
                  [
                    { title: <div className="am-tabs-item-wrapper"><div className="fs16 am-tabs-item">Assets</div></div> },
                    { title: <div className="am-tabs-item-wrapper"><div className="fs16 am-tabs-item"><Badge className="ml5 t-black fs16" count={3}>Transactions</Badge></div></div> },
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
                <div className="bg-white">
                  <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <div hidden className="fs20 p15 color-black-1 zb-b-t">Assets</div>}
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
                </div>
                <div className="bg-white">
                  <TxList />
                </div>
              </Tabs>
            </div>
          </div>

      )
  }
}
export default connect()(ListTickers)

