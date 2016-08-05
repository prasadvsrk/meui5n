sap.ui.jsview("com.meui5ncrud.app.view.LandingPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf views.LandingPage
	*/ 
	getControllerName : function() {
		return "com.meui5ncrud.app.controller.LandingPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf views.LandingPage
	*/ 
	createContent : function(oController) {

		var ip_EmpId = new sap.m.Input('ip_EmpId',{value:"",enabled:true});
		var ip_sEmpId = new sap.m.Input('ip_sEmpId',{value:""});
		var ip_Name = new sap.m.Input('ip_Name',{value:""});
		var ip_DOB = new sap.m.DatePicker('ip_DOB',{value:"",valueFormat: "dd/MM/yyyy",displayFormat:"dd/MM/yyyy"});
		var ip_Desig = new sap.m.Input('ip_Desig',{value:""});
		var ip_Gender = new sap.m.Input('ip_Gender',{value:""});
		
    	var lb_EmpId = new sap.m.Label('lb_EmpId',{text:"Id",labelFor:"ip_EmpId"});
		var lb_sEmpId = new sap.m.Label('lb_sEmpId',{text:"Id",labelFor:"ip_sEmpId"});
		var lb_Name = new sap.m.Label('lb_Name',{text:"Name",labelFor:"ip_Name"});
		var lb_DOB = new sap.m.Label('lb_DOB',{text:"DOB",labelFor:"ip_DOB"});
		var lb_Desig = new sap.m.Label('lb_Desig',{text:"Designation",labelFor:"ip_Desig"});
		var lb_Gender = new sap.m.Label('lb_Gender',{text:"Gender",labelFor:"ip_Gender"});
		
	//form for update and delete operation	Dialog when user  selects record in table
		var Emp_Form= new sap.ui.layout.form.SimpleForm("Emp_Form",{
			editable:true,
			layout: "ResponsiveGridLayout",
			width:"100%",
			content:[new sap.ui.core.Title({text:"Update/Delete Employee Data"}),
			         lb_EmpId,ip_EmpId,lb_Name,ip_Name,lb_DOB,ip_DOB,lb_Desig,ip_Desig,lb_Gender,ip_Gender
	
			         ]
		});
		


		var ip_cEmpId = new sap.m.Input('ip_cEmpId',{value:"",enabled:true});
		var ip_cName = new sap.m.Input('ip_cName',{value:""});
		var ip_cDOB = new sap.m.DatePicker('ip_cDOB',{value:"",valueFormat: "dd/MM/yyyy",displayFormat:"dd/MM/yyyy"});
		var ip_cDesig = new sap.m.Input('ip_cDesig',{value:""});
		var ip_cGender = new sap.m.Input('ip_cGender',{value:""});
		

		var lb_cEmpId = new sap.m.Label('lb_cEmpId',{text:"Id",labelFor:"ip_cEmpId"});
		var lb_cName = new sap.m.Label('lb_cName',{text:"Name",labelFor:"ip_cName"});
		var lb_cDOB = new sap.m.Label('lb_cDOB',{text:"DOB",labelFor:"ip_cDOB"});
		var lb_cDesig = new sap.m.Label('lb_cDesig',{text:"Designation",labelFor:"ip_cDesig"});
		var lb_cGender = new sap.m.Label('lb_cGender',{text:"Gender",labelFor:"ip_cGender"});
		
		
		//form for Create and Search Operation
		var Emp_cForm= new sap.ui.layout.form.SimpleForm("Emp_cForm",{
			editable:true,
			layout: "ResponsiveGridLayout",
			width:"100%",
			content:[new sap.ui.core.Title({text:"Insert Employee Data"}),
			         lb_cEmpId,ip_cEmpId,lb_cName,ip_cName,lb_cDOB,ip_cDOB,lb_cDesig,ip_cDesig,lb_cGender,ip_cGender,
			         new sap.m.Button('empadd',{text:'Create',press:oController.handleOperationBtncreate}),
			         new sap.ui.core.Title({text:"Get Employee Data"}),lb_sEmpId,ip_sEmpId,
			         new sap.m.Button('empsearch',{text:'Search',press:oController.handleSearch}),
			         new sap.m.Label('slbl_name',{text:"Name",visible:false}), new sap.m.Text('s_txtName',{text:''}),
			         new sap.m.Label('slbl_dob',{text:"dob",visible:false}),new sap.m.Text('s_txtDob',{text:''}),
			         new sap.m.Label('slbl_desig',{text:"Designation",visible:false}),new sap.m.Text('s_txtdesig',{text:''}),
			         new sap.m.Label('slbl_gender',{text:"Gender",visible:false}),new sap.m.Text('s_txtgender',{text:''})
	
			         ]
		});
		

//Dialog for employee update delete
	oController.CRUDselection = new sap.m.Dialog("CRUDselection", {
				title: "Employee",
				content : [ Emp_Form ],
                buttons:[

                new sap.m.Button('operation_Save',{text:"Update",press:oController.handlebtn_Save}),
                new sap.m.Button('operation_Delete',{text:"Delete",press:oController.handlebtn_Delete}),
                new sap.m.Button('operation_cancel',{text:"Cancel",press:oController.handleOperationBtncls})]
	
					 
			})


//Table for MongoDB data

		var txt_EmpId = new sap.m.Text('txt_EmpId',{text:"{id}"});
		var txt_Name = new sap.m.Text('txt_Name',{text:"{name}"});
		var txt_DOB = new sap.m.Text('txt_DOB',{text:"{dob}"});
		var txt_Desig = new sap.m.Text('txt_Desig',{text:"{designation}"});
		var txt_Gender = new sap.m.Text('txt_Gender',{text:"{gender}"});
		

		 var oIdCol=new sap.ui.table.Column("Coln_1",{label:'Gender',
				template: txt_Gender,
				});
		
		 var oIdCol2=new sap.ui.table.Column("Coln_2",{label:'Id',
				template: txt_EmpId,
				});
		 
		 var oIdCol3=new sap.ui.table.Column("Coln_3",{label:'Name',
				template: txt_Name,
				});
		 
		 var oIdCol4=new sap.ui.table.Column("Coln_4",{label:'DOB',
				template: txt_DOB,
				});

		 var oIdCol5=new sap.ui.table.Column("Coln_5",{label:'Desig',
				template: txt_Desig,
				});
		 
		
		oController.oTable = new sap.ui.table.Table('tbl_odata',{
            title : "Data in MongoDB",
            visibleRowCount : 6,
            columns:[oIdCol2,oIdCol3,oIdCol4,oIdCol5,oIdCol],
            selectionMode : sap.ui.table.SelectionMode.Single,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            rowSelectionChange :oController.rowSelect
				});

		
	
		var ele = [ Emp_cForm, oController.oTable]
		return ele;



}


});



