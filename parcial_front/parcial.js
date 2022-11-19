var data = "";
/* -----------------------------------------------------------------------------------------------------------

1- Implementar la siguiente jerarquía de Clases. Las restricciones deben aplicarse en los formularios de ABM mediante
Validaciones, no en las clases.


CLASe Vehiculo
----------------------------------------------------------------------------------------------------------- */
class Vehiculo {
  id;
  modelo;
  anoFab;
  velMax;

  constructor(id, modelo, anoFab, velMax) {
    this.Id = id;
    this.Modelo = modelo;
    this.AnoFab = anoFab;
    this.VelMax = velMax;
  }

  set Id(id) {
    this.id = id;
  }

  set Modelo(modelo) {
    this.modelo = modelo;
  }

  set AnoFab(anoFab) {
    this.anoFab = anoFab;
  }

  set VelMax(velMax) {
    this.velMax = velMax;
  }

  get Id() {
    return this.id;
  }

  get Modelo() {
    return this.modelo;
  }

  get AnoFab() {
    return this.anoFab;
  }

  get VelMax() {
    return this.velMax;
  }

  toString() {
    return (
      this.Id + "-" + this.Modelo + "-" + this.AnoFab + "-" + this.VelMax + "-"
    );
  }
}

/* -----------------------------------------------------------------------------------------------------------
CLASE Aereo
----------------------------------------------------------------------------------------------------------- */
class Aereo extends Vehiculo {
  altMax;
  autonomia;

  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);
    this.AltMax = altMax;
    this.Autonomia = autonomia;
  }

  set AltMax(altMax) {
    this.altMax = altMax;
  }

  set Autonomia(autonomia) {
    this.autonomia = autonomia;
  }

  get AltMax() {
    return this.altMax;
  }

  get Autonomia() {
    return this.autonomia;
  }
  toString() {
    return super.toString() + "-" + this.AltMax + "-" + this.Autonomia;
  }
}

/* -----------------------------------------------------------------------------------------------------------
CLASE Terrestre
----------------------------------------------------------------------------------------------------------- */

class Terrestre extends Vehiculo {
  cantPue;
  cantRue;

  constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
    super(id, modelo, anoFab, velMax);
    this.CantPue = cantPue;
    this.CantRue = cantRue;
  }

  set CantPue(cantPue) {
    this.cantPue = cantPue;
  }

  set CantRue(cantRue) {
    this.cantRue = cantRue;
  }

  get CantPue() {
    return this.cantPue;
  }

  get CantRue() {
    return this.cantRue;
  }

  toString() {
    return super.toString() + "-" + this.CantPue + "-" + this.CantRue;
  }
}



/* -----------------------------------------------------------------------------------------------------------
Puntos parcial
3- Generar una lista en memoria de la jerarquía de clases implementada en el punto 1 a partir de una cadena de caracteres de objetos Json. Esta lista se generará por única vez. Las acciones subsecuentes deberán actualizar la lista acorde al resultado de la acción realizada.
Obtener la cadena desde la api provista con el endpoint vehiculoAereoTerrestre.php, con el Verbo GET y sin Parámetros. En caso de tener una respuesta con código 200 Generar la lista en memoria y mostrar el Formulario Lista, de lo contrario Lanzar una advertencia por pantalla. 
NO Utilizar la clase XMLHttpRequest, Utilizar Fetch, NO utilizar función Asíncrona, Garantizar Secuencialidad.



----------------------------------------------------------------------------------------------------------- */

function SetData() {

  fetch("http://localhost/parcial_front/vehiculoAereoTerrestre.php", {
    method: "GET"
  })
    .then((res) => {
      
      return res.json();
    })
    .then((json) => {

     data = JSON.stringify(json);

    
    })
    .catch((e) => {
      let error = e.statusText || "No se pudieron cargar los datos";
      alert("Error " + error);
    })
    .finally(() => {
      Actualizar();
    });
  }

  function Actualizar() {
    BorrarDatos();
    MostrarDatos();
    QuitarForm();
    Editar();
  }

  function BorrarDatos() {
    let tabla = document.getElementById("tabla");
  
    while (
      tabla.lastElementChild.classList.contains("filaAereo") ||
      tabla.lastElementChild.classList.contains("filaTerrestre")
    ) {
      tabla.removeChild(tabla.lastElementChild);
    }
  }

  function MostrarDatos() {
    let array = DevolverDatos();


    array.forEach((vehiculo) => AgregarDato(vehiculo));
  }
  
  
