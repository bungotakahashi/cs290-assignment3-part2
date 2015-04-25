var originalGitList = [];
var body = document.getElementsByTagName("body")[0];
var tbl     = document.createElement("table");
var tblBody = document.createElement("tbody");

//document.getElementById("submit").onclick = function() { fetchData(); };



var fetchData= function(){

  var req = new XMLHttpRequest();
  if(!req){
    throw 'Unable to create HttpRequest.';
  }
  req.onreadystatechange = function (){
    if(this.readyState === 4){
      alert("aa");
        var array = JSON.parse(this.responseText);


        for (var i=0; i< array.length; i++){
          originalGistList[i] = array [i];
          var gist = originalGistList[i];
          generateGistHtml(gist);


        }


      }


  }

  req.open("GET", "https://api.github.com/gists", true);
  req.send();


}


var generateGistHtml= function(gist){
  var des = document.createElement("div");
  des.innerHTML = gist.description;

  var url = document.createElement("href");
  url.innerHTML = gist.url;


  var fbutton = document.createElement("button"); //this fbutton code is from the sample by Mr. Ghorash.
  fbutton.innerHTML = "+";
  fbutton.setAttribute("gistId", gist.id);

  fbutton.onclick = function(){
	   var gistId = this.getAttribute("gistId");
	   var toBeFavoredGist = findById(gistId);

  }

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.appendChild(des);
  cell.appendChild(url);
  cell.appendChild(fbutton);
  row.appendChild(cell);
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}

var findById = function(id) {
	for (var i=0; i < originalGitList.length; i++){
    if (originalGitList[i].id == id)
      return originalGitList[i];
  }
}
