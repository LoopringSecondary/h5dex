import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs } from 'antd-mobile'
import { Switch } from 'antd'

const TodoItem = ({item,actions,key,index})=>{
    // if(!item){ return null }
    // const tickerFm = new TickerFm(item)
    const gotoDetail = ()=>{
      routeActions.gotoPath('/trade/detail')
    }
    return (
      <div className="row ml0 mr0 p10 align-items-center zb-b-b no-gutters" onClick={gotoDetail}>
        <div className="col-auo text-left">
          {
            index%2 === 0 &&
            <i className="loopring-icon loopring-icon-approve fs24"></i>
          }
          {
            index%2 === 1 &&
            <i className="loopring-icon loopring-icon-approve fs24"></i>
          }
        </div>
        <div className="col text-left">
          <div className="fs20 color-black-1">Enable LRC to Trade</div>
          <div className="fs16 color-black-3">Once enable, valid for all orders</div>
        </div>
        <div className="col-auto text-left">
          <Switch size="small" defaultChecked />
        </div>
      </div>
    )
}


const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
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
      this.rData = genData();
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
          <TodoItem key={rowID} index={rowID} />
        );
      };
      return (
          <Tabs
            tabs={
              [
                { title: <div className="fs20">Todos</div> },
                { title: <div className="fs20">Messages</div> },
              ]
            }
            tabBarBackgroundColor={"#fff"}
            tabBarActiveTextColor={"#000"}
            tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
            tabBarTextStyle={{}}
            initialPage={1}
            onChange={(tab, index) => {}}
            onTabClick={(tab, index) => { }}
          >
            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderHeader={() => null}
              renderFooter={() => (<div className="text-center pt10 pb45 mb10">{this.state.isLoading ? 'Loading...' : 'Loaded'}</div>)}
              renderRow={row}
              className="am-list"
              pageSize={5}
              useBodyScroll={false}
              style={{
                 height: "100%",
                 overflow: 'auto',
              }}
              onScroll={() => { console.log('scroll'); }}
              scrollRenderAheadDistance={300}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
            <div className="p50">
              Messages ToDO
            </div>
          </Tabs>
      )
  }
}
export default connect()(ListTickers)

