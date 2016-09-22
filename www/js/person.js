
function Person(attr) {
  this.gender = attr.gender;
  this.age = attr.age;
  this.distance = attr.distance;
};

Person.prototype.assessCooper = function(data) {
  calculator = new CooperCalculator();
  calculator.woman_cooper(this);
};
