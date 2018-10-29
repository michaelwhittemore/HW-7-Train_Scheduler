//i did the framework of this assignment before we covered push() 
//and 'child_added", which is why the code is kinda wonky and 
//only uses .set()

//data object gets passed to data base and conatins array for each 
//value of the train info
var data = { names: [], destinations: [], times: [], frequencies: [] }
//the database
var database = firebase.database();
//onload should populate the schedule
database.ref().on("value", function (snapshot) {
    data = snapshot.val()
    updateCol(data)
})


//on submit should push the changes to the local array and
//the database and then reconstruct the table
$("#submit").click(function () {
    event.preventDefault();
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val();
    var frequency = $("#frequency").val().trim();
    if ([name, destination, time, frequency].includes("")) {
        console.log([name, destination, time, frequency])
        alert("please fill in all fields")
        return;
    }
    easterEggChecker(name);
    updateDatabase(name, destination, time, frequency)
    updateCol(data)
})
//on the clear button press we empty the local data and push to
//the database
$("#clear").click(function () {
    event.preventDefault();
    data = { names: [""], destinations: [""], times: [""], frequencies: [""] }
    console.log(data)
    database.ref().set(data)
    updateCol(data)
    console.log(data)
})
//this function makes a row entry
makeCol = function (name, des, time, fre) {
    var row = $("<div class='row'>");
    row.append(`<div class='col'> ${name} </div>`);
    row.append(`<div class='col'> ${des} </div>`);
    row.append(`<div class='col'> ${time} </div>`);
    row.append(`<div class='col'> ${fre} </div>`);
    row.append(`<div class='col'> ${' '} </div>`); //this should be the arrival time
    $("#trainholder").append(row)
}
//this updates the local array and sets it in the database
updateDatabase = function (name, des, time, fre) {
    data.names.push(name);
    data.destinations.push(des)
    data.times.push(time)
    data.frequencies.push(fre)
    database.ref().set(data)

}
//takes in the object with the properties described in the top
//and makes all the columns
updateCol = function (dataObject) {
    if (dataObject == null) {
        dataObject = { names: [], destinations: [], times: [], frequencies: [] }
    }
    $("#trainholder").empty()
    for (i in dataObject.names) {
        makeCol(dataObject.names[i], dataObject.destinations[i], dataObject.times[i], dataObject.frequencies[i])
    }
}


//don't forget to add eastereggs, crazy train, night train,city of new orleans
easterEggChecker = function (name) {
    if (name == 'Nightrain' || name == 'Night Train') {
        $("body").css("background-image", "url('./assets/images/appetite_for_destruction.jpg')");
    }
    else if (name == 'Crazy Train') {
        $("body").css("background-image", "url('./assets/images/blizzard.jpg")
    }
    else if (name == 'The City of New Orleans') {
        $("body").css("background-image", "url('./assets/images/city.jpg")
    }
    else if (name == 'Love Train') {
        $("body").css("background-image", "url('./assets/images/love.jpg")
    }
    else {
        $("body").css("background-image","")
    }

}