function DevolverDatos() {
  let arrayVehiculos = JSON.parse(data);
  let arrayObjetos = [];

  arrayVehiculos.forEach(function (vehiculo) {
    if (vehiculo.hasOwnProperty("autonomia")) {
      let aereo = new Aereo(
        vehiculo.id,
        vehiculo.modelo,
        vehiculo.anoFab,
        vehiculo.velMax,
        vehiculo.altMax,
        vehiculo.autonomia
      );
      arrayObjetos.push(aereo);
    } else if (vehiculo.hasOwnProperty("cantPue")) {
      let terrestre = new Terrestre(
        vehiculo.id,
        vehiculo.modelo,
        vehiculo.anoFab,
        vehiculo.velMax,
        vehiculo.cantPue,
        vehiculo.cantRue
      );

      arrayObjetos.push(terrestre);
    }
  });


  return arrayObjetos;
}


function AgregarDato(vehiculo) {
  let tabla = document.getElementById("tabla");

  let tr = document.createElement("tr");
  tabla.appendChild(tr);
  tr.setAttribute("id", vehiculo.Id);

  let tdId = document.createElement("td");
  let textoId = document.createTextNode(vehiculo.Id);
  tdId.appendChild(textoId);
  tdId.setAttribute("class", "columnaId");
  tr.appendChild(tdId);

  let tdModelo = document.createElement("td");
  let textoModelo = document.createTextNode(vehiculo.Modelo);
  tdModelo.appendChild(textoModelo);
  tdModelo.setAttribute("class", "columnaModelo");
  tr.appendChild(tdModelo);

  let tdAnoFab = document.createElement("td");
  let textoAnoFab = document.createTextNode(vehiculo.AnoFab);
  tdAnoFab.appendChild(textoAnoFab);
  tdAnoFab.setAttribute("class", "columnaAnoFab");
  tr.appendChild(tdAnoFab);

  let tdVelMax = document.createElement("td");
  let textoVelMax = document.createTextNode(vehiculo.VelMax);
  tdVelMax.appendChild(textoVelMax);
  tdVelMax.setAttribute("class", "columnaVelMax");
  tr.appendChild(tdVelMax);

  if (vehiculo.hasOwnProperty("autonomia")) {
    tr.setAttribute("class", "filaAereo");
    tr.setAttribute("name", vehiculo.Id);

    let tdVacio = document.createElement("td");
    let tdVacio2 = document.createElement("td");
  

    texto = "N/A";
    nodo = document.createTextNode(texto);
    tdVacio.appendChild(nodo);

    texto2 = "N/A";
    nodo2 = document.createTextNode(texto2);
    tdVacio2.appendChild(nodo2);

   
    tdVacio.setAttribute("class", "columnaCantPue");
    tdVacio2.setAttribute("class", "columnaCantRue");
 
    tr.appendChild(tdVacio);
    tr.appendChild(tdVacio2);
 

    let tdAltMax = document.createElement("td");
    let textoAltMax = document.createTextNode(vehiculo.AltMax);
    tdAltMax.appendChild(textoAltMax);
    tdAltMax.setAttribute("class", "columnaAltMax");
    tr.appendChild(tdAltMax);

    let tdAutonomia = document.createElement("td");
    let textoAutonomia = document.createTextNode(vehiculo.Autonomia);
    tdAutonomia.appendChild(textoAutonomia);
    tdAutonomia.setAttribute("class", "columnaAutonomia");
    tr.appendChild(tdAutonomia);

  } else {
    tr.setAttribute("class", "filaTerrestre");
    tr.setAttribute("name", vehiculo.Id);

    let tdCantPue = document.createElement("td");
    let textoCantPue = document.createTextNode(vehiculo.CantPue);
    tdCantPue.appendChild(textoCantPue);
    tdCantPue.setAttribute("class", "columnaCantPue");
    tr.appendChild(tdCantPue);

    let tdCantRue = document.createElement("td");
    let textoCantRue = document.createTextNode(vehiculo.CantRue);
    tdCantRue.appendChild(textoCantRue);
    tdCantRue.setAttribute("class", "columnaCantRue");
    tr.appendChild(tdCantRue);

  

    let tdVacio = document.createElement("td");
    tdVacio.setAttribute("class", "columnaVelMax");
    let tdVacio2 = document.createElement("td");
    tdVacio2.setAttribute("class", "columnaAutonomia");


    let texto = "N/A";

    texto = "N/A";
    nodo = document.createTextNode(texto);
    tdVacio.appendChild(nodo);

    texto2 = "N/A";
    nodo2 = document.createTextNode(texto2);
    tdVacio2.appendChild(nodo2);

   

    tr.appendChild(tdVacio);
    tr.appendChild(tdVacio2);
  
  }

  let tdModificar = document.createElement("td");
  let buttonModificar = document.createElement("input");
  buttonModificar.type = "button";
  buttonModificar.value = "Modificar";
  buttonModificar.className = "botonModificar";
  buttonModificar.name = vehiculo.Id
  tdModificar.setAttribute("class", "columnaModificar");
  tdModificar.appendChild(buttonModificar);
  tr.appendChild(tdModificar);

  let tdEliminar = document.createElement("td");
  let buttonEliminar = document.createElement("input");
  buttonEliminar.type = "button";
  buttonEliminar.value = "Eliminar";
  buttonEliminar.className = "botonEliminar";
  buttonEliminar.name = vehiculo.Id;
  tdEliminar.setAttribute("class", "columnaEliminar");
  tdEliminar.appendChild(buttonEliminar);
  tr.appendChild(tdEliminar);
}


