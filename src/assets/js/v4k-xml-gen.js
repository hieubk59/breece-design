/*
suppor v4k xml gen
base on "DesignDocumentation20181204_rotation_interpolation.docx"
*/


const JsonObjectType = {
    RECT: 'rect',
    HORIZONTAL_LINE: 'horizontal-line',
    VERTICAL_LINE: 'vertical-line',
    QRCODE: 'qrcode',
    BARCODE: 'barcode',
    IMAGE: 'image',
    VIDEO: 'video',
    TEXTBOX: 'textbox'
}

const XmlV4kType = {
    VIDEO: "video",
	CANVAS: "canvas",
	IMAGE: "image",
	TEXT: "text",
	LINE: "line",
	BARCODE_128: "barcode_128",
	BARCODE_QR: "barcode_qr"
}

var createV4kKeyframeXml = function (needLog) {
    var jsonExport = canvas.toJSON()

	if (needLog){
		console.log(jsonExport)
	}
    var key, elem
    var doc = $.parseXML("<Design/>")
    var design = doc.getElementsByTagName("Design")[0]

    var configuration = doc.createElement("Configuration")
    var orientation = doc.createElement("Orientation")
    $(orientation).text("0")
    configuration.appendChild(orientation)
    design.appendChild(configuration)

    var xmlElements = doc.createElement("Elements")

    if (jsonExport.hasOwnProperty("background")) {
        var keyframeBackground = jsonExport["background"]
        xmlElements.setAttribute("background", getJsonColor(keyframeBackground));
    }
    design.appendChild(xmlElements)

	var videoId; 
    var elements = jsonExport["objects"]
    var width = $("[ng-value^='configs.width']").val();
    var height = $("[ng-value^='configs.height']").val();
    width = parseInt(width.substring(0, width.length - 2));//1920
    height = parseInt(height.substring(0, height.length - 2));//1200
    for (var key in elements) {
        if (elements.hasOwnProperty(key)) {
            var xmlElement = doc.createElement("Element")
			var elementType
            var oneElement = elements[key];
            if (oneElement.hasOwnProperty("id")) {
                xmlElement.setAttribute("id", oneElement["id"]);
            }
            
			if (oneElement.hasOwnProperty("type")) {
				elementType = oneElement["type"]
				if (needLog){
					console.log(elementType)
				}
				if(elementType === JsonObjectType.IMAGE){
					if (oneElement.hasOwnProperty("usingType")) {
						elementType = oneElement["usingType"]
					}
				}
				if (needLog){
					console.log(elementType)
				}
            }

            if (oneElement.hasOwnProperty("left")) {
                var anchor_left = round2dec(oneElement["left"] * 100 / width)
                var anchor_top  = round2dec(oneElement["top"] * 100 / height)
                xmlElement.setAttribute("anchor", anchor_left + "%," + anchor_top + "%");
            }
            if (oneElement.hasOwnProperty("width")) {
                var dimensions_width  = round2dec(oneElement["width"] * oneElement["scaleX"] * 100 / width)
                var dimensions_height = round2dec(oneElement["height"] * oneElement["scaleY"] * 100 / height)				
                xmlElement.setAttribute("dimensions", dimensions_width + "%," + dimensions_height + "%");
    
            }
						
            xmlElement.setAttribute("valuetype", "static");
            xmlElement.setAttribute("z-index", xmlElements.childElementCount);
			
            if (oneElement.hasOwnProperty("angle")) {
                xmlElement.setAttribute("rotation", Math.round(oneElement["angle"]));
            }
			
			if (oneElement.hasOwnProperty("stroke")) {
                xmlElement.setAttribute("bordercolor", getJsonColor(oneElement["stroke"]));
            }
			if (oneElement.hasOwnProperty("strokeWidth")) {
                xmlElement.setAttribute("borderthickness", oneElement["strokeWidth"]);
            }
			if (oneElement.hasOwnProperty("visible")) {
				//V4K not support visible yet, Using opacity 
				if(oneElement["visible"]){
					if (oneElement.hasOwnProperty("opacity")) {
						xmlElement.setAttribute("opacity", oneElement["opacity"]*100);
					}else{						
						xmlElement.setAttribute("opacity", "100");
					}
				}else{
					xmlElement.setAttribute("opacity", "0");
				}
            }
				
            if (elementType) {		
                xmlElement.setAttribute("type", getV4kElementType(elementType));
				switch(elementType){
					case JsonObjectType.RECT:
						 if (oneElement.hasOwnProperty("fill")) {
							if (oneElement["fill"] != "") {
								xmlElement.setAttribute("background", getJsonColor(oneElement["fill"]));
							}
						}
						break;
					case JsonObjectType.HORIZONTAL_LINE:
						xmlElement.setAttribute("orientation", "horizontal");
						if (oneElement.hasOwnProperty("stroke")) {
							if (oneElement["stroke"] != "") {
								xmlElement.setAttribute("linecolor", getJsonColor(oneElement["stroke"]));
							}
						}
						
						if (oneElement.hasOwnProperty("strokeWidth")) {
							var linethickness = Math.round(oneElement["strokeWidth"] * oneElement["scaleX"])							
							xmlElement.setAttribute("linethickness", Math.max(linethickness,1));
							
							var dimensions_width  = round2dec(oneElement["width"] * oneElement["scaleX"] * 100 / width)
							var dimensions_height = round2dec(linethickness * 100 / height)
							xmlElement.setAttribute("dimensions", dimensions_width + "%," +   Math.max(dimensions_height,0.5) + "%");
						}
						
						if (needLog){
							console.log("---"+xmlElement.outerHTML)
						}
						break;
					case JsonObjectType.VERTICAL_LINE:					
						xmlElement.setAttribute("orientation", "vertical");
						if (oneElement.hasOwnProperty("stroke")) {
							if (oneElement["stroke"] != "") {
								xmlElement.setAttribute("linecolor", getJsonColor(oneElement["stroke"]));
							}
						}
						if (oneElement.hasOwnProperty("strokeWidth")) {
							var linethickness = Math.round(oneElement["strokeWidth"] * oneElement["scaleX"])							
							xmlElement.setAttribute("linethickness", Math.max(linethickness,1));
							
							var dimensions_width  = round2dec(linethickness * 100 / width)
							var dimensions_height = round2dec(oneElement["height"] * oneElement["scaleY"] * 100 / height)
							xmlElement.setAttribute("dimensions",  Math.max(dimensions_width,0.5) + "%," + dimensions_height + "%");
						}
						
						if (needLog){
							console.log(xmlElement.outerHTML)
						}
						break;
					case JsonObjectType.IMAGE:
						if (oneElement.hasOwnProperty("fill")) {
							if (oneElement["fill"] != "") {
								xmlElement.setAttribute("background", "      ");
							}
						}
						//Fixme // force transparent
						xmlElement.setAttribute("background", "#00FFFFFF");
								
						if (oneElement.hasOwnProperty("text")) {
							 $(xmlElement).text( oneElement["text"])
						}else{
							if (oneElement.hasOwnProperty("src")) {
								$(xmlElement).text( oneElement["src"])
							}
						}
						break;
					case JsonObjectType.QRCODE:
						if (oneElement.hasOwnProperty("fill")) {
							if (oneElement["fill"] != "") {
								if(getJsonColor(oneElement["fill"]) != "#000000"){
									xmlElement.setAttribute("background", getJsonColor(oneElement["fill"]));
								}
							}
						}
						
						if (oneElement.hasOwnProperty("text")) {
							 $(xmlElement).text( oneElement["text"])
						}else{
							if (oneElement.hasOwnProperty("src")) {
								$(xmlElement).text( oneElement["src"])
							}
						}
							
						break;
					case JsonObjectType.BARCODE:
						if (oneElement.hasOwnProperty("fill")) {
							if (oneElement["fill"] != "") {
								if(getJsonColor(oneElement["fill"]) != "#000000"){
									xmlElement.setAttribute("background", getJsonColor(oneElement["fill"]));
								}
							}
						}
												
						if (oneElement.hasOwnProperty("text")) {
							 $(xmlElement).text( oneElement["text"])
						}else{
							if (oneElement.hasOwnProperty("src")) {
								$(xmlElement).text( oneElement["src"])
							}
						}
						break;
					case JsonObjectType.IMAGE:
						if (oneElement.hasOwnProperty("fill")) {
							if (oneElement["fill"] != "") {
								xmlElement.setAttribute("background", getJsonColor(oneElement["fill"]));
							}
						}
											
						if (oneElement.hasOwnProperty("text")) {
							 $(xmlElement).text( oneElement["text"])
						}else{
							if (oneElement.hasOwnProperty("src")) {
								$(xmlElement).text( oneElement["src"])
							}
						}
						break;
					case JsonObjectType.VIDEO:
						//Todo
						if (oneElement.hasOwnProperty("fill")) {
							if (oneElement["fill"] != "") {
								xmlElement.setAttribute("background", getJsonColor(oneElement["fill"]));
							}
						}
							
						if (oneElement.hasOwnProperty("text")) {
							$(xmlElement).text( oneElement["text"])
						}
						
						videoId = xmlElement.getAttribute("id");
						break;
					case JsonObjectType.TEXTBOX:
						if (oneElement.hasOwnProperty("text")) {
							$(xmlElement).text(oneElement["text"])
						}
						if (oneElement.hasOwnProperty("textBackgroundColor")) {
							if (oneElement["textBackgroundColor"] != "") {
								xmlElement.setAttribute("background", getJsonColor(oneElement["textBackgroundColor"]));
							}
						}
						if (oneElement.hasOwnProperty("fill")) {
							xmlElement.setAttribute("fontcolor", getJsonColor(oneElement["fill"]));
						}
						if (oneElement.hasOwnProperty("fontSize")) {
							var fontSizeAttrib = Math.round(oneElement["fontSize"])
							var fontSize =  (fontSizeAttrib * ((oneElement["scaleX"] + oneElement["scaleY"]) / 2)).toFixed(0);
	
							xmlElement.setAttribute("fontsize", fontSize);
						}
						if (oneElement.hasOwnProperty("fontWeight")) {
							xmlElement.setAttribute("fontweight", oneElement["fontWeight"]);
						}
						if (oneElement.hasOwnProperty("font")) {
							xmlElement.setAttribute("font", oneElement["font"]);
						}
						if (oneElement.hasOwnProperty("fontStyle")) {
							xmlElement.setAttribute("fontstyle", oneElement["fontStyle"]);
							if (oneElement["underline"] == true) {
								xmlElement.setAttribute("fontstyle", "underline");
							}
						}
						if (oneElement.hasOwnProperty("textAlign")) {
							xmlElement.setAttribute("fonthalign", oneElement["textAlign"]);
						}
						break;
				}
			}
			if (needLog){
				console.log(xmlElement.outerHTML)
			}
            xmlElements.appendChild(xmlElement)

        }
    }
	
	// Fixme Hardcode timeline output
	// assume that we only have 1 video.
	// and the video will start auto when the keyframe start
	// When the time line added, this logic should be update
	if(videoId){
		if (needLog){
			console.log("videoId : "+videoId)
		}		
		
		var xmlSequences = doc.createElement("Sequences")
			var xmlSequence = doc.createElement("Sequence")
				var xmlKey = doc.createElement("Key")				
				xmlKey.setAttribute("start", "0");
				xmlKey.setAttribute("element", videoId);
					var xmlVideoPlayback = doc.createElement("VideoPlayback")				
					xmlVideoPlayback.setAttribute("action", "start");
				xmlKey.appendChild(xmlVideoPlayback);
			xmlSequence.appendChild(xmlKey)		
		xmlSequences.appendChild(xmlSequence)		
		design.appendChild(xmlSequences)		
		
	}
    return design.outerHTML || new XMLSerializer().serializeToString(design);

};


