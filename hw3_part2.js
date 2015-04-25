var originalGitList = [];

//document.getElementById("submit").onclick = function() { fetchData(); };

var a=function(){
  var a = document.createElement("div");
  a.innerHTML="haha";
  var box = document.getElementsByTagName("box")[0];

  body.appendChild(a);
};

var fetchData= function(){

  var req = new XMLHttpRequest();

  if(!req){
    throw "Unable to create HttpRequest.";
  }

  req.onreadystatechange = function (){

    if(this.readyState === 4){

        var arr = JSON.parse(this.responseText);
        alert("aaa");
        for (var i=0; i< arr.length; i++){
          originalGistList[i] = arr [i];
          var gist = originalGistList[i];
          generateGistHtml(gist);



        }


    }


  };


  req.open('GET', "https://api.github.com/gists/public");
  req.send();


};


var generateGistHtml= function(gist){

  var body = document.getElementsByTagName("body")[0];
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");

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

  };

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("cell in row ");
  cell.appendChild(cellText);
  //cell.appendChild(url);
  //cell.appendChild(fbutton);
  row.appendChild(cell);
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
};


var findById = function(id) {
	for (var i=0; i < originalGitList.length; i++){
    if (originalGitList[i].id == id){
      return originalGitList[i];
    }
  }
  return undefined;
};