function QuitarForm() {
  document.getElementById("abm").style.display = "none";

  document.getElementById("spinner").style.display = "none";
  document.getElementById("abm").style.opacity = "1";
  document.getElementById("fLista").style.opacity = "1";
  document.getElementById("fLista").style.display = "block";
}



function Editar() {
  let btnModificar = document.getElementsByClassName("botonModificar");
  let btnEliminar = document.getElementsByClassName("botonEliminar");

  Array.from(btnModificar).forEach((element) =>
    element.addEventListener("click", RecuperarInfo)
  );

  Array.from(btnEliminar).forEach((element) =>
    element.addEventListener("click", RecuperarInfoParaBorrar)
  );
}




function RecuperarInfo(e) {
  MostrarForm();
  AgregarTituloFormAbm("Modificar");

  document.getElementById("baja").style.display = "none";

  document.getElementById("alta").style.display = "none";

  document.getElementById("modificar").style.display = "inline";

  let fila = e.currentTarget;

  let name = fila.getAttribute("name");

  //las filas estan nombradas con el id 
  let datos = DevolverDatos();

  let auxiliar = datos.filter((vehiculo) => vehiculo.id == name);

  let vehiculo = auxiliar[0];

  document.getElementById("fID").value = vehiculo.Id;
  let campoId = document.getElementById("fID");
  campoId.disabled = true;
  document.getElementById("fModelo").value = vehiculo.Modelo;
  document.getElementById("fAnoFab").value = vehiculo.AnoFab;
  document.getElementById("fVelMax").value = vehiculo.VelMax;

  document.getElementById("fModelo").disabled = false;
  document.getElementById("fAnoFab").disabled = false;
  document.getElementById("fVelMax").disabled = false;

  if (vehiculo instanceof Aereo) {
    document.getElementById("fTipo").value = "aereo";

    document.getElementById("fAltMax").value = vehiculo.AltMax;
    document.getElementById("fAutonomia").value = vehiculo.Autonomia;


    document.getElementById("fAltMax").disabled = false;
    document.getElementById("fAutonomia").disabled = false;
  
  } else if (vehiculo instanceof Terrestre) {
    document.getElementById("fTipo").value = "terrestre";

    document.getElementById("fCantPue").value = vehiculo.CantPue;
    document.getElementById("fCantRue").value = vehiculo.CantRue;

    document.getElementById("fCantPue").disabled = false;
    document.getElementById("fCantRue").disabled = false;
  
  }

  SeleccionarTipo();

  document.getElementById("fTipo").disabled = true;
}



