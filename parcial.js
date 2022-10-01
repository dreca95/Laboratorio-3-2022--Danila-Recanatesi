var data =
  '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';

/* -----------------------------------------------------------------------------------------------------------
CLAS PERSONA
----------------------------------------------------------------------------------------------------------- */
class Persona {
  id;
  nombre;
  apellido;
  edad;

  constructor(id, nombre, apellido, edad) {
    this.Id = id;
    this.Nombre = nombre;
    this.Apellido = apellido;
    this.Edad = edad;
  }

  set Id(id) {
    this.id = id;
  }

  set Nombre(nombre) {
    this.nombre = nombre;
  }

  set Apellido(apellido) {
    this.apellido = apellido;
  }

  set Edad(edad) {
    this.edad = edad;
  }

  get Id() {
    return this.id;
  }

  get Nombre() {
    return this.nombre;
  }

  get Apellido() {
    return this.apellido;
  }

  get Edad() {
    return this.edad;
  }

  toString() {
    return (
      this.Id + "-" + this.Nombre + "-" + this.Apellido + "-" + this.Edad + "-"
    );
  }
}

/* -----------------------------------------------------------------------------------------------------------
CLASE Villano
----------------------------------------------------------------------------------------------------------- */
class Villano extends Persona {
  enemigo;
  robos;
  asesinatos;

  constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
    super(id, nombre, apellido, edad);
    this.Enemigo = enemigo;
    this.Robos = robos;
    this.Asesinatos = asesinatos;
  }

  set Enemigo(enemigo) {
    this.enemigo = enemigo;
  }

  set Robos(robos) {
    this.robos = robos;
  }

  set Asesinatos(asesinatos) {
    this.asesinatos = asesinatos;
  }

  get Enemigo() {
    return this.enemigo;
  }

  get Robos() {
    return this.robos;
  }

  get Asesinatos() {
    return this.asesinatos;
  }
}
/* -----------------------------------------------------------------------------------------------------------
CLASE Heroe
----------------------------------------------------------------------------------------------------------- */

class Heroe extends Persona {
  altergo;
  ciudad;
  publicado;

  constructor(id, nombre, apellido, edad, alterego, ciudad, publicado) {
    super(id, nombre, apellido, edad);
    this.Alterego = alterego;
    this.Ciudad = ciudad;
    this.Publicado = publicado;
  }

  set Alterego(alterego) {
    this.alterego = alterego;
  }

  set Ciudad(ciudad) {
    this.ciudad = ciudad;
  }

  set Publicado(publicado) {
    this.publicado = publicado;
  }

  get Alterego() {
    return this.alterego;
  }

  get Ciudad() {
    return this.ciudad;
  }

  get Publicado() {
    return this.publicado;
  }

  toString() {
    return (
      super.toString() +
      "-" +
      this.Alterego +
      "-" +
      this.Ciudad +
      "-" +
      this.publicado
    );
  }
}

/* -----------------------------------------------------------------------------------------------------------
FUNCIONES
----------------------------------------------------------------------------------------------------------- */

function DevolverDatos() {
  let arrayPersonas = JSON.parse(data);
  let arrayObjetos = [];

  arrayPersonas.forEach(function (persona) {
    if (persona.hasOwnProperty("robos")) {
      let villano = new Villano(
        persona.id,
        persona.nombre,
        persona.apellido,
        persona.edad,
        persona.enemigo,
        persona.robos,
        persona.asesinatos
      );
      arrayObjetos.push(villano);
    } else if (persona.hasOwnProperty("alterego")) {
      let heroe = new Heroe(
        persona.id,
        persona.nombre,
        persona.apellido,
        persona.edad,
        persona.alterego,
        persona.ciudad,
        persona.publicado
      );
      arrayObjetos.push(heroe);
    }
  });

  return arrayObjetos;
}

function MostrarDatos() {
  let array = DevolverDatos();
  array.forEach((persona) => AgregarDato(persona));
}

