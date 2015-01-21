var allMessages = [];
var roadTraffic = [];
var publicTransport = [];
var plannedInterference = [];
var other = [];
var markers = [];

var infoWindow = undefined;
var prev_InfoWindow = false;

//Initerar traffic.js
function init()
{
    getMessages();
    getCategory();
    getClick();
}
//JQUERYs lösning på "onclick". Lyssnar efter "SelectList" från echoHTML.php.
function getCategory()
{
    $("#SelectList").change(function(v)
    {
        $("#box").empty();
        var dropDownListValue = v.target.value;
        filterTrafficEvents(dropDownListValue);
    })
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
                var choiceOfArray;

                for(var i = 0; i < data["messages"].length; i++)
                {
                    switch(data["messages"][i].category)
                    {
                        case 0: {choiceOfArray = roadTraffic; break;}
                        case 1: {choiceOfArray = publicTransport; break;}
                        case 2: {choiceOfArray = plannedInterference; break;}
                        case 3: {choiceOfArray = other; break;}
                    }
                    choiceOfArray.push(data["messages"][i]);
                    allMessages.push(data["messages"][i]);
                }
                getCategory();
            }
        }
    )
}

//Tar hand om användarens val i drop-down-listan och filtrerar sedan efter önskemål.
function filterTrafficEvents(dropDownListValue)
{
    //Tömmer markers så att man ska kunna filtrera och de inte ska ligga på varandra..
    deleteMarker();
    for(var i = 0; i < allMessages.length; i++)
    {
        var arrayOfChoice;
        switch (dropDownListValue)
        {
            case "0":{arrayOfChoice = roadTraffic; break;}
            case "1":{arrayOfChoice = publicTransport; break;}
            case "2":{arrayOfChoice = plannedInterference; break;}
            case "3":{arrayOfChoice = other; break;}
            case "4":{arrayOfChoice = allMessages; break;}
        }
        var marker = new google.maps.Marker({
            map: Map.map,
            position: new google.maps.LatLng(arrayOfChoice[i].latitude, arrayOfChoice[i].longitude),
            title: arrayOfChoice[i].title,
            date: arrayOfChoice[i].createddate,
            description: arrayOfChoice[i].description,
            id: arrayOfChoice[i].id,
            subcategory: arrayOfChoice[i].subcategory});
        markers.push(marker);
        displayMessage(markers[i].title, markers[i].id);

        google.maps.event.addListener(marker, 'click', (function(marker)
        {
            var description = markers[i].description;
            var date = markers[i].date;
            var title = markers[i].title;
            var subcategory = markers[i].subcategory;
            return function()
            {
                if(prev_InfoWindow)
                {
                    prev_InfoWindow.close();
                }
                renderInfoWindow(description, title, date, subcategory);
                prev_InfoWindow = infoWindow;
                infoWindow.open(Map.map,marker);
            }
        })(marker));
    }
}

function displayMessage(title, id)
{
    var box = document.getElementById("box");
    var li = document.createElement("li");
    var aTag = document.createElement("a");

    aTag.textContent = title;
    aTag.id = id;

    li.appendChild(aTag);
    box.appendChild(li);
}

function getClick()
{
    $("#box").on('click', function(v)
    {
        for(var i = 0; i < markers.length; i++)
        {
            if(markers[i].id == v.target.id)
            {
                if(prev_InfoWindow)
                {
                    prev_InfoWindow.close();
                }
                renderInfoWindow(markers[i].description, markers[i].title, markers[i].date, markers[i].subcategory);
                prev_InfoWindow = infoWindow;
                infoWindow.open(Map.map,markers[i]);
            }
        }
    });
}

function renderInfoWindow(description, title, date, subcategory)
{
    date = new Date(parseInt(date.replace("/Date(", "").replace(")/",""), 10));
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
        '<div id="bodyContent">'+
        '<p>'+date+'</p>'+
        '<p>'+description+'</p>'+
        '<p>'+subcategory+'</p>'+
        '</div>'+
        '</div>';
    infoWindow = new google.maps.InfoWindow({content: contentString});
}

function deleteMarker()
{
    markers.forEach(function (deleteAllMarkers)
    {
        deleteAllMarkers.setMap(null);
    })
    markers = [];
}

window.addEventListener("load", init());