function AgregarTituloFormAbm(txt) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "titulo");
  let newContent = document.createTextNode(txt);
  newDiv.appendChild(newContent);

  let form = document.getElementById("title");
  while (form.lastElementChild) {
    form.removeChild(form.lastElementChild);
  }
  form.appendChild(newDiv);
}



function RecuperarInfoParaBorrar(e) {
  MostrarForm();
  AgregarTituloFormAbm("Eliminar");

  document.getElementById("baja").style.display = "inline";

  document.getElementById("alta").style.display = "none";

  document.getElementById("modificar").style.display = "none";

  let fila = e.currentTarget;

  let name = fila.getAttribute("name");

  //las filas estan nombradas con el id 
  let datos = DevolverDatos();

  let auxiliar = datos.filter((vehiculo) => vehiculo.id == name);

  let vehiculo = auxiliar[0];

  document.getElementById("fID").value = vehiculo.Id;
  let campoId = document.getElementById("fID");
  campoId.disabled = true;
  document.getElementById("fModelo").value = vehiculo.Modelo;
  document.getElementById("fModelo").disabled = true;
  document.getElementById("fAnoFab").value = vehiculo.AnoFab;
  document.getElementById("fAnoFab").disabled = true;
  document.getElementById("fVelMax").value = vehiculo.VelMax;
  document.getElementById("fVelMax").disabled = true;

  if (vehiculo instanceof Aereo) {
    document.getElementById("fTipo").value = "aereo";

    document.getElementById("fAltMax").value = vehiculo.AltMax;
    document.getElementById("fAutonomia").value = vehiculo.Autonomia;
   

    document.getElementById("fAltMax").disabled = true;
    document.getElementById("fAutonomia").disabled = true;
  
  } else if (vehiculo instanceof Terrestre) {
    document.getElementById("fTipo").value = "terrestre";

    document.getElementById("fCantPue").value = vehiculo.cantPue;
    document.getElementById("fCantRue").value = vehiculo.CantRue;
   
    document.getElementById("fCantPue").disabled = true;
    document.getElementById("fCantRue").disabled = true;
   
  }

  SeleccionarTipo();

  document.getElementById("fTipo").disabled = true;
}


function SeleccionarTipo() {
  let btnTipo = document.getElementById("fTipo");

  let inputTerrestre = document.getElementsByClassName("inputTerrestre");
  let inputAereo = document.getElementsByClassName("inputAereo");

  let labelTerrestre = document.getElementsByClassName("labelP");
  let labelAereo = document.getElementsByClassName("labelF");

  if (btnTipo.value == "aereo") {
    Array.from(inputTerrestre).forEach(
      (element) => (element.style.display = "none")
    );

    Array.from(inputAereo).forEach(
      (element) => (element.style.display = "inline")
    );
    Array.from(labelTerrestre).forEach(
      (element) => (element.style.display = "none")
    );

    Array.from(labelAereo).forEach(
      (element) => (element.style.display = "inline")
    );
  } else {
    Array.from(inputTerrestre).forEach(
      (element) => (element.style.display = "inline")
    );

    Array.from(inputAereo).forEach(
      (element) => (element.style.display = "none")
    );
    Array.from(labelTerrestre).forEach(
      (element) => (element.style.display = "inline")
    );

    Array.from(labelAereo).forEach(
      (element) => (element.style.display = "none")
    );
  }
}