var getV4kElementType = function (inputType) {

   	if(!inputType){
		return XmlV4kType.CANVAS
	}

	switch(inputType){
		case JsonObjectType.RECT:
			return XmlV4kType.CANVAS
		case JsonObjectType.HORIZONTAL_LINE:
			return XmlV4kType.LINE		
		case JsonObjectType.VERTICAL_LINE:
			return XmlV4kType.LINE		
		case JsonObjectType.IMAGE:
			return XmlV4kType.IMAGE
		case JsonObjectType.QRCODE:
			return XmlV4kType.BARCODE_QR
		case JsonObjectType.BARCODE:
			return XmlV4kType.BARCODE_128
		case JsonObjectType.IMAGE:
			return XmlV4kType.IMAGE
		case JsonObjectType.VIDEO:
			return XmlV4kType.VIDEO
		case JsonObjectType.TEXTBOX:
			return XmlV4kType.TEXT
		default:
			return XmlV4kType.CANVAS
	}
		
	return XmlV4kType.CANVAS
};

var rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};
var getJsonColor = function (input) {
    var outputColor = "#FFFFFF"
    try {
		if(input == "transparent"){
			return "#00FFFFFF";
		}
        if (input.startsWith("#")) {
            if (input.length == 4) { //"#FFF","#000"
                outputColor = "#"
                        + input.charAt(1) + input.charAt(1)
                        + input.charAt(2) + input.charAt(2)
                        + input.charAt(3) + input.charAt(3);
            } else { //"#00FFFFF","#00000"
                outputColor = input;
            }
        } else if (input.startsWith("rgb")) {
            input = input.replace("rgb(", "");
            input = input.replace(")", "");
            var rgb = input.split(",");

            outputColor = "#" + rgbToHex(parseInt(rgb[0].trim())) + rgbToHex(parseInt(rgb[1].trim())) + rgbToHex(parseInt(rgb[2].trim()));
        }
    }
    catch (err) {
        //console.log(err.message);
    }

    //console.log("getJsonColor ==>"+outputColor) 	
    return outputColor
}

var saveFileLocal = function (v4kKeyframeXml) {
    // $("a#downloadlink")[0].href = "data:text/plain;charset=UTF-8," + encodeURIComponent(v4kKeyframeXml);
    // $("a#downloadlink")[0].click();
    saveTextAs(v4kKeyframeXml, "breece_desinger_keyframe.xml");
};

var postXmlToServer = function (v4kKeyframeXml) {
    $.ajax({
        url: "export.php",
        type: 'post',
        dataType: 'text',
        contentType: 'text/xml',
        data: v4kKeyframeXml,
        success: function (response) {

            //console.log(response) 	
        }
    });
};

var refreshTabSamSung = function () {
    $.ajax({
        url: "sendevent.php",
        type: 'get',
        success: function (response) {

        }
    });
};

var round2dec = function (num) {
	return Math.round(num * 100) / 100; 
}
