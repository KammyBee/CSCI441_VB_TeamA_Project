// written by: Bjarni Jonsson

class Customer {
    constructor(customerID, username, password, firstName, lastName, phone, points = 0, email, gender, dob) {
      this.customerID = customerID;
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.points = points;
      this.email = email;
      this.gender = gender;
      this.dob = dob;
    }
  
    update(data) {
      this.username = data.username || this.username;
      this.password = data.password || this.password;
      this.firstName = data.firstName || this.firstName;
      this.lastName = data.lastName || this.lastName;
      this.phone = data.phone || this.phone;
      this.points = data.points !== undefined ? data.points : this.points;
      this.email = data.email || this.email;
      this.gender = data.gender || this.gender;
      this.dob = data.dob || this.dob;
    }
  
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  
    updateRewardPoints(newPoints) {
      this.points = newPoints;
    }
  }
  
  // export for Node.js
  module.exports = Customer;
  