function AgregarDato(persona) {
  let tabla = document.getElementById("tabla");

  let tr = document.createElement("tr");
  tabla.appendChild(tr);
  tr.setAttribute("id", persona.Id);

  let tdId = document.createElement("td");
  let textoId = document.createTextNode(persona.Id);
  tdId.appendChild(textoId);
  tdId.setAttribute("class", "columnaId");
  tr.appendChild(tdId);

  let tdNombre = document.createElement("td");
  let textoNom = document.createTextNode(persona.Nombre);
  tdNombre.appendChild(textoNom);
  tdNombre.setAttribute("class", "columnaNombre");
  tr.appendChild(tdNombre);

  let tdApellido = document.createElement("td");
  let textoAp = document.createTextNode(persona.Apellido);
  tdApellido.appendChild(textoAp);
  tdApellido.setAttribute("class", "columnaApellido");
  tr.appendChild(tdApellido);

  let tdEdad = document.createElement("td");
  let textoEdad = document.createTextNode(persona.Edad);
  tdEdad.appendChild(textoEdad);
  tdEdad.setAttribute("class", "columnaEdad");
  tr.appendChild(tdEdad);

  if (persona.hasOwnProperty("robos")) {
    tr.setAttribute("class", "filaVillano");
    tr.setAttribute("name", persona.Id);

    let tdVacio = document.createElement("td");
    let tdVacio2 = document.createElement("td");
    let tdVacio3 = document.createElement("td");
    tdVacio.setAttribute("class", "columnaAlterego");
    tdVacio2.setAttribute("class", "columnaCiudad");
    tdVacio3.setAttribute("class", "columnaPublicado");
    tr.appendChild(tdVacio);
    tr.appendChild(tdVacio2);
    tr.appendChild(tdVacio3);

    let tdEnemigo = document.createElement("td");
    let textoEnemigo = document.createTextNode(persona.Enemigo);
    tdEnemigo.appendChild(textoEnemigo);
    tdEnemigo.setAttribute("class", "columnaEnemigo");
    tr.appendChild(tdEnemigo);

    let tdRobos = document.createElement("td");
    let textoRobos = document.createTextNode(persona.Robos);
    tdRobos.appendChild(textoRobos);
    tdRobos.setAttribute("class", "columnaRobos");
    tr.appendChild(tdRobos);

    let tdAsesinatos = document.createElement("td");
    let textoAsesinatos = document.createTextNode(persona.Asesinatos);
    tdAsesinatos.appendChild(textoAsesinatos);
    tdAsesinatos.setAttribute("class", "columnaAsesinatos");
    tr.appendChild(tdAsesinatos);
  } else {
    tr.setAttribute("class", "filaHeroe");
    tr.setAttribute("name", persona.Id);

    let tdEqui = document.createElement("td");
    let textoEqu = document.createTextNode(persona.alterego);
    tdEqui.appendChild(textoEqu);
    tdEqui.setAttribute("class", "columnaAlterego");
    tr.appendChild(tdEqui);

    let tdPosi = document.createElement("td");
    let textoPosi = document.createTextNode(persona.Ciudad);
    tdPosi.appendChild(textoPosi);
    tdPosi.setAttribute("class", "columnaCiudad");
    tr.appendChild(tdPosi);

    let tdPublicado = document.createElement("td");
    let textoPublicado = document.createTextNode(persona.Publicado);
    tdPublicado.appendChild(textoPublicado);
    tdPublicado.setAttribute("class", "columnaPublicado");
    tr.appendChild(tdPublicado);

    let tdVacio = document.createElement("td");
    tdVacio.setAttribute("class", "columnaEnemigo");
    let tdVacio2 = document.createElement("td");
    tdVacio2.setAttribute("class", "columnaRobos");
    let tdVacio3 = document.createElement("td");
    tdVacio3.setAttribute("class", "columnaAsesinatos");

    tr.appendChild(tdVacio);
    tr.appendChild(tdVacio2);
    tr.appendChild(tdVacio3);
  }
}

