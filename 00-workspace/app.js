// SET UP THE MAP

var mapProjection = new ol.proj.Projection({
  code: 'EPSG:3857',
  extent: [-20037508, -20037508, 20037508, 20037508.34]
})
var geoProjection = new ol.proj.Projection({
  code: 'EPSG:4326',
  extent: [-180, -180, 180, 180]
})

var map = new ol.Map({
  layers:[
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsbC1icmVpdGtyZXV0eiIsImEiOiItMTJGWEF3In0.HEvuRMMVxBVR5-oDYvudxw'
      })
    })
  ],
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([-96, 39], geoProjection, mapProjection),
    zoom: 5
  })
});

var app = {
    mapzenKey: 'mapzen-CpAANqF',
    activeSearch: 'from',
    options: [],
  
    typeAhead: function(e){
        var el = e.target;
        var val = el.value;
      
      if(val.length > 2){
      app.queryAutocomplete(val, function(err, data){
          if(err) return console.log(err);
          if(data.featrues) app.options = data.features;
          app.renderResultsList();
        })
      }
    },
  
  queryAutocomplete: throttle(function(text,callback){
      $.ajax({
        url:'https://search.mapzen.com/v1/autocomplete? text=' + text + '&api_key=' + app.mapzenKey,
        success: function(data, status, req){
            callback(null, data);
        },
        error: function(req, status, err){
            callback(err);
        }
      })
  }, 150)

  renderResultslist: function(){
     var resultslist = ${'#results-list');
     resultsList.empty():
  
     var results = app.options.map(function(feature){
         var li=$('<li class="results-list-item">' + feature.properties.label + '</li>');
         reture li;
     })
     
     resultsList.append(results);

     if(app.options.length > 0){
       resultsList.removeClass('hidden');
     }else{
       resultsList.addClass('hidden');
     }   
   }
}

$('#search-from-input').on('keyup',(input:'from'), app.typeAhead);
