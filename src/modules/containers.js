import {getContainers} from 'common/redux'
import models from './models'
import Currency from './settings/CurrencyContainer'
import Worth from './settings/Worth'
export {Currency}
export {Worth}

export default {
  ...getContainers(models),
  Currency,
  Worth,
}


