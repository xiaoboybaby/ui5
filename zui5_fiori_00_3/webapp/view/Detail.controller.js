sap.ui.controller("zui5_fiori_00.view.Detail", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf webapp.view.Detail
	 */
		onInit: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRouteMatched(this.onRouteMatched, this);
		},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf webapp.view.Detail
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf webapp.view.Detail
	 */
		onAfterRendering: function() {
			//this.getView().bindElement("/flightSet('AA')");
	
		},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf webapp.view.Detail
	 */
	//	onExit: function() {
	//
	//	}
	onRouteMatched:function(oEvent){
		if(oEvent.getParameters().name == "detail"){
			var carrid = oEvent.getParameters().arguments.Carrid;
			var sEntityPath = "/" + carrid;
			this.getView().bindElement(sEntityPath);
		
	
		}
	}

});