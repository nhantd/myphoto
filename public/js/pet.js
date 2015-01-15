
/**
 * Class for all kind for event binding for Pet's commands and controls
 * 
 * @Author Waqar Alamgir <waqarcs@yahoo.com>
 * @Created 23 Sep 2013
 * @Modified 25 Sep 2013
 *
 */


//store image handler before adding
/*window.onunload = function () { console.log('lets unload windows');}

var image_handle;
document.getElementById('img_local').value = "";
document.getElementById('img_local').onchange = function handleImage(e) {
	image_handle = e.target.files[0];
}*/

var MESSAGES = [
	'Fabric library is missing.',
	'Are you sure?',
	'This browser doesn\'t provide this feature',
	'Saved',
	'Post data is missing',
	'Saving ',
	'Exporting as JPEG',
	'Exporting as PNG',
	'Loading ',
	'Maximum width of the image can be set to ',
	'Maximum height of the image can be set to ',
	'Value is invalid',
	'Invalid crop size',
	'Invalid name',
];

var PAGES = [
	'draft.php',
	'view.php'
];

PetUtil = function()
{
	var that = this;
	var _timer = 0;
	
	that.getRandomNum = function(min, max)
	{
		return Math.random() * (max - min) + min;
	};
	
	that.getImage = function(image)
	{
		return (image);
	};
	
	that.hideLoader = function()
	{
		$('#loader img').show();
		$('#loader').removeClass('show').find('span').text('Loading');
	};
	
	that.showLoader = function(text)
	{
		$('#loader img').show();
		$('#loader').addClass('show').find('span').text(text);
	};
	
	that.fadeOutLoader = function(text)
	{
		if(_timer)
		{
			clearTimeout(_timer);
		}
		
		$('#loader').addClass('show').find('span').text(text);
		$('#loader img').hide();
		
		_timer = setTimeout(function()
		{
			that.hideLoader();
		} , 4000);
	};
};

petUtil = new PetUtil();

