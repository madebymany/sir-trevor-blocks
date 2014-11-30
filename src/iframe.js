SirTrevor.Blocks.Iframe = (function() {

	return SirTrevor.Block.extend({

		regex_src : /(?:<iframe)(?:.+)(?:src="){1}([^"].+?)(?:")(?:.+)(?:<\/iframe>)/i,
		regex_width : /(?:<iframe)(?:.+)(?:width="){1}([^"].+?)(?:")(?:.+)(?:<\/iframe>)/i,
		regex_height : /(?:<iframe)(?:.+)(?:height="){1}([^"].+?)(?:")(?:.+)(?:<\/iframe>)/i,

		type : 'iframe',

		icon_name : 'iframe',

		title : function() {
			return "Iframe";
		},

		toolbarEnabled : true,

		droppable : false,

		pastable : true,

		paste_options : {
			html : '<input type="text" placeholder="<iframe>" class="st-block__paste-input st-paste-block">'
		},

		onContentPasted : function(event) {
			this.loading();

			obj = {};

			val = $(event.target).val();

			match_src = this.regex_src.exec(val);

			if (match_src !== null && !_.isUndefined(match_src[1])) {
				obj.src = match_src[1];

				match_width = val.match(this.regex_width);
				
				if (match_width !== null && !_.isUndefined(match_width[1])) {
					obj.width = match_width[1];
				}

				match_height = val.match(this.regex_height);
				
				if (match_height !== null && !_.isUndefined(match_height[1])) {
					obj.height = match_height[1];
				}

				this.setAndLoadData(obj);
			}
		},

		uploadable : false,

		formattable : false,

		loadData : function(data) {
			data.width = (typeof data.width == undefined || !data.width) ? '100%' : data.width;
			data.height = (typeof data.height == undefined || !data.height) ? '100%' : data.height;

			this.$inner.prepend(
				$('<iframe>')
					.attr('src', data.src)
					.attr('class', 'st-block-embed')
					.attr('width', data.width)
					.attr('height', data.height)
			);

			this.ready();
		},
	});

})();
