Template.categories.favoritos = function(){
  return Favoritos.find({}, { sort: {Category: 1} });
};

// Declaramos el flag 'adding_category'
Session.set("adding_category", false);


// Devuelve true si 'adding_category' le ha sido asignado un valor de true
Template.categories.new_cat = function(){
  return Session.equals("adding_category", true);
};

// El clic en el botton hará las siguientes acciones(adding_category->true, procesamiento de las operaciones reactivas, campo de texto "add-category")
Template.categories.events({
  'click #btnNewCat': function(e, t) { Session.set('adding_category',true);
                                     Meteor.flush();
                                     focusText(t.find("#add-category"));
                                     },
  // Pulsamos enter
  'keyup #add-category': function(e,t){
    if(e.which == 13){
      // Comprovamos si se ha escrito algo en el campo de texto
      var catVal = String(e.target.value || "");
      if(catVal){
        // Añadimos en favoritos
        Favoritos.insert({Category:catVal});
        // adding_category->false
        Session.set('adding_category', false);
      }
    }
  },
  
  // Oculta fuera del campo de texto, lo ocultamos
  'focusout #add-category': function(e,t){ Session.set('adding_category', false);}
  
});

  

////Funciones Helper genéricas////
//Esta funcion coloca el cursor donde debería estar
function focusText(i){
  i.focus();
  i.select();
};
                              
                                   