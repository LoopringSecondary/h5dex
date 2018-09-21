import React from 'react'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import Settings from './Settings'

function Modals(props) {
  return (
    <div>
      <Containers.Layers id="settings">
        <UiContainers.Popups id="settings">
          <Settings />
        </UiContainers.Popups>
      </Containers.Layers>
    </div>
  )
}
export default Modals
