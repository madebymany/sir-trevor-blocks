/*
  A generic heading block level element
*/

SirTrevor.Blocks.Heading = SirTrevor.Block.extend({ 

  title: "Heading",             
  className: "heading",  
  limit: 0,
  toolbarEnabled: true,         
  dropEnabled: false,
  formattingEnabled: false,

  editorHTML: function() {
		return _.template('<div class="expanding-textarea"><pre><span></span><br></pre><textarea class="required <%= className %>"></textarea></div>', this);
	},

  loadData: function(data){
    this.$$('.heading').html(data.text);
  },
  
  onBlockRender: function(){
    /* Make our expanding text area */
    
    var cont = this.$$('.expanding-textarea'),
        area = cont.find('textarea'),
        span = cont.find('span');
        
    area.bind('input', function(){
      span.text(area.val());
    });
    
    cont.addClass('active');

		area.focus();
		
  },
  
  toData: function() {
    var bl = this.$el,
        dataObj = {}
    
    dataObj.text = this.$$('.heading').val();

		this.setData(dataObj)

  }

});