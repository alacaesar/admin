
// shop admin

var Admin = {
    definitions:{
        mainTabs: null
    },
    init: function(){
        var t = this,
            currentID = null,
            tabsCookies = t.cookies.check("@alaashopcookies");
        
        // detect main tabs HTML and trigger.
        if( detectEl("#main-tabs ul li:eq(0) a") )
        {
            var a = $("#main-tabs ul li:eq(0) a"),
                currentID = $("#main-tabs ul li:eq(0) a").attr("href").replace("#", "");
            this.tabs.registerTab({url: a.attr("data-url"), ID:currentID, title:a.attr("title")});
            
            var mainTabs = $( "#main-tabs" ).tabs({classes: {"ui-tabs-active": "active"}});
            mainTabs.find( ".ui-tabs-nav" ).sortable({
                axis: "x",
                stop: function() { mainTabs.tabs( "refresh" ); Admin.tabs.refreshOrder(); }
            });
            
            mainTabs.on( "click", "span.glyphicon-remove", function(){ t.tabs.close( this ); });
            
            t.definitions.mainTabs = mainTabs;
        }
        
        // check for tabs cookies to open them
        if (tabsCookies != null)
        {    
            var tabs = JSON.parse( tabsCookies );
            
            // open all tabs on cookie except the current page.
            for(var i in tabs)
                if (i != currentID)
                    t.tabs.open({url:tabs[i].url, title:tabs[i].title, ID:i});
        }
        
        // activate the current page
        t.activate();
    },
    
    // main page tabs manager
    tabs:{
        open: function(obj, fixed){
            
            var _tbs = this,
                tabs = Admin.definitions.mainTabs,
                tabTemplate = '<li id="tab-#{id}" role="presentation" class="active"><a href="#{id}">#{title}'+ (fixed ? '' : '<span class="glyphicon glyphicon-remove"></span>') + '</a></li>',
                ID = obj.ID;
            
            if (this.openTabs[ID] == null)
            {
                var li = $( tabTemplate.replace( /#\{id\}/g, "#"+ID).replace( /#\{title\}/g, obj.title ));
                $("#main-tabs > ul > li.active").removeClass("active");
                
                tabs.find(">.ui-tabs-nav").append( li );
                tabs.append('<div id="'+ID+'">Loading '+ ID +'</div>');
                tabs.tabs("refresh");
                $('a[href="#'+ID+'"]').click();
                
                this.registerTab({url: obj.url, ID:ID, title:obj.title});
                this.load(obj.url, ID);
                
                this.refreshCookies();
            }
            else
            {
                $('a[href="#'+ID+'"]').click();
            }
        },
        registerTab: function(obj){
            
            console.log(obj.ID, this.index);
            
            var _this = this;
                _this.openTabs[obj.ID] = {open:_this.index, url: obj.url, ID:obj.ID, title:obj.title};
                _this.index++;
                
                
        },
        close: function(obj){
            var ID = $( obj ).closest( "li" ).remove().attr( "aria-controls" ), t = this;
            $( "#" + ID ).remove();
            
            delete this.openTabs[ID];
            
            // select another tab on close
            if( Object.keys(t.openTabs).length == 0 )
                this.open({url:"index.html", title:"Home", ID:"home"}, true);
            else
                for ( i in t.openTabs)
                    if( t.openTabs[i] != null ) {
                        $('a[href="#'+i+'"]').click();
                        Admin.registerToHistory(i, t.openTabs[i].url);
                        break;
                    }
            
            this.refreshCookies();
        },
        load: function( url, ID )
        {
            var t = this;
            
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
                    
                    var html = $(data).find("div.page-content");
                    
                    $("#"+ID).html( html );
                    Admin.activate("#"+ID);
                    Admin.registerToHistory(ID, url);
                }
            });
        },
        refreshCookies: function(){
            Admin.cookies.write("@alaashopcookies", JSON.stringify(this.openTabs));
        },
        refreshOrder: function(){
            $("#main-tabs > ul > .ui-tabs-tab").each(function(index){
                var id = $("a", this).attr("href").replace("#", "");
                
                console.log(id, index);
                
            });
        },
        index: 0,
        openTabs: {}
    },
    activate: function( ID ){
        for ( i in this.actions)
            this.actions[i]( ID );
    },
    actions:{
        // make links with no target="blank" open in a tab rather than a new page
        links: function( ID ){
            var _ID = ID || "", t = Admin;
            
            $(_ID+" a").each(function(){
                if( $(this).attr("target") != "blank" && $(this).attr("href").indexOf("#") < 0 )
                    $(this).unbind("click").click(function( event ){
                        event.preventDefault();
                        t.tabs.open({url:$(this).attr("href"), title:$(this).attr("title"), ID:$(this).attr("data-id")});
                    });
            });
        },
        // activate tabs inside a page
        tabs: function( ID ){
            var _ID = ID || "";
            
            var gridtabs = $(_ID+" #tabs").tabs({classes: {"ui-tabs-active": "active"}});
        },
        // activate date-picker and date ranger picker
        datePicker: function( ID ){
            var _ID = ID || "";
            
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
        // activate drag and drop functionality
        dragAndDrop: function( ID ){    // drag and drop
            var _ID = ID || "";
            
            dragula([document.querySelector(_ID+" #left-defaults"), document.querySelector(_ID+" #right-defaults")], {
                moves: function(el, container, handle){ return handle.classList.contains('handle'); }
            });
        },
        // activate data table grid
        table: function( ID ){
            var _ID = ID || "";
            $(_ID+" .data-table").each(function(){
                eval("var config = " + $('noscript', this).html());
                $('table', this).DataTable( config );
                
                if( $('noscript', this).attr("dir") != undefined)
                    eval($('noscript', this).attr("dir"))();
            });
        },
        // multiselect
        multiselect: function( ID ){
            var _ID = ID || "";
            $(_ID+" .multiselect").each(function(){
                $(this).Multiselect();
            });
        }
    },
    
    // register clicked page to browser history
    registerToHistory: function(page, url) {
        if (history && history.pushState){
            var obj = {Page:page, Url:url};
            history.pushState(obj, obj.Page, obj.Url);
        }
    },
    
    // cookies manager
    cookies: {
        write: function(key, value, days){
            var _days = days || 7;
            var d = new Date();
                d.setTime(d.getTime() + (_days*24*60*60*1000));
            document.cookie = key + "=" + value + ";   expired=" + d.toGMTString();
        },
        check: function(key){
            var value = "; " + document.cookie,
                parts = value.split("; " + key + "=");
            return parts.length == 2 ? parts.pop().split(";").shift() : null;
        }
    },
    page:{
        save: function(obj, closeAfterSave){
        
            var p = this,
                page = $(obj).parents(".page-content");
            
            p.forms = $("form", page).length;
            p.success = 0;
            $("#error-desc").html("<b>Oops! some problem occured:<b><br>").addClass("hidden");
            
            $("form", page).each(function(){
                $.ajax({
                    data: $(this).serialize() + "&formID="+$(this).attr("id"),
                    type: $(this).attr('method'),
                    url: $(this).attr('action'),
                    success: function(response){
                        
                        p.response( JSON.parse( response ) );
                        
                    }
                });                
            });
        },
        response: function( response ){
            var p = this;
            
            if (response.result == "OK")
            {
                $("#"+response.id+" .has-error").removeClass("has-error");
                p.success++;
            }
            else
            {
                $("#error-desc").append("<b>"+response.id+"</b><br>").removeClass("hidden");
                
                for( item in response.data )
                {
                    $("#"+response.id+" input[name="+item+"]").parent("div").addClass("has-error");
                    $("#error-desc").append( "- " + response.data[item] + "<br>" );
                }
            }
            
            if ( p.success == p.forms ) p.refresh();
            
        },
        refresh: function(){
            console.log("refresh page");
        },
        forms: 0,
        success: 0
    }
}

// trigger the whole thing
Admin.init();

// Helper Functions
function detectEl( ID ){ return $(ID).length > 0 ? true : false; }
window.addEventListener('popstate', function(event){ console.log(event); });