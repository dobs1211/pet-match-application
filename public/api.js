 $(document).ready(function() {
  /*function to sanitize the JSON if it is necesary*/
  // function sanitizeJSON(unsanitized) {
  //  var str = JSON.stringify(unsanitized);
  //  var output = str.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f").replace(/"/g, "\\\"").replace(/'/g, "\\\'").replace(/\&/g, "\\&");
  //  return output;
  // }
  /*
  JSONP, which stands for "JSON with Padding" (and JSON stands for JavaScript Object Notation), is a way to get data from another domain that bypasses CORS (Cross Origin Resource Sharing) rules. CORS is a set of "rules," about transferring data between sites that have a different domain name from the client.
  We would like to see if we can get an valid JSON result which we can parse in using AJAX
  */
  /* Update all the parameters for your API test*/
  var params = {
   "key": "6d76ac6705f749eb1062fd7d56bd9498",
   "animal": "cat",
   "sex": "M",
   "location": 89521,
   "count": 25,
   "output": "full",
   "format": "json"

  };

  $.getJSON('https://crossorigin.me/http://api.petfinder.com/pet.find?key=6d76ac6705f749eb1062fd7d56bd9498&animal=cat&sex=M&location=89521&count=25&output=full&format=json')
      .done(function(petApiData) {
              alert('Data retrieved!');
              console.log("simple API call",  petApiData);
              })
          .error(function(err) {
              alert('Error retrieving data!');
          });

  var result = $.ajax({
    /* update API end point */
    url: "https://crossorigin.me/http://api.petfinder.com/my.method?format=json&key=6d76ac6705f749eb1062fd7d56bd9498&callback=?",
    //data: params,
    dataType: "jsonp",
    /*set the call type GET / POST*/
    type: "GET"
   })
   /* if the call is successful (status 200 OK) show results */
   .done(function(result) {
    /* if the results are meeningful, we can just console.log them */
    console.log(result);
    /* if the results are not meeningful, it might help to convert them to string first
    var displayStringifiedResults = JSON.stringify(result);
    console.log(displayStringifiedResults);*/
    /* if the results contain invalid json, it might help to sanitize them first
    var displaySanitizedResults = sanitizeJSON(result);
    console.log(displaySanitizedResults);*/
   })
   /* if the call is NOT successful show errors */
   .fail(function(jqXHR, error, errorThrown) {
    console.log(jqXHR);
    console.log(error);
    console.log(errorThrown);
   });

 });