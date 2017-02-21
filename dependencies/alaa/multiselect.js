/*
    Multiselect - Alaa A. 2017
*/

(function ($) {
    $.fn.extend({
        Multiselect: function(options, callback) {
            var defaults = {
                };
            var _options = $.extend(defaults, options);
            var _callback = callback;
            
            return this.each(function () {
                var opt = options,
                    callback = _callback;
                    obj = $(this);

                init();

                function init(){
                    
                    var _obj = obj;
                    //
                    console.log("init");
                    
                    var selected = {},
                        created = false;
                    
                    _obj.on( "click", ".toggle", triggerWindow);
                    
                    function triggerWindow( item ) {
                        if ( !created ) {
                            openWindow( item );
                            created = true;
                        }
                    }
                    
                    function openWindow( item ) {
                        
                        var tableTemplate = '<table id="#{id}" class="table table-striped table-hover" cellspacing="0" width="100%"><thead><tr>#{th}</tr></thead></table>';
                        var source = $(item.currentTarget).attr("data-source"),
                            columns = $(item.currentTarget).attr("columns").split("|"),
                            th = "";
                            
                        for(i in columns){
                            th += '<th>'+columns[i]+'</th>';
                        }
                        
                        var table = $( tableTemplate.replace( /#\{id\}/g, "#"+'ID').replace( /#\{th\}/g, th ));
                        
                        $(".modal .modal-body", _obj).html( table );
                        
                        var table = $('table', _obj).DataTable( {"ajax": source, "paging": false, "ordering": false, "info":false} );
                        $('tbody', _obj).on( 'click', 'tr', function (){
                            
                            if( $(this).hasClass("selected") )
                            {
                                delete selected[table.row( this ).index()];
                            }
                            else
                            {
                                selected[table.row( this ).index()] = table.row( this ).data();
                            }
                            $(this).toggleClass('selected');
                            
                            //selected.push( table.row( this ).data() );
                            
                            //console.log( table.row( this ).data() );
                            
						});
                        
                        $(".modal .save-and-close", _obj).bind("click", function(){
                            
                            callback( selected );
                            
                           $(".modal .close", _obj).click();
                        });
                        
                    }
                }
            });
        }
    });
})(jQuery);