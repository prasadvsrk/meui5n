sap.ui.controller("com.meui5ncrud.app.controller.LandingPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf views.LandingPage
*/
	onInit: function() {
	landingpagecontroller = this;
	this.getData();
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf views.LandingPage
*/
	onBeforeRendering: function() {

	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf views.LandingPage
*/
	onAfterRendering: function() {
	},

	handleSearch:function(oEvent){

		var empdata ;
    var aData = jQuery.ajax({
            type : "GET",
            contentType : "application/json",
            url : "/employee/" +sap.ui.getCore().byId('ip_sEmpId').getValue(),
            dataType : "json",
            async: false, 
            success : function(data,textStatus, jqXHR) {
           empdata = data;
               }
        });

sap.ui.getCore().byId('slbl_name').setVisible(true);
sap.ui.getCore().byId('slbl_dob').setVisible(true);
sap.ui.getCore().byId('slbl_desig').setVisible(true);
sap.ui.getCore().byId('slbl_gender').setVisible(true);

sap.ui.getCore().byId('s_txtName').setText(empdata[0].name);
sap.ui.getCore().byId('s_txtDob').setText(empdata[0].dob);
sap.ui.getCore().byId('s_txtdesig').setText(empdata[0].designation);
sap.ui.getCore().byId('s_txtgender').setText(empdata[0].gender);


 

	},

handleOperationBtncreate:function(oEvent){
var empData={
	            "id":sap.ui.getCore().byId('ip_cEmpId').getValue(),
	            "name":sap.ui.getCore().byId('ip_cName').getValue(),
	            "dob":sap.ui.getCore().byId('ip_cDOB').getValue(),
	            "gender":sap.ui.getCore().byId('ip_cGender').getValue(),
	            "designation":sap.ui.getCore().byId('ip_cDesig').getValue()
		};
   var aData = jQuery.ajax({
            type : "POST",
            url : "/employee",
            dataType : "json",
            data:empData,
            async: false, 
            success : function(response,status) {
              console.log(response + status);
               }

        });

var oModel = new sap.ui.model.json.JSONModel();
 var aData = jQuery.ajax({
            type : "GET",
            contentType : "application/json",
            url : "/employees",
            dataType : "json",
            async: false, 
            success : function(data,textStatus, jqXHR) {
               oModel.setData({modelData : data}); 
               }
        });
        sap.ui.getCore().setModel(oModel,'model_table');
		var oTable = sap.ui.getCore().byId("tbl_odata");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");	
  



        landingpagecontroller.CRUDselection.close();

                sap.ui.getCore().byId('ip_cEmpId').setValue(''),
	            sap.ui.getCore().byId('ip_cName').setValue(''),
	            sap.ui.getCore().byId('ip_cDOB').setValue(''),
	            sap.ui.getCore().byId('ip_cGender').setValue(''),
	            sap.ui.getCore().byId('ip_cDesig').setValue('')
	},

handlebtn_Delete:function(oEvent){
    jQuery.ajax({
      url: "/employee/" +sap.ui.getCore().byId('ip_EmpId').getValue(),
      type: "DELETE",
      dataType: "json",
      success: function(response,status)
      {

      }
    });

var oModel = new sap.ui.model.json.JSONModel();
 var aData = jQuery.ajax({
            type : "GET",
            contentType : "application/json",
            url : "/employees",
            dataType : "json",
            async: false, 
            success : function(data,textStatus, jqXHR) {
               oModel.setData({modelData : data}); 
               }
        });
        sap.ui.getCore().setModel(oModel,'model_table');
		var oTable = sap.ui.getCore().byId("tbl_odata");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");	
        landingpagecontroller.CRUDselection.close();



    landingpagecontroller.CRUDselection.close();



	},


handlebtn_Save:function(oEvent){
	var empData={
	            "id":sap.ui.getCore().byId('ip_EmpId').getValue(),
	            "name":sap.ui.getCore().byId('ip_Name').getValue(),
	            "dob":sap.ui.getCore().byId('ip_DOB').getValue(),
	            "gender":sap.ui.getCore().byId('ip_Gender').getValue(),
	            "designation":sap.ui.getCore().byId('ip_Desig').getValue()
		};
     jQuery.ajax({
      url: "/employee/" +sap.ui.getCore().byId('ip_EmpId').getValue(),
      type: "PUT",
      dataType: "json",
      data: empData,
      success: function(response,status){}
    });
 var oModel = new sap.ui.model.json.JSONModel();
 var aData = jQuery.ajax({
            type : "GET",
            contentType : "application/json",
            url : "/employees",
            dataType : "json",
            async: false, 
            success : function(data,textStatus, jqXHR) {
               oModel.setData({modelData : data}); 
               }
        });
        sap.ui.getCore().setModel(oModel,'model_table');
		var oTable = sap.ui.getCore().byId("tbl_odata");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");	
        landingpagecontroller.CRUDselection.close();
	},


	handleOperationBtncls:function(oEvent){
		landingpagecontroller.CRUDselection.close();
	},

	

	rowSelect:function(e)
	{
		var idx = e.getParameter('rowIndex');
    	var name = (sap.ui.getCore().getModel('model_table').getProperty('/modelData/'+idx).name);
		var EmpId = (sap.ui.getCore().getModel('model_table').getProperty('/modelData/'+idx).id);
		var Desig = (sap.ui.getCore().getModel('model_table').getProperty('/modelData/'+idx).designation);
		var DOB = (sap.ui.getCore().getModel('model_table').getProperty('/modelData/'+idx).dob);
		var gender = (sap.ui.getCore().getModel('model_table').getProperty('/modelData/'+idx).gender);
    	sap.ui.getCore().byId('ip_EmpId').setValue(EmpId);
		sap.ui.getCore().byId('ip_Name').setValue(name);
		sap.ui.getCore().byId('ip_DOB').setValue(DOB);
		sap.ui.getCore().byId('ip_Desig').setValue(Desig);
		sap.ui.getCore().byId('ip_Gender').setValue(gender);
       landingpagecontroller.CRUDselection.open();
       sap.ui.getCore().byId('ip_EmpId').setEnabled(false);


	},

getData:function()
{


 var oModel = new sap.ui.model.json.JSONModel();
 var aData = jQuery.ajax({
            type : "GET",
            contentType : "application/json",
            url : "/employees",
            dataType : "json",
            async: false, 
            success : function(data,textStatus, jqXHR) {
               oModel.setData({modelData : data}); 
               }
        });

        sap.ui.getCore().setModel(oModel,'model_table');
		var oTable = sap.ui.getCore().byId("tbl_odata");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");	


}

	
	
});



