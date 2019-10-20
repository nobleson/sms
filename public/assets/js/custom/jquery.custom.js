function buildNewsScroller(data,e){
    var json = JSON.stringify(data); 
  // console.log("article list json:"+json);
    var div = document.getElementById(e);  
    var count = 0;
      $.each($.parseJSON(json), function(keys,obj) {
              count++;
              var id = obj.articleId;
              var subject = obj.subject;
              var content = obj.content;
              var editor = obj.publisher;
              var category = obj.category;
//                var source = obj.source;
//                var status = obj.status;
              var date = obj.dateCreated;
              var image = obj.postImage;
              
              var article = '<div class="scroller-item">'
                                  +'<a itemprop="url" href="#">'
                                      +'<figure class="post-thumbnail">'
                                          +'<img src='+image+' alt='+subject+' width="274" height="183">'                                  
                                      +'</figure>'
                                     +'<h2 itemprop="headline" id='+id+' class="new-head-line">'+subject+'</h2>'
                                  +'</a>'
                                  +'<div class="entry-meta">'
                                         +'<div class="author-link">'
                                              +'<i class="momizat-icon-user3"></i><a itemprop="author" href="#" rel="author">'+editor+'</a>'
                                          +'</div>'
                                        +'<time class="entry-date" datetime="2014-07-03T10:01:57+00:00" itemprop="datePublished" content="2014-07-03T10:01:57+00:00"><i class="momizat-icon-calendar"></i>'+date+'</time>'
                                         +'<div class="cat-link">'
                                             +'<i class="momizat-icon-folder-open"></i><a class="category" href="#">'+category+'</a>'                                           
                                         +'</div>'
                      +'</div>'
                              +'</div>';
              
                  $("#new_scroller").append(article);
              
      });    
} 
function deleteData(_id){ 
    //var dataString = [formData];
     var result="";
   $.ajax({
     url: 'api/face/'+_id,
     type: 'DELETE',
     async: false,  
     success: function(data) {
         
         result = data; 
     },error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error status:"+textStatus);
        }
       
  });
   return result;
} 
function submitData(formData){ 
    //var dataString = [formData];
     var result="";
   $.ajax({
     url: 'api/face/create',
     data: formData, 
     type: 'POST',
     async: false,  
     success: function(data) {
         
         result = data; 
     },error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error status:"+textStatus);
        }
       
  });
   return result;
} 
function buildMidArticleList(data,e){
    var json = JSON.stringify(data); 
  // console.log("article list json:"+json);
    var ul = document.getElementById(e);  
    var count = 0;
      $.each($.parseJSON(json), function(keys,obj) {
              count++;
              
              var id = obj.articleId;
              var subject = obj.subject;
              var content = obj.content;
//                var editor = obj.publisher;
//                var category = obj.category;
//                var source = obj.source;
//                var status = obj.status;
              var date = obj.dateCreated;
              var image = obj.postImage;
              
              var article = $('<li class="post-2087 post type-post status-publish format-standard has-post-thumbnail category-business">'
                                +'<figure class="post-thumbnail"><a href="#">'
                                  +'<img src='+image+'  alt='+subject+' width="266" height="179">'                                       
                                  +'</a></figure>'
                                 +'<div class="f-tabbed-list-content">'
                                 +'<div class="f-p-title">'
                                     +'<h2 itemprop="headline"><a itemprop="url" href="#" class="news-head-line" id='+id+'>'+subject+'</a></h2>'
                                      +'<span class="post-format-icon"></span>'
                                     +'</div>'
                                  +'<div class="entry-content">'+content+'</div>'
                                              +'<div class="entry-meta">'
                                                  +'<time class="entry-date" datetime="2014-07-03T10:01:57+00:00" itemprop="datePublished" content="2014-07-03T10:01:57+00:00"><i class="momizat-icon-calendar"></i>'+date+'</time>'
                                                 +'<span class="comments-link">'
                                          +'<iclass="momizat-icon-bubbles4"></i><a href="#respond">(0) Comments</a>'
                                      +'</span>'
                                     +'</div>'
                                    +'</div>'
                                   +'</li>');
              
                  $(ul).append(article);
              
      });    
} 

