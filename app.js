let map;


function initMap() {
    map = new longdo.Map({
        placeholder: document.getElementById('map')
    });

    // map.Event.bind('click', function() {
    //     var mouseLocation = map.location(longdo.LocationMode.Pointer);
    //     map.Overlays.add(new longdo.Marker(mouseLocation));
    //   });

    // map.Tags.add('7-11',{
    //     visibleRange: { min: 10, max: 20 },
    //     icon: { url: 'https://mmmap15.longdo.com/mmmap/images/icons_big/7-11.png' }
    //   });

    // Get current geolocation
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const { latitude, longitude } = position.coords;
            addMarker(latitude, longitude);
        },
        function(error) {
            console.error('Error getting geolocation:', error);
        }
    );

    
    let data  = ''
    fetch('/api/locations')
    .then(function(response) {
      return response.json();
    })  .then(function(myJson) {
      data = myJson


      map.Tags.add(function(tile, zoom) {
        // var bound = longdo.Util.boundOfTile(map.projection(), tile);
          for (var i = 0; i < data.length; ++i) {
            // console.log(data[i].store_id);
            map.Overlays.add(new longdo.Marker(data[i], {
                title: 'รหัสสาขา: '+ data[i].store_id,

                detail: data[i].store_name +"<br><br>"+ data[i].address + "<br><br>" + data[i].tel,
                visibleRange: { min: zoom, max: zoom },
                icon: { url: 'https://mmmap15.longdo.com/mmmap/images/icons_big/7-11.png' },
             }));
          }
      });

    });  




}

// function getdata(){

//     let data  = ''
//     fetch('http://localhost:3000/api/locations')
//     .then(function(response) {
//       return response.json();
//     })  .then(function(myJson) {
  
//       data = myJson
   
//         return data

//     });  
//     console.log(data)
// }


// function mockAjaxFromServer(bound, callback) {
    // var locationList = [];
    // var count = Math.random() * 5;
    // for (var i = 0; i < 2; ++i) {
    //   locationList.push({ lon: bound.minLon + (Math.random() * (bound.maxLon - bound.minLon)),
    //     lat: bound.minLat + (Math.random() * (bound.maxLat - bound.minLat)) });
    // }
    // console.log(locationList)
    // var locationList = [
    //     {
    //         "lon": 100.44972820554977,
    //         "lat": 13.892590455702967
    //     },
    //     {
    //         "lon": 100.45293095861255,
    //         "lat": 13.894885021643374
    //     },
    //     {
    //         "lon": 100.45072060792052,
    //         "lat": 13.890777557399174
    //     },
    //     {
    //         "lon": 100.45348950402553,
    //         "lat":  13.900749994673731
    //     },
    //     {
    //         "lon": 100.46259727001178,
    //         "lat": 13.893419978276647
    //     }

    // ]
    // callback(locationList);
//   }




// Function to add a marker to the map
function addMarker(latitude, longitude) {
    // 13.892755996560672, 100.45401108872383
    //Location The Tara
    latitude =  13.901792321911685
    longitude =  100.53131853881565

    const marker = new longdo.Marker({ lon: longitude, lat: latitude });
    // const marker = new longdo.Marker({ lon: 100.53131853881565, lat: 13.901792321911685 });
    map.Overlays.add(marker);
    // console.log(latitude + ',' + longitude)

    // map.Route.placeholder(document.getElementById('result'));
    // map.Route.add(new longdo.Marker({ lon: 100.583113, lat: 13.857034 }));
    // map.Route.add({ lon: 100.583113, lat: 13.857034 });
    // map.Route.search();
    
    // Set map center to the marker position
    // map.location(latitude + ',' + longitude);


}



// Initialize the map after the LongDo API script has loaded
window.onload = initMap;