/*--------------------------------------
4- Implementar Funcionalidad de "Alta". Aplicar Validaciones Acorde a las Restricciones descritas en el diagrama UML.
Al hacer Click en el botón "Agregar Elemento", debe ocultar el "Formulario Lista" y mostrar el "Formulario ABM"(centrado en la pantalla). Este debe indicar en el encabezado la acción a realizar, bloquear el ingreso de Id (que serán generados por el API) y mostrar únicamente los campos correspondientes al tipo de elemento que se está insertando.
Al hacer Click en "Aceptar", bloquear la pantalla con el contenedor "Spinner", y realizar la solicitud al API sobre el endpoint vehiculoAereoTerrestre.php, con el Verbo PUT, con encabezado Content-Type de valor application/json y cuerpo un string de objeto JSON que representa los atributos del elemento a insertar SIN el ID.
En caso de recibir un resultado con código 200, actualizar el ID con el provisto en la respuesta, insertar el nuevo elemento en la lista, ocultar el contenedor "Spinner", ocultar "Formulario ABM" y finalmente mostrar "Formulario Lista" el cual debe reflejar los cambios.
En caso de NO recibir un código 200 ocultar el contenedor "Spinner", ocultar "Formulario ABM", mostrar "Formulario Lista" y realizar una advertencia de que no se pudo realizar la operación.
En caso de Hacer click en Cancelar, ocultar "Formulario ABM" y mostrar "Formulario Lista".
Utilizar la clase XMLHttpRequest, NO utilizar Fetch, NO utilizar Promesas, Garantizar Secuencialidad.



-------------------------------------------------------------------------------------------------------------*/ 
function MostrarSpinner() {
  document.getElementById("abm").style.opacity = "0.3";
  document.getElementById("fLista").style.opacity = "0.3";
  document.getElementById("spinner").style.display = "block";
}

function Alta(JSONvehiculo, vehiculo) {
  var xhttp = new XMLHttpRequest();
  var params = JSONvehiculo;



  xhttp.onreadystatechange = function () {
    if (this.readyState !== 4) {
      MostrarSpinner();
    }
    if (this.readyState == 4 && this.status == 200) {

id=xhttp.responseText;
obj= JSON.parse(id);


   AgregarElementoAData(vehiculo, obj.id);
       
      Actualizar();
    }

    if (this.readyState == 4 && this.status != 200) {
      let error = xhttp.statusText || "No se pudieron cargar los datos";
      alert("Error " + xhttp.status + ". " + error);
    }
  };
  xhttp.open(
    "PUT",
    "http://localhost/parcial_front/vehiculoAereoTerrestre.php",
    true
  );
  
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.send(params);
}



function AgregarElementoAData(vehiculo, id) {
  vehiculo.id = id;
  let dataObjetos = DevolverDatos();
  dataObjetos.push(vehiculo);
  let dataJSON = JSON.stringify(dataObjetos);
  data = dataJSON;
}


function MostrarFormAlta() {
  MostrarForm();
  AgregarTituloFormAbm("Alta");
  document.getElementById("fID").value = "";

  let campoId = document.getElementById("fID");
  campoId.disabled = true;

  document.getElementById("baja").style.display = "none";

  document.getElementById("modificar").style.display = "none";

  document.getElementById("alta").style.display = "inline";

  document.getElementById("fModelo").value = "";
  document.getElementById("fAnoFab").value = "";
  document.getElementById("fVelMax").value = "";

  document.getElementById("fTipo").value = "aereo";

  document.getElementById("fAltMax").value = "";
  document.getElementById("fAutonomia").value = "";

  document.getElementById("fCantPue").value = "";
  document.getElementById("fCantRue").value = "";

  document.getElementById("fTipo").disabled = false;

  document.getElementById("fModelo").disabled = false;
  document.getElementById("fAnoFab").disabled = false;
  document.getElementById("fVelMax").disabled = false;

  document.getElementById("fTipo").disabled = false;

  document.getElementById("fAltMax").disabled = false;
  document.getElementById("fAutonomia").disabled = false;


  document.getElementById("fCantPue").disabled = false;
  document.getElementById("fCantRue").disabled = false;


  SeleccionarTipo();
}

function MostrarForm() {
  document.getElementById("abm").style.display = "block";
  document.getElementById("abm").style.width = "500px";

  document.getElementById("fLista").style.display = "none";
}


function DarDeAlta() {
  let vehiculo = DevolverObjetoValidado();

  if (vehiculo) {
    let jsonVehiculo = DevolverJSON(vehiculo);

    Alta(jsonVehiculo, vehiculo);
  } else {
    alert(
      "Revise los campos.Todos son numericos menos Modelo")
}
}


