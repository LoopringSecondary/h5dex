import { routerRedux} from 'dva/router';
import createHashHistory from 'history/createHashHistory';
const history  = createHashHistory()
export default  {
  goBack:()=>{
      history.goBack()
  },
  goForward:()=>{
      history.goForward()
  },
  gotoRoute:(route)=>{
      history.push(route);
  },
  gotoPath:(path,state)=>{
    history.push({
      pathname:path,
      ...state,
    });
  },
  gotoHref:(href)=>{
     window.open(href);
  },
  getParamsByMatch:(match)=>{
    if(match && match.params){
      return match.params
    }else{
      return null
    }
  },
  match:{
    getParams:(props)=>{
      if(props && props.match && props.match.params){
        return props.match.params
      }else{
        return null
      }
    },
    getUrl:(props)=>{
      if(props && props.match && props.match.url){
        return props.match.url
      }else{
        return null
      }
    },
  },
  location:{
    getPathname:(props)=>{
      if(props && props.location && props.location.pathname){
        return props.location.pathname
      }else{
        return null
      }
    },
    getState:(props)=>{
      if(props && props.location && props.location.state){
        return props.location.state
      }else{
        return null
      }
    },
  }
}

