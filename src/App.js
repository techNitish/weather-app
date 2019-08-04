import React from 'react';
import './App.css';
import Header from './Header';

var numberOfComments = 0;
class App extends React.Component{

  
  
  commentHandler(){
    
   
    numberOfComments = numberOfComments + 1;
   var str = document.getElementById("comments").value;
    
   
   
   console.log(document.getElementById("myList"));

    document.getElementById("cmtres").innerHTML ="<p>Comments ("+numberOfComments+")</p>";
    var node = document.createElement("LI");
    console.log(str);
    var textnode = document.createTextNode(str);
   
    node.appendChild(textnode);
    console.log(node);
  var k =  document.getElementById("myList");
  if(k != null) k.appendChild(node);
  console.log(k);
    


  }
  
  searchHandler(){
    //alert("i assure you, you can do it!");
    var xhr = new XMLHttpRequest();
    var qu = document.getElementById("query").value;
   var loadd = document.getElementById("loadd");
   loadd.style.display = 'block';
    console.log(qu);
    var ur = 'http://api.openweathermap.org/data/2.5/weather?q='+qu+'&APPID=30203ceb0f33354bcd14da1fdba29edd';
    xhr.open('GET',ur);
    xhr.send();
    console.log(xhr.status);

    xhr.onerror = function(){
     document.getElementById("mainDiv").innerHTML = "Error";      
    }
  

    xhr.onload = function(){
      var da = JSON.parse(xhr.responseText);
      loadd.style.display = 'none';

      //console.log(da.message);
      if(da.message === 'city not found')
      {
        loadd.innerHTML = '<p>City not found</p>';
        document.getElementById('newDiv').innerHTML = '<p>City not found</p>';
      }
      else{
        document.getElementsByClassName("bigg")['0'].style.backgroundColor="white";
        document.getElementsByClassName("bigg")['1'].style.backgroundColor="white";

      var dat = new Date();
      var loc = da.name+" "+dat;
        var w = "Weather: "+'<span>'+da.weather['0'].main+'</span>'+'<br/>';
        var winds = "Wind:"+'<span>'+da.wind.speed+"km/hr"+'</span>'+'<br/>'+'<br/>';
        var hum = "Humidity:"+'<span>'+da.main.humidity+"%"+'</span>'+'<br/>';
        var pres = "Pressure:"+'<span>'+da.main.pressure+" Pa"+'</span>'+'<br/>'+'<br/>';
        var maxt = "Max Temp:"+'<span>'+(da.main.temp_max-273.15).toFixed(0)+"°C"+'</span>'+'<br/>';
        var mint = "Min Temp:"+'<span>'+(da.main.temp_min-273.15).toFixed(0)+"°C"+'</span>'+'<br/>'+'<br/>';
        var sr = "Sunrise:"+'<span>'+da.sys.sunrise+'</span>'+'<br/>';
        var su = "Sunset:"+'<span>'+da.sys.sunset+'</span>'+'<br/>'+'<br/>'+'<br/>';
      var a = da.main.temp;
        
      var all = w+winds+hum+pres+maxt+mint+sr+su;
      document.getElementById("more").innerHTML= all;
      console.log(all);
      console.log(loc);
      a = a-273.15; 
      var ct = a.toFixed(0);    // var ct = (32*a − 32)* 5/9;
      console.log(typeof(a));
      var ss ="http://openweathermap.org/img/wn/"+da.weather["0"].icon+"@2x.png";
      ct = '<span id="num">'+ct+'<span>'+'<b>'+"°C"+'</b>'+'<img src='+ss+' />';
      var b = da.weather;
      loadd.style.display = 'none';
    // var keys =  Object.keys(da.weather['0']);
      console.log(da.weather['0'].description);
       //da.weather['0'].description;
      
    // document.getElementById("newDiv").innerHTML = '<p>'+a+' '+c+'</p>';
    document.getElementById("loc").innerHTML = '<p>'+loc+'</p>';
      document.getElementById("newDiv").innerHTML = '<p>'+ct+'</p>';
    
      document.getElementById("cmt").style.display = 'block';
    }
    
    }
  }

 

  render() {
   return (
    
    <div id ="maindiv">
    <Header id="" heading="Weather App"/>
      <br/><br/>
      <div id="search">     
        
         <input id="query" type="text" placeholder="Enter City Name"/>
         <button id="srch"  onClick={this.searchHandler}>Search</button>
    
      </div>
      <div className="row maincon">
        <div className="col-md-2"></div>
        <div className="col-md-6 bigg">
          
        <div id="loadd">
      
      </div>
      <div id="loc">

      </div>
      <div id="newDiv">

      </div>

        </div>
        <div className="col-md-2 bigg" id="more">
          
        </div>
        
      </div>
     
      <div className="row">
      <div className="col-md-2"></div>

      <div className="col-md-6">
        <br/>
      <div id="cmt" >
      <textarea id="comments" rows="3" cols="20"></textarea><br/>
      <input id="cmnt" type="submit" value="Comment" onClick={this.commentHandler}></input><br/><br/>
      <div id="cmtres">
      <p>Comments (0)</p>
     
      </div>
      </div>
      <ul id="myList">
      
     </ul>
      
      </div>
      </div>
      
    </div>
    );
  }
}
export default App;
