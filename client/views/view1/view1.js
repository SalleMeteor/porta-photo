/*
Template.view1.greeting = function () {
  return "Bienvenido";
};

Template.view1.events({
  'click #button': function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
        
    Session.set("currentPage", "view2");
    
    var doc = {
      name: $("#name").val(),
      surname: $("#surname").val(),
      age: $("#age").val()
    };
    
    Contacts.insert(doc);
    
    // async call
    Meteor.call('foo', 1, 2, function (error, result) {
      console.log("result(async): ", result);
    });
    
    // sync call
    var result = Meteor.call('bar');
    console.log("result(sync): ", result);
  }
});
*/