$form = $("<form></form>");
$form.append('<input type="search" id="search-input" class="search-input" placeholder="Search...">');
$form.append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
$('.search-container').append($form);

function renderInfo(data) { 
    var imageLocation = data.results[0].picture.large;
    var name = data.results[0].name.first + " " + data.results[0].name.last;
    console.log(name);
    var location = data.results[0].location.city + ", " + data.results[0].location.state
    var email = data.results[0].email
    $card = $("<div class='card'></div>")
    $('.gallery').append($card);

    $cardImageContainer = $("<div class='card-image-container'></div>")
    $card.append($cardImageContainer)

    $cardImage = $("<img class='card-img' alt='profile picture'>")
    $cardImage.prop('src', imageLocation)
    $cardImageContainer.append($cardImage)
    $cardInfoContainer = $("<div class='card-info-container'></div>")
    $card.append($cardInfoContainer)
    $name = $('<h3 id="name" class="card-name cap"></h3>')
    $name.html(name)
    $cardInfoContainer.append($name)

    $email = $('<p class="card-text">email</p>')
    $email.html(email)
    $cardInfoContainer.append($email)

    $location = $('<p class="card-text cap">city, state</p>')
    $location.html(location)
    $cardInfoContainer.append($location)
}

function loadAndShowData() { 
$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data.results[0].name);
      console.log(data.results[0].email);
      console.log(data.results[0])
      renderInfo(data)
      
    }
  });
}


var i;
for (i = 0; i < 12; i++) { 
    loadAndShowData();
}