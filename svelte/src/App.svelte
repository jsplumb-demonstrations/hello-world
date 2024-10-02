<script>
  import {
    ArrowOverlay,
    DEFAULT,
    EVENT_CANVAS_CLICK,
    EVENT_TAP
  } from '@jsplumbtoolkit/browser-ui'

  import {SurfaceComponent, ControlsComponent, MiniviewComponent} from "@jsplumbtoolkit/browser-ui-svelte"

  import HelloComponent from './lib/HelloComponent.svelte'
  import WorldComponent from './lib/WorldComponent.svelte'

  const renderOptions = {
    simpleEdgeStyles: true,
    events: {
      [EVENT_CANVAS_CLICK]: function (surface) {
        surface.toolkitInstance.clearSelection()
      }
    },
    zoomToFit:true
  }

  const view = {
    nodes: {
      // abstract parent node definition - declares a tap listener
      clickable: {
        events: {
          [EVENT_TAP]: (p) => {
            p.toolkit.setSelection(p.obj)
            alert(`You clicked on node ${p.obj.id}`)
          }
        }
      },
      // definition for 'hello' nodes. Extends 'clickable' to get the tap listener.
      hello: {
        parent: "clickable",
        component: HelloComponent
      },
      // definition for 'world' nodes. Extends 'clickable' to get the tap listener.
      world: {
        parent: "clickable",
        component: WorldComponent
      }
    },
    edges: {
      // a default edge definition. Declares an arrow overlay at its tip and extracts 'label' from
      // edge data and displays it as a label overlay (by default at location 0.5)
      [DEFAULT]: {
        overlays: [
          {
            type: ArrowOverlay.type,
            options: {
              location: 1
            }
          }
        ],
        label: "{{label}}"
      }
    }
  }


</script>

<div id="container">
  <SurfaceComponent
          viewOptions={view}
          renderOptions={renderOptions}
          url="./dataset.json">

    <MiniviewComponent/>
    <ControlsComponent/>
  </SurfaceComponent>

</div>

