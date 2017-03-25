sap.ui.controller("zui5_fiori_00.view.Master", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf webapp.view.Master
	 */
	//	onInit: function() {
	//
	//	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf webapp.view.Master
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf webapp.view.Master
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf webapp.view.Master
	 */
	//	onExit: function() {
	//
	//	}
	onItemPress:function(e){
		var path = e.getParameters().listItem.getBindingContext().sPath.substr(1);
		console.log(path);
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("detail",{from:"main",Carrid:path});
	},
	onListUpdateFinished:function(e){
		console.log("binding changed");
		var list = e.getSource();
		var item0 = list.getItems()[0];
		list.setSelectedItem(item0);
		console.log("item 1 selected");
		var path = item0.getBindingContext().sPath.substr(1);
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("detail",{from:"main",Carrid:path});
	}
});