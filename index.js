let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

// Creating employee record for each employee. 

// employeeRowData = [
//     [ 'Thor', 'Odinsson', 'Electrical Engineer', 45 ],
//     [ 'Loki', 'Laufeysson-Odinsson', 'HR Representative', 35 ],
//     [ 'Natalia', 'Romanov', 'CEO', 150 ],
//     [ 'Darcey', 'Lewis', 'Intern', 15 ],
//     [ 'Jarvis', 'Stark', 'CIO', 125 ],
//     [ 'Anthony', 'Stark', 'Angel Investor', 300 ]
//   ]



let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')   
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

// this.timeInEvents example []
// this.timeInEvents example [ { type: 'TimeIn', hour: 800, date: '2018-01-01' } ]
// this.timeInEvents example [
//   { type: 'TimeIn', hour: 800, date: '2018-01-01' },
//   { type: 'TimeIn', hour: 800, date: '2018-01-02' }
// ]
// this.timeInEvents example []
// this.timeInEvents example [ { type: 'TimeIn', hour: 700, date: '2018-01-01' } ]
// this.timeInEvents example [
//   { type: 'TimeIn', hour: 700, date: '2018-01-01' },
//   { type: 'TimeIn', hour: 700, date: '2018-01-02' }
// ]
// this.timeInEvents example []
// this.timeInEvents example [ { type: 'TimeIn', hour: 1700, date: '2018-01-03' } ]
// this.timeInEvents example [
//   { type: 'TimeIn', hour: 1700, date: '2018-01-03' },
//   { type: 'TimeIn', hour: 1800, date: '2018-01-05' }
// ]
// this.timeInEvents example []
// this.timeInEvents example [ { type: 'TimeIn', hour: 700, date: '2018-01-01' } ]
// this.timeInEvents example [
//   { type: 'TimeIn', hour: 700, date: '2018-01-01' },
//   { type: 'TimeIn', hour: 800, date: '2018-01-02' }
// ]
// this.timeInEvents example []
// this.timeInEvents example [ { type: 'TimeIn', hour: 500, date: '2018-01-01' } ]
// this.timeInEvents example [
//   { type: 'TimeIn', hour: 500, date: '2018-01-01' },
//   { type: 'TimeIn', hour: 500, date: '2018-01-02' }
// ]
// this.timeInEvents example []
// this.timeInEvents example [ { type: 'TimeIn', hour: 1400, date: '2018-01-01' } ]
// this.timeInEvents example [
//   { type: 'TimeIn', hour: 1400, date: '2018-01-01' },
//   { type: 'TimeIn', hour: 1400, date: '2018-01-02' }
// ]


let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

//Similar to above


let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

// console.log("Sought Date", soughtDate)
// Sought Date 2018-01-03
// Sought Date 2018-01-01
// Sought Date 2018-01-02
// Sought Date 2018-01-03
// Sought Date 2018-01-03
// Sought Date 2018-01-05
// Sought Date 2018-01-03
// Sought Date 2018-01-01
// Sought Date 2018-01-02
// Sought Date 2018-01-03
// Sought Date 2018-01-01
// Sought Date 2018-01-02
// Sought Date 2018-01-03
// Sought Date 2018-01-01
// Sought Date 2018-01-02
// Sought Date 2018-01-03


let wagesEarnedOnDate = function(dateSought){
    console.log("Hours worked on date", this)
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

// Hours worked on date [Function (anonymous)] {
//     toString: [Function: toString],
//     __spy: {
//       calls: [
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array], [Array], [Array],
//         [Array]
//       ],
//       called: true,
//       name: 'object.hoursWorkedOnDate',
//       tracked: {
//         object: [Window],
//         methodName: 'hoursWorkedOnDate',
//         originalMethod: [Function: hoursWorkedOnDate],
//         isOwnMethod: true
//       }
//     }
//   }



let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}