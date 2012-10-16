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
		return _.template('<h2 class="required text-block <%= className %>" contenteditable="true"></h2>', this);
	},

	loadData: function(data){
     this.$$('.text-block').html(data.text);
  }

});