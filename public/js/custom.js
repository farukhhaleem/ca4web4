$("#loadmoreprods").on("click", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    data: {
      id: $("#guid").val(),
      title: $("#page_title").val(),
      content: $("#page-content").val(),
    },
    contentType: "application/json",
    cache: false,
    timeout: 5000,
    url: "http://localhost:3000/product/products",
    success: function(data, textStatus, jqXHR) {
      var prods = "";

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];

          console.log(element);
          let product_id = element._id;
          let product_description = element.product_description;
          let product_image = element.product_image;
          let product_name = element.product_name;
          let product_price = element.product_price;
          let product_short_description = element.product_short_description;

          prods += '<div class="col-md-4">';
          prods += '<a href="/product/' + product_id + '">';
          prods += '<div class="card card-widget widget-user">';
          prods += '<div class="widget-user-header text-white" style="background: url(' + product_image + ') center center;"></div>';
          prods += '<div class="card-footer">';
          prods += '<div class="row">';
          prods += '<div class="col-sm-12">';
          prods += '<div class="description-block">';
          prods += '<h3 class="description-text">' + product_name + '</h3><span class="description-text">' + product_short_description + "</span>";
          prods += '<h5 class="description-header">€ ' + product_price + "</h5></div>";
          prods += "</div>";
          prods += "</div>";
          prods += "</div>";
          prods += "</div>";
          prods += "</a>";
          prods += "</div>";
        }
      }

      $("#products-container").html(prods);
      $("#loadmoreprods").hide();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // When AJAX call has failed
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    },
    fail: function(jqXHR, textStatus, errorThrown) {
      // If fail
      console.log(textStatus + ": " + errorThrown);
      console.log(jqXHR);
    },
  });
});

$("#addtocart").on("click", function(params) {
  // alert();
  // return false;
  $.ajax({
    type: "GET",
    contentType: "application/json",
    cache: false,
    timeout: 5000,
    url: "http://localhost:3000/cart/add/" + $(this).attr("data-id"),
    success: function(data, textStatus, jqXHR) {
      console.log(data);
      if (data.status == true) {
        $("#msgbox").html('<div class="alert alert-success" role="alert">' + data.msg + "</div>");
      } else {
        $("#msgbox").html('<div class="alert alert-warning" role="alert">' + data.msg + "</div>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // When AJAX call has failed
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    },
    fail: function(jqXHR, textStatus, errorThrown) {
      // If fail
      console.log(textStatus + ": " + errorThrown);
      console.log(jqXHR);
    },
  });
});
