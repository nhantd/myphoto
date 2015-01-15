

function clickTabs(panels , buttons , button)
{
	for(var i=0; i<panels.length ; i++)
	{
		if( button.attr('href') == '#'+panels[i].attr('id') )
		{
			panels[i].show();
		}
		else
		{
			panels[i].hide();
		}
	}
	
	for(var i=0; i<buttons.length ; i++)
	{
		if(button.attr('id') == buttons[i].attr('id'))
		{
			button.parent().addClass('active');
		}
		else
		{
			buttons[i].parent().removeClass('active');
		}
	}
}

function tabs(buttons , panels)
{
	for(var i=0; i<buttons.length ; i++)
	{
		buttons[i].on('click' , function()
		{
			clickTabs(panels , buttons , $(this));
			return false;
		});
	}
}

$(document).ready(function()
{
	var petObj = new Pet();
	petObj.bootstrap();
	
	tabs(
		[$('#_1') , $('#_2') , $('#_3') , $('#_4')],
		[$('#object-compose') , $('#object-controls') , $('#object-export') , $('#canvas-settings')]
	);
});
