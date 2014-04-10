Template.home.created = function () {
  Session.set("currentPage", "view1");
  
  Meteor.subscribe("allContacts");
}

Template.home.helpers({
  page: function(page) {
    return Session.equals("currentPage", page);     
  }
});
  