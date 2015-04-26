var originalGistList = [];
var favoriteList = [];



var fetchData= function(){

  var req = new XMLHttpRequest();
  var url = 'https://api.github.com/gists/public';
  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){

    if((this.readyState === 4) && (this.status === 200)) {
        originalGistList = JSON.parse(this.responseText);
        for (var i=0; i< originalGistList.length; i++){
          originalGistList[i] = originalGistList [i];
          var gist = originalGistList[i];

          generateGistHtml(gist);

        }

    }

  };


  req.open('GET',url);
  req.send();


};


var generateGistHtml= function(gist){

  var box1 = document.getElementById("box1");
  var tbl1     = document.createElement("table");
  var tblBody1 = document.createElement("tbody");
  var row1 = document.createElement("tr");
  var cell1 = document.createElement("td");

  
  var des = document.createElement("div");
  if (gist.description ){
    des.innerHTML = gist.description;
  }

  else{
    des.innerHTML = "NO DESCRIPTION";
  }

  var url = document.createElement("a");
  url.setAttribute("href", gist.url);
   newText = document.createTextNode(""+gist.url);
   url.appendChild(newText);
  


  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.innerHTML = "+";
  fbutton.setAttribute("gistId", gist.id);

  fbutton.onclick = function(){


	   var gistId = this.getAttribute("gistId");
	   var toBeFavoredGist = findById(gistId);
     favoriteList.push(toBeFavoredGist);

     box1.removeChild(tbl1);
     
     
     localStorage.clear();
     localStorage["favoriteItems"] = JSON.stringify(favoriteList);
      favorites(toBeFavoredGist);
     
     
  };

 
  cell1.appendChild(fbutton);
  cell1.appendChild(des);
  cell1.appendChild(url);

  
  row1.appendChild(cell1);
  tblBody1.appendChild(row1);
  tbl1.appendChild(tblBody1);
  box1.appendChild(tbl1);
  tbl1.style.border = "thin solid black";
};


var findById = function(id) {
	for (var i=0; i < originalGistList.length; i++){
    if (originalGistList[i].id == id){
      return originalGistList[i];
    }
  }

  return undefined;
};

var favorites = function(gist) {
  
  var box = document.getElementById("box2");
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");

  var des = document.createElement("div");
  if (gist.description ){
    des.innerHTML = gist.description;
  }

  else{
    des.innerHTML = "NO DESCRIPTION";
  }

  var url = document.createElement("a");
  url.setAttribute("href", gist.url);
   newText = document.createTextNode(""+gist.url);
   url.appendChild(newText);

   var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorashi.
  fbutton.innerHTML = "-";
  fbutton.setAttribute("gistId", gist.id);

  fbutton.onclick = function(){
    for (var i=0; i < favoriteList.length; i++){
      if (favoriteList[i].id == gist.id){  
        favoriteList.splice(i,1);
      }
     
    }
     box.removeChild(tbl);
     
     
     localStorage.clear();
     localStorage["favoriteItems"] = JSON.stringify(favoriteList);
     generateGistHtml(gist);
  };



  var cell = document.createElement("td");

  cell.appendChild(fbutton);
  cell.appendChild(des);
  cell.appendChild(url);

  row.appendChild(cell);
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  box.appendChild(tbl);

  
  tbl.style.border = "thin solid black";
  
  
}

var load = function(){

 if(JSON.parse(localStorage.getItem("favoriteItems"))){
    //alert('not empty');
    favoriteList = JSON.parse(localStorage.getItem("favoriteItems"));
 }

 //else{
 //   alert("empty");
 //}
  
  for (var i=0; i< favoriteList.length; i++){
    favorites(favoriteList[i]);
  }

} 

window.onload=load;
