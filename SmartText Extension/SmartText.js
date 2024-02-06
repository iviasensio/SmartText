var vBorderRadius = '0px';	
define( [
	"qlik",
	"css!./css/style.css",
	"css!./css/style1.css",
	"./Properties"
],
function (qlik,style,style1,properties) {
	'use strict';	
	return {
		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 30,
					qHeight : 1
				}]
			},			
		},
		definition: properties,
		support: {
			export: true,
			exportData: false,
			snapshot: true
		},
		
		/*resize: function ( $element, layout ) {
			render( $element, layout );
		},*/
		addons: {
		    uses: "addons",
		    items: {
		        calcCond: {
		            label: "Data handling",
		            uses: "calcCond"
		        }
		    }
		},
		beforeDestroy: function(){
			//$('#smarttext-style').remove();
		},
		paint: function ( $element, layout) {
			var app = qlik.currApp(this);
			
			var vddd = new Date();
			var vnnn = vddd.getTime();
			var vrrr = vnnn.toString();
			var vSufixId = vrrr.substr(vrrr.length - 5);
			// puedo sacar el id de la app, útil para server, pero verifica que lo necesite
			// si estoy en desktop entonces buscar el id en el thumbnail, si no lo encuentro cambiar por imagen en blanco
			// enriquece la url de la imagen solo para desktop que tengan thumbnail
			
			var currentLocation = String(window.location);		
			var vCloudBool = false;
			var vSite = 'server';
			if(currentLocation.indexOf('qlikcloud.com') > 0){
				vCloudBool = true;
				vSite = 'cloud';
			}else{
				if(currentLocation.indexOf(':4848') > 0){
					vSite = 'desktop';
				}
			}
			
			//Si estoy en cloud y sin url image tengo que tirar de:
			//https://4r9an7lxszqsyvc.eu.qlikcloud.com/api/v1/apps/9c8d2b22-1d02-440f-a4a8-75be1ce9e7ad/media/files/4.png

			//Si estoy en Desktop y sin url image tengo que tirar del id, solo informado en el thumbnail:			
			var appId = false;
			if(vCloudBool){
				appId = app.id;
			}else{
				appId = app.model.app.id;
				/*if(app.model.layout.qThumbnail.qUrl){
					appId = app.model.layout.qThumbnail.qUrl;
					appId = appId.replace('/media/','');
					appId = appId.substring(0,appId.indexOf('/'));				
				}*/
			}
			
			var vTagsMatrix = new Array();
			var myJsonDataRow = [];
			
			// the measures properties values	
			var vId = layout.qInfo.qId;
			$('#smarttext-style-' + vId).remove();
			layout.qHyperCube.qMeasureInfo.forEach(function (m,n) {
         		//Text
         		switch (m.tagtype){
         			case 'text':
         				var vTextColor;         				
         				var vText = layout.qHyperCube.qGrandTotalRow[n].qText;
         				var vBold = 'normal';
     					if(m.textstylebold){
     						vBold =  'bold';
     					}
         				
         				var vItalic = 'normal';
         				if(m.textstyleitalic){
     						vItalic = 'italic';
     					}

         				var vUnderlined = 'none;'
						if(m.textstyleunderline){
     						vUnderlined = 'underline';
     					}

         				var vShadow = '';
         				/*if(m.textstyleshadow){
     						vShadow = '1.5px 1.5px #7b7a78';
     					}*/
     					if(m.textstyleshadow){
         					vShadow = 'SmartText-shadow-' + m.textstyleshadowtype;
         				}
         				if(m.textcolorbool){
		         			vTextColor = m.textcustomcolor;
		         		}else{
		         			vTextColor = m.textsinglecolor.color;
		         		}
		         		var vActionColor = vTextColor;
		         		if(m.textactioncolorbool){
		         			vActionColor = m.textactioncolor.color;		         		
		         		}
		         		
		         		var vTitle;
		         		var vCursor = '';
		         		var vRef = '';
						var vNavMove = '';
						if(m.textnavurlmove){
							vNavMove = '_self';
						}
		         		switch (m.textnavbool){
		         			case 'none':
		         				vTitle = 'No navigation';
		         				vCursor = '';
		         			break;

		         			case 'sheet':
		         				vTitle = m.textsheetid;		         				
		         				vCursor = 'SmartText-cursor-sheet';
		         				vRef = 'sheet';
		         			break;

		         			case 'url':
		         				vTitle = m.textnavurl;
		         				vCursor = 'SmartText-cursor-url';
		         				vRef = 'url' + vNavMove;
		         			break;

		         			default:
		         				vTitle ='No navigation';
		         				vCursor = '';
		         			break;
		         		}
		         		var vAction = m.textactbool;
		         		var vActionLabel = m.textfieldid;
		         		var vActionValue = m.textactval;
		         		if(vAction == 'selvarvalues'){
		         			vActionLabel = m.textvarid;
		         			vActionValue = m.textvarval;
		         		}
		         		
		         		if(vAction == 'selfieldvalues'){
		         			vCursor = 'SmartText-cursor-action-field';
		         		}
		         		if(vAction == 'selvarvalues'){
		         			vCursor = 'SmartText-cursor-action-var';
		         		}
						if(vCursor != '' || m.textactioncolorbool){
							vCursor += ' SmartText-cursor';
						}
						if(m.texttooltipbool){
							vCursor += ' SmartText-tooltip';
						}
		         		myJsonDataRow = { "type":m.tagtype,"text":vText,"size":m.textsize,"paddingleft":m.textpaddingleft + 'px', "paddingright":m.textpadding + 'px',"paddingtop":m.textpaddingtop + 'px',"position":m.textposition,"align":m.textalign,"font":m.textfont,"color":vTextColor,"actioncolor":vActionColor,"bold":vBold,"italic":vItalic,"underlined":vUnderlined,"shadow":vShadow,"navbool":m.textnavbool,"title":vTitle,"cursor":vCursor,"action":vAction,"actionlabel":vActionLabel,"actionvalue":vActionValue,"ref":vRef,"tooltipbool":m.texttooltipbool,"tooltipchart":m.masterItem,"tooltipsize":m.texttooltipsize};
					break;

					case 'separator':						
						var vSepColor;
						if(m.sepdivcolorbool){
		         			vSepColor = m.sepdivcustomcolor;
		         		}else{
		         			vSepColor = m.sepdivsinglecolor.color;
		         		}		         		
		         		myJsonDataRow = { "type":m.tagtype,"septype":m.septype,"height":m.sepdivheight + 'px',"left":m.sepdivleft + 'px',"top":m.sepdivtop + 'px',"bottom":m.sepdivbottom + 'px',"width": + m.sepdivwidth + '%',"color":vSepColor};												
					break;

					default:
					break;
         		}
         		
				vTagsMatrix.push(myJsonDataRow);         		
         	})
			
			var vBorderBool = layout.borderbool;			
			var vBorder = 'none';
			var vBorderWidth = 0;
			var vSideImgRadius = layout.sideimgradius;
			if(vSideImgRadius == 'undefined'){
				vSideImgRadius = '0%';
			}else{
				vSideImgRadius += '%';
			}
			
			if(vBorderBool){
            	vBorder = layout.borderwidth + 'px solid ' + layout.bordercolor.color;
            	vBorderRadius = layout.borderradius + 'px';
            	vBorderWidth = layout.borderwidth * 2;
            }
			var vBackgroundColorBool = layout.backgroundcolorbool;			
			var vBackgroundColor = layout.backsinglecolor.color;
            if(!vBackgroundColorBool){
            	vBackgroundColor = 'transparent';
            }else{
            	if(layout.backgroundcolortype){
            		vBackgroundColor = layout.backcustomcolor;            		
            	}
            }
            var vSideImgBool = layout.sideimgbool;            
            var vBackgroundImage = '';
            var vImgPath = '';
            var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
			var config = {
			    host: window.location.hostname,
			    prefix: prefix,
			    port: window.location.port,
			    isSecure: window.location.protocol === "https:"
			};
            var vServerURLBasic = ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix ;									
			var vServerURL = vServerURLBasic.replace('/single/','/');
			
            if(layout.backgroundimgbool){
            	if(layout.backgroundimgsrc != 'url'){
            		var auximg = layout.backgroundimage;
            		var auximg2 = auximg;
		        	var imgName = auximg.substring(auximg.lastIndexOf('/'));
            		
            		if(vSite == 'desktop' && auximg2.indexOf('Default') == -1){
		        		auximg = '/content/default/' + imgName;		        		
		        	}else{
			            if(vSite == 'cloud'){
			            	auximg = '/api/v1/apps/' + appId + '/media/files/' + imgName;
			            }else{
			            	if(auximg2.indexOf('appcontent')>0){
			            		auximg = '/appcontent/' + appId + imgName;
			            	}			            	
			            }
			        }
		            vBackgroundImage = vServerURL + auximg;		            
		        }else{
		        	vBackgroundImage = layout.backgroundimageurl;
		        }
		        vBackgroundImage = vBackgroundImage.replace(/\s/g,'%20');
	        }
	        
	        if(vSideImgBool){
	        	if(layout.sideimgsrc != 'url'){
	        		var auximg = layout.sideimg;
		        	var auximg2 = auximg;
		        	var imgName = auximg.substring(auximg.lastIndexOf('/'));
		        	
		        	if(vSite == 'desktop' && auximg2.indexOf('Default') == -1){
		        		auximg = '/content/default/' + imgName;		        		
		        	}else{
			            if(vSite == 'cloud'){
			            	auximg = '/api/v1/apps/' + appId + '/media/files/' + imgName;
			            }else{
			            	if(auximg2.indexOf('appcontent')>0){
			            		auximg = '/appcontent/' + appId + imgName;
			            	}			            	
			            }
			        }
		            vImgPath = vServerURL + auximg;
		        }else{
		        	vImgPath = layout.sideimageurl;		        	
		        }
	        }
            
            var cssBackImg = '';
            var vBackgroundImgSize = layout.backgroundimagesize;
            //if(vBackgroundImage != ''){            	
            	cssBackImg = 'background: url(' + vBackgroundImage + ');background-size: ' + vBackgroundImgSize + ';background-position: ' + layout.backgroundimagealign + ';background-repeat: no-repeat;';
            //}

            //on hover behavior variables
            var vHoverColorBool = layout.hovercolorbool;
			var vHoverSingleColor = layout.hoversinglecolor;
			var vHoverImgBool = layout.hoverimgbool && layout.backgroundimgbool;
			var vImgBool = layout.backgroundimgbool;
			var vHoverImgOpacity = layout.hoverimgopacity;
			var vHoverMeasuresBool = layout.hovermeasuresbool;

			if(isNaN(vHoverImgOpacity)){				
				vHoverImgOpacity = 0;
			}

            //Navigation through images
            var vSideTitle,vSideCursor,vSideRef;
            var vSideNavMove = '';            
        	if(layout.sidenavurlmove){
        		vSideNavMove = '_self';        		
        	}
            switch (layout.sidenavbool){
     			case 'none':
     				vSideTitle = 'No navigation';
     				vSideCursor = '';
     				vSideRef = '';
     			break;

     			case 'sheet':
     				vSideTitle = layout.sidesheetid;		         				
     				vSideCursor = 'SmartText-cursor-sheet';
     				vSideRef = 'sheet';
     			break;

     			case 'url':
     				vSideTitle = layout.sidenavurl;
     				vSideCursor = 'SmartText-cursor-url';
     				vSideRef = 'url' + vSideNavMove;
     			break;

     			default:
     				vSideTitle ='No navigation';
     				vSideCursor = '';
     				vSideRef = '';
     			break;
     		}     		

            var html = '<div qv-extension class = "SmartText-extension">';
            
			html += '<div id = "SmartText-box-' + vSufixId + '" class="SmartText-box" style = "background:' + vBackgroundColor + ';height:calc(100% - ' + vBorderWidth + 'px);border:' + vBorder + ';border-radius:' + vBorderRadius + ';transform:rotate(' + layout.rotation + 'deg);">';
			var vSideImgWidth = layout.sideimgperc + '%';
			var vSideIconWidth = vSideImgWidth;
			var vIconSize = layout.sideiconsize  + '%';
			
			/*In case there is a background image*/
			if(vImgBool){
            	html += '<div id = "SmartText-img-bg-' + vSufixId + '" class="SmartText-img-bg" style = "border-radius:' + vBorderRadius + ';' + cssBackImg + ';opacity:' + layout.backgroundopacity + '"></div>';
            }

			/*In case there is a side image*/
			if(layout.sideimgbool){
            	html +=	'<div id = "SmartText-img-container" class = "SmartText-img-container ' + vSideCursor +'" href = "' + vSideRef + '" style = "width:' + vSideImgWidth + '" title = "' + vSideTitle + '">';
            	if(layout.sideimagebool != false){	
	        		if(vImgPath != vServerURL){
	        			var vSideSize = 'unset';
	        			if(layout.sideimgadapt){
	        				vSideSize = '-webkit-fill-available';
	        			}
	        			html += '<image class = "SmartText-img" src="' + vImgPath + '" style = "' + layout.sideverticalalign + ';opacity:' + layout.sideimgopacity + ';margin:' + layout.sideimgpadding + 'px;border-radius:' + vSideImgRadius +';height:' + vSideSize + ';"></image>';
	        		}
	        	}
        		if(layout.sideiconbool){
					//html += '<div id = "SmartText-icon-container" class = "SmartText-icon-container" style = "width:' + vSideIconWidth + ';height:' + vSideIconWidth + ';' + layout.sideverticalalign +'">';
					html += '<div id = "SmartText-icon-container" class = "SmartText-icon-container" style = "height:' + vSideIconWidth + ';' + layout.sideverticalalign +'">';
					var vIcon = 'lui-icon--' + layout.sideicon;
					if(layout.sideicontype){
						vIcon = layout.sideiconcustom;
					}
					html += '<span id = "SmartText-img-icon" class="SmartText-img-' + layout.sideiconmatrix + ' SmartText-img-icon lui-icon ' + vIcon +' lui-button__icon" aria-hidden="true" style = "font-size:' + vIconSize + ';color:' + layout.sideiconcustomcolor + '"></span>' + 
					'</div>';					
    			}
        		html += '</div>';        		
            }
            if(vHoverMeasuresBool){
            	html += '<div id = "SmartText-span-container" class ="SmartText-span-container" style="visibility:hidden;overflow-y:' + layout.textscrollbool + ';">';
            }else{
            	html += '<div id = "SmartText-span-container" class ="SmartText-span-container" style="overflow-y:' + layout.textscrollbool + ';">';	
            }
			
            for(var me = 0;me < vTagsMatrix.length;me++){
            	switch(vTagsMatrix[me].type){
            		case 'text':
            			html += fillText(vTagsMatrix[me],me);
            		break;
            		case 'separator':
            			html += fillSeparator(vTagsMatrix[me]);
            		break;
            		default:
            		break;
            	}
			}
			
			html += '</div></div></div>';	

			function fillText(vTagsText,TagPos){
				var htmlText = '';
				if(vTagsText.position == 'below'){
            		htmlText += '<br>';
            	}				
				htmlText += '<span class ="SmartText-span ' + vTagsText.size + ' ' + vTagsText.cursor + ' ' + vTagsText.shadow + ' SmartText-span-' + vTagsText.align + '" href = "' + vTagsText.ref +'" src = "IN:' + vTagsText.actioncolor + '@OUT:' + vTagsText.color + '@POS:' + TagPos + '" style = "font-family:' + vTagsText.font + ';text-align:' + vTagsText.align + ';padding-left:' + vTagsText.paddingleft + ';padding-right:' + vTagsText.paddingright + ';padding-top:' + vTagsText.paddingtop + ';color:' + vTagsText.color + ';font-weight:' + vTagsText.bold + ';font-style:' + vTagsText.italic + ';text-decoration:' + vTagsText.underlined + '" title = "' + vTagsText.title + '" name="' + vTagsText.actionlabel + '||' + vTagsText.actionvalue + '">' +
					vTagsText.text + 
				'</span>';

				return htmlText;
			}

			function fillSeparator(vTagsSep){
				var htmlSep = '';
				if(vTagsSep.septype){
            		htmlSep += '<p class = "SmartText-division" style = "background:' + vTagsSep.color + ';height:' + vTagsSep.height + ';width:' + vTagsSep.width + ';margin-left:' + vTagsSep.left + ';margin-top:' + vTagsSep.top +';margin-bottom:' + vTagsSep.bottom +'"></p>';            		
            	}else{
					htmlSep += '<br>';
            	}            	
            	return htmlSep;
			}
					
			$element.html(html);
			
			if(layout.shadowbool){
				var vBorderShadow = '';
				var vShadowPx = layout.shadowwidth;
				var vShadowPx3 = (layout.shadowwidth * 3) + 3;
				vBorderShadow = 'div[tid="' + vId + '"] .qv-object {border-radius:' + vBorderRadius +';box-shadow: ' + vShadowPx + 'px ' + vShadowPx + 'px ' + vShadowPx3 + 'px ' + layout.shadowcolor.color + ';}';
				$('<style id="smarttext-style-' + vId + '"></style>').html(vBorderShadow).appendTo('head');
			}
			
			//set field value
			$('.SmartText-cursor-action-field').on('click', function(event){
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){
					var vName = this.getAttribute('name');
					var vHref = this.getAttribute('href');
					var qField = vName.substring(0,vName.indexOf('||'));
					var qVal = vName.substring(vName.indexOf('||') + 2,30);
					app.field(qField).selectValues([{qText:qVal}]);
					
					if(vHref == 'sheet'){						
						qlik.navigation.gotoSheet(this.title);
					}else{
						if(vHref == 'url'){
							window.open(this.title);
						}
					}
				}
			})
			//set variable value
			$('.SmartText-cursor-action-var').on('click', function(event){
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){
					var vName = this.getAttribute('name');
					var vHref = this.getAttribute('href');
					var qVar = vName.substring(0,vName.indexOf('||'));
					var qVal = vName.substring(vName.indexOf('||') + 2,30);
					app.variable.setContent(qVar, qVal);
					if(vHref == 'sheet'){
						qlik.navigation.gotoSheet(this.title);
					}else{
						if(vHref == 'url'){
							window.open(this.title);
						}else{
							if(vHref == 'url_self'){
								//parent.location is the only way to allow jumping properly from an iframe integration
								parent.location = this.title;
							}
						}
					}
				}
			})
			//navigate to a sheet, same tab
			$('.SmartText-cursor-sheet').on('click', function(event){
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){					
					qlik.navigation.gotoSheet(this.title);
				}
			})
			//navigate to a url, open a new tab
			$('.SmartText-cursor-url').on('click', function(event){
				var vHref = this.getAttribute('href');
				if((qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play') && this.title != 'undefined'){
					if(vHref == 'url'){
						window.open(this.title);
					}else{
						if(vHref == 'url_self'){
							//parent.location is the only way to allow jumping properly from an iframe integration
							parent.location = this.title;
						}
					}
				}
			})

			//add a tooltip on hover
			var modalIn = false;			
			$('.SmartText-tooltip').on('mouseenter', function(event){
				if(!modalIn){
					var vTagPos = this.getAttribute('src').substring(27);
					var vObjId = vTagsMatrix[vTagPos].tooltipchart.split('~')[0];
					var vModalSize = vTagsMatrix[vTagPos].tooltipsize;
					app.getObject(vTagPos,vObjId);
						
					var htmlPopup =	'<div id="SmartText-Modal" class="SmartText-modal SmartText-modal-' + vModalSize + '">' +
						'<div class="qv-object SmartText-Modal-Chart" id = "' + vTagPos + '"></div>' +
						'<div id = "closeModal" class = "SmartText-closeModal">x</div>' +
						'</div>';
					$('#SmartText-box-' + vSufixId).append(htmlPopup);				
					modalIn = true;					
				}
				
			})
			$(document).on("click", ".SmartText-closeModal", function() {
				$('#SmartText-Modal').remove();	
				modalIn = false;
			});
					
			//Change color on hover
			$('.SmartText-cursor').on('mouseenter', function(event){
				var INColor = this.getAttribute('src').substring(3,10);
				$(this).css("color", INColor);
			})
			$('.SmartText-cursor').on('mouseleave', function(event){				
				var OUTColor = this.getAttribute('src').substring(15,22);
				$(this).css("color", OUTColor);				
			})
			
			//on hover
			$('#SmartText-box-' + vSufixId).on('mouseenter', function(event){
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){
					if(vHoverColorBool){
						this.style.background = vHoverSingleColor.color;						
					}
					if(vHoverImgBool){
						$('#SmartText-img-bg-' + vSufixId).css("opacity", vHoverImgOpacity);
					}
					if(vHoverMeasuresBool){						
						if(vSideImgBool){
							var nx = '#SmartText-img-container';
							var x = this.querySelector(nx);							
							if(x){
								x.style.width = "0px";
							}
						}
						var ny = '#SmartText-span-container';

						var y = this.querySelector(ny);
						y.style.visibility = "visible";
					}
					
				}			
			})
			//on mouse leave
			$('#SmartText-box-' + vSufixId).on('mouseleave', function(event){				
				if(qlik.navigation.getMode() == 'analysis' || qlik.navigation.getMode() == 'play'){					
					if(vHoverColorBool){
						this.style.background = vBackgroundColor;						
					}
					if(vHoverImgBool){		
						$('#SmartText-img-bg-' + vSufixId).css('opacity', 1);
					}
					if(vHoverMeasuresBool){
						if(vSideImgBool){
							var nx = '#SmartText-img-container';
							var x = this.querySelector(nx);
							if(x){
								x.style.width = vSideImgWidth;								
							}
						}
						var ny = '#SmartText-span-container';
						var y = this.querySelector(ny);
						y.style.visibility = "hidden";
					}
				}
			})		
		}
	}
});