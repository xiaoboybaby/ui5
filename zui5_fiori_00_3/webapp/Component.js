sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"zui5_fiori_00/model/models"
], function(UIComponent, Device, models) {
	"use strict";
	return UIComponent.extend("zui5_fiori_00.Component", {
		metadata: {
			"version": "1.0.0",
			"rootView": {
				viewName: "zui5_fiori_00.view.App",
				type: sap.ui.core.mvc.ViewType.XML
			},
			"dependencies": {
				"libs": [
					"sap.ui.core",
					"sap.m",
					"sap.ui.layout"
				]
			},
			"config": {
				"i18nBundle": "zui5_fiori_00.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": "",
				"serviceConfig": {
					"name": "ZGW_FIORI_LSQ_SRV",
					"serviceUrl": "/sap/opu/odata/SAP/ZGW_FIORI_LSQ_SRV/"
				}
			},
			routing: {
				config: {
					routerClass: sap.m.routing.Router,
					viewType: "XML",
					viewPath: "zui5_fiori_00.view",
					clearTarget: false
				},
				routes: [{
					pattern: "",
					name: "master",
					view: "Master",
					targetAggregation: "masterPages",
					targetControl: "idApp",
					subroutes: [
					{
						pattern: "detail/{Carrid}",
						name: "detail",
						view: "Detail",
						targetAggregation: "detailPages"
					}
					
					]
				}]
			}
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();
			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			//init model
			// Create and set domain model to the component
			var sServiceUrl = mConfig.serviceConfig.serviceUrl;
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {
				json: true,
				loadMetadataAsync: true
			});
		
			this.setModel(oModel);
			
			//init the router
			this.getRouter().initialize();
		},
		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) {
					// apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});