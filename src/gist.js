SirTrevor.Blocks.Gist = (function(){

  return SirTrevor.Block.extend({

    type: "Gist",
    droppable: true,
    pastable: true,
    fetchable: true,

    loadData: function(data) {
      this.loadRemoteGist(data.id);
    },

    onContentPasted: function(event){
      // Content pasted. Delegate to the drop parse method
      var input = $(event.target),
          val = input.val();

      this.handleGistDropPaste(val);
    },

    handleGistDropPaste: function(url) {
      if (!this.validGistUrl(url)) {
        this.addMessage("Invalid Gist URL");
        return;
      }

      var gistID = url.match(/[^\/]+$/);
      if (!_.isEmpty(gistID)) {
        gistID = gistID[0];
        this.loading();
        this.setData({ id: gistID });
        this.loadRemoteGist(gistID);
      }
    },

    validGistUrl: function(url) {
      return (_.isURI(url) &&
              url.indexOf("gist.github") !== -1);
    },

    onDrop: function(transferData){
      var url = transferData.getData('text/plain');
      this.handleGistDropPaste(url);
    },

    loadRemoteGist: function(gistID) {
      var ajaxOptions = {
        url: "//gist.github.com/" + gistID + ".json",
        dataType: "jsonp"
      };

      this.fetch(ajaxOptions, this.onGistFetchSuccess, this.onGistFetchFail);
    },

    onGistFetchSuccess: function(data) {
      // And render
      $('head').append('<link rel="stylesheet" href="//gist.github.com'+data.stylesheet+'" type="text/css">');

      this.$inputs.hide();
      this.$editor.html(data.div).show();
      this.ready();
    },

    onGistFetchFail: function() {
      this.addMessage("There was a problem fetching your Gist");
      this.ready();
    }

  });

})();
