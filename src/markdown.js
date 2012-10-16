/*
  Text Block
*/

var md_template = '<div class="expanding-textarea"><pre><span></span><br></pre><textarea class="required <%= className %>"></textarea></div>';

SirTrevor.Blocks.Markdown = SirTrevor.Block.extend({ 
  
  title: "Markdown",
  className: "markdown",
  
  editorHTML: function() {
    return _.template(md_template, this);
  },
  
  loadData: function(data){
    this.$$('.markdown').html(data.text);
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
  },
  
  toData: function() {
    var bl = this.$el,
        dataObj = {}
    
    dataObj.text = this.$$('.markdown').val();

		this.setData(dataObj)
  }
});