function FiltrarPorTipo() {
  let bFiltrar = document.getElementById("tipoPersonas").value;
  let celdasFut = document.getElementsByClassName("filaHeroe");
  let celdasProf = document.getElementsByClassName("filaVillano");

  if (bFiltrar == "todos") {
    Array.from(celdasFut).forEach(
      (element) => (element.style.display = "table-row")
    );

    Array.from(celdasProf).forEach(
      (element) => (element.style.display = "table-row")
    );
  } else if (bFiltrar == "villanos") {
    Array.from(celdasFut).forEach(
      (element) => (element.style.display = "none")
    );

    Array.from(celdasProf).forEach(
      (element) => (element.style.display = "table-row")
    );
  } else if (bFiltrar == "heroes") {
    Array.from(celdasFut).forEach(
      (element) => (element.style.display = "table-row")
    );

    Array.from(celdasProf).forEach(
      (element) => (element.style.display = "none")
    );
  }

  document.getElementById("promedio").value = " ";
}

function Calcular() {
  let promedio = 0;
  let bFiltrar = document.getElementById("tipoPersonas").value;
  let datos = DevolverDatos();
  let array = "";

  if (bFiltrar == "villanos") {
    array = datos.filter((persona) => persona.hasOwnProperty("robos"));
  } else if (bFiltrar == "heroes") {
    array = datos.filter((persona) => persona.hasOwnProperty("alterego"));
  } else {
    array = datos;
  }

  let edades = array.map(function (persona) {
    return persona.edad;
  });

  let acumulador = edades.reduce(function (valorAnterior, valorActual) {
    return valorAnterior + valorActual;
  });

  promedio = acumulador / edades.length;

  document.getElementById("promedio").value = promedio.toFixed(1);
}

function MostrarFormVacio() {
  MostrarForm();
  document.getElementById("fTipo").disabled = false;

  document.getElementById("fID").value = "";
  document.getElementById("fNombre").value = "";
  document.getElementById("fApellido").value = "";
  document.getElementById("fEdad").value = "";

  document.getElementById("fTipo").value = "heroe";

  document.getElementById("fAlterego").value = "";
  document.getElementById("fCiudad").value = "";
  document.getElementById("fPublicado").value = "";

  document.getElementById("fEnemigo").value = "";
  document.getElementById("fRobos").value = "";
  document.getElementById("fAsesinatos").value = "";

  SeleccionarTipo();

  let buttonMod = document.getElementById("modificacion");
  let buttonBaja = document.getElementById("baja");
  let buttonAlta = document.getElementById("alta");
  buttonMod.disabled = true;
  buttonBaja.disabled = true;
  buttonAlta.disabled = false;
}

function MostrarForm() {
  document.getElementById("abm").style.display = "block";
  document.getElementById("abm").style.width = "500px";

  document.getElementById("fDatos").style.display = "none";
}

function QuitarForm() {
  document.getElementById("abm").style.display = "none";

  document.getElementById("fDatos").style.display = "block";
}

function EditarFila() {
  let celdasHeroe = document.getElementsByClassName("filaHeroe");
  let celdasVillano = document.getElementsByClassName("filaVillano");

  Array.from(celdasHeroe).forEach((element) =>
    element.addEventListener("dblclick", RecuperarInfo)
  );

  Array.from(celdasVillano).forEach((element) =>
    element.addEventListener("dblclick", RecuperarInfo)
  );
}

