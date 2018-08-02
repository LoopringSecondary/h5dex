import React from 'react'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import OrderDetail from './Detail'
import PlaceOrderSteps from './PlaceOrderSteps'
import HelperOfAdvance from './HelperOfAdvance'
import HelperOfPrice from './HelperOfPrice'
import HelperOfAmount from './HelperOfAmount'
import HelperOfMarket from './HelperOfMarket'
import CancelOrderConfirm  from './CancelOrderConfirm'
import HelperOfTTL from './HelperOfTTL'
import HelperOfLRCFee from './HelperOfLRCFee'

function Modals(props) {
  return (
    <div>
      <Containers.Layers id="orderDetail">
        <UiContainers.Popups id="orderDetail">
          <OrderDetail />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="placeOrderSteps">
        <UiContainers.Popups id="placeOrderSteps">
          <PlaceOrderSteps />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="helperOfAdvance">
        <UiContainers.Popups id="helperOfAdvance">
          <HelperOfAdvance />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="helperOfPrice">
        <UiContainers.Popups id="helperOfPrice">
          <HelperOfPrice />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="helperOfAmount">
        <UiContainers.Popups id="helperOfAmount">
          <HelperOfAmount />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="helperOfMarket">
        <UiContainers.Popups id="helperOfMarket">
          <HelperOfMarket />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="helperOfTTL">
        <UiContainers.Popups id="helperOfTTL">
          <HelperOfTTL />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="helperOfLRCFee">
        <UiContainers.Popups id="helperOfLRCFee">
          <HelperOfLRCFee />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="cancelOrderConfirm">
        <UiContainers.Popups id="cancelOrderConfirm">
          <CancelOrderConfirm />
        </UiContainers.Popups>
      </Containers.Layers>
    </div>
  )
}
export default Modals
