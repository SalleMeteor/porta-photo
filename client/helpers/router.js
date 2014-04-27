Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound"
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   */
  this.route('home', {
    path: '/',
    template: 'home',

    action: function () {
      this.render(); // render all
    }   
    
  });
  
  this.route('chat', {
    path: '/chat'
  });
  
});

Router.onBeforeAction('loading');