function SeleccionarTipo() {
  let btnTipo = document.getElementById("fTipo");

  let inputVillano = document.getElementsByClassName("inputVillano");
  let inputHeroe = document.getElementsByClassName("inputHeroe");

  let labelVillano = document.getElementsByClassName("labelP");
  let labelHeroe = document.getElementsByClassName("labelF");

  if (btnTipo.value == "heroe") {
    Array.from(inputVillano).forEach(
      (element) => (element.style.display = "none")
    );

    Array.from(inputHeroe).forEach(
      (element) => (element.style.display = "inline")
    );
    Array.from(labelVillano).forEach(
      (element) => (element.style.display = "none")
    );

    Array.from(labelHeroe).forEach(
      (element) => (element.style.display = "inline")
    );
  } else {
    Array.from(inputVillano).forEach(
      (element) => (element.style.display = "inline")
    );

    Array.from(inputHeroe).forEach(
      (element) => (element.style.display = "none")
    );
    Array.from(labelVillano).forEach(
      (element) => (element.style.display = "inline")
    );

    Array.from(labelHeroe).forEach(
      (element) => (element.style.display = "none")
    );
  }
}

function RecuperarInfo(e) {
  MostrarForm();
  let fila = e.currentTarget;
  let name = fila.getAttribute("name");

  //las filas estan nombradas con el id de la persona
  let datos = DevolverDatos();

  let auxiliar = datos.filter((persona) => persona.Id == name);
  let persona = auxiliar[0];

  document.getElementById("fID").value = persona.Id;
  document.getElementById("fNombre").value = persona.Nombre;
  document.getElementById("fApellido").value = persona.Apellido;
  document.getElementById("fEdad").value = persona.Edad;
  
  if (persona instanceof Heroe) {
    document.getElementById("fTipo").value = "heroe";

    document.getElementById("fAlterego").value = persona.Alterego;
    document.getElementById("fCiudad").value = persona.Ciudad;
    document.getElementById("fPublicado").value = persona.Publicado;
  } else if (persona instanceof Villano) {
    document.getElementById("fTipo").value = "villano";

    document.getElementById("fEnemigo").value = persona.Enemigo;
    document.getElementById("fRobos").value = persona.Robos;
    document.getElementById("fAsesinatos").value = persona.Asesinatos;
  }

  SeleccionarTipo();

  let buttonMod = document.getElementById("modificacion");
  let buttonBaja = document.getElementById("baja");
  let buttonAlta = document.getElementById("alta");

  document.getElementById("fTipo").disabled = true;;

  buttonMod.disabled = false;
  buttonBaja.disabled = false;
  buttonAlta.disabled = true;
}

function DarDeAlta() {
  let persona = DevolverObjetoValidado();

  if (persona) {
    let dataObjetos = DevolverDatos();
    dataObjetos.push(persona);
    let dataJSON = JSON.stringify(dataObjetos);
    data = dataJSON;

    Actualizar();
  } else {
    alert(
      "Revise los campos. Campos numéricos: Edad, Publicado(mayor a 1940), Robos (mayor a 0) y Asesinatos (mayor a 0). Los demás campos aceptan letra y espacios. Todos son obligatorios"
    );
  }
}

function DevolverObjetoValidado() {
  let inputTipo = document.getElementById("fTipo");
  let inputNombre = document.getElementById("fNombre");
  let inputApellido = document.getElementById("fApellido");
  let inputEdad = document.getElementById("fEdad");
  let persona = false;

  if (
    ValidarString(inputNombre) &&
    ValidarString(inputApellido) &&
    ValidarNumero(inputEdad, 0)
  ) {
    let tipo = inputTipo.value;
    let nombre = formatoMayusc(inputNombre.value);
    let apellido = formatoMayusc(inputApellido.value);
    let edad = inputEdad.value;

    let datos = DevolverDatos();

    OrdenarPorId(datos);

    let ultimoElemento = datos[datos.length - 1];

    let id = parseInt(ultimoElemento.Id) + 1;

    if (tipo == "villano") {
      let inputEnemigo = document.getElementById("fEnemigo");
      let inputRobos = document.getElementById("fRobos");
      let inputAsesinatos = document.getElementById("fAsesinatos");

      if (
        ValidarString(inputEnemigo) &&
        ValidarNumero(inputRobos, 1) &&
        ValidarNumero(inputAsesinatos, 1)
      ) {
        let enemigo = formatoMayusc(document.getElementById("fEnemigo").value);
        let robos = formatoMayusc(document.getElementById("fRobos").value);
        let asesinatos = document.getElementById("fAsesinatos").value;

        persona = new Villano(
          id,
          nombre,
          apellido,
          edad,
          enemigo,
          robos,
          asesinatos
        );
      }
    } else {
      let inputAlterego = document.getElementById("fAlterego");
      let inputCiudad = document.getElementById("fCiudad");
      let inputPublicado = document.getElementById("fPublicado");

      if (
        ValidarString(inputAlterego) &&
        ValidarString(inputCiudad) &&
        ValidarNumero(inputPublicado, 1941)
      ) {
        let alterego = formatoMayusc(inputAlterego.value);
        let ciudad = formatoMayusc(inputCiudad.value);
        let publicado = document.getElementById("fPublicado").value;

        persona = new Heroe(
          id,
          nombre,
          apellido,
          edad,
          alterego,
          ciudad,
          publicado
        );
      }
    }
  }

  return persona;
}

