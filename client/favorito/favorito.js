//Mostramos el boton de categoria como seleccionado o no seleccionado
Template.categories.favorito_status = function(){
  if (Session.equals('current_favorito', this._id)) 
    return "";
  else 
    //Invertimos colores boton
    return " btn-inverse";
};

// añadimos item
function addItem(favorito_id, item_nombre){
  if(!item_nombre && !favorito_id) return;
  Favoritos.update({_id:favorito_id},
                   {$addToSet:{items:{Nombre:item_nombre}}});
}

// eliminamos item
function removeItem(favorito_id, item_nombre){
  if(!item_nombre && !favorito_id) return;
  Favoritos.update({_id:favorito_id},
                   {$pull:{items:{Nombre:item_nombre}}});
}         
// Actualizamos lendee
function updateLendee(favorito_id, item_nombre, lendee_nombre){
  var l = Favoritos.findOne({"_id":favorito_id, "items.Nombre":item_nombre});
  if (l&&l.items){
    console.log(l.items.length);
    for(var i=0; i<l.items.length; i++){
      if(l.items[i].Nombre == item_nombre){
        l.items[i].LentTo = lendee_nombre;
      }
    }
    Favoritos.update({"_id":favorito_id},{$set:{"items":l.items}});
  }
};

Template.favorito.items = function() {
  // Comprovamos si un favorito está seleccionado
  if (Session.equals('current_favorito', null))
    return null;
  else {
    // Get id del favorito de la categorita seleccionada
    var cats = Favoritos.findOne({"_id":Session.get('current_favorito')});
    if (cats && cats.items){
      //Iteremos por todos los items de la categoria
      for(var i = 0; i<cats.items.length; i++){
        var d = cats.items[i]; 
        // Comprovamos si esta prestado
        d.Lendee = d.LentTo ? d.LentTo : "free";
        d.LendClass = d.LentTo ? "label-important" : "label-success";
      }
      return cats.items;
    };
  };
};

//¿Estamos viendo un favorito? (favorito_selected)
//¿Que favorito estamos viendo? (favorito_status)
//¿Estamos añadiendo un item a un favorito? (favorito_adding)
//¿Estamos actualizando el préstamo? (lendee_editing)


Template.favorito.favorito_selected = function (){
  return ((Session.get('current_favorito')!=null) && (!Session.equals('current_favorito', null)));
};

//Añadimos el favorito si está a true
Template.favorito.favorito_adding = function (){
  return (Session.equals('favorito_adding',true));
};

//Comprovamos si estamos editando el prestamo
Template.favorito.lendee_editing = function (){
  return (Session.equals('lendee_input',this.Nombre));
};

Template.favorito.events({
  //Abrimos el campo de texto para añadir item
  'click #btnAddItem': function(e,t){ 
    Session.set('favorito_adding',true);
    Meteor.flush();
    //Tendra el cursor en la caja de texto
    focusText(t.find("#item_to_add"));
  },
  //Si pulsamos enter añadimos
  'keyup #item_to_add': function(e,t){
    if(e.which == 13){
      addItem(Session.get('current_favorito'), e.target.value);
      Session.set('favorito_adding', false);
    }
  },
  
  'focusout #item_to_add': function(e,t){
    Session.set('favorito_adding', false);
  },
  //Eliminados item
  'click .delete_item': function(e,t){
    removeItem(Session.get('current_favorito'), e.target.id);
  },
  
  'click .lendee': function(e,t){ 
    Session.set('lendee_input',this.Nombre);
    Meteor.flush();
    focusText(t.find("#edit_lendee"),this.LentTo);
  },
  
  'keyup #edit_lendee': function(e,t){
    //Si pulsamos enter
    if(e.which == 13){
      //Actualizamos lendee
      updateLendee(Session.get('current_favorito'), this.Nombre, e.target.value);
      //Ocultamos la caja de texto
      Session.set('lendee_input',null);
    }
    //Si pulsamos Esc
    if(e.which == 27){
      Session.set('lendee_input',null);
    }
  }
});

////Funciones Helper genéricas////
//Esta funcion coloca el cursor donde debería estar
function focusText(i){
  i.focus();
  i.select();
};
    