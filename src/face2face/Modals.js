import React from 'react'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import HelperOfTokens from './HelperOfTokens'

function Modals(props) {
  return (
    <div>
      <Containers.Layers id="helperOfTokens">
        <UiContainers.Popups id="helperOfTokens">
          <HelperOfTokens />
        </UiContainers.Popups>
      </Containers.Layers>

    </div>
  )
}
export default Modals
