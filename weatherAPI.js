var key="c26491b07950d7b967d33e4d939fd9d5";


var googleMap= document.getElementById("gmap_canvas");
var div1= document.getElementById("displayWeather")

async function displayWeather(){

    var city= document.getElementById("input").value
    
    try{
        var res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
        var data= await res.json()
        console.log('data:', data)
        displayData(data);
        sevenDayData(city)
    }catch(err){
//! To catch the error

        console.log("err:",err)  
    }

}
async function sevenDayData(city2){

    try{
        var seven = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city2}&cnt=7&appid=${key}&units=metric`)
        var result= await seven.json()
        displayForcast(result.list)
    }catch(err){
        console.log(err)
    }
}
    function displayData(data){
//* To empty the container div
document.getElementById("displayWeather").innerHTML="";

        var h4= document.createElement("h2");
        h4.innerHTML= `<span> ${data.name}</span>`
        var min= document.createElement("p");
        min.textContent=`Temp: ${data.main.temp_min}C°-${data.main.temp_max}C°`
        var windSpeed= document.createElement("p");
        windSpeed.textContent=`Wind speed: ${data.wind.speed}km/h`
        var windDegree= document.createElement("p");
        windDegree.textContent=`Wind Degree: ${data.wind.deg}°`
        var cloud= document.createElement("p");
        cloud.textContent=`Clouds: ${data.clouds.all}%`
        var sunrise= document.createElement("p");
        var rise = new Date(data.sys.sunrise).toLocaleTimeString("en-US")
        var set = new Date(data.sys.sunset).toLocaleTimeString()
        
        sunrise.textContent=`Sunrise: ${rise}`
        var sunset= document.createElement("p");
        sunset.textContent=`Sunset: ${set} PM`
        var country= document.createElement("p");
        country.textContent=`Country: ${data.sys.country}`


        googleMap.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
        div1.append(h4,min,windSpeed,windDegree,cloud,sunrise,sunset,country)
        div1.style.background="rgba(0, 0, 0, 0.2)"
    }



    function displayForcast(report){
        console.log('report:', report)
        var daysArr=["Fri","Sat","Sun","Mon","Tues","Wed","Thurs"];
        var count=0;
        var sevenDayData= document.getElementById("sevenDayReport")
        sevenDayData.innerHTML=""
        report.map(function(elem){
            
            var reportBox= document.createElement("div")
           
            var days= document.createElement("h4");
            var k=daysArr[count++]
            days.textContent=k;
            console.log('days:', days)
            var iconsImg= document.createElement("img")
            let{icon}= elem.weather[0]
            iconsImg.src="http://openweathermap.org/img/w/" + icon + ".png";
            let{main:{temp_min,temp_max}}= elem
            console.log('temp_min,temp_max:', temp_min,temp_max)

            let minimum= document.createElement("p")
            minimum.textContent= `Min-${temp_min}°`
            let maximum = document.createElement("p")
            maximum.textContent= `Max-${temp_max}°`

            sevenDayData.append(reportBox)
            reportBox.append(days,iconsImg,minimum,maximum)
        })

    }