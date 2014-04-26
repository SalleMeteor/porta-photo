Template.home.greeting = function () {
  return "Bienvenido a la Filmoteca";
};

Template.home.created = function () {
  Session.set("currentPage", "view1");
  //Meteor.subscribe("allContacts");
}

Template.home.helpers({
  page: function(page) {
    return Session.equals("currentPage", page);     
  }
});

Template.home.events({
  'click #chat': function () {
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
    Router.go("chat");
  }
});