function BorrarDatos() {
  let tabla = document.getElementById("tabla");

  while (
    tabla.lastElementChild.classList.contains("filaHeroe") ||
    tabla.lastElementChild.classList.contains("filaVillano")
  ) {
    tabla.removeChild(tabla.lastElementChild);
  }
}

function Eliminar() {
  let array = DevolverDatos();
  let id = document.getElementById("fID").value;

  let filtrado = array.filter((persona) => persona.id != id);
  let dataJSON = JSON.stringify(filtrado);
  data = dataJSON;

  Actualizar();
}

function Actualizar() {
  BorrarDatos();
  MostrarDatos();
  QuitarForm();
  EditarFila();
  FiltrarPorTipo();
}

function Modificar() {
  let array = DevolverDatos();
  let id = document.getElementById("fID").value;

  let objPersona = DevolverObjetoValidado();

  if (objPersona) {
    let nuevoArray = array.map(function (persona) {
      if (id == persona.Id) {
        objPersona.Id = id;

        persona = objPersona;
      }

      return persona;
    });

    let dataJSON = JSON.stringify(nuevoArray);
    data = dataJSON;

    Actualizar();
  } else {
    alert(
      "Revise los campos. Campos numéricos: Edad, Publicado(mayor a 1940), Robos (mayor a 0) y Asesinatos (mayor a 0). Los demás campos aceptan letra y espacios. Todos son obligatorios"
    );
  }
}

