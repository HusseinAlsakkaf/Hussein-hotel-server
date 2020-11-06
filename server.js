const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function(request, response){
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});


// TODO add your routes and helper functions here

//Read all bookings
app.get("/bookings",  (request, response) => {
  response.send(bookings);
});

//Read one booking, specified by an ID
app.get("/bookings/:id", function (request, response) {
    const {id} = request.params;
    let selectedBooking = bookings.filter(e => e.id == id);
    response.send(selectedBooking);
});


//Create a new booking
app.post( "/bookings", (req, res) => {
  let booking={
    id:req.body.id,
    title:req.body.title ,
    firstName:req.body.firstName,
    surname:req.body.surname,
    email:req.body.email,
    roomId:req.body.roomId,
    checkInDate:req.body.checkInDate,
    checkOutDate:req.body.checkOutDate
  }
    if (
       booking.id.length > 0 &&
       booking.title.length > 0 &&
    booking.firstName.length > 0 &&
    booking.surname.length > 0 &&
    booking.roomId.length > 0 &&
      booking.checkInDate.length > 0 &&
    booking.checkOutDate.length > 0 &&
    booking.email.includes("@")
  )
  {
bookings.push(booking);
  res.json(bookings);
  }
  
  else {
    res.send("bad request");
  }
});

//Delete a booking, specified by an ID
app.delete('/bookings/:id',  (req, res) => {
  const bookingId = Number(req.params.id);
  let deletedElement = bookings.findIndex(e => e.id === bookingId);
  if(deletedElement >= 0){
  bookings.splice(deletedElement,1)
  res.json(bookings);
  }
  else {
    res.status(404).send("Error")
  }

})


app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
