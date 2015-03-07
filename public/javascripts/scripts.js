function Remove(id){
	var request = new XMLHttpRequest();
	request.open("delete", "/review/"+id, true);
	request.send();
	location.reload();
}
function Edit(id){
	var name = document.getElementById("inputName").value;
	var placeType = document.getElementById("inputPlaceType").value;
	var stars = document.getElementById("inputStars").value;
	var request = new XMLHttpRequest();
	request.open("put", "/review/"+id, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify({name:name, placeType: placeType, stars: stars}));
	location.replace("/review/"+id);
}
function Add(){
	var name = document.getElementById("inputName").value;
	var placeType = document.getElementById("inputPlaceType").value;
	var stars = document.getElementById("inputStars").value;
	var request = new XMLHttpRequest();
	request.open("post", "/reviews", true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify({name:name, placeType: placeType, stars: stars}));
	location.replace("/reviews");
}
function Search(){
	var search = document.getElementById("search").value;
	var checkedValue;
	var name = document.getElementById("name");
	var placeType = document.getElementById("place");
	var stars = document.getElementById("stars");
	if(name.checked) {
		checkedValue = name.value;
	} else if(placeType.checked) {
		checkedValue = placeType.value;
	} else {
		checkedValue = stars.value;
	}
	location.replace("/search?"+checkedValue+"="+search);
}