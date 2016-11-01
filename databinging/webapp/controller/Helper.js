sap.ui.define(function(){
	
	function myClass(){
		alert("init helper");
		this.name = "helper class";
		this.sayHello = function(){
			alert(this.name);
		};
	}
	return myClass;	
	}
	);