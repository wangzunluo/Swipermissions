import app from 'firebase/app';

import 'firebase/database';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.database();
  }

  readStudentsOnce = () => this.db.ref("users").once('value').then(snapshot => {
    return snapshot.val()
  });

  readMachinesOnce = () => this.db.ref("machine").once('value').then(snapshot => {
    return snapshot.val()
  });

  checkoutMachine = (id, name, machine, logs, logid) => {

    let item = {
      available: 'f',
      name: machine,
      user: name
    }
    this.recordLog(id, logs, logid)

    return this.db.ref('/machine/' + id).update(item)

  }

  addUser = (first, last, email, id) => {
    console.log("calling firebase")
    var updates = {}
    let item = {
      FirstName: first,
      LastName: last,
      Email: email
    }
    updates['/users/' + id] = item
    return this.db.ref().update(updates)
  }

  checkinMachine = (id, machine, logs, logid) => {

    let item = {
      available: 't',
      name: machine,
      user: "none"
    }
    this.recordLog(id, logs, logid)
    
    return this.db.ref('/machine/' + id).update(item)
  }

  recordLog = (machineid, log, id) => {
    var updates = {}
    let item = log
    updates['/machine/' + machineid + '/logs/' + id] = item
    return this.db.ref().update(updates)
  }

  recordSLog = (machineid, log) => {
    var updates = {}
    let item = log
    updates['/machine/' + machineid + '/slog/'] = item
    return this.db.ref().update(updates)
  }

  clearLogs = (machineid) => {
    var updates = {}
    updates['/machine/' + machineid + '/slog/'] = ""
    updates['/machine/' + machineid + '/logs/'] = ""
    return this.db.ref().update(updates)
  }

  writeUser = (attributes, values) => {
    let insert = {}
    let myAttributes = attributes.slice()

    myAttributes.splice(3,1)
    let myValues = values.slice()
    let id = myValues.splice(3,1)
    myAttributes.forEach((attribute, i) => insert[attribute] = myValues[i])

    var updates = {}
    updates['/users/' + id] = insert

    return this.db.ref().update(updates)
  }

  updateUser = (user, id) => {
    var updates = {}
    updates['/users/' + id] = user

    return this.db.ref().update(updates)
  }
  


}

export default Firebase;
