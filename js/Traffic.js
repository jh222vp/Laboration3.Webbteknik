/**
 * Created by Jonas on 2014-12-11.
 */
var userChoice;
var listOfTrafficInfo = [];
var newMarkers = [];
var markers = [];
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
        var userInput = e.target.id;

        for(var i = 0; i < listOfTrafficInfo.length; i++)
        {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(listOfTrafficInfo[i].latitude, listOfTrafficInfo[i].longitude),
                map: Map.map,
                title: listOfTrafficInfo[i].title
            });

            if(listOfTrafficInfo[i].id == e.target.id)
            {
                if(prev_infoWindow)
                {
                    infoWindow.close();
                    prev_infoWindow = true;
                }
                renderInfoWindow(listOfTrafficInfo[i])
                prev_infoWindow = infoWindow;
                infoWindow.open(Map.map, marker);
            }
        }
    });
}

function renderInfoWindow(Object, marker)
{
    console.log(Object);
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
        listOfTrafficInfo.forEach(function (DisplayAll)
        {
            displayMessage(DisplayAll);
            setMarker(DisplayAll.latitude, DisplayAll.longitude)
        })
    }
    else
    {
        listOfTrafficInfo.filter(function (filteredData) {
            if (filteredData.category == userChoice) {
                displayMessage(filteredData);
                setMarker(filteredData.latitude, filteredData.longitude)
            }
        })
    }
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

                for(var i = 0; i < data["messages"].length; i++)
                {
                    addToArray(data["messages"][i]);
                    //setMarker(data["messages"][i].latitude, data["messages"][i].longitude);
                    setMarker(data["messages"][i]);
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

    listOfTrafficInfo.push(message);
    displayMessage(message);
}

/*Ta emot en long och latitude här också istället för bara title. Sen jobba med aTag för att kunna se specifik kordinat*/
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
    markers.forEach(function (deleteAllMarkers)
    {
        deleteAllMarkers.setMap(null);
    })
}

window.addEventListener("load", init());