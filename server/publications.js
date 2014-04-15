Meteor.publish("allContacts", function() {
  return Contacts.find();
});

Meteor.publish("myContact", function(name) {
  return Contacts.find({ name: name });
});