<script>
	import {
		ArrowOverlay,
		DEFAULT,
		EVENT_TAP,
		EVENT_CANVAS_CLICK
	} from '@jsplumbtoolkit/browser-ui'

	import HelloComponent from '../components/HelloComponent.svelte'
	import WorldComponent from '../components/WorldComponent.svelte'

	import {
		SurfaceComponent, ControlsComponent, MiniviewComponent
	} from "@jsplumbtoolkit/browser-ui-svelte"
	
	let surfaceComponent

	const renderOptions = {
		simpleEdgeStyles: true,
		events: {
			[EVENT_CANVAS_CLICK]: function (surface) {
				surface.toolkitInstance.clearSelection()
			}
		}
	}

	const view = {
		nodes: {
			// abstract parent node definition - declares a tap listener
			clickable: {
				events: {
					[EVENT_TAP]: (p) => {
						alert(`You clicked on node ${p.obj.id}`)
						p.toolkit.setSelection(p.obj)
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

		<SurfaceComponent viewOptions={view}
						  renderOptions={renderOptions}
						  bind:this={surfaceComponent}
						  url="/dataset.json">
			<MiniviewComponent />
			<ControlsComponent />
		</SurfaceComponent>


</div>