function DevolverObjetoValidado() {
  let inputTipo = document.getElementById("fTipo");
  let inputModelo = document.getElementById("fModelo");
  let inputAnoFab = document.getElementById("fAnoFab");
  let inputVelMax = document.getElementById("fVelMax");
  let vehiculo = false;

  if (
  
    ValidarNumero(inputAnoFab, 1885) &&
    ValidarNumero(inputVelMax, 0)
  ) {
    let tipo = inputTipo.value;
    let modelo = formatoMayusc(inputModelo.value);
    let anoFab =inputAnoFab.value;
    let  velMax= inputVelMax.value;

    let id = document.getElementById("fID").value;

    if (tipo == "terrestre") {
      let inputCantPue = document.getElementById("fCantPue");
      let inputCantRue = document.getElementById("fCantRue");
  

      if (
        ValidarNumero(inputCantPue, -1) &&
        ValidarNumero(inputCantRue, 0) 
 
      ){
        let cantPue = document.getElementById("fCantPue").value;
        let cantRue = document.getElementById("fCantRue").value;


        vehiculo = new Terrestre(
          id,
          modelo,
          anoFab,
          velMax,
          cantPue,
          cantRue
        );
      }
    } else {
      let inputAltMax = document.getElementById("fAltMax");
      let inputAutonomia = document.getElementById("fAutonomia");
 

      if (
   
        ValidarNumero(inputAutonomia, 0) &&
        ValidarNumero(inputAltMax, 0)
      ) {
      
        let autonomia= document.getElementById("fAutonomia").value;
        let altMax = document.getElementById("fAltMax").value;

        vehiculo = new Aereo(
          id,
          modelo,
          anoFab,
          velMax,
          autonomia,
          altMax

        );
      }
    }
  }

  return vehiculo;
}



function DevolverJSON(vehiculo) {
  let obj = new Object();
  obj.modelo = vehiculo.modelo;
  obj.anoFab = vehiculo.anoFab;
  obj.velMax = vehiculo.velMax;

  if (vehiculo.hasOwnProperty("cantPue")) {
    obj.cantPue = vehiculo.cantPue;
    obj.cantRue = vehiculo.cantRue;

  } else if (vehiculo.hasOwnProperty("autonomia")) {
    obj.altMax = vehiculo.altMax;
    obj.autonomia = vehiculo.autonomia
      }

  return JSON.stringify(obj);
}

/*validaciones
------------------------------------------------------------------------------------------------------------------------------------------------*/



function ValidarNumero(input, minimo) {
  let valido = false;
  let pattern = new RegExp("[0-9]+");

  if (!input.value) {
    valido = false;
  } else {
    if (input.value < minimo) {
      valido = false;
    } else {
      if (!pattern.test(input.value)) {
        valido = false;
      } else {
        valido = true;
      }
    }
  }

  return valido;
}

function formatoMayusc(value) {

  let aux = value.toLowerCase();
  let nuevoValor = aux[0].toUpperCase() + aux.substring(1);

  return nuevoValor;
}



/* 

5- Implementar Funcionalidad de "Modificación". Aplicar Validaciones Acorde a las Restricciones descritas en el diagrama UML.
Al hacer Click en el botón "Modificar" de una fila, debe ocultar el "Formulario Lista" y mostrar el "Formulario ABM"(centrado en la pantalla). Este debe indicar en el encabezado la acción a realizar, bloquear el ingreso de Id y mostrar únicamente los campos correspondientes al tipo de elemento que se está modificando con los valores correspondientes.
Al hacer Click en "Aceptar", bloquear la pantalla con el contenedor "Spinner", y realizar la solicitud al API sobre el endpoint vehiculoAereoTerrestre.php, con el Verbo POST, con encabezado Content-Type de valor application/json y cuerpo un string de objeto JSON que representa los atributos del elemento a modificar.
En caso de recibir un resultado con código 200, actualizar el elemento de la lista, ocultar el contenedor "Spinner", ocultar "Formulario ABM" y finalmente mostrar "Formulario Lista" el cual debe reflejar los cambios.
En caso de NO recibir un código 200 ocultar el contenedor "Spinner", ocultar "Formulario ABM", mostrar "Formulario Lista" y realizar una advertencia de que no se pudo realizar la operación.
En caso de Hacer click en Cancelar, ocultar "Formulario ABM" y mostrar "Formulario Lista".
Utilizar Función Asíncrona, NO utilizar la clase XMLHttpRequest, Utilizar Fetch Garantizar Secuencialidad. */

