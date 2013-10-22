/*
  Ordered List
*/

SirTrevor.Blocks.OrderedList = (function() {

  var template = '<div class="st-text-block" contenteditable="true"><ol><li></li></ol></div>';

  return SirTrevor.Block.extend({

    type: "ordered_list",

    icon_name: 'list',

    editorHTML: function() {
      return _.template(template, this);
    },

    loadData: function(data){
      this.getTextBlock().html("<ol>" + SirTrevor.toHTML(data.text, this.type) + "<ol>");
    },

    onBlockRender: function() {
      this.checkForList = _.bind(this.checkForList, this);
      this.getTextBlock().on('click keyup', this.checkForList);
    },

    checkForList: function() {
      if (this.$('ol').length === 0) {
        document.execCommand("insertOrderedList", false, false);
      }
    },

    toMarkdown: function(markdown) {
      return markdown.replace(/<\/li>/mg,"\n")
                     .replace(/<\/?[^>]+(>|$)/g, "")
                     .replace(/^(.+)$/mg," 1. $1");
    },

    toHTML: function(html) {
      html = html.replace(/^ 1. (.+)$/mg,"<li>$1</li>")
                 .replace(/\n/mg, "");

      return html;
    },

    onContentPasted: function(event, target) {
      var replace = this.pastedMarkdownToHTML(target[0].innerHTML),
          list = this.$('ol').html(replace);

      this.getTextBlock().caretToEnd();
    }

  });

})();
