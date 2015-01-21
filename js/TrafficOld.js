/**
 * Created by Jonas on 2014-12-11.
 */
var userChoice;
var listOfTrafficInfo = [];
var sortedTrafficInfo = [];
var newMarkers = [];
var prev_infoWindow = false;
var infoWindow;


//Initerar traffic.js
function init()
{
    getMessages();
    getCategory();
    getClick();
}

function getClick()
{
    $("#box").on('click', function(e) {
        for(var i = 0; i < sortedTrafficInfo.length; i++)
        {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(sortedTrafficInfo[i].latitude, sortedTrafficInfo[i].longitude),
                map: Map.map,
                title: sortedTrafficInfo[i].title
            });

            console.log(sortedTrafficInfo[i].id);
            if(sortedTrafficInfo[i].id == e.target.id)
            {
                if(prev_infoWindow)
                {
                    infoWindow.close();
                    prev_infoWindow = true;
                    deleteMarker();
                }

                renderInfoWindow(sortedTrafficInfo[i]);
                infoWindow.open(Map.map, marker);
            }
        }
    });
}

function renderInfoWindow(Object, marker)
{
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">' + Object.title + '</h1>'+
        '<div id="bodyContent">'+
        '<p>'+Object.description+'</p>'+
        '<p>' + Object.subcategory + '</p>'+
        '</div>'+
        '</div>';

    infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    infoWindow.open(Map.map, marker);
    prev_infoWindow = true;
}

function setMarker(message)
{
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(message.latitude, message.longitude),
        map: Map.map,
        title: message.title
    });

    google.maps.event.addListener(marker, 'click', function ()
    {
        if(prev_infoWindow)
        {
            infoWindow.close();
            prev_infoWindow = false;
        }
        renderInfoWindow(message, marker);
    });
}


//JQUERYs lösning på "onclick". Lyssnar efter "SelectList" från echoHTML.php.
function getCategory()
{
    $("#SelectList").change(function(v)
    {
        deleteMarker();
        $("#box").empty();
        userChoice = v.target.value;
        filterTrafficEvents(userChoice);

    })
}

//Tar hand om användarens val i drop-down-listan och filtrerar sedan efter önskemål.
function filterTrafficEvents(userChoice) {
    if (userChoice == "4")
    {
        deleteMarker();
        TrafficInfo = [];
        deleteMarker();
        listOfTrafficInfo.forEach(function (DisplayAll)
        {
            sortedTrafficInfo.push(DisplayAll);
            displayMessage(DisplayAll);
            pinMarker(DisplayAll.latitude, DisplayAll.longitude, DisplayAll.title)
        })
    }
    else
    {
        deleteMarker();
        sortedTrafficInfo = [];
        listOfTrafficInfo.filter(function (filteredData) {
            if (filteredData.category == userChoice) {

                sortedTrafficInfo.push(filteredData);
                displayMessage(filteredData);
                pinMarker(filteredData.latitude, filteredData.longitude, filteredData.title)
            }
        })
    }
}

function pinMarker(lat, long, title)
{
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: Map.map,
        title: title
    });
    newMarkers.push(marker);
}

/*Här hämtar vi ut trafikinformationen från SR*/
function getMessages()
{
    var category;
    $.ajax
    (
        {
            type: "get",
            url: "getTrafficInfo.php",
            success: function(data)
            {
                data = JSON.parse(data);
                data["messages"].reverse();

                for(var i = 0; i < data["messages"].length; i++)
                {
                    addToArray(data["messages"][i]);
                    //setMarker(data["messages"][i].latitude, data["messages"][i].longitude);
                    //setMarker(data["messages"][i]);
                }
            }
        }
    )
}

function addToArray(message)
{
    var toBeAdded = new google.maps.Marker({
        position: new google.maps.LatLng(message.latitude, message.longitude),
        map: Map.map,
        title: message.title
    });
    newMarkers.push(toBeAdded);

    sortedTrafficInfo.push(message);
    listOfTrafficInfo.push(message);
    displayMessage(message);
}

function displayMessage(message)
{
    var box = document.getElementById("box");
    var li = document.createElement("li");
    var aTag = document.createElement("a");

    aTag.textContent = message.title;
    aTag.id = message.id;

    li.appendChild(aTag);
    box.appendChild(li);
}

function deleteMarker()
{
    newMarkers.forEach(function (deleteAllMarkers)
    {
        deleteAllMarkers.setMap(null);
    })
    newMarkers = [];
}

window.addEventListener("load", init());