async function Modificar(JSONvehiculo) {
  MostrarSpinner();

  try {
    let respuesta = await fetch(
      "http://localhost/parcial_front/vehiculoAereoTerrestre.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONvehiculo,
      }
    );

    if (!respuesta.ok) {
      throw {
        status: respuesta.status,
        statusText: respuesta.statusText,
      };
    } else {
      modificarData();
    }
  } catch (e) {
    alert(
      "Error " + e.status + ". " + e.statusText + " No se guardaron los cambios"
    );
  } finally {
    Actualizar();
  }
}

function FuncionModificar() {
  let objVehiculo = DevolverObjetoValidado();

  if (objVehiculo) {
    let json = JSON.stringify(objVehiculo);

    Modificar(json);
  } else {
    alert(
      "Revise los campos. Todos numericos menos modelo" );
  }
}

function modificarData() {
  let array = DevolverDatos();
  let id = document.getElementById("fID").value;

  let objVehiculo = DevolverObjetoValidado();

  let nuevoArray = array.map(function (vehiculo) {
    if (id == vehiculo.Id) {
      objVehiculo.Id = id;

      vehiculo = objVehiculo;
    }

    return vehiculo;
  });

  let dataJSON = JSON.stringify(nuevoArray);
  data = dataJSON;
}




/* 6- Implementar Funcionalidad de "Eliminación". Aplicar Validaciones Acorde a las Restricciones descritas en el diagrama UML.
Al hacer Click en el botón "Eliminar" de una fila, debe Ocultarse el "Formulario Lista" y mostrar el "Formulario ABM"(centrado en la pantalla). Este debe indicar en el encabezado la acción a realizar, bloquear el ingreso de Id y mostrar únicamente los campos correspondientes al tipo de elemento que se está eliminando con los valores correspondientes.
Al hacer Click en "Aceptar", bloquear la pantalla con el contenedor "Spinner", y realizar la solicitud al API sobre el endpoint vehiculoAereoTerrestre.php, con el Verbo DELETE, con encabezado Content-Type de valor application/json y cuerpo un string de objeto JSON con el id del elemento a eliminar.
En caso de recibir un resultado con código 200, actualizar la lista, ocultar el contenedor "Spinner", ocultar "Formulario ABM" y finalmente mostrar "Formulario Lista" el cual debe reflejar los cambios.
En caso de NO recibir un código 200 ocultar el contenedor "Spinner", ocultar "Formulario ABM", mostrar "Formulario Lista" y realizar una advertencia de que no se pudo realizar la operación.
En caso de Hacer click en Cancelar, ocultar "Formulario ABM" y mostrar "Formulario Lista".
Garantizar Secuencialidad.

 */



function FuncionEliminar() {
  let obj = DevolverObjetoValidado();

  let json = JSON.stringify(obj);


  Eliminar(json);
}

function EliminarData() {
  let array = DevolverDatos();



  let id = document.getElementById("fID").value;



  let filtrado = array.filter((vehiculo) => vehiculo.id != id);
  let dataJSON = JSON.stringify(filtrado);
  data = dataJSON;


}



async function Eliminar(JSONVehiculo) {
  MostrarSpinner();

  try {
    let respuesta = await fetch(
      "http://localhost/parcial_front/vehiculoAereoTerrestre.php",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONVehiculo,
      }
    );

    if (!respuesta.ok) {

      throw {
        status: respuesta.status,
        statusText: respuesta.statusText,
      };
    } else {


      EliminarData();
    }
  } catch (e) {
    alert("Error " + e.status + ". " + e.statusText + " No se pudo eliminar");
  } finally {
    Actualizar();
  }
}







/*---------*/ 

window.addEventListener("load", SetData);

let btnAdd = document.getElementById("add");
btnAdd.addEventListener("click", MostrarFormAlta); 

let btnCancelar = document.getElementById("cancelar");
btnCancelar.addEventListener("click", QuitarForm);

let btnTipo = document.getElementById("fTipo");
btnTipo.addEventListener("change", SeleccionarTipo);

let btnAlta = document.getElementById("alta");
btnAlta.addEventListener("click", DarDeAlta);

let btnModificar = document.getElementById("modificar");
btnModificar.addEventListener("click", FuncionModificar);

let btnBaja = document.getElementById("baja");
btnBaja.addEventListener("click", FuncionEliminar);
 




