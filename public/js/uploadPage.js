				 var temp = {};
				 var br = false;
				 var j = 0;
                 temp.descs = [];
                 temp.deleted = 0;

				 var delPrevImg = function(el) {
				 	var n = el.parentNode.classList[1];
				 	n = n.substring(7,10);				 	
				 	el.parentNode.parentNode.removeChild(el.parentNode);
                    temp.deleted++;
				 	delete window.temp[n];
				 } 

                 var saveDescPrevImg = function(el) {
                    var n = el.parentNode.classList[1];
                    n = n.substring(7,10);
                    desc = document.querySelector('.prevDesc-' + n); 
                    describe = desc.value;
                    saveBtn = angular.element(document.querySelector('.saveDescPrevBtn-' + n));
                    delBtn = angular.element(document.querySelector('.prevDelBtn-' + n));
                    editBtn =  angular.element(document.querySelector('.descPrevBtn-' + n));
                    desc = angular.element(document.querySelector('.prevDesc-' + n));
                    editBtn.toggleClass("hide");
                    saveBtn.toggleClass("hide");
                    delBtn.toggleClass("hide");     
                    desc.toggleClass("hide");
                    temp.descs[n] = describe;
                 }

                 var descPrevImg = function(el) {
                    var n = el.parentNode.classList[1];
                    n = n.substring(7,10);
                    saveBtn = angular.element(document.querySelector('.saveDescPrevBtn-' + n));
                    delBtn = angular.element(document.querySelector('.prevDelBtn-' + n));
                    editBtn =  angular.element(document.querySelector('.descPrevBtn-' + n));
                    desc = angular.element(document.querySelector('.prevDesc-' + n));
                    editBtn.toggleClass("hide");
                    saveBtn.toggleClass("hide");
                    delBtn.toggleClass("hide");     
                    desc.toggleClass("hide");
                 }

	             var handleFileSelect = function(evt) {
	             	br = false;
                    var file = evt.target.files;
                    
                    for (var i = 0, f; f = file[i]; i++) {
                       
                        if (!f.type.match('image.*')) {
                            br = true;
                            break;
                        }

                        var reader = new FileReader();
                        
                        reader.onload = (function (theFile) {
                            return function (e) {
                                var span = document.createElement('span');
                                span.classList.add('holder');
                    			span.classList.add('holder-' + j);
                                span.innerHTML = 
                                    ['<img class="thumb thumb-', j, '"', ' width="100px"', '" src="', e.target.result, '" />','<a href="#" onclick="delPrevImg(this)" class="glyphicon glyphicon-remove prevDelBtn prevDelBtn-', j, '"></a>',
                                     '<a href="#" onclick="descPrevImg(this)" class="glyphicon glyphicon-pencil descPrevBtn descPrevBtn-', j, '"></a>', 
                                     '<a href="#" onclick="saveDescPrevImg(this)" class="hide glyphicon glyphicon-ok saveDescPrevBtn saveDescPrevBtn-', j, '"></a>'
                                    ,'<input type="text" class="hide prevDesc prevDesc-', j, '">'
                                    ].join('');

                                document.getElementById('output').insertBefore(span, null);
                                temp[j] = theFile;
                                j++;    
                                temp.last = j;
                            };
                        })(f);
                   
                        reader.readAsDataURL(f);
                    }

                }
                document.getElementById('file').addEventListener('change', handleFileSelect, false);

	            window.temp = temp;
