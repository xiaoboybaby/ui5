sap.ui.define([
		"sap/ui/core/ValueState"
	],
	function(ValueState) {
		"use strict";

		return {

			/**
			 * Rounds the number unit value to 2 digits
			 * @public
			 * @param {string} sValue the number string to be rounded
			 * @returns {string} sValue with 2 digits rounded
			 */
			numberUnit: function(sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},

			/**
			 * Defines a value state based on the stock level
			 * @public
			 * @param {number} iValue the stock level of a product
			 * @returns {sap.ui.core.ValueState} the value state for the stock level
			 */
			quantityState: function(iValue) {
				if (iValue === 0) {
					return ValueState.Error;
				} else if (iValue <= 10) {
					return ValueState.Warning;
				} else {
					return ValueState.Success;
				}
			},
			/**
			 * 
			 */
			issueTypeFormat: function(iValue) {
				console.log(this.getOwnerComponent().getModel("issueType").results[0].Ztypt);
				// var oModel = sap.ui.getCore().getModel("i18n");
				//this.getOwnerComponent().getModel().read("/IssueTypeSet",{
				//	success:function(oData){
				//		console.log(oData);
				//		//alert( oData);
				//	}
				//});
				//alert(oIssueTypeModel.getProperty(iValue));
				//alert(oModel.getProperty("/issueSet('1000000001')"));
				// var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZFIORI_KBS_SRV/");
				// alert(oModel.getObject("/IssueTypeSet('01')"));
				var results = this.getOwnerComponent().getModel("issueType").results;

				for (var i = 0; i < results.length; i++) {
					if (results[i].Ztype == iValue) {
						return results[i].Ztypt;
					}
				}

			},
			issueModuleFormat: function(iValue) {
				var results = this.getOwnerComponent().getModel("issueModule").results;
				for (var i = 0; i < results.length; i++) {
					if (results[i].Zmodule == iValue) {
						return results[i].Zmodulet;
					}
				}
			},
			statusTextFormat: function(iValue) {
				var results = this.getOwnerComponent().getModel("statusText").results;
				for (var i = 0; i < results.length; i++) {
					if (results[i].DomvalueL == iValue) {
						return results[i].Ddtext;
					}
				}
			}
		};

	});