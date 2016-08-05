sap.ui.jsview("com.meui5ncrud.app.view.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf views.App
	*/ 
	getControllerName : function() {
		return "com.meui5ncrud.app.controller.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf views.App
	*/ 
	createContent : function(oController) {
		var app_meui5ncrud = new sap.m.App('appView',{});
    	return app_meui5ncrud;
	}
});
