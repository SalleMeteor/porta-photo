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
    
    // before hooks are run before your action
    before: [
      function () {
        this.subscribe('allContacts'); // don't wait
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ],

    action: function () {
      this.render(); // render all
    },
    
    unload: function () {
      // before a new route is run
    }    
    
  });

  /**
   * The route's name is "contacts"
   * The route's path is "/contacts"
   * The route's template is inferred to be "contacts"
   */
  this.route('contacts', {
    path: '/contacts',
    
    // before hooks are run before your action
    before: [
      function () {
        this.subscribe('allContacts'); // don't wait
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ],

    action: function () {
      this.render(); // render all
    },
    
    unload: function () {
      // before a new route is run
    }    
    
  });

  this.route('contact', {
    path: '/contacts/:_name',

    load: function () {
      // called on first load
    },

    // before hooks are run before your action
    before: [
      function () {
        console.log("this.params._name: ", this.params._name);
        this.subscribe('myContact', this.params._name).wait(); // wait
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ],

    action: function () {
      var params = this.params; // including query params
      var hash = this.hash;
      var isFirstRun = this.isFirstRun;

      this.render(); // render all
      //this.render('specificTemplate', {to: 'namedYield'});
    },

    unload: function () {
      // before a new route is run
    }
  });
});