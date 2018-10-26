//data object gets passed to data base and conatins array for each 
//value of the train info
var data = { names: [], destinations: [], times: [], frequencies: [] }
console.log(data) //test
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
    var name = $("#name").val();
    var destination = $("#destination").val();
    var time = $("#time").val();
    var frequency = $("#frequency").val();
    updateDatabase(name, destination, time, frequency)
    updateCol(data)
})
//on the clear button press we empty the local data and push to
//the database
$("#clear").click(function () {
    event.preventDefault();
    data = { names: [], destinations: [], times: [], frequencies: [] }
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
    if (dataObject==null){
        dataObject={names:[],destinations:[],times:[],frequencies:[]}
    }
    $("#trainholder").empty()
    for (i in dataObject.names) {
        makeCol(dataObject.names[i], dataObject.destinations[i], dataObject.times[i], dataObject.frequencies[i])
    }
}



//should have a button to clear the database

//don't forget to add eastereggs