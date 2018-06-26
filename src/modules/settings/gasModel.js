import storage from 'modules/storage'
import {configs} from 'common/config/data'

const namespace = 'gas'

export default {
  namespace,
  state: {
    ...storage.settings.getGas(),
    tabSelected:'estimate', // estimate | custom
  },
  effects:{
  },
  reducers: {
    init(state, { payload }) {
      return  {
        ...state,
        gasPrice:{
          ...state.gasPrice,
          current:state.gasPrice.last
        },
        tabSelected:'estimate' // estimate | custom
      };
    },
    estimateGasChange(state, { payload }) {
      const {gasPrice} = payload
      let newState =  {
        ...state,
        gasPrice: {
          ...state.gasPrice,
          estimate : gasPrice || state.gasPrice.estimate,
        },
      };
      //do not need to store in localStorage
      return newState
    },
    currentGasChange(state, { payload }) {
      const {gasPrice} = payload
      let newState =  {
        ...state,
        gasPrice: {
          ...state.gasPrice,
          current : gasPrice ? gasPrice : state.gasPrice.current,
        },
      };
      //do not need to store in localStorage
      return newState
    },
    tabChange(state, { payload }) {
      const {tabSelected} = payload
      return  {
        ...state,
        tabSelected
      };
    },
  }
}
