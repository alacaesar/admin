/*
    Multiselect - Alaa A. 2017
*/

(function ($) {
    $.fn.extend({
        Multiselect: function(options, callback) {
            var defaults = {
                };
            var _options = $.extend(defaults, options);
            return this.each(function () {
                var opt = options,
				obj = $(this);

                init();

                function init(){
                    
                    obj.on( "click", ".toggle", openWindow);
                     
                    
                    function openWindow( item ) {
                        
                        var tableTemplate = '<table id="#{id}" class="table table-striped table-hover" cellspacing="0" width="100%"><thead><tr>#{th}</tr></thead></table>';
                        var source = $(item.currentTarget).attr("data-source"),
                            columns = $(item.currentTarget).attr("columns").split("|"),
                            th = "";
                        
                        for(i in columns){
                            th += '<th>'+columns[i]+'</th>';
                        }
                        
                        var table = $( tableTemplate.replace( /#\{id\}/g, "#"+'ID').replace( /#\{th\}/g, th ));
                        
                        $(".modal .modal-body").html( table );
                        
                        $('table', obj).DataTable( {"ajax": 'data/sample.json', "paging": false, "ordering": false, "info":false} );
                        $('tbody', obj).on( 'click', 'tr', function (){
                            $(this).toggleClass('selected');
						});
                        
                    }
                }
            });
        }
    });
})(jQuery);