function OrdenarPorId() {
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    if (a.Id > b.Id) {
      return 1;
    } else if (a.Id < b.Id) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorNombre() {
  console.log("hola");
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Nombre > b.Nombre) {
      return 1;
    } else if (a.Nombre < b.Nombre) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorApellido() {
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Apellido > b.Apellido) {
      return 1;
    } else if (a.Apellido < b.Apellido) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorEdad() {
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Edad > b.Edad) {
      return 1;
    } else if (a.Edad < b.Edad) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorAlterego() {
  OrdenarHeroePrimero();
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Alterego > b.Alterego) {
      return 1;
    } else if (a.Alterego < b.Alterego) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorCiudad() {
  OrdenarHeroePrimero();
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Ciudad > b.Ciudad) {
      return 1;
    } else if (a.Ciudad < b.Ciudad) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorPublicado() {
  OrdenarHeroePrimero();
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Publicado > b.Publicado) {
      return 1;
    } else if (a.Publicado < b.Publicado) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorEnemigo() {
  OrdenarVillanoPrimero();
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Enemigo > b.Enemigo) {
      return 1;
    } else if (a.Enemigo < b.Enemigo) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorRobos() {
  OrdenarVillanoPrimero();
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Robos > b.Robos) {
      return 1;
    } else if (a.Robos < b.Robos) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarPorAsesinatos() {
  OrdenarVillanoPrimero();
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a.Asesinatos > b.Asesinatos) {
      return 1;
    } else if (a.Asesinatos < b.Asesinatos) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarHeroePrimero() {
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function OrdenarVillanoPrimero() {
  let datos = DevolverDatos();

  datos.sort(function (a, b) {
    console.log(a, b);
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
  });

  let dataJSON = JSON.stringify(datos);
  data = dataJSON;
  console.log(data);
  Actualizar();
}

function MostrarColumnaId() {
  let cId = document.getElementById("cId");
  let columnas = document.getElementsByClassName("columnaId");
  let botonId = document.getElementById("bId");

  if (cId.checked) {
    botonId.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    botonId.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaNombre() {
  let checkbox = document.getElementById("cNombre");
  let columnas = document.getElementsByClassName("columnaNombre");
  let boton = document.getElementById("bNombre");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaApellido() {
  let checkbox = document.getElementById("cApellido");
  let columnas = document.getElementsByClassName("columnaApellido");
  let boton = document.getElementById("bApellido");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaEdad() {
  let checkbox = document.getElementById("cEdad");
  let columnas = document.getElementsByClassName("columnaEdad");
  let boton = document.getElementById("bEdad");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaAlterego() {
  let checkbox = document.getElementById("cAlterego");
  let columnas = document.getElementsByClassName("columnaAlterego");
  let boton = document.getElementById("bAlterego");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaCiudad() {
  let checkbox = document.getElementById("cCiudad");
  let columnas = document.getElementsByClassName("columnaCiudad");
  let boton = document.getElementById("bCiudad");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaPublicado() {
  let checkbox = document.getElementById("cPublicado");
  let columnas = document.getElementsByClassName("columnaPublicado");
  let boton = document.getElementById("bPublicado");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaEnemigo() {
  let checkbox = document.getElementById("cEnemigo");
  let columnas = document.getElementsByClassName("columnaEnemigo");
  let boton = document.getElementById("bEnemigo");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaRobos() {
  let checkbox = document.getElementById("cRobos");
  let columnas = document.getElementsByClassName("columnaRobos");
  let boton = document.getElementById("bRobos");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

function MostrarColumnaAsesinatos() {
  let checkbox = document.getElementById("cAsesinatos");
  let columnas = document.getElementsByClassName("columnaAsesinatos");
  let boton = document.getElementById("bAsesinatos");

  if (checkbox.checked) {
    boton.style.display = "block";

    Array.from(columnas).forEach((element) => (element.style.display = ""));
  } else {
    boton.style.display = "none";

    Array.from(columnas).forEach((element) => (element.style.display = "none"));
  }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------- 
Validaciones
------------------------------------------------------------------------------------------------------------------------------------------------*/

function ValidarString(input) {
  let valido = false;
  let maximo = 20;
  let pattern = new RegExp(
    "^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
  );

  if (!input.value) {
    valido = false;
  } else {
    if (input.value.length > maximo) {
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

/* -----------------------------------------------------------------------------------------------------------
Puntos parcial
----------------------------------------------------------------------------------------------------------- */

/* a)Mostrar en “Form Datos” la información de los objetos generados en el punto 2. */
window.addEventListener("load", MostrarDatos);

/* b)Filtrar los datos de los objetos mostrados en “Form Datos” acorde al filtro Seleccionado cuando cambie el valor del
control (Todos/Heroes/Villanoes). */

let bFiltrar = document.getElementById("tipoPersonas");
bFiltrar.addEventListener("change", FiltrarPorTipo);
/* 
c)Al hacer Click en el botón “Calcular”, debe mostrarse la edad promedio de los elementos filtrados. Utilizar
Map/Reduce/Filter */

let btnCalcular = document.getElementById("btnCalcular");
btnCalcular.addEventListener("click", Calcular);

// d)Al hacer doble click en una fila del “Form Datos” o en el botón “Agregar” ocultar el “Form Datos” y mostrar el
// “Formulario ABM” con los datos de la fila o vacío según corresponda (ocultar los botones que correspondan)
let btnAdd = document.getElementById("add");
btnAdd.addEventListener("click", MostrarFormVacio);

let btnCancelar = document.getElementById("cancelar");
btnCancelar.addEventListener("click", QuitarForm);

let btnTipo = document.getElementById("fTipo");
btnTipo.addEventListener("change", SeleccionarTipo);

window.addEventListener("load", EditarFila);

/* 
e)Al hacer click en alguno de los botones del “Formulario ABM” debe realizarse la operación que corresponda, ocultar el
formulario y mostrar el Formulario “Form Datos” con los datos actualizados. En caso de ser un Alta, generar ID único.
Utilizar Map/Reduce/Filter. */

let btnAlta = document.getElementById("alta");
btnAlta.addEventListener("click", DarDeAlta);

let btnBaja = document.getElementById("baja");
btnBaja.addEventListener("click", Eliminar);

let btnMod = document.getElementById("modificacion");
btnMod.addEventListener("click", Modificar);

/* f)El formulario ABM debe realizar validaciones acorde al tipo de objeto y a las restricciones descritas en el diagrama del
punto 1. El campo ID no debe ser modificable y debe mostrar el id del objeto existente o vacío en caso de un alta. */
let campoId = document.getElementById("fID");
campoId.disabled = true;
//Validaciones en EditarFila y darDeALTA

/* e)Al hacer Click en alguno de los botones de los encabezados de la tabla del Formulario “Form Datos”, ordenar las filas
de la tabla por la columna clickeada. Utilizar Map/Reduce/Filter */

let bId = document.getElementById("bId");
bId.addEventListener("click", OrdenarPorId);

let bNom = document.getElementById("bNombre");
bNom.addEventListener("click", OrdenarPorNombre);

let bApellido = document.getElementById("bApellido");
bApellido.addEventListener("click", OrdenarPorApellido);

let bEdad = document.getElementById("bEdad");
bEdad.addEventListener("click", OrdenarPorEdad);

let bAlterego = document.getElementById("bAlterego");
bAlterego.addEventListener("click", OrdenarPorAlterego);

let bCiudad = document.getElementById("bCiudad");
bCiudad.addEventListener("click", OrdenarPorCiudad);

let bPublicado = document.getElementById("bPublicado");
bPublicado.addEventListener("click", OrdenarPorPublicado);

let bEnemigo = document.getElementById("bEnemigo");
bEnemigo.addEventListener("click", OrdenarPorEnemigo);

let bRobos = document.getElementById("bRobos");
bRobos.addEventListener("click", OrdenarPorRobos);

let bAsesinatos = document.getElementById("bAsesinatos");
bAsesinatos.addEventListener("click", OrdenarPorAsesinatos);

/* 
g)El formulario “Form Datos” debe mostrar/ocultar las columnas de la tabla según esté chequeado el checkbox
correspondiente a esa columna (chequeado mostrar, no chequeado ocultar). */

let cId = document.getElementById("cId");
cId.addEventListener("change", MostrarColumnaId);

let cNombre = document.getElementById("cNombre");
cNombre.addEventListener("change", MostrarColumnaNombre);

let cApellido = document.getElementById("cApellido");
cApellido.addEventListener("change", MostrarColumnaApellido);

let cEdad = document.getElementById("cEdad");
cEdad.addEventListener("change", MostrarColumnaEdad);

let cAlterego = document.getElementById("cAlterego");
cAlterego.addEventListener("change", MostrarColumnaAlterego);

let cCiudad = document.getElementById("cCiudad");
cCiudad.addEventListener("change", MostrarColumnaCiudad);

let cPublicado = document.getElementById("cPublicado");
cPublicado.addEventListener("change", MostrarColumnaPublicado);

let cEnemigo = document.getElementById("cEnemigo");
cEnemigo.addEventListener("change", MostrarColumnaEnemigo);

let cRobos = document.getElementById("cRobos");
cRobos.addEventListener("change", MostrarColumnaRobos);

let cAsesinatos = document.getElementById("cAsesinatos");
cAsesinatos.addEventListener("change", MostrarColumnaAsesinatos);