Pet = function()
{
	var that = this;
	
	var _objectCompose = $('#object-compose');
	var _clear = $('#clear');
	var _rasterize = $('#rasterize');
	var _rasterizeJpeg = $('#rasterize-jpeg');
	var _rasterizeSvg = $('#rasterize-svg');
	var _rasterizeJson = $('#rasterize-json');
	var _download_image = $('#download-image');

	var _removeSelected = $('#remove-selected');
	var _sendBackwards = $('#send-backwards');
	var _sendToBack = $('#send-to-back');
	var _bringForward = $('#bring-forward');
	var _bringToFront = $('#bring-to-front');
	var _shadowify = $('#shadowify');
	var _canvasBackgroundPicker = $('#canvas-background-picker');
	var _fontFamily = $('#font-family');
	var _imageUrl = $('#image_url');
	var _imageLocal = $('#img_local');
	var __imageLocal_value = '';
	var _image_server = $('#image_server');
	var _image_local_handle;
	var _image_server_sample = $('#sample_image');
	var _image_server_name_save = $('#image_server_name');

	var _text = $('#text');
	var _originX = $('.origin-x');
	var _originY = $('.origin-y');
	var _complexity = $('#complexity strong');
	var _addImageBtn = 'add_image_btn';
	var _addTextBtn = 'add_text_btn';
	var _uploadFileForm = $('#uploadFileForm');
	var _downloadFileForm = $('#downloadFileForm');
	var _fileData = $('#file_data');
	var _fileType = $('#file_type');
	var _fileName = $('#file_name');
	var _fileDataDownload = $('#file_data_download');

	var _textColor = $('#text-color');
	var _imageSizeW = $('#image_size_w');
	var _imageSizeH = $('#image_size_h');
	var _textWrapper = $('#text-wrapper');
	var _imageWrapper = $('#image-wrapper');
	var _canvasEle = 'canvas';
	var _textEditor = $('#text-wrapper #text-edit');
	var _cmdBoldBtn = $('#text-cmd-bold');
	var _cmdItalicBtn = $('#text-cmd-italic');
	var _cmdUnderlineBtn = $('#text-cmd-underline');
	var _cmdLinethroughBtn = $('#text-cmd-linethrough');
	var _cmdOverlineBtn = $('#text-cmd-overline');
	var _fontFamilyEdit = $('#font-family-edit');
	var _textAlignEdit = $('#text-align-edit');
	var _texBgColor = $('#text-bg-color');
	var _textLinesBgColor = $('#text-lines-bg-color');
	var _textStrokeColor = $('#text-stroke-color');
	var _textStrokeWidth = $('#text-stroke-width');
	var _textFontSize = $('#text-font-size');
	var _textLineHeight = $('#text-line-height');

	var _this_image_SizeW = $('#this_image_size_w');
	var _this_image_SizeH = $('#this_image_size_h');
	var _this_image_fitted_canvas = $('#image_fit_to_canvas');
	var _this_canvas_fitted_image = $('#canvas_fit_to_image');

	var _imageCrop = $('#image_crop');
	var _imageCrop_this = $('#image_crop_this');
	var _image_on_crop_button = false;
	var _image_on_cropping = false;
	var _cropobject = null;
	
	var _filters = {};
	var _filters = fabric.Image.filters;
	var _filters_name = ['blur', 'sharpen', 'emboss','brightness','tint',
						'blend','multiply','gradient-transparency'];
	var _enableAdjustableFilter_val = false;
	var _enableCustomFilter_val = false;
	var _adjustablefilters_btn = $('#adustable-filters');
	var _customfilters_btn = $('#custom-filters');
	var _customfilters_select = $('#custom-filters-select');
	var _blur_filter = $('#blur');
	var _sharpen_filter = $('#sharpen');
	var _emboss_filter = $('#emboss');
	var _brightness_filter =  $('#brightness');
	var _brightness_value_filter =  $('#brightness-value');
	var _tint_filter = $('#tint');
	var _tint_opacity_filter = $('#tint-opacity');
	var _tint_color_filter = $('#tint-color');
	var _blend_filter = $('#blend');
	var _blend_mode_filter = $('#blend-mode');
	var _blend_color_filter = $('#blend-color');
	var _multiply_filter = $('#multiply');
	var _multiply_color_filter = $('#multiply-color');
	var _transparency_filter = $('#gradient-transparency');
	var _transparency_value_filter = $('#gradient-transparency-value');

	var _event = 'click';
	var _blur = 'blur';
	var _change = 'change';
	var _focus = 'focus';
	var _keyup = 'keyup';
	var _canvas = new fabric.Canvas(_canvasEle);
	var _getRandomInt = fabric.util.getRandomInt;
	
	var _canvasWidth = 600;
	var _canvasHeight = 400;
	var _canvasMaxWidth = 1000;
	var _canvasMaxHeight = 800;
	
	var _mousex=0;var _mousey=0;
	var _offsetx = document.getElementById('canvas').getBoundingClientRect().left;
	var _offsety = document.getElementById('canvas').getBoundingClientRect().top;
	var _exist_crop_rect = false;
	var _cropedobject = new fabric.Rect({
	    //left: 100,
	    //top: 100,
	    fill: 'transparent',
	    originX: 'left',
	    originY: 'top',
	    stroke: '#333',
	    strokeDashArray: [2,2],
	    //ctop
	    opacity: 1,
	    width: 1,
	    height: 1,
	    visible: false,
	    selectable: true,
	    hasRotatingPoint: false,
		hasBorder: false
	});
	_canvas.add(_cropedobject);
	//_cropedobject.setCoords();
	function _reset_crop_rectangle(_cropedobject){
		_cropedobject.width=0;
		_cropedobject.height=0;
		_cropedobject.left=1;
		_cropedobject.top=0;
		_cropedobject.visible=false;
		_cropedobject.scaleX=1;
		_cropedobject.scaleY=1;
		return _cropedobject;
	}
	
	function _applyFilter(index, filter) {
		var obj = _canvas.getActiveObject();
		obj.filters[index] = filter;
		obj.applyFilters(_canvas.renderAll.bind(_canvas));
	};

	function _applyFilterValue(index, prop, value) {
		var obj = _canvas.getActiveObject();
		if (obj.filters[index]) {
			obj.filters[index][prop] = value;
			obj.applyFilters(_canvas.renderAll.bind(_canvas));
		}
	};

	function _enableAdjustableFilter(){
		for (var i = 0; i < _filters_name.length; i++)
			document.getElementById(_filters_name[i]).disabled = false;
	}

	function _disableAdjustableFilter(){
		for (var i = 0; i < _filters_name.length; i++)
			document.getElementById(_filters_name[i]).disabled = true;
	}

	function _enableCustomFilter(){
		document.getElementById('custom-filters-select').disabled = false;
	}

	function _disableCustomFilter(){
		document.getElementById('custom-filters-select').disabled = true;
	}

	function _displaySampleImage(){
		_image_server.on(_change, function viewSample(){
			var url = document.getElementById('image_server').value;
			console.log(url);
			document.getElementById('sample_image').src="/data/"+url;
			if (url!="") {
				document.getElementById('sample_image').style.display="inline-block";
				console.log('display sample image: ', document.getElementById('sample_image').src);
				_image_server_value = "/data/"+url;
			}
			else {
				document.getElementById('sample_image').style="display:none";
				_image_server_value="";
			}
		});
	}

	function _handle_local_image(){
		_imageLocal.on(_change, function handleImage(e) {
			_image_local_handle = e.target.files[0]; 
		});
	}

	that.bootstrap = function(config)
	{
		if(!fabric)
		{
			alert(MESSAGES[0]);
			return;
		}
		
		if(config && config.canvasWidth)
		{
			_canvasWidth = config.canvasWidth;
		}
		
		if(config && config.canvasHeight)
		{
			_canvasHeight = config.canvasHeight;
		}
		
		_leEventBinding();
		
		if(window.jsonData)
		{
			petUtil.showLoader(MESSAGES[8]);
		}
		
		setTimeout(function()
		{
			_canvas.calcOffset();
			
			if(window.jsonData)
			{
				_canvas.clear();
				_canvas.loadFromDatalessJSON(window.jsonData);
				setTimeout(function() {
					_canvasBackgroundPicker.trigger('blur');
					petUtil.hideLoader();
				} , 1000);
			}
		}, 100);
		
		_imageUrl.focus();
	};
	
	function _reAdjustCanvas()
	{
		_canvas.calcOffset();
	}
	
	function _leEventBindingMain()
	{
		_clear.bind(_event , function(event)
		{
			if( confirm(MESSAGES[1]) )
			{
				_canvas.clear();
			}
		});
		
	}
	
	function _leEventBindingCompose()
	{	
		_displaySampleImage();
		_handle_local_image();

		_objectCompose.bind(_event , function(event)
		{
			var element = event.target;
			if (element.nodeName.toLowerCase() === 'strong')
			{
		  		element = element.parentNode;
			}
			
			var className = 
			element.className,
			offset = 50,
			left = fabric.util.getRandomInt(0 + offset, _canvasWidth/2 - offset),
			top = fabric.util.getRandomInt(0 + offset, _canvasHeight/2 - offset),
			scale = 1;
			angle = 0;
			opacity = 1;
			
			if( $(element).hasClass(_addImageBtn) )
			{
				var imageUrl = _imageUrl.val();

				//browse local file
				var imageLocal = _imageLocal.val();
				if (imageLocal != ''){
					var reader = new FileReader();
					reader.onload = function (event){
						var imgObj = new Image();
						imgObj.src = event.target.result;
						imgObj.onload = function () {
							var image = new fabric.Image(imgObj);
							image.set({ left:left , top:top , angle:angle , cornersize:10 });
							image.scale(scale).setCoords();
							_canvas.add(image);
							_canvas.renderAll();
						}
					}
					reader.readAsDataURL(_image_local_handle);
					
				}
				
				else if(imageUrl != '' || _image_server_value != '')
				{
					console.log('read url');
					
					if (_image_server_value != ''){
						imageUrl = petUtil.getImage(_image_server_value);
						console.log('image_server:', _image_server_value);	
						}
					else 
						imageUrl = petUtil.getImage(imageUrl);

					console.log("read");

		
					fabric.Image.fromURL(imageUrl , function(image)
					{
						image.set({ left:left , top:top , angle:angle , cornersize:10 });
						image.scale(scale).setCoords();
						_canvas.add(image);
						_canvas.renderAll();
					});

					_canvas.deactivateAll();
					_imageWrapper.hide();
					_textWrapper.hide();
				}
				_imageLocal.val('') ;
				_image_server.val('');
				_image_server_value='';
				_imageUrl.val('').focus();
			}
			
			if( $(element).hasClass(_addTextBtn) )
			{
				var text = _text.val();
				var font = _fontFamily.val();
				var color = _textColor.val();
				
				if(text!='' && font !='' && color!='')
				{
					var textObject = new fabric.Text(
					text,
					{
						left: 0,
						top: 0,
						fontSize:20,
						lineHeight:1,
						fontFamily: font,
						angle: angle,
						fill: color,
						scaleX: 1,
						scaleY: 1,
						fontWeight: '',
						originX: 'left',
						hasRotatingPoint:true
					});
					_canvas.add(textObject);
					_text.val('').focus();
				}
				else if(color == '')
				{
					_textColor.focus();
				}
				else if(font == '')
				{
					_fontFamily.focus();
				}
				else if(text == '')
				{
					_text.focus();
				}
			}
			
			_reAdjustCanvas();
		});
	}
	
	function _leEventBindingExport()
	{
		_rasterize.bind(_event , function(event)
		{
			_canvas.deactivateAll();
			petUtil.showLoader(MESSAGES[7]);
			if (!fabric.Canvas.supports('toDataURL'))
			{
				petUtil.fadeOutLoader(MESSAGES[2]);
			}
			else
			{	
				if (_image_server_name_save.val() == '') {
					petUtil.fadeOutLoader(MESSAGES[13]);
					return;
				}

				_fileData.val(_canvas.toDataURL('png'));
				//_fileData.val(JSON.stringify(_canvas));

				_fileType.val('png');
				_fileName.val(_image_server_name_save.val());
				_uploadFileForm.submit();
				petUtil.fadeOutLoader(MESSAGES[3]);
				_image_server_name_save.val('');
			}
		});
		
		_rasterizeJpeg.bind(_event , function(event)
		{	
			_canvas.deactivateAll();
			petUtil.showLoader(MESSAGES[6]);
			if (!fabric.Canvas.supports('toDataURL'))
			{
				petUtil.fadeOutLoader(MESSAGES[2]);
			}
			else
			{
				_fileData.val(_canvas.toDataURL('jpeg'));
				_fileType.val('jpeg');
				_fileName.val(_image_server_name_save.val());
				_uploadFileForm.submit();
				petUtil.fadeOutLoader(MESSAGES[3]);
				_image_server_name_save.val('');
			}
		});

		_download_image.on(_event , function(event){
			_canvas.deactivateAll();
			//petUtil.showLoader(MESSAGES[7]);
			if (!fabric.Canvas.supports('toDataURL'))
			{
				petUtil.fadeOutLoader(MESSAGES[2]);
			}
			else
			{
				_fileDataDownload.val(_canvas.toDataURL('png'));
				console.log(_fileDataDownload.val(_canvas.toDataURL('png')));
				//_fileData.val(JSON.stringify(_canvas));

				//_fileType.val('png');
				_downloadFileForm.submit();
				petUtil.fadeOutLoader(MESSAGES[3]);
			}

		});
		
	}
	
	function _leEventBindingControls()
	{
		_removeSelected.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			var activeGroup = _canvas.getActiveGroup();
			if (activeGroup)
			{
				var objectsInGroup = activeGroup.getObjects();
				_canvas.discardActiveGroup();
				objectsInGroup.forEach(function(object)
				{
					_canvas.remove(object);
				});
			}
			else if (activeObject)
			{
				_canvas.remove(activeObject);
			}
		});
		
		_sendBackwards.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.sendBackwards(activeObject);
			}
		});
		
		_sendToBack.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.sendToBack(activeObject);
			}
		});
		
		_bringForward.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.bringForward(activeObject);
			}
		});
		
		_bringToFront.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.bringToFront(activeObject);
			}
		});
		
		_shadowify.bind(_event , function(event)
		{
			var obj = _canvas.getActiveObject();
			if (!obj) return;
			if (obj.shadow)
			{
				obj.shadow = null;
			}
			else
			{
				obj.setShadow({
					color: 'rgba(0,0,0,0.15)',
					blur: 10,
					offsetX: 6,
					offsetY: 6
				});
			}
			_canvas.renderAll();
		});
	}
	
	function _leEventBindingSettings()
	{
		_canvasBackgroundPicker.bind(_blur , function()
		{
			_canvas.backgroundColor = _canvasBackgroundPicker.val();
			_canvas.renderAll();
		});
		
		_imageSizeW.bind(_blur , function()
		{
			var w = _imageSizeW.val();
			if(!isNaN(w) && w<=_canvasMaxWidth)
			{
				_canvas.setWidth(w);
				_canvasWidth=w;
				_canvas.renderAll();
			}
			else if(!isNaN(w) && w>_canvasMaxWidth)
			{
				petUtil.fadeOutLoader(MESSAGES[9] + _canvasMaxWidth);
			}
			else
			{
				petUtil.fadeOutLoader(MESSAGES[11]);
			}
		});
		
		_imageSizeH.bind(_blur , function()
		{
			var h = _imageSizeH.val();
			if(!isNaN(h) && h<=_canvasMaxHeight)
			{
				_canvas.setHeight(h);
				_canvasHeight=h;
				_canvas.renderAll();
			}
			else if(!isNaN(h) && h>_canvasMaxHeight)
			{
				petUtil.fadeOutLoader(MESSAGES[10] + _canvasMaxHeight);
			}
			else
			{
				petUtil.fadeOutLoader(MESSAGES[11]);
			}
		});
	}
	
	function _leEventBindingSectionText()
	{
		_canvas.on('object:selected' , _onObjectSelected);
		_canvas.on('group:selected' , _onObjectSelected);
		_canvas.on('selection:cleared', function(e)
		{
			_textWrapper.hide();
			_imageWrapper.hide();
			if (_image_on_crop_button === true){
				_imageWrapper.show();
			}
		});
		
		_cmdBoldBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');
				activeObject.fontWeight ? _cmdBoldBtn.addClass('selected') : _cmdBoldBtn.removeClass('selected');
				_canvas.renderAll();
			}
		});
		
		_cmdItalicBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');
				activeObject.fontStyle ? _cmdItalicBtn.addClass('selected') : _cmdItalicBtn.removeClass('selected');
				_canvas.renderAll();
			}
		});
		
		_textEditor.bind(_focus , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				_textEditor.val(activeObject.text);
			}
		});
		
		_textEditor.bind(_keyup , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				if (!_textEditor.val())
				{
					_canvas.discardActiveObject();
				}
				else
				{
					activeObject.setText(_textEditor.val());
				}
				_canvas.renderAll();
			}
		});
		
		_textAlignEdit.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				var value = _textAlignEdit.val().toLowerCase();
				activeObject.textAlign = value;
				_canvas._adjustPosition && _canvas._adjustPosition(activeObject, value === 'justify' ? 'left' : value);
				_canvas.renderAll();
			}
		});
		
		_fontFamilyEdit.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.fontFamily = _fontFamilyEdit.val().toLowerCase();
				_canvas.renderAll();
			}
		});
		
		_texBgColor.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.backgroundColor = _texBgColor.val().toLowerCase();
				_canvas.renderAll();
			}
		});
		
		_textLinesBgColor.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textBackgroundColor = _textLinesBgColor.val();
				_canvas.renderAll();
			}
		});
		
		_textFontSize.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.setFontSize(parseInt(_textFontSize.val(), 10));
				_canvas.renderAll();
			}
		});
		
		_textStrokeColor.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.stroke = _textStrokeColor.val();
				_canvas.renderAll();
			}
		});
		
		_textStrokeWidth.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.strokeWidth = parseInt(_textStrokeWidth.val(), 10);
				_canvas.renderAll();
			}
		});
		
		_textLineHeight.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.setLineHeight(parseInt(_textLineHeight.val(), 10));
				_canvas.renderAll();
			}
		});
		
		_cmdUnderlineBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
				if (activeObject.textDecoration === 'underline')
				{
					_cmdUnderlineBtn.addClass('selected');
					_cmdLinethroughBtn.removeClass('selected');
					_cmdOverlineBtn.removeClass('selected');
				}
				else
				{
					_cmdUnderlineBtn.removeClass('selected');
				}
				_canvas.renderAll();
			}
		});
		
		_cmdLinethroughBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
				if (activeObject.textDecoration === 'line-through')
				{
					_cmdLinethroughBtn.addClass('selected');
					_cmdUnderlineBtn.removeClass('selected');
					_cmdOverlineBtn.removeClass('selected');
				}
				else
				{
					_cmdLinethroughBtn.removeClass('selected');
				}
				_canvas.renderAll();
			}
		});
		
		_cmdOverlineBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textDecoration = (activeObject.textDecoration == 'overline' ? '' : 'overline');
				if (activeObject.textDecoration === 'overline')
				{
					_cmdOverlineBtn.addClass('selected');
					_cmdUnderlineBtn.removeClass('selected');
					_cmdLinethroughBtn.removeClass('selected');
				}
				else
				{
					_cmdOverlineBtn.removeClass('selected');
				}
				_canvas.renderAll();
			}
		});

		_adjustablefilters_btn.on(_event, function(){
			activeObject = _canvas.getActiveObject();
			if (_enableAdjustableFilter_val === false){
				if (_enableCustomFilter_val  === true){ 
					_customfilters_select.val("");
					_disableCustomFilter();
					_enableCustomFilter_val = false;
					_customfilters_btn.removeClass('btn-success');
					activeObject.filters=[];
					activeObject.applyFilters(_canvas.renderAll.bind(_canvas));
				};
				_enableAdjustableFilter();
				_enableAdjustableFilter_val = true;
				_adjustablefilters_btn.addClass('btn-success');
				for (var i = 0; i < _filters_name.length; i++) {
					document.getElementById(_filters_name[i]).checked = !!activeObject.filters[i];
				}

			}
			else{
				_disableAdjustableFilter();
				_enableAdjustableFilter_val = false;
				_adjustablefilters_btn.removeClass('btn-success');
				//activeObject.filters=[];
				///activeObject.applyFilters(_canvas.renderAll.bind(_canvas));
			}

		});

		_customfilters_btn.on(_event,function(){
			activeObject = _canvas.getActiveObject();
			if (_enableCustomFilter_val === false){
				if (_enableAdjustableFilter_val  === true){ 
					_disableAdjustableFilter();
					_enableAdjustableFilter_val = false;
					_adjustablefilters_btn.removeClass('btn-success');
					activeObject.filters=[];
					activeObject.applyFilters(_canvas.renderAll.bind(_canvas));
				};
				_enableCustomFilter();
				_enableCustomFilter_val = true;
				_customfilters_btn.addClass('btn-success');
			}
			else{
				//_customfilters_select.val("");
				_disableCustomFilter();
				_enableCustomFilter_val = false;
				_customfilters_btn.removeClass('btn-success');
				/*activeObject.filters=[];
				activeObject.applyFilters(_canvas.renderAll.bind(_canvas));*/
			}

		});

		_blur_filter.on(_event, function() {
			_applyFilter(0, this.checked && new _filters.Convolute({
				matrix: [ 1/9, 1/9, 1/9,
				1/9, 1/9, 1/9,
				1/9, 1/9, 1/9 ]
			}));
		});

		_sharpen_filter.on(_event, function() {
			_applyFilter(1, this.checked && new _filters.Convolute({
				matrix: [  0, -1,  0,
				-1,  5, -1,
				0, -1,  0 ]
			}));
		});

		_emboss_filter.on(_event, function() {
			_applyFilter(2, this.checked && new _filters.Convolute({
				matrix: [ 1,   1,  1,
				1, 0.7, -1,
				-1,  -1, -1 ]
			}));
		});

		_brightness_filter.on(_event, function() {
			_applyFilter(3, this.checked && new _filters.Brightness({
				brightness: parseInt(_brightness_value_filter.value, 10)
			}));
		});

		_brightness_value_filter.on(_change, function() {
			_applyFilterValue(3, 'brightness', parseInt(this.value, 10));
		});

		_tint_filter.on(_event, function() {
			_applyFilter(4, this.checked && new _filters.Tint({
/*				color: _tint_color_filter.attr('value'),
				opacity: parseFloat(_tint_opacity_filter.attr('value'))*/
				color: '#3513B0',
				opacity: 0.5
			}));
		});

		_tint_color_filter.on(_change, function(){
			_applyFilterValue(4, 'color', this.value);

		});

		_tint_opacity_filter.on(_change, function(){
			_applyFilterValue(4, 'opacity', parseFloat(this.value));

		});


		_blend_filter.on(_event ,function() { 
			_applyFilter(5, this.checked && new _filters.Blend({
				color: _blend_color_filter.attr('value'),
				mode: _blend_mode_filter.attr('value')
			}));
		});

		_blend_mode_filter.on(_change, function() {
			_applyFilterValue(5, 'mode', this.value);
		});

		_blend_color_filter.on(_change, function() {
			_applyFilterValue(5, 'color', this.value);
		});

		_multiply_filter.on(_event, function(){
			_applyFilter(6, this.checked && new _filters.Multiply({
				color: _multiply_color_filter.attr('value')
			}));
		});

		_multiply_color_filter.on(_change, function(){
			_applyFilterValue(6,'color', this.value);
		});

		_transparency_filter.on(_event, function () {
			_applyFilter(7, this.checked && new _filters.GradientTransparency({
				threshold: parseInt(_transparency_value_filter.attr('value'), 10)
			}));
		});

		_transparency_value_filter.on(_change, function() {
			_applyFilterValue(7, 'threshold', parseInt(this.value, 10));
		});


		_customfilters_select.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (_canvas.getActiveObject().get('type')==='image')
			{	
				//activeObject.colorspace = _customfilters_select.val().toLowerCase();
				activeObject.filters=[];
				switch (_customfilters_select.val().toLowerCase()){
					case 'gray':	
					activeObject.filters.push(new _filters.Grayscale());
					break;
					case 'invert':
					activeObject.filters.push(new _filters.Invert());
					break;
					case 'sepia1':
					activeObject.filters.push(new _filters.Sepia());
					break;
					case 'sepia2':
					activeObject.filters.push(new _filters.Sepia2());
					break;
				}			
				activeObject.applyFilters(_canvas.renderAll.bind(_canvas));
			}

		});


		_this_image_SizeW.bind(_blur , function()
		{
			var w = _this_image_SizeW.val();
			var activeObject = _canvas.getActiveObject();
			
			if (_canvas.getActiveObject().get('type')==='image')
			{	

				if(!isNaN(w) && w<=_canvasMaxWidth)
				{
					activeObject.width=w;
					_canvas.renderAll();
				}
				else if(!isNaN(w) && w>_canvasMaxWidth)
				{
					petUtil.fadeOutLoader(MESSAGES[9] + _canvasMaxWidth);
				}
				else
				{
					petUtil.fadeOutLoader(MESSAGES[11]);
				}
			}
		});

		_this_image_SizeH.bind(_blur , function()
		{
			var h = _this_image_SizeH.val();
			var activeObject = _canvas.getActiveObject();
			
			if (_canvas.getActiveObject().get('type')==='image')
			{	

				if(!isNaN(h) && h<=_canvasMaxHeight)
				{
					activeObject.height=h;
					_canvas.renderAll();
				}
				else if(!isNaN(h) && h>_canvasMaxHeight)
				{
					petUtil.fadeOutLoader(MESSAGES[9] + _canvasMaxHeight);
				}
				else
				{
					petUtil.fadeOutLoader(MESSAGES[11]);
				}
			}
		});

		_this_image_fitted_canvas.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (_canvas.getActiveObject().get('type')==='image')
			{
				activeObject.height=_canvasHeight;
				activeObject.width=_canvasWidth;
				activeObject.currentHeight = _canvasHeight;
				activeObject.currentWidth = _canvasWidth;
				//activeObject.top=_canvasHeight/2;
				//activeObject.left=_canvasWidth/2;
				activeObject.left = 0;activeObject.top = 0;
				activeObject.scaleX=1;
				activeObject.scaleY=1;
				_this_image_SizeH.val(_canvasHeight);
				_this_image_SizeW.val(_canvasWidth);
				_canvas.renderAll();

			}
		});

		_this_canvas_fitted_image.on(_event, function(){
			var activeObject = _canvas.getActiveObject();
			if (activeObject.get('type')==='image')
			{
				_canvasHeight = activeObject.currentHeight;
				_canvasWidth = activeObject.currentWidth;
				_canvas.setWidth(_canvasWidth);
				_canvas.setHeight(_canvasHeight);
				_imageSizeW.val(_canvasWidth);
				_imageSizeH.val(_canvasHeight);
				activeObject.left = 0;activeObject.top = 0;
				activeObject.scaleX = 1;activeObject.scaleY=1;
				activeObject.width = _canvasWidth;activeObject.height=_canvasHeight;
				_canvas.renderAll();

			}
		});

		_imageCrop.on(_event, function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject == null){
				activeObject = _cropobject;
			}
			if (activeObject.get('type')==='image')
			{
				//activeObject.selectable=false;	
				activeObject.angle=0;
				//activeObject.top=_canvasHeight/2;
				//activeObject.left=_canvasWidth/2;
				activeObject.left = 0; activeObject.top = 0;
				
				
				if (_image_on_crop_button == false){
					_imageCrop.addClass('selected');
					_image_on_crop_button = true;
					document.getElementById('image_crop_this').disabled = false;
					_imageCrop_this.addClass('btn-success');
					activeObject.selectable = false;
					_cropobject=activeObject;
				}
				else{
					_imageCrop.removeClass('selected');
					document.getElementById('image_crop_this').disabled = true;
					_imageCrop_this.removeClass('btn-success');
					_image_on_crop_button = false;
					activeObject.selectable = true;
				}
				_canvas.renderAll();

			}
		});
		
		_canvas.on("mouse:down", function (event){
			if (_image_on_crop_button===true)	{
				if ((_exist_crop_rect === true) && (_cropedobject.left <= event.e.pageX - _offsetx) && (event.e.pageX - _offsetx <= _cropedobject.left + _cropedobject.width) && 
					(_cropedobject.top <= event.e.pageY - _offsety) && (event.e.pageY - _offsety <= _cropedobject.top + _cropedobject.height))
					{ return};
				_exist_crop_rect = false;
				_cropedobject = _reset_crop_rectangle(_cropedobject);
				_cropedobject.left=event.e.pageX - _offsetx;
				_cropedobject.top=event.e.pageY - _offsety;
				_cropedobject.width = 0;
				_cropedobject.height = 0;	

				_cropedobject.visible = true;	

				_mousex = event.e.pageX;
				_mousey = event.e.pageY;
				_image_on_cropping = true;
				_canvas.bringToFront(_cropedobject);
				
			}
		});

		_canvas.on("mouse:move", function (event)
		{
			if ((_image_on_crop_button === true) && (_image_on_cropping === true)) {
				if (_exist_crop_rect === true) { return;}
				if (event.e.pageX - _mousex > 0) {
					_cropedobject.width = event.e.pageX - _mousex;
				}

				if (event.e.pageY - _mousey > 0) {
					_cropedobject.height = event.e.pageY - _mousey;
				}
				_canvas.renderAll();
			}
		});

		_canvas.on("mouse:up", function (event)
		{
			if (_image_on_cropping===true) {
				console.log(_image_on_cropping);
				_image_on_cropping = false;
				_exist_crop_rect = true;
				_cropedobject.setCoords();
				_canvas.renderAll();
				/*_cropedobject.left=0;
				_cropedobject.top=0;
				_cropedobject.width=0;
				_cropedobject.height=0;*/


			}

		});

		_imageCrop_this.on(_event, function(){
			var width = _cropedobject.width * _cropedobject.scaleX;
			var height = _cropedobject.height * _cropedobject.scaleY;
			//var left = _cropedobject.left - _cropobject.left;
			//var top = _cropedobject.top - _cropobject.top;

			var left = _cropedobject.left;
			var top = _cropedobject.top;
			//var left = _cropedobject.left - width/2;
			//var top = _cropedobject.top - height/2;
			_canvas.deactivateAll();
			/*_cropobject.clipTo = function (ctx) {
				ctx.rect(left, top, width, height);
			};*/
/*			_cropobject.width = width;
			_cropobject.height = height;
			_cropobject.left = _cropedobject.left + Math.round(width/2);
			_cropobject.top = _cropedobject.top + Math.round(height/2);*/

			if ((left < 0) || (top < 0) || (width <=1) || (height <=1)) {
				petUtil.fadeOutLoader(MESSAGES[12]);
				return; 
			}

			imageUrl = _canvas.toDataURL({left:left+1,top:top+1,width:width-1,height:height-1});

			fabric.Image.fromURL(imageUrl , function(image)
			{
				image.set({ left:left , top:top , cornersize:10 });
				image.setCoords();
				_canvas.add(image);
				image.bringToFront();
			});	
			_cropobject.remove();


			_cropobject.selectable = true;
			_cropedobject.visible = false;
			_image_on_crop_button = false;
			_canvas.renderAll();
			_imageCrop.removeClass('selected');
			_imageCrop_this.removeClass('btn-success');
			document.getElementById('image_crop_this').disabled = true;

		});

	}

	function _onObjectSelected(e)
	{
		var selectedObject = e.target;
		if (_canvas.getActiveObject().get('type')==='text')
		{
			_imageWrapper.hide();
			_textWrapper.show();
			_textEditor.val(selectedObject.getText());
			
			var buttons = [_textEditor , _cmdBoldBtn , _cmdItalicBtn , _cmdUnderlineBtn , _cmdLinethroughBtn , _cmdOverlineBtn];
			for(var i=0; i<buttons.length ; i++)
			{
				buttons[i].attr('class' , 'btn');
			}
			
			if(selectedObject.fontWeight === 'bold')
			{
				_cmdBoldBtn.addClass('selected');
			}
			if(selectedObject.textDecoration === 'underline')
			{
				_cmdUnderlineBtn.addClass('selected');
			}
			if(selectedObject.textDecoration === 'line-through')
			{
				_cmdLinethroughBtn.addClass('selected');
			}
			if(selectedObject.textDecoration === 'overline')
			{
				_cmdOverlineBtn.addClass('selected');
			}
			if(selectedObject.fontStyle === 'italic')
			{
				_cmdItalicBtn.addClass('selected');
			}
			if(selectedObject.fontStyle === 'italic')
			{
				_cmdItalicBtn.addClass('selected');
			}
			
			_fontFamilyEdit.val(selectedObject.get('fontFamily').toLowerCase());
			_textAlignEdit.val(fabric.util.string.capitalize(selectedObject.get('textAlign')));
			_texBgColor.val( selectedObject.get('backgroundColor') );
			_textLinesBgColor.val(selectedObject.get('textBackgroundColor'));
			_textStrokeColor.val(selectedObject.get('stroke'));
			_textStrokeWidth.val(selectedObject.get('strokeWidth'));
			_textFontSize.val(selectedObject.get('fontSize'));
			_textLineHeight.val(selectedObject.get('lineHeight'));
		}
		else if (_canvas.getActiveObject().get('type')==='image')
		{
			_textWrapper.hide();
			_imageWrapper.show();

			_customfilters_select.val(selectedObject.get('colorspace'));
			_this_image_SizeH.val(selectedObject.height);
			_this_image_SizeW.val(selectedObject.width);
			/*_customfilters_select.val(selectedObject.get)*/

		}
	}
	
	function _leEventBinding()
	{
		_leEventBindingMain();
		_leEventBindingCompose();
		_leEventBindingControls();
		_leEventBindingExport();
		_leEventBindingSectionText();
		_leEventBindingSettings();
	}
};