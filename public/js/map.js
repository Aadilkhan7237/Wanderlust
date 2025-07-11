
      mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9 // starting zoom
        });
         


      


         // 1. Create a custom icon element
const el = document.createElement('div');
el.className = 'custom-marker';
el.style.backgroundImage = 'url(/icon.jpeg)'; // use your actual image path
el.style.width = '50px';   // adjust as needed
el.style.height = '50px';
el.style.backgroundSize = 'cover';
el.style.borderRadius = '50%'; // optional: makes it round

// 2. Add the marker using the custom element
const marker = new mapboxgl.Marker({element:el, color:"red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h5>${listing.location}</h5><p>Exact location will be provided after booking</p>`)
).addTo(map);

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true,
    showUserLocation:true,
    showAccuracyCircle:true,
}));



