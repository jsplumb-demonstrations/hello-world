const app = angular.module('app', ['$jsPlumb']);

//
// Directives for node types
//
app.directive('hello', function (jsPlumbFactory) {
    return jsPlumbFactory.node({
        templateUrl: "hello_template.tpl",
        link:function(scope, element) {
            element.addClass("hello-node");
        }
    });
});

app.directive('world', function (jsPlumbFactory) {
    return jsPlumbFactory.node({
        templateUrl: "world_template.tpl",
        link:function(scope, element) {
            element.addClass("world-node");
        }
    });
});

//
// App controller
//
app.controller("HelloWorldController", function ($log, $scope, jsPlumbService) {

    let toolkit;

// ---------------------------- / operations on nodes, edges ---------------------------------------------------------

    //
    // scope contains
    // jtk - the toolkit
    // surface - the surface
    //
    // element is the DOM element into which the toolkit was rendered
    //
    this.init = function(scope, element, attrs) {

        toolkit = scope.toolkit;

        window.s = scope.surface

        toolkit.load({
            data:{
                nodes:[
                    { id:"1", type:"hello", label:"Hello", left:50, top:50 },
                    { id:"2", type:"world", label:"World", left:350, top:50 }
                ],
                edges:[
                    { source:"1", target:"2", data:{label:"a label", color:"purple"} }
                ]
            }
        })
    };

// -------------------------------- render parameters ---------------------------------------------------

    this.renderParams = {
        view:{
            nodes:{
                // abstract parent node definition - declares a tap listener
                clickable:{
                    events:{
                        tap:(p) => {
                            alert(`You clicked on node ${p.obj.id}`)
                            toolkit.setSelection(p.obj)
                        }
                    }
                },
                // definition for 'hello' nodes. Extends 'clickable' to get the tap listener.
                hello:{
                    parent:"clickable",
                    templateId:'hello'
                },
                // definition for 'world' nodes. Extends 'clickable' to get the tap listener.
                world:{
                    parent:"clickable",
                    templateId:'world'
                }
            },
            edges:{
                // a default edge definition. Declares an arrow overlay at its tip and extracts 'label' from
                // edge data and displays it as a label overlay (by default at location 0.5)
                "default":{
                    overlays:[
                        {
                            type:jsPlumbToolkit.ArrowOverlay.type,
                            options:{
                                location: 1
                            }
                        }
                    ],
                    label:"{{label}}"
                }
            }
        },
        layout:{
            // there are several layouts that ship with the toolkit.
            type:jsPlumbToolkit.AbsoluteLayout.type,
            options:{
                //... if your chosen layout is configurable, options go here
            }
        },
        // Allows us to specify edge color (and line width) in each edge's backing data
        simpleEdgeStyles:true,
        // Use a Continuous anchor and a blank endpoint by default.
        defaults:{
            anchor:jsPlumbToolkit.AnchorLocations.Continuous,
            endpoint:jsPlumbToolkit.BlankEndpoint.type
        },
        events:{
            [jsPlumbToolkit.EVENT_CANVAS_CLICK]:function() {
                toolkit.clearSelection()
            }
        },
        zoomToFit:true,
        consumeRightClick:false
    };


});
