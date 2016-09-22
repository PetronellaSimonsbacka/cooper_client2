
function Person(attr) {
  this.gender = attr.gender;
  this.age = attr.age;
};

Person.assessCooper = function(distance) {
  calculator = new CooperCalculator();
  calculator.woman_cooper(this);
};
