define(['qlik','./js/util'], function (qlik, utils) {    
    var vFontFamily = [{
                        value: "unset",
                        label: "Default"
                    },{
                        value: "Algerian",
                        label: "Algerian"
                    },{
                        value: "Arial",
                        label: "Arial"
                    }, {
                        value: "Brush Script MT",
                        label: "Brush Script MT"
                    }, {
                        value: "Calibri",
                        label: "Calibri"
                    }, {
                        value: "Comic Sans MS",
                        label: "Comic Sans MS"
                    }, {
                        value: "erasdust",
                        label: "Eraser"
                    },{
                        value: "Heebo, sans-serif",
                        label: "Heebo"
                    }, {
                        value: "Ink Free",
                        label: "Ink Free"
                    }, {
                        value: "Lucida Handwriting",
                        label: "Lucida Handwriting"
                    }, {
                        value: "OpenSans",
                        label: "OpenSans"
                    }, {
                        value: "Oswald",
                        label: "Oswald"
                    }, {
                        value: "Playfair Display, serif",
                        label: "Playfair Display"
                    }, {
                        value: "QlikView Sans, sans-serif",
                        label: "QlikView Sans"
                    }, {
                        value: "sans-serif",
                        label: "MS Sans Serif"
                    }, {
                        value: "Tahoma",
                        label: "Tahoma"
                    }, {
                        value: "Tw Cen MT",
                        label: "Tw Cen MT"
                    }, {
                        value: "Verdana",
                        label: "Verdana"
                    }];
    var vActBool = [{
                        value: "none",
                        label: "none"
                    }, {
                        value: "selfieldvalues",
                        label: "Select values in a field"
                    }, {
                        value: "selvarvalues",
                        label: "Set variable value"
                    }];
    var vNavBool = [{
                        value: "none",
                        label: "none"
                    }, {
                        value: "sheet",
                        label: "to a sheet"
                    }, {
                        value: "url",
                        label: "to a url"
                    }];                    
    var vTagType = [{
                        value: "text",
                        label: "Text"
                    }, {
                        value: "separator",
                        label: "Separator"
                    }];
    var vImgSize = [{
                        value: "auto",
                        label: "Original Size"
                    }, {
                        value: "contain",
                        label: "Always fit"
                    }, {
                        value: "100%",
                        label: "Fit to width"
                    }, {
                        /*value: "auto 100%",*/
                        value: "cover",
                        label: "Fit to height"
                    }, {
                        value: "100% 100%",
                        label: "Stretch to fit"
                    }];
    var vSideVertical = [{
                        value: "top:0",
                        label: "Top"
                    }, {
                        value: "top:0;bottom:0",
                        label: "Center"
                    }, {
                        value: "bottom:0",
                        label: "Bottom"
                    }];
    var vFontSizes = [{
                        value: "SmartText-span-xxs",
                        label: "XXS"
                    }, {
                        value: "SmartText-span-xs",
                        label: "XS"
                    }, {
                        value: "SmartText-span-s",
                        label: "S"
                    },{
                        value: "SmartText-span-m",
                        label: "M"
                    }, {
                        value: "SmartText-span-ml",
                        label: "ML"
                    }, {
                        value: "SmartText-span-l",
                        label: "L"
                    },{
                        value: "SmartText-span-xl",
                        label: "XL"
                    }, {
                        value: "SmartText-span-xxl",
                        label: "XXL"
                    }, {
                        value: "SmartText-span-xxxl",
                        label: "XXXL"
                    }, {
                        value: "SmartText-span-xxxxl",
                        label: "XXXXL"
                    }];
                    
                                
    var vIcons = [{
                        value: "tick",
                        component: "icon-item",
                        icon: "tick",
                        size: "small"
                    }, {
                        value: "warning_triangle",
                        component: "icon-item",
                        icon: "warning_triangle",
                        size: "small"
                    }, {
                        value: "triangle_top",
                        component: "icon-item",
                        icon: "triangle_top",
                        size: "small"
                    }, {
                        value: "triangle_bottom",
                        component: "icon-item",
                        icon: "triangle_bottom",
                        size: "small"
                    },{
                        value: "star",
                        component: "icon-item",
                        icon: "star",
                        size: "small"
                    },{
                        value: "dot",
                        component: "icon-item",
                        icon: "dot",
                        size: "small"
                    },{
                        value: "info",
                        component: "icon-item",
                        icon: "info",
                        size: "small"
                    },{
                        value: "tag",
                        component: "icon-item",
                        icon: "tag",
                        size: "small"
                    }];
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions:{
                uses: "dimensions",
                min: 0,
                max: 0,
                show: false
            },
            measures: {
                uses: "measures",
                min: 0,
                max: 30,
                items: {   
                    TagType: {
                        ref: "qDef.tagtype",
                        type: "string",
                        component: "dropdown",
                        label: "Tag Type",
                        options: vTagType,
                        defaultValue: "text"
                    },                   
                    TextSize: {
                        ref: "qDef.textsize",
                        type: "string",
                        component: "dropdown",
                        label: "Font size",
                        options: vFontSizes,
                        defaultValue: "SmartText-span-m",
                        /*type: "number",
                        component: "slider",
                        label: "Font Size",
                        ref: "qDef.textsize",
                        min: 8,
                        max: 40,
                        step: 2,
                        defaultValue: 12,*/
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextPaddingLeft: {
                        type: "number",
                        component: "slider",
                        label: "Padding left",
                        ref: "qDef.textpaddingleft",
                        min: 5,
                        max: 50,
                        step: 5,
                        defaultValue: 5,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextPaddingRight: {
                        type: "number",
                        component: "slider",
                        label: "Padding right",
                        ref: "qDef.textpadding",
                        min: 0,
                        max: 50,
                        step: 5,
                        defaultValue: 0,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextPaddingTop: {
                        type: "number",
                        component: "slider",
                        label: "Padding top",
                        ref: "qDef.textpaddingtop",
                        min: 0,
                        max: 150,
                        step: 10,
                        defaultValue: 0,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextPosition: {
                        ref: "qDef.textposition",
                        type: "string",
                        component: "buttongroup",
                        options: [ {
                            value: 'inline',
                            label: "InLine"
                        }, {
                            value: 'below',
                            label: "Below"
                        }],
                        defaultValue: "inline",
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextAlign: {
                        /*ref: "qDef.textalign",
                        type: "string",
                        component: "buttongroup",
                        options: [ {
                            value: 'left',
                            label: "left"
                        }, {
                            value: 'center',
                            label: "center"
                        }, {
                            value: "right",
                            label: "right"
                        }],
                        defaultValue: "left",
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }*/
                        type: "string",
                        component: "item-selection-list",
                        icon: !0,
                        horizontal: !0,
                        label: "Alignment",
                        translation: "properties.Alignment",
                        ref: "qDef.textalign",
                        defaultValue: "left",
                        items: [{
                            value: "left",
                            component: "icon-item",
                            icon: "align_left"
                        }, {
                            value: "center",
                            icon: "align_center",
                            component: "icon-item"
                        }, {
                            value: "right",
                            icon: "align_right",
                            component: "icon-item"
                        }],
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextFont: {
                        ref: "qDef.textfont",
                        type: "string",
                        component: "dropdown",
                        label: "Font Family",
                        options: vFontFamily,
                        defaultValue: "OpenSans",
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleTitle: {
                        label:"Text style",
                        component: "text",
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleBold: {
                        ref: "qDef.textstylebold",
                        type: "boolean",
                        component: "checkbox",
                        label: "Bold",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleItalic: {
                        ref: "qDef.textstyleitalic",
                        type: "boolean",
                        component: "checkbox",
                        label: "Italic",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleUnderline: {
                        ref: "qDef.textstyleunderline",
                        type: "boolean",
                        component: "checkbox",
                        label: "Underlined",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextStyleShadow: {
                        ref: "qDef.textstyleshadow",
                        type: "boolean",
                        component: "checkbox",
                        label: "Shadow",
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextShadowType: {
                        ref: "qDef.textstyleshadowtype",
                        type: "string",
                        component: "buttongroup",
                        options: [ {
                            value: 'simple',
                            label: "Simple"
                        }, {
                            value: '3d',
                            label: "3D"
                        }, {
                            value: 'embossed',
                            label: "Embossed"
                        }],
                        defaultValue: "3d",
                        show : function(data) {
                            return data.qDef.tagtype == 'text' && data.qDef.textstyleshadow;
                        }
                    },
                    TextColorBool: {
                        ref : "qDef.textcolorbool",
                        type : "boolean",
                        component : "switch",
                        label : "Define text color",
                        options: [{
                            value: false,
                            label: "Single"
                        }, {
                            value: true,
                            label: "Custom"
                        }],
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'text';
                        }
                    },
                    TextCustomColor: {
                        type: "string",
                        ref: "qDef.textcustomcolor",
                        label: "Text color expression",
                        defaultValue : "='#7b7a78'//RGB and qlik colors also available'",
                        expression : "optional",
                        show : function(data) {
                            return data.qDef.textcolorbool && data.qDef.tagtype == 'text';
                        }
                    },
                    TextSingleColor: {
                        ref: "qDef.textsinglecolor",
                        label: "Text single color",
                        type: "object",  
                        component: "color-picker",  
                        defaultValue: {  
                            color: '#7b7a78'  
                        },
                        show : function(data) {
                            return !data.qDef.textcolorbool && data.qDef.tagtype == 'text';
                        }
                    },
                    // Actions
                    TextActionBool: {
                        ref: "qDef.textactbool",
                        type: "string",
                        component: "dropdown",
                        label: "Action",
                        options: vActBool,
                        defaultValue: "none"
                    },
                    //select field values
                    TextActionField: {
                        type: "string",
                        component: "dropdown",
                        label: "Select Field",
                        ref: "qDef.textfieldid",
                        options: utils.getFieldList({listType: 'field', sortBy: 'title'}),
                        show : function(data) {
                            return data.qDef.textactbool == 'selfieldvalues';
                        }
                    },
                    TextActionValue: {
                        type: "string",
                        ref: "qDef.textactval",
                        label: "Value",
                        defaultValue : "",
                        expression : "optional",
                        show : function(data) {
                            return data.qDef.textactbool == 'selfieldvalues';
                        }
                    },
                    //select variable value
                    TextActionVariable: {
                        type: "string",
                        component: "dropdown",
                        label: "Select Variable",
                        ref: "qDef.textvarid",
                        options: utils.getVariableList({listType: 'variable', sortBy: 'title'}),
                        show : function(data) {
                            return data.qDef.textactbool == 'selvarvalues';
                        }
                    },
                    TextActionVariableValue: {
                        type: "string",
                        ref: "qDef.textvarval",
                        label: "Value",
                        defaultValue : "",
                        expression : "optional",
                        show : function(data) {
                            return data.qDef.textactbool == 'selvarvalues';
                        }
                    },
                    // Navigation through the texts
                    TextNavigationBool: {
                        ref: "qDef.textnavbool",
                        type: "string",
                        component: "dropdown",
                        label: "Navigation",
                        options: vNavBool,
                        defaultValue: "none"
                    },
                    TextNavigationSheet: {
                        type: "string",
                        component: "dropdown",
                        label: "Select Sheet",
                        ref: "qDef.textsheetid",
                        options: utils.getPPList({listType: 'sheet', sortBy: 'title'}),
                        show : function(data) {
                            return data.qDef.textnavbool == 'sheet';
                        }
                    },
                    TextNavigationUrl: {
                        type: "string",
                        ref: "qDef.textnavurl",
                        label: "Url",
                        defaultValue : "",
                        expression : "optional",
                        show : function(data) {
                            return data.qDef.textnavbool == 'url';
                        }
                    },
                    TextNavigationUrlMove: {
                        ref : "qDef.textnavurlmove",
                        type : "boolean",
                        component : "switch",
                        label : "Use current window",
                        options: [{
                            value: false,
                            label: "False"
                        }, {
                            value: true,
                            label: "True"
                        }],
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.textnavbool == 'url';
                        }
                    },                   
                    TextActionColor: {
                        ref: "qDef.textactioncolor",
                        label: "Text action color",
                        type: "object",  
                        component: "color-picker",  
                        defaultValue: {  
                            color: '#f93f17'  
                        },
                        show : function(data) {
                            return data.qDef.textactbool != 'none' || data.qDef.textnavbool != 'none';
                        }
                    },
                    //Separator
                    SepType: {
                        ref : "qDef.septype",
                        type : "boolean",
                        component : "switch",
                        label : "Define separator type",
                        options: [{
                            value: true,
                            label: "Divisor"
                        }, {
                            value: false,
                            label: "Row"
                        }],
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator';
                        }
                    },
                    SepDivColorBool: {
                        ref : "qDef.sepdivcolorbool",
                        type : "boolean",
                        component : "switch",
                        label : "Custom divisor color",
                        options: [{
                            value: false,
                            label: "Single"
                        }, {
                            value: true,
                            label: "Custom"
                        }],
                        defaultValue: false,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }
                    },
                    SepDivCustomColor: {
                        type: "string",
                        ref: "qDef.sepdivcustomcolor",
                        label: "Color expression",
                        defaultValue : "='#cccccc'//RGB and qlik colors also available'",
                        expression : "optional",
                        show : function(data) {
                            return data.qDef.sepdivcolorbool && data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }
                    },
                    SepDivSingleColor: {
                        ref: "qDef.sepdivsinglecolor",
                        label: "Single color",
                        type: "object",  
                        component: "color-picker",  
                        defaultValue: {  
                            color: '#cccccc'  
                        },
                        show : function(data) {
                            return !data.qDef.textcolorbool && data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }
                    },
                    SepDivHeight: {
                        type: "number",
                        component: "slider",
                        label: "Height",
                        ref: "qDef.sepdivheight",
                        min: 0.5,
                        max: 2.5,
                        step: 0.5,
                        defaultValue: 0.5,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }                               
                    },
                    SepDivWidth: {
                        type: "number",
                        component: "slider",
                        label: "Width",
                        ref: "qDef.sepdivwidth",
                        min: 0,
                        max: 100,
                        step: 10,
                        defaultValue: 100,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }                               
                    },
                    SepDivLeft: {
                        type: "number",
                        component: "slider",
                        label: "Margin left",
                        ref: "qDef.sepdivleft",
                        min: 5,
                        max: 50,
                        step: 5,
                        defaultValue: 5,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }                               
                    },                    
                    SepDivTop: {
                        type: "number",
                        component: "slider",
                        label: "Margin top",
                        ref: "qDef.sepdivtop",
                        min: 0,
                        max: 10,
                        step: 1,
                        defaultValue: 4,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }                               
                    },
                    SepDivBottom: {
                        type: "number",
                        component: "slider",
                        label: "Margin bottom",
                        ref: "qDef.sepdivbottom",
                        min: 0,
                        max: 10,
                        step: 1,
                        defaultValue: 4,
                        show : function(data) {
                            return data.qDef.tagtype == 'separator' && data.qDef.septype;
                        }                               
                    }                    
                }
            },
            sorting: {
                uses: "sorting",
                show: false
            },            
            settings: {
                uses: "settings",
                items: {    
                    /*PresentationGroup: {
                        label: "Presentation",
                        type: "items",
                        items: {             
                            LayoutBehavior: {
                                ref: "layoutbehavior",
                                type: "string",
                                component: "dropdown",
                                label: "Layout behavior",
                                options: vLayout,
                                defaultValue: "fluid"
                            }
                        }
                    },*/   
                    //side images
                    SideGroup: {
                        label: "Side images",
                        type: "items",
                        items: {
                            sideImgBool: {
                                ref : "sideimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a side space",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            sideImgPerc: {                                
                                type: "number",
                                component: "slider",
                                label: "Space width",
                                ref: "sideimgperc",
                                min: 10,
                                max: 200,
                                step: 5,
                                defaultValue: 10,
                                show : function(data) {
                                    return data.sideimgbool;
                                }
                            },                            
                            SideImageSource: {
                                type: "string",
                                ref: "sideimgsrc",
                                component: "radiobuttons",
                                label: "Image source",
                                options: [
                                  {
                                    value: "url",
                                    label: "Image from Url"
                                  },
                                  {
                                    value: "lib",
                                    label: "Image from library"
                                  }
                                ],
                                defaultValue: "lib",
                                show : function(data) {
                                    return data.sideimgbool;
                                }
                            },                                        
                            sideImg: {
                                label:"Image",
                                component: "media",
                                ref: "sideimg",
                                layoutRef: "sideimg",
                                type: "string",
                                show : function(data) {
                                    return data.sideimgbool && data.sideimgsrc != 'url';
                                }
                            },
                            sideImageUrl: {
                                type: "string",
                                ref: "sideimageurl",
                                label: "Image url",
                                defaultValue : '',
                                expression : "optional",
                                show : function(data) {
                                    return data.sideimgbool && data.sideimgsrc == 'url';
                                }
                            },                                                   
                            sideImgOpacity: {                                
                                type: "number",
                                component: "slider",
                                label: "Opacity",
                                ref: "sideimgopacity",
                                min: 0,
                                max: 1,
                                step: 0.1,
                                defaultValue: 1,
                                show : function(data) {
                                    return data.sideimgbool && data.sideimg;
                                }
                            },       
                            sideVerticalAlign: {
                                ref: "sideverticalalign",
                                type: "string",
                                component: "dropdown",
                                label: "Vertical align",
                                options: vSideVertical,
                                defaultValue: "top:0;bottom:0",
                                show : function(data) {
                                    return data.sideimgbool;
                                }
                            },   
                            sideImgPadding: {
                                type: "number",
                                component: "slider",
                                label: "Padding px",
                                ref: "sideimgpadding",
                                min: 0,
                                max: 40,
                                step: 1,
                                defaultValue: 0,
                                show : function(data) {
                                    return  data.sideimgbool && data.sideimg;
                                }                               
                            },                  
                            sideIconBool: {
                                ref : "sideiconbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add an icon",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.sideimgbool;
                                }
                            },
                            sideIconType: {
                                ref : "sideicontype",
                                type : "boolean",
                                component : "switch",
                                label : "Custom icon",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool;
                                }
                            },
                            sideIconCustom: {
                                type: "string",
                                ref: "sideiconcustom",
                                label: "Icon expression (leonardo)",
                                defaultValue : 'lui-icon--remove',
                                expression : "optional",
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool && data.sideicontype;
                                }
                            },                            
                            sideIcon: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Icon",
                                translation: "properties.icon",
                                ref: "sideicon",
                                defaultValue: "info",
                                items: vIcons,
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool && !data.sideicontype;
                                }
                            },
                            sideIconSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Icon size",
                                ref: "sideiconsize",
                                min: 100,
                                max: 300,
                                step: 10,
                                defaultValue: 10,
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool;
                                }
                            },
                            sideIconCustomColor: {
                                type: "string",
                                ref: "sideiconcustomcolor",
                                label: "Color expression",
                                defaultValue : '#595959',
                                expression : "optional",
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool;
                                }
                            },
                            /*sideIconPosition: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Horizontal Alignment",
                                ref: "sideiconposition",
                                defaultValue: "right:0",
                                items: [{
                                    value: "left:0",
                                    component: "icon-item",
                                    icon: "align_left"
                                }, {
                                    value: "right:0",
                                    icon: "align_right",
                                    component: "icon-item"
                                }],                        
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool;
                                }
                            },*/
                            sideIconMatrix: {
                                type: "string",
                                component: "align-matrix",
                                icon: !0,
                                horizontal: !0,
                                label: "Position",
                                ref: "sideiconmatrix",
                                defaultValue: "bottomRight",
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool;
                                }
                            },
                            // Navigation through the images
                            SideNavigationBool: {
                                ref: "sidenavbool",
                                type: "string",
                                component: "dropdown",
                                label: "Navigation",
                                options: vNavBool,
                                defaultValue: "none",
                                show : function(data) {
                                    return data.sideimgbool;
                                }
                            },
                            SideNavigationSheet: {
                                type: "string",
                                component: "dropdown",
                                label: "Select Sheet",
                                ref: "sidesheetid",
                                options: utils.getPPList({listType: 'sheet', sortBy: 'title'}),
                                show : function(data) {
                                    return data.sideimgbool && data.sidenavbool == 'sheet';
                                }
                            },
                            SideNavigationUrl: {
                                type: "string",
                                ref: "sidenavurl",
                                label: "Url",
                                defaultValue : "",
                                expression : "optional",
                                show : function(data) {
                                    return data.sideimgbool && data.sidenavbool == 'url';
                                }
                            },
                            SideNavigationUrlMove: {
                                ref : "sidenavurlmove",
                                type : "boolean",
                                component : "switch",
                                label : "Use current window",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.sideimgbool && data.sidenavbool == 'url';
                                }
                            },
                            /*sideIconTesting: {
                                type: "number",  
                                component: "color-scale-creator",
                                showValueIndicator: !0,
                                add: !0,
                                label: "Testing",
                                ref: "sideicontesting",
                                min: 0,
                                max: 5,
                                step: 1,
                                defaultValue: 0,
                                show : function(data) {
                                    return data.sideiconbool && data.sideimgbool;
                                }
                            }*/                           
                        }
                    },
                    BackgroundGroup: {
                        label: "Background",
                        type: "items",
                        items: {
                            backgroundColorBool: {
                                ref : "backgroundcolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Background Color",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            backgroundColorType: {
                                ref : "backgroundcolortype",
                                type : "boolean",
                                component : "switch",
                                label : "Custom color",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.backgroundcolorbool;
                                }
                            },
                            backgroundCustomColor: {
                                type: "string",
                                ref: "backcustomcolor",
                                label: "Color expression",
                                defaultValue : '#cccccc',
                                expression : "optional",
                                show : function(data) {
                                    return data.backgroundcolorbool && data.backgroundcolortype;
                                }
                            },
                            backgroundSingleColor: {
                                ref: "backsinglecolor",
                                label: "Background color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {
                                    color: "#cccccc"  
                                },
                                show : function(data) {
                                    return data.backgroundcolorbool && !data.backgroundcolortype;
                                }
                            },
                            // images
                            backgroundImageBool: {
                                ref : "backgroundimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Use background image",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            backgroundImageSource: {
                                type: "string",
                                ref: "backgroundimgsrc",
                                component: "radiobuttons",
                                label: "Image source",
                                options: [
                                  {
                                    value: "url",
                                    label: "Image from Url"
                                  },
                                  {
                                    value: "lib",
                                    label: "Image from library"
                                  }
                                ],
                                defaultValue: "lib",
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundImage: {
                                label:"Image",
                                component: "media",
                                ref: "backgroundimage",
                                layoutRef: "backgroundimage",
                                type: "string",
                                show : function(data) {
                                    return data.backgroundimgbool && data.backgroundimgsrc != 'url';
                                }
                            },
                            backgroundImageUrl: {
                                type: "string",
                                ref: "backgroundimageurl",
                                label: "Image url",
                                defaultValue : '',
                                expression : "optional",
                                show : function(data) {
                                    return data.backgroundimgbool && data.backgroundimgsrc == 'url';
                                }
                            },
                            backgroundImageSize: {
                                ref: "backgroundimagesize",
                                type: "string",
                                component: "dropdown",
                                label: "Size",
                                options: vImgSize,
                                defaultValue: "cover",
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundImageAlign: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Alignment",
                                translation: "properties.Alignment",
                                ref: "backgroundimagealign",
                                defaultValue: "50% 50%",
                                items: [{
                                    value: "0% 50%",
                                    component: "icon-item",
                                    icon: "align_left"
                                }, {
                                    value: "50% 50%",
                                    icon: "align_center",
                                    component: "icon-item"
                                }, {
                                    value: "100% 50%",
                                    icon: "align_right",
                                    component: "icon-item"
                                }],
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            backgroundOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Opacity",
                                ref: "backgroundopacity",
                                min: 0.2,
                                max: 1,
                                step: 0.05,
                                defaultValue: 1                                
                            }
                        }
                    },    
                    //Hover effects
                    HoverGroup: {
                        label: "On Hover",
                        type: "items",
                        items: {
                            hoverColorBool: {
                                ref : "hovercolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Background Color",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            hoverSingleColor: {
                                ref: "hoversinglecolor",
                                label: "Background color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {
                                    color: "#cccccc"  
                                },
                                show : function(data) {
                                    return data.hovercolorbool;
                                }
                            },
                            hoverImgBool: {
                                ref : "hoverimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Hide background img",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.backgroundimgbool;
                                }
                            },
                            hoverImgOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Opacity",
                                ref: "hoverimgopacity",
                                min: 0,
                                max: 1,
                                step: 0.05,
                                defaultValue: 0,
                                show : function(data) {
                                    return data.backgroundimgbool && data.hoverimgbool;
                                }                              
                            },
                            hoverMeasuresBool: {
                                ref : "hovermeasuresbool",
                                type : "boolean",
                                component : "switch",
                                label : "Show measures on hover",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            }
                        }
                    },                
                    //border settings
                    BorderGroup: {
                        label: "Border settings",
                        type: "items",
                        items: {                            
                            borderBool: {
                                ref : "borderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set a border",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            borderColor: {
                                ref: "bordercolor",
                                label: "Border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#f2f2f2"  
                                },
                                show : function(data) {
                                    return  data.borderbool;
                                }
                            },
                            borderWidth: {
                                type: "number",
                                component: "slider",
                                label: "Border width",
                                ref: "borderwidth",
                                min: 1,
                                max: 10,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return  data.borderbool;
                                }                               
                            },
                            borderRadius: {
                                type: "number",
                                component: "slider",
                                label: "Border radius",
                                ref: "borderradius",
                                min: 0,
                                max: 50,
                                step: 2,
                                defaultValue: 0,
                                show : function(data) {
                                    return  data.borderbool;
                                }                               
                            },
                            //Shadow
                            shadowBool: {
                                ref : "shadowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a shadow",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            shadowColor: {
                                ref: "shadowcolor",
                                label: "Shadow color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#888888"  
                                },
                                show : function(data) {
                                    return  data.shadowbool;
                                }
                            },
                            shadowWidth: {
                                type: "number",
                                component: "slider",
                                label: "Shadow width",
                                ref: "shadowwidth",
                                min: 1,
                                max: 10,
                                step: 1,
                                defaultValue: 10,
                                show : function(data) {
                                    return  data.shadowbool;
                                }                               
                            }
                        }
                    },
                    Rotation: {
                        component: "items",
                        label: "Rotation",
                        items: {
                            Rotate: {
                                type: "number",
                                ref: "rotation",
                                label: "Rotation deg (0 - 360)",
                                defaultValue : 0,
                                expression : "optional"
                            }
                        }
                    },
                    about: {
                        component: "items",
                        label: "About",
                        items: {
                            header: {
                                label: "Smart Text Visualization",
                                style: "header",
                                component: "text"
                            },
                            paragraph1: {
                                label: "Smart Text visualization is a highly customizable dynamic object notebook.",
                                component: "text"
                            },
                            paragraph2: {
                                label: "Smart Text visualization is an extension created by Ivan Felipe, offered under MIT License.",
                                component: "text"
                            },
                            paragraph3: {
                                label: "Last update 18-oct-2021.",
                                component: "text"
                            }
                        }
                    }               
                }
            }
        }
    }
});