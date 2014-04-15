Template.contacts.helpers({
  contact: function() {
    return Contacts.find();     
  }
});

Template.contacts.events({
  'click #button': function () {
    Router.go("contact", {"_name": $("#name").val()});   
  }
});