import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import { ListView,Button } from 'antd-mobile'

const TickerHeader = ({list,actions})=>{
    // if(!item){ return null }
    // const tickerFm = new TickerFm(item)
    return (
      <div className="bg-white row ml0 mr0 pt5 pb5 pl10 pr10 align-items-center no-gutters">
        <div className="col-5 fs18 color-black-3 text-left">Market</div>
        <div className="col-4 text-left pr10">
          <div className="fs18 color-black-3 ">Price</div>
        </div>
        <div className="col-3 text-right">
          <div className="fs18 color-black-3">Change</div>
        </div>
      </div>
    )
}

const TickerItem = ({item,actions})=>{
    // if(!item){ return null }
    // const tickerFm = new TickerFm(item)
    return (
      <div className="row ml0 mr0 p10 align-items-center zb-b-b no-gutters">
        <div className="col-5 fs20 color-black-1">LRC-WETH</div>
        <div className="col-4 text-left">
          <div className="fs20 color-black-1">0.00095</div>
          <div className="fs16 color-black-3">$0.52</div>
        </div>
        <div className="col-3 text-right">
          <Button type="primary" size="small" className="pl10 pr10 fs20">+15.2%</Button>
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
const NUM_ROWS = 100;
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
          <TickerItem key={rowID} />
        );
      };
      return (
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => <TickerHeader />}
          renderFooter={() => (<div className="p15">{this.state.isLoading ? 'Loading...' : 'Loaded'}</div>)}
          renderRow={row}
          className="am-list"
          pageSize={5}
          useBodyScroll
          onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      )
  }
}
export default connect()(ListTickers)

