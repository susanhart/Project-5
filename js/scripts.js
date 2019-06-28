let employees = [];

// //Gallery Mark-Up: Getting and displaying 12 Random Users

 $form = $("<form></form>");
 $form.append('<input type="search" id="search-input" class="search-input" placeholder="Search...">');
 $form.append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
 $('.search-container').append($form);

 function renderInfo(data) { 
  for (let i = 0; i < 12; i++) { 
    //   loadAndShowData();
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
     $card.click(function(){
      employeeModal(i, data.results[i])
      }) // $card.click(employeeModal(i, data))
  }        
 }

 //function loadAndShowData() { 
 $.ajax({
     url: 
     'https://randomuser.me/api/?results=12&nat=us',

    dataType: 'json',
     success: function(data) {
      /*  console.log(data.results[0].name);
       console.log(data.results[0].email);
       console.log(data.results[0]) */
       renderInfo(data);
      
     }
   });
 //}

// for (i = 0; i < 12; i++) { 
 //    loadAndShowData();
 //}
// //Creating the modal pop-up that brings out the modal and blocks the background

  function employeeModal(index, data) {
      console.log(data)
   var employee = data;
   var name = employee.name.first + " " + employee.name.last;
   var dateOfBirth = formatDateOfBirth(employee.dob.date);
   
   var location = employee.location.city + ", " + employee.location.state + ", " + employee.location.postcode; 
   var modalContent = '<button type="button id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
  modalContent += "<img class='modal-img'  src='" + employee.picture.large + "'alt='profile picture'>";
  modalContent += '<h3 id="name" class="modal-name cap">' + name + '</h3>';
  modalContent += '<p class="modal-text">' + employee.email + '</p>';
  modalContent +='<p class="modal-text cap">' + employee.location.city + '</p>';
  modalContent += '<hr>';
  modalContent += '<p class="modal-text">' + employee.phone + '</p>';
  modalContent +='<p class="modal-text cap">' + employee.location.street + '</p>';
  modalContent += '<p class="modal-text cap">' + location + '</p>';
  modalContent += '<p class="modal-text"> Birthday: ' + dateOfBirth + '</p>';

   modalContent += '</div>';
   //modalContent +=
   // '<p class="modal-text cap">' +
   // employee.location.city +
   // ', ' +
   // employee.location.state + " "+
   // employee.location.postcode +
   // '</p>';
   $("body").append('<div class="modal-container"></div>');
   $(".modal-container").append('<div class="modal"></div>');
   $('.modal').append(modalContent);
   $('.modal').css('display', 'block');
   console.log(index)
   addEventListenerToModal(index);

  }

// //puts a date into the DOB
 function formatDateOfBirth(string) {
   var date = new Date(Date.parse(string));
   var month = date.getMonth() + 1;
   var day = date.getDate();
   var year = date.getYear();
   var dateOfBirth = month + '-' + day + "-" + year;
   return dateOfBirth;
 }

// //puts adress into modal
 function formatAddress(employee) {
   var city = capitalize(employee.location.city);
   var state = capitalize(employee.location.state);
   var address = employee.location.street + '<br>'
   address += city + ', ' + state;
   address += ' ' + employee.location.postcode + ', ';
   address += employee.nat + '<br>';
   return address;
 }

// //Adding the 'x', next, and back button in modal
 function addEventListenerToModal(idNumber) {
  // console.log("Hello")
   $('.modal-close-btn').click(function() {
     $('.modal').css('display', 'none');
     $('.modal-content').remove();
   })

   $('.back').click(function() {
     var last = idNumber - 1;
     if (idNumber > 0) {
       $('.modal-content').remove();
       employeeModal(last);
     }
   })

   $('.next').click(function() {
     var next = idNumber + 1;
     if (idNumber <11) {
       $('.modal-content').remove();
       employeeModal(next);
     }
   })
 }



// // Create a modal window
// // When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
// // Image
// // Name
// // Email
// // City or location
// // Cell Number
// // Detailed Address, including street name and number, state or country, and post code.
// // Birthday
// // Make sure there’s a way to close the modal window
// // Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be style

