searchJson = function(id, func) {
    var find, url;
    
    if (func == null) {
      func = new Function;
    }

    url = 'https://s1.trrsf.com/navbar/js/nav_121.js';

    $.ajax({
      url: url,
      dataType: "jsonp"
    });

    find = function(key, obj) { //key = arte, obj = {}
      var entry, _i;

      console.log("Intialize find for: " + key, obj);

      if (obj[key]) {
        return obj[key];
      } else if (typeof obj === 'object' || typeof obj === 'array') {
        for (_i = 0; _i < obj.length; ++_i) {
          entry = obj[_i];
          if (!(entry['id'] || entry['name'])) {
            alert("Não existe a chave 'id'");
            throw "Não existe a chave 'id'";
          }
          if (entry['id'] === key || entry['name'] === key) {
            return entry;
          }
        }
        alert("Indice '" + key + "' nao encontrado");
        throw "Indice '" + key + "' nao encontrado";
      } else {
        alert("Indice '" + key + "' nao encontrado");
        throw "Indice '" + key + "' nao encontrado";
      }
    };

    navbar_callback = function(response) {
      var control, indice, key, keys, _i;

      keys = id.split('-'); //all-arte => [all, arte]
      control = response;

      for (indice = 0; indice < keys.length; ++indice) { // 2
        key = keys[indice]; // arte
        control = find(key, control); // {} =arte
      }
      if (control == null) {
        alert("Id " + keys[keys.length - 1] + " não encontrado");
        throw "Id " + keys[keys.length - 1] + " não encontrado";
      }

      func(control);
    };
};

function formVal(getId){
  searchJson(getId, function(obj){
    var _label = 'Label: ' + obj['label'];
    var _url = 'URL: <a href="'+obj['url']+'" target="_blank">'+obj['url']+'</a>';

    $('#responseContent').html( _label+'<br>'+_url );
  });
};

var getId;
$('#submit').click(function(){
  var form = $(this).parent();
  
  getId = $('input[name=s]', form).val();

  if(getId == '')
    alert('Informe uma ID para consulta')
  else
    formVal(getId);

  return false;
});


