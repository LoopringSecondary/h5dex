import React from 'react'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import HelperOfTokens from './HelperOfTokens'
import Face2FaceConfirm from './Face2FaceConfirm'

function Modals(props) {
  return (
    <div>
      <Containers.Layers id="helperOfTokens">
        <UiContainers.Popups id="helperOfTokens">
          <HelperOfTokens />
        </UiContainers.Popups>
      </Containers.Layers>
      <Containers.Layers id="face2FaceConfirm">
        <UiContainers.Popups id="face2FaceConfirm">
          <Face2FaceConfirm />
        </UiContainers.Popups>
      </Containers.Layers>
    </div>
  )
}
export default Modals
