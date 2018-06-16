import React from 'react'
import {Containers} from 'modules'
import UiContianers from 'LoopringUI/containers'
import Detail from './Detail'
import PlaceOrderSteps from './PlaceOrderSteps'
import PlaceOrderSign from './PlaceOrderSign'
import HelperOfLRCFee from './HelperOfLRCFee'
import HelperOfTTL from './HelperOfTTL'
import CancelOrderConfirm  from './CancelOrderConfirm'

function Modals(props) {
  return (
    <div>
      {false && <Containers.Layers id="orderDetail">
        <UiContianers.Panels id="orderDetail" position="right" width="450px">
          <Detail />
        </UiContianers.Panels>
      </Containers.Layers>
      }
      <Containers.Layers id="placeOrderSteps">
        <UiContianers.Modals id="placeOrderSteps" position="left" width="600px"  className="rs" wrapClassName="theme-blue">
          <Containers.Settings>
            <Containers.Wallet>
              <Containers.Layers>
                <Containers.PlaceOrder>
                  <Containers.Sockets id="balance">
                    <Containers.Sockets id="marketcap">
                      <Containers.Sockets id="pendingTx">
                        <PlaceOrderSteps />
                      </Containers.Sockets>
                    </Containers.Sockets>
                  </Containers.Sockets>
                </Containers.PlaceOrder>
              </Containers.Layers>
            </Containers.Wallet>
          </Containers.Settings>
        </UiContianers.Modals>
      </Containers.Layers>
      <Containers.Layers id="placeOrderSign">
        <UiContianers.Modals id="placeOrderSign" width="650px">
          <PlaceOrderSign />
        </UiContianers.Modals>
      </Containers.Layers>
      <Containers.Layers id="helperOfLRCFee">
        <UiContianers.Modals id="helperOfLRCFee" className="rs">
          <HelperOfLRCFee />
        </UiContianers.Modals>
      </Containers.Layers>
      <Containers.Layers id="helperOfTTL">
        <UiContianers.Modals id="helperOfTTL" className="rs">
          <Containers.Ttl>
            <HelperOfTTL />
          </Containers.Ttl>
        </UiContianers.Modals>
      </Containers.Layers>
      <Containers.Layers id="cancelOrderConfirm">
        <UiContianers.Modals id="cancelOrderConfirm" className="rs">
          <Containers.Settings>
            <Containers.Wallet>
            <Containers.Gas>
              <CancelOrderConfirm />
            </Containers.Gas>
            </Containers.Wallet>
          </Containers.Settings>
        </UiContianers.Modals>
      </Containers.Layers>
    </div>
  )
}
export default Modals
