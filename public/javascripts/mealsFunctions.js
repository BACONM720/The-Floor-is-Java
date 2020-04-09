$(document).ready(
function() {
	$("#mealsButton").click(function () {
		var search = "http://danu7.it.nuigalway.ie:8618/getMealsData"; // CHANGE PORT
		var filterCount = 0;
		if ($("#vegan").is(":checked")) {
			if(filterCount>0) {
				search+="&vegan=true";
			}
			else {
				search+= "?vegan=true";
			}
			filterCount+=1;
		}
		if ($("#gluten-free").is(":checked")) {
			if(filterCount>0) {
				search+="&glutfree=true";
			}
			else {
				search+= "?glutfree=true";
			}
			filterCount+=1;
		}
		if ($("#dairy-free").is(":checked")) {
			if(filterCount>0) {
				search+="&dFree=true";
			}
			else {
				search+= "?dFree=true";
			}
			filterCount+=1;
		}
		if ($("#high-calorie").is(":checked")) {
			if(filterCount>0) {
				search+="&hCalorie=true";
			}
			else {
				search+= "?hCalorie=true";
			}
			filterCount+=1;
		}
		if ($("#low-calorie").is(":checked")) {
			if(filterCount>0) {
				search+="&lCalorie=true";
			}
			else {
				search+= "?lCalorie=true";
			}
			filterCount+=1;
		}
		if ($("#vegetarian").is(":checked")) {
			if(filterCount>0) {
				search+="&veg=true";
			}
			else {
				search+= "?veg=true";
			}
			filterCount+=1;
		}
		if (filterCount == 0) {
				search += "?vegan=true&glutfree=true&dFree=true&hCalorie=true&lCalorie=true&veg=true";
		}
		var maxPrice = $("#moneyAllowed").val();
		if (maxPrice>0) {
			search += "&rPrice="+maxPrice;
			window.location.href = search; 
		}
		else {
			window.alert("Please enter a valid maximum meal price");
		}
	});
}
);
