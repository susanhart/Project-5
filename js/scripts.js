let employees = []; //Global variable

// //Gallery Mark-Up: Creating the twelve individual employee boxes/business cards for Getting and displaying 12 Random Users
//Appending a form to the search container
//Creating the search bar 
$form = $("<form></form>");
 $form.append('<input type="search" id="search-input" class="search-input" placeholder="Search...">');
 $form.append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
 $('.search-container').append($form);
//Creating a function to create the image cards
 function renderInfo(data) { //Creating a for loop for the 12 image cards to appear
  console.log(data);
  for (let i = 0; i < 12; i++) { 
    // Creating variables that contain an array of objects defined inside of the data variable
     var imageLocation = data.results[i].picture.large; 
     console.log ("Hello")
     var name = data.results[i].name.first + " " + data.results[i].name.last;
     //console.log(name);
     var location = data.results[i].location.city + ", " + data.results[i].location.state
     var email = data.results[i].email
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
     $card.click(function(){ //Applying an event handler to respond to a click
      employeeModal(i, data.results[i])
      }) 
  }        
 }

 //Getting the data collected of the 12 random employees/users from another website to load on the page 
 $.ajax({
     url: 
     'https://randomuser.me/api/?results=12&nat=us',

    dataType: 'json',
     success: function(data) {
      /*  console.log(data.results[0].name);
       console.log(data.results[0].email);
       console.log(data.results[0]) */
       renderInfo(data); //Calling the function so that it runs and 12 employee cards appear
      
     }
   });
 
// //Creating the modal pop-up that brings out the modal and blocks the background

  function employeeModal(index, data) {
      console.log(data)
   var employee = data;
   var name = employee.name.first + " " + employee.name.last;
   var dateOfBirth = formatDateOfBirth(employee.dob.date);
   
   var location = employee.location.street + employee.location.city + ", " + employee.location.state + " " + employee.location.postcode; 
   var modalContent = '<button type="button id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
   modalContent += "<img class='modal-img'  src='" + employee.picture.large + "'alt='profile picture'>";
   modalContent += '<h3 id="name" class="modal-name cap">' + name + '</h3>';
   modalContent += '<p class="modal-text">' + employee.email + '</p>';
   modalContent +='<p class="modal-text cap">' + employee.location.city + '</p>';
   modalContent += '<hr>';
   modalContent += '<p class="modal-text">' + employee.phone + '</p>';
  
   modalContent += '<p class="modal-text cap">' + location + '</p>';
   modalContent += '<p class="modal-text"> Birthday: ' + dateOfBirth + '</p>';

   modalContent += '</div>';
   
   $("body").append('<div class="modal-container"></div>');
   $(".modal-container").append('<div class="modal"></div>');
   $('.modal').append(modalContent);
   $('.modal').css('display', 'block');
   console.log(index)
   addEventListenerToModal();

  }

// //puts a date into the DOB
 function formatDateOfBirth(string) {
   var date = new Date(Date.parse(string));
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var year = date.getYear();
   var dateOfBirth = month + '/' + day + "/" + year;
   return dateOfBirth;
 }

// //Getting the modal container box to close
 function addEventListenerToModal() {
  // console.log("Hello")
  //Creating an event listener to close every time the modal close button is clicked
   $('.modal-close-btn').click(function() {
     $('.modal').css('display', 'none');
     $('.modal-container').remove();
   })

 }




