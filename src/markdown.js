/*
  Markdown Block
*/

SirTrevor.Blocks.Markdown = (function(){

  var md_template = _.template([
    '<div class="expanding-textarea">',
      '<pre><span></span><br></pre>',
      '<textarea class="st-markdown st-required"></textarea>',
    '</div>'
  ].join("\n"));

  return SirTrevor.Block.extend({

    type: "Markdown",

    editorHTML: function() {
      return md_template(this);
    },

    loadData: function(data){
      this.$('.st-markdown').html(data.text);
    },

    onBlockRender: function() {
      /* Make our expanding text area */
      var cont = this.$('.expanding-textarea'),
          area = cont.find('textarea'),
          span = cont.find('span');

      area.bind('input', function(){
        span.text(area.val());
      });

      cont.addClass('active');
    },

    toData: function() {
      var dataObj = {};

      dataObj.text = this.$('.st-markdown').val();
      this.setData(dataObj);
    }

  });

})();