function buildSmallArticleList(data,e){
    var json = JSON.stringify(data); 
   // console.log("article list json:"+json);
    var ul = document.getElementById(e);  
    var count = 0;
      $.each($.parseJSON(json), function(keys,obj) {
              count++;
              
              var id = obj.articleId;
              var subject = obj.subject;
//                var content = obj.content;
//                var editor = obj.publisher;
//                var category = obj.category;
//                var source = obj.source;
//                var status = obj.status;
              var date = obj.dateCreated;
              var image = obj.postImage;
              
              console.log("image:"+image);
              var article = $('<li>'
                              +'<figure class="post-thumbnail">'
                                  +'<a href="#" rel="bookmark">'
                                      +'<img src='+image+' alt="Post Banner" width="170" height="113">'				
                                  +'</a>'
                              +'</figure>'
                              +'<h4><a href="#" rel="bookmark">'+subject+'</a></h4>'
                              +'<div class="entry-meta">'
                              +'<time class="entry-date" datetime="2014-05-18T11:37:42+00:00" content="2014-05-18T11:37:42+00:00"><i class="momizat-icon-calendar"></i>'+date+'</time>'
                              +'<div class="comments-link">'
                              +'<i class="momizat-icon-bubbles4"></i><a href="#">Comment</a>'
                              +'</div>'
                              +'</div>'
                              +'<a href="#" class="read-more-link" id='+id+'>Read more...</a>'
                          +'</li>');
                  
                  
                  $(ul).append(article);
              
      });    
} 
function getArticleList(){

var dataString = ["loadarticles"];
var jsonData;
$.ajax
  ({
  type: "GET",
  url: "form",
  data: {dataString:dataString}, 
  dataType:"json",
  async: false,
  success: function(data)
  {
      jsonData = data;

  }

  });
  return  jsonData;
} 
function buildGroupCombo(data,e){
    data.sort(sortByProperty("name"));
     var json = JSON.stringify(data); 
     console.log("state json:"+json);
     var sel = document.getElementById(e);
     var opt = null;
       opt = document.createElement('option');
       opt.value = "";
       opt.innerHTML = "[ Select Group Name ]";
       sel.appendChild(opt);      

       $.each($.parseJSON(json), function(keys,obj) {

               var name = obj["groupId"];
               var value = obj["name"];

               opt = document.createElement('option');
               opt.value = name;
               opt.innerHTML = value;
               sel.appendChild(opt);

       });    

} 
function buildAdminCombo(data,e){
    data.sort(sortByProperty("userId"));
     var json = JSON.stringify(data); 
     console.log("state json:"+json);
     var sel = document.getElementById(e);
     var opt = null;
       opt = document.createElement('option');
       opt.value = "";
       opt.innerHTML = "[ Select Admin Name ]";
       sel.appendChild(opt);      

       $.each($.parseJSON(json), function(keys,obj) {

               var name = obj["id"];
               var value = obj["userId"];

               opt = document.createElement('option');
               opt.value = name;
               opt.innerHTML = value;
               sel.appendChild(opt);

       });    

} 

function buildGroupCard(data,e){
     var json = JSON.stringify(data); 
     console.log("group list json:"+json);
     var div = document.getElementById(e);      
     var count = 0;
       $.each($.parseJSON(json), function(keys,obj) {
               count++;
               var id = obj.groupId;
               var name = obj.name;
               var desc = obj.description;
               var date = obj.dateCreated;
               var type = obj.type;
               var total = obj.totalMembership;
               var image = obj.banner;
               var group = $('<li>'
                               +'<figure class="post-thumbnail">'
                                   +'<a href="#" rel="bookmark">'
                                       +'<img src='+image+' alt="Post Banner" width="170" height="113">'				
                                   +'</a>'
                               +'</figure>'
                               +'<h4><a href="#" rel="bookmark">'+name+'</a></h4>'
                               +'<div class="entry-meta">'
                              +'<div class="action">'
                                      +'<div class="meta">'+type+' / '+total+' members'
                                      +'</div>'
                              +'</div>'                           
                               +'<time class="entry-date" datetime="2014-05-18T11:37:42+00:00" content="2014-05-18T11:37:42+00:00"><i class="momizat-icon-calendar"></i>'+date+'</time>'
                               +'<div class="comments-link">'
                               +'<i class="momizat-icon-bubbles4"></i><a href="#">Comment</a>'                     
                               +'</div>'
                               +'</div>'
                               +'<a href="group?id='+id+'" class="read-more-link">Join the group</a>'
                           +'</li>');                       
           $(div).append(group);

       });    
//$("#group_count").text(count);
} 
function getGroupList(){

var dataString = ["loadgroups"];
var jsonData;
$.ajax
   ({
   type: "GET",
   url: "form",
   data: {dataString:dataString}, 
   dataType:"json",
   async: false,
   success: function(data)
   {
       jsonData = data;

   }

   });
   return  jsonData;
}
