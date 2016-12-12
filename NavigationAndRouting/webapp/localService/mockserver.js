sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	var _sAppModulePath = "sap/ui/demo/nav/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {
		name:"test name",
		init: function () {
			var sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.employeeRemote,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml");
				
			// alert(sMetadataUrl);
			// create
			var oMockServer = new MockServer({
				rootUri: oMainDataSource.uri
			});
 
			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});
 
			// simulate
			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl : sJsonFilesUrl
			});
 
			// start
			oMockServer.start();
		}
	};
});