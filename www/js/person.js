
function Person(attr) {
  this.gender = attr.gender;
  this.age = attr.age;
  this.distance = attr.distance;
};

Person.prototype.assessCooper = function(data) {
  calculator = new CooperCalculator();
  if (data.gender == 'Male') {
    calculator.man_cooper(this);
  } else {
    calculator.woman_cooper(this);
  }
};
