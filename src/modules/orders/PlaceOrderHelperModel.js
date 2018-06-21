const MODULES = 'placeOrderHelper'
export default {
  namespace: MODULES,
  state: {
   amountPercentage:0,
   amountSlider:0,
   amountSliderSelected:false
  },
  effects:{
    *init({ payload={} }, { put }) {
      // yield put({ type: 'pairChangeEffects',payload});
    },
    *amountSliderEffects({ payload={} }, { put }) {
      const {percentage} = payload
      yield put({ type: 'amountPercentageChange', payload:{percentage}});
      yield put({ type: 'amountSliderChange',payload:{percentage}});
      yield put({ type: 'amountSliderSelectedChange',payload:{amountSliderSelected:true}});
    },
    *amountPercentageEffects({ payload={} }, { put }) {
      const {percentage} = payload
      yield put({ type: 'amountPercentageChange', payload:{percentage}});
      yield put({ type: 'amountSliderSelectedChange',payload:{amountSliderSelected:false}});
    },
  },
  reducers: {
    amountPercentageChange(state, {payload}) {
      let {percentage} = payload
      return {
        ...state,
        amountPercentage:percentage
      }
    },
    amountSliderChange(state, {payload}) {
      let {percentage} = payload
      return {
        ...state,
        amountSlider:percentage
      }
    },
    amountSliderSelectedChange(state, {payload}) {
      let {amountSliderSelected} = payload
      return {
        ...state,
        amountSliderSelected
      }
    },
  },
};


