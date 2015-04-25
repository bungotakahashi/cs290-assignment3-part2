var originalGistList = [];

//document.getElementById("submit").onclick = function() { fetchData(); };



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

  var box2 = document.getElementById("box2");
  var tbl2     = document.createElement("table");
  var tblBody2 = document.createElement("tbody");

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
  


  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorash.
  fbutton.innerHTML = "+";
  fbutton.setAttribute("gistId", gist.id);

  fbutton.onclick = function(){
	   var gistId = this.getAttribute("gistId");
	   var toBeFavoredGist = findById(gistId);
     box1.removeChild(tbl1);
     box2.appendChild(tbl1);
     
  };

 /* var fbutton2 = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorash.
  fbutton.innerHTML = "-";
  fbutton.setAttribute("gistId", gist.id);

  fbutton.onclick = function(){
     var gistId = this.getAttribute("gistId");
     
     box2.removeChild(tbl1);
     box1.appendChild(tbl1);

  };
*/

  var row1 = document.createElement("tr");
  var cell1 = document.createElement("td");
  var cellText1 = document.createTextNode("des.innerHTML");
  cell1.appendChild(fbutton);
  cell1.appendChild(des);
  cell1.appendChild(url);

  
  row1.appendChild(cell1);
  tblBody1.appendChild(row1);
  tbl1.appendChild(tblBody1);
  box1.appendChild(tbl1);
  tbl1.setAttribute("border","2");
};


var findById = function(id) {
	for (var i=0; i < originalGistList.length; i++){
    if (originalGistList[i].id == id){
      return originalGistList[i];
    }
  }
  return undefined;
};
