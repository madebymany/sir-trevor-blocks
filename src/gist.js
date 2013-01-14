/*
  Gist BlockType
*/

var template = '<p>Drop gist link here</p><div class="input text"><label>or paste URL:</label><input type="text" class="paste-block"></div>';
var gist_template = '<div class="gist"><%= div %></div>';

SirTrevor.Blocks.Gist = SirTrevor.Block.extend({ 
  
  title: "Gist",
  className: "gist-block",
  dropEnabled: true,
  
  editorHTML: "<div></div>",
  
  dropzoneHTML: template,
  
  loadData: function(data){
    this.loadGist(data.id);
  },
  
  loadGist: function(gist_id) {
    // Get the gist data (too big to store in JSON)
    var callbackSuccess = function(data) {
      this.setData({ id: gist_id });

      $('head').append('<link rel="stylesheet" href="'+data.stylesheet+'" type="text/css">');
      
      this.$editor.html(data.div);
      this.$dropzone.fadeOut(250);
      this.$editor.show();
      this.ready();
    };

    var callbackFail = function(){
      this.ready();
    };
    
    // Make our AJAX call
    $.ajax({
      url: "https://gist.github.com/" + gist_id + ".json",
      dataType: "JSONP",
      success: _.bind(callbackSuccess, this),
      error: _.bind(callbackFail, this)
    });
  },
  
  onContentPasted: function(event){
    // Content pasted. Delegate to the drop parse method
    var input = $(event.target),
        val = input.val();
    this.handleDropPaste(val);
  },
  
  handleDropPaste: function(url) {
    if(_.isURI(url)) 
    {
      if (url.indexOf("gist") != -1) {
        // Twitter status
        var ID = url.match(/[^\/]+$/);
        
        if (!_.isEmpty(ID)) {
          this.loading();
          
          ID = ID[0];
          this.loadGist(ID);
        }
      }
    }
  },

  onDrop: function(transferData){
    var url = transferData.getData('text/plain');
    this.handleDropPaste(url);
  }
});