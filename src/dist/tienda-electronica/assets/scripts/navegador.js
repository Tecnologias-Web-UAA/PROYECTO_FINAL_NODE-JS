	

    	
       window.location.hash="no-back-button";
    	
       window.location.hash="Again-No-back-button"; //chrome
    	
       window.onhashchange=function(){window.location.hash="no-back-button";}
    	
       window.onbeforeunload = function() {
              return "¿Estás seguro que deseas salir de la actual página?"
          }