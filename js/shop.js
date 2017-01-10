
// shop admin

var Admin = {
    definitions:{
        mainTabs: null
    },
    init: function(){
        var t = this;
        
        var mainTabs = $( "#main-tabs" ).tabs({classes: {"ui-tabs-active": "active"}});
            mainTabs.find( ".ui-tabs-nav" ).sortable({
                axis: "x",
                stop: function() { mainTabs.tabs( "refresh" ); }
            });
            
            mainTabs.on( "click", "span.glyphicon-remove", function() {
                
                t.tabs.close( this );
                
            });
            
            t.definitions.mainTabs = mainTabs;
            
        t.activate();
        
        $("a").each(function(){
            if( $(this).attr("target") != "blank" && $(this).attr("href").indexOf("#") < 0 )
                $(this).unbind("click").click(function( event ){
                    event.preventDefault();
                    
                    t.tabs.open({url:$(this).attr("href"), title:$(this).attr("title"), ID:$(this).attr("id")});
                    
                });
        });
    },
    tabs:{
        open: function(obj){
            
            var tabs = Admin.definitions.mainTabs,
                tabTemplate = '<li id="tab-#{id}" role="presentation" class="active"><a href="#{id}">#{title}</a><span class="glyphicon glyphicon-remove"></span></li>',
                ID = "t-"+obj.ID;
            
            if (this.openTabs[ID] != 1)
            {
                
                var li = $( tabTemplate.replace( /#\{id\}/g, "#"+ID).replace( /#\{title\}/g, obj.title ));
                $("#main-tabs > ul > li.active").removeClass("active");
                
                tabs.find(">.ui-tabs-nav").append( li );
                tabs.append('<div id="'+ID+'">Somethings '+ ID +'</div>');
                tabs.tabs("refresh");
                $('a[href="#'+ID+'"]').click();
                
                this.openTabs[ID] = 1;
                
                this.load("detail.html", ID);
                
                //$("#main-tabs #"+obj.ID).load("grid.html");
            }
            else
            {
                $('a[href="#'+ID+'"]').click();
            }
        },
        close: function(obj){
            var ID = $( obj ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + ID ).remove();
            
            this.openTabs[ID] = 0;
        },
        load: function( url, ID )
        {
            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: url,
                cache: false,
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                    alert(thrownError);
                },
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    
                    //Download progress
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            
                            //progressElem.html(Math.round(percentComplete * 100) + "%");
                            
                            console.log(Math.round(percentComplete * 100));
                        }
                        else
                            console.log("bullshit");
                            
                    }, false);
                    
                    return xhr;
                },
                beforeSend: function () { $('.preloader').addClass("show"); },
                complete: function () {
                    $(".preloader").addClass("done");
                    setTimeout(function(){
                        $(".preloader").removeClass("show");
                        setTimeout(function(){
                            $(".preloader").removeClass("done");
                        }, 200);
                    }, 300);
                },
                success: function (data) {
                    
                    //console.log(data);
                    
                    var html = $(data).find("#left-defaults");
                    
                    //console.log(html);
                    
                    $("#"+ID).html( html );
                    Admin.activate("#"+ID);
                }
            });
        },
        openTabs: {}
    },
    activate: function( ID ){
        for ( i in this.actions)
            this.actions[i]( ID );
    },
    actions:{
        tabs: function( ID ){
            var _ID = ID || "";
            // tabs
            
            var gridtabs = $(_ID+" #tabs").tabs({classes: {"ui-tabs-active": "active"}});
        },
        datePicker: function( ID ){
            var _ID = ID || "";
            // date picker
            
            $(_ID+" .date-picker").each(function(){
                
                if ( $(this).attr("itemprop") == "single" ) {
                    $(this).dateRangePicker({
                        autoClose:true,
                        singleDate:true,
                        showShortcuts:false
                    });
                }
                else if ( $(this).attr("itemprop") == "range" ) {
                    $(this).dateRangePicker({
                        showShortcuts: true,
                        shortcuts :{'prev-days': [3,5,7],'prev': ['week','month','year'],'next-days':null,'next':null}
                    });
                }
                
            });
        },
        dragAndDrop: function( ID ){
            var _ID = ID || "";
            // drag and drop
            
            dragula([document.querySelector(_ID+" #left-defaults"), document.querySelector(_ID+" #right-defaults")], {
                moves: function(el, container, handle){ return handle.classList.contains('handle'); }
            });
        }
    }
}

Admin.init();