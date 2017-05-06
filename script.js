$(document).ready(function()
{
  var numRows = 50;
  var padSize = 500;
  var erasedColor = "#ffffff"; // white
  var color = "#000000"; // black
  var choice = 'Black';
  var isGridOn = false;
  //alert("screen size = " + window.innerWidth + " x " + window.innerHeight);

  $('#size').val(numRows);
  populatePad();

  $('#color').change(function()
  {
    choice = $('#color :selected').text();

    if ( choice === 'Color picker' )
    {
      $('#picker').css({visibility: 'visible'});
      color = $('#picker').val();
    }
    else
    {
      $('#picker').css({visibility: 'hidden'});
      
      if ( choice === 'Black' )
      {
        color = "#000000";
      }
      else if ( choice === 'Eraser' )
      {
        color = erasedColor;
      }
    }
  });

  $('#picker').change(function()
  {
    color = $('#picker').val();
  });

  $('#size').change(function()
  {
    var rows = $('#size').val();
    
    if ( rows > 100 )
    {
      // limit rows to 100 maximum
      numRows = 100;
    }
    else if ( rows < 1 )
    {
      // invalid value - leave the size the same
    }
    else { numRows = rows; }

    $('#size').val(numRows);
    
    populatePad();
  });

  $('#toggleGrid').click(function()
  {
    isGridOn = !isGridOn;

    if ( isGridOn )
    {
      $(".cell").css("border", "1px dotted #eee");
    }
    else
    {
      $(".cell").css("border", "none");
    }
  });

  $('#clear').click(function()
  {
    erase();
  });
  
  function handleMouseEnterEvents()
  {
    $(".cell").mouseenter(function()
    {
      if ( choice === 'Greyscale' )
      {
        // make the background progressively darker
        color = makeDarker( $(this).css("background-color") );
      }
      else if ( choice === 'Random' )
      {
        color = getRandomColor();
      }
    
      $(this).css("background-color", color);
    });
  }
  
  function getRGB(color)
  {
    var rgb = [];

    if ( /^#[0-9A-Fa-f]{6}$/i.test(color) )
    {
      rgb = color.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
      for (var i = 1; i < rgb.length; i++) { rgb[i] = parseInt(rgb[i], 16); }
    }
    else
    {
      rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);      
    }

    rgb.shift(); // the first value is the original string - throw it away

    return rgb;
  }
  
  function makeDarker(color)
  {
    var rgb = getRGB(color); // get the rbg values
    var newColor;

    if ( (rgb[0] != rgb[1]) || (rgb[0] != rgb[2]) )
    {
      // this isn't a greyscale background - make it one
      newColor = "rgb(230,230,230)";
    }
    else
    {
      // make about 10% darker, until completely black
      var newValue = (rgb[0] <= 25) ? 0 : rgb[0] - 25;
      newColor = "rgb(" + newValue + "," + newValue + "," + newValue + ")";
    }
    
    return newColor;
  }
  
  function getRandomColor()
  {
    var red = Math.floor((Math.random() * 255));
    var green = Math.floor((Math.random() * 255));
    var blue = Math.floor((Math.random() * 255));
    return "rgb(" + red + "," + green + "," + blue + ")"
  }
  
  function isMobile()
  {
    var isMobile = false;

    if( window.innerWidth <= 800 && window.innerHeight <= 600 )
    {
      isMobile = true;
    }

    return isMobile;
  }
  
  function erase()
  {
    $(".cell").css("background-color", erasedColor);
  }
  
  function populatePad()
  {
    $("#pad").empty(); // this removes child elements and associated event handlers
    $("#pad").css({"height":padSize,"width":padSize});

    var cellSize = padSize/numRows;

    for(var i = 0; i < numRows; i++)
    {
      for(var j = 0; j < numRows; j++)
      {
        $("#pad").append("<div class='cell'></div>");
      }
    }
    
    $(".cell").css({"height":cellSize, "width":cellSize});
    erase();
    handleMouseEnterEvents();
    isGridOn = false;
  }
});
