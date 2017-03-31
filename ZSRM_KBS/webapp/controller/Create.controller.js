sap.ui.define([
	"myCompany/myApp/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("myCompany.myApp.controller.Create", {
		oAlertDialog: null,
		oBusyDialog: null,
		initializeNewProductData: function() {
			this.getView().getModel("newProduct").setData({

			});
		},
		onInit: function() {
			//创建model
			
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "newProduct");
			this.initializeNewProductData();
			// this.getModel("newProduct").bindProperty(sap.ui.model.BindingMode.OneWay);
			//this.getRouter().getRoute("create").attachPatternMatched(this._onObjectMatched, this);
			//	this.getView().byId("smartFormPage").bindElement("/Products('4711')");
		},
		_onObjectMatched: function(oEvent) {

			//var sObjectPath = "/issueSet('" + oEvent.getParameter("arguments").objectId + "')";
			//this._bindView("");
		},
		onSave: function() {
			// Show message if no product name has been entered
			// Otherwise, get highest existing ID, and invoke create for new product

			if (!this.oBusyDialog) {
				this.oBusyDialog = new sap.m.BusyDialog();
			}
			this.oBusyDialog.open();
			this.saveProduct();

		},
		saveProduct: function(nID) {
			var mNewProduct = this.getView().getModel("newProduct").getData();
			// // Basic payload data
			// var mPayload = {
			// 	ID: nID,
			// 	Name: mNewProduct.Name,
			// 	Description: mNewProduct.Description,
			// 	ReleaseDate: this.dateFromString(mNewProduct.ReleaseDate),
			// 	Price: mNewProduct.Price.toString(),
			// 	Rating: mNewProduct.Rating
			// };

			// if (mNewProduct.DiscontinuedDate) {
			// 	mPayload.DiscontinuedDate = this.dateFromString(mNewProduct.DiscontinuedDate);
			// }

			// Add supplier & category associations
			["Ztypt", "Zmodule"].forEach(function(sRelation) {
				var oSelect = this.getView().byId("idSelect" + sRelation);
				
				var sPath = oSelect.getSelectedItem().getBindingContext().getPath();
				//console.log(sPath);
				mNewProduct[sRelation] = oSelect.getSelectedItem().getKey();
				//console.log(mNewProduct);
				// mPayload[sRelation] = {
				// 	__metadata: {
				// 		uri: sPath
				// 	}
				// };
			}, this);
			//console.log(mNewProduct);
			// Send OData Create request
			var oModel = this.getView().getModel();
			//更新使用upate方法
			oModel.create("/issueSet", mNewProduct, {
				success: jQuery.proxy(function(mResponse) {
					this.initializeNewProductData();
					sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist", {
						
					}, false);

					// ID of newly inserted product is available in mResponse.ID
					this.oBusyDialog.close();
					
					sap.m.MessageToast.show("Issue '" + mNewProduct.Title + "' added");
				}, this),
				error: jQuery.proxy(function() {
					this.oBusyDialog.close();
					this.showErrorAlert("Problem creating new issue");
				}, this)
			});

		},

		onCancel: function() {
			sap.ui.core.UIComponent.getRouterFor(this).backWithoutHash(this.getView());
		}
	});

});