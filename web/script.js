// variables globales de almacenamiento
var users = [];
var clients = [];
var indexUser;
window.onload = () => {
  //---------------------------------------------------
  // queryselector de los botones login
  let ingreso = document.querySelector(".btn-primary.SU");
  let cancelar = document.querySelector(".btn.btn-danger");
  // query de los botones sign up
  let ingresoSI = document.querySelector(".boton1");
  let cancelSI = document.querySelector(".boton2");

  // query de los inputs de login
  let inputUserLogin = document.getElementById("UserRegister");
  let inputPasswordLogin = document.getElementById("passwordRegister");

  // query de los inputs de sign up
  let inputSingUpUser = document.getElementById("UserRegisterSU");
  let inputSingUpPassword = document.getElementById("PasswordRegisterSU");
  let inputSingUpConfirmPassword = document.getElementById(
    "ConfirmacionPasswordRegisterSU"
  );
  let intputSignUpName = document.getElementById("nameRegisterSU");
  let inputSingUpLastName = document.getElementById("lastnameRegisterSU");
  let inputSingUpCui = document.getElementById("cuiRegisterSU");

  //............ADD CLIENTS................................
  // query de los botones add clients
  let registClientbtn = document.querySelector(".btnClientRegister");
  let exitClientsbtn = document.querySelector(".btnClientExit");
  let cancelClientsbtn = document.querySelector(".btnClientCancel");
  let listClientbtn = document.querySelector(".btnClientList");
  let exitListClientbtn = document.querySelector(".btnTableExit");

  // query de los inputs de los clientes
  let inputClientName = document.getElementById("nameRegisterClient");
  let inputClientLastName = document.getElementById("lastnameRegisterClient");
  let inputClientCui = document.getElementById("cuiRegisterClient");
  let inputClientLocation = document.getElementById("stateRegisterClient");
  // query mensaje
  let nombreUserClient = document.getElementById("NombreUserSpan");
  // query tabla
  let tableCLient = document.getElementById("show");
  // alertas
  let alertaPasswordSignUp = document.getElementById(
    "alertaPasswordNoCoincide"
  );

  // variables de ayuda
  let arrayUsuarios = new Array();

  //---------------------------------------------------
  // boton para el ingreso del login
  ingreso.addEventListener("click", function () {
    for (var num = 0; num < users.length; num++) {
      if (
        inputUserLogin.value === users[num].usuario &&
        inputPasswordLogin.value === users[num].password
      ) {
        console.log("ingreso de: " + inputUserLogin.value);
        mostarRegistroCliente();
        indexUser = num;
        IngresoNombreClient();
        //clearLogin();
      } else {
        console.log("no existe ese usuario o password");
        //clearLogin();
      }
    }
    console.log("a");
  });
  //......................................................

  // boton para cancelar el login
  cancelar.addEventListener("click", function () {
    clearLogin();
  });

  function clearLogin() {
    inputUserLogin.value = "";
    inputPasswordLogin.value = "";
    console.log("cancelar");
  }

  //---------------------------------------------------------------------------------

  



  // Boton para el ingreso del Sign Up
  ingresoSI.addEventListener("click", function () {
    console.log("adios");
    if (comprobarPassword().valueOf("false")) {
      console.log("coincide");
      //mostrarCorrectoPassword();
      validateFields();
      
      cancelarSI();
    } else {
      console.log("NOOOO coincide");

      mostarAlertaIncorrectoPassword();
      console.log("a");
      var msg = "No coinciden las contrasenias";
      mostrarAlertaSignUpIncorrecto();
      cancelarSI();
      alert(msg);
      alertaPasswordSignUp.style.display = "block";
    }
    //
  });
  //---------------------------------------------------------------------------------

  // boton para cancelar el sign up
  cancelSI.addEventListener("click", function () {
    cancelarSI();
  });
  function cancelarSI() {
    inputSingUpUser.value = "";
    inputSingUpPassword.value = "";
    inputSingUpConfirmPassword.value = "";
    intputSignUpName.value = "";
    inputSingUpLastName.value = "";
    inputSingUpCui.value = "";

    console.log("cancelar del registro");
  }

  //------------------------------- Add clients-------------

  registClientbtn.addEventListener("click", function () {
    validateFieldsClients();
    cancelClients();
  });

  exitClientsbtn.addEventListener("click", function () {
    exitClients();
  });

  cancelClientsbtn.addEventListener("click", function () {
    cancelClients();
  });

  listClientbtn.addEventListener("click", function () {
    mostarListaClientes();
    buildTable(clients);
  });

  exitListClientbtn.addEventListener("click", function () {
    regresarDeListaClientes();
  });

  function cancelClients() {
    inputClientName.value = "";
    inputClientLastName.value = "";
    inputClientCui.value = "";
    inputClientLocation.value = "";
    console.log("Inputs cancelados");
  }

  function IngresoNombreClient() {
    nombreUserClient.innerText = users[indexUser].usuario;
  }
  function buildTable(data) {
    reset();
    var table = document.getElementById("myTable");

    for (var i = 0; i < data.length; i++) {
      var row =
        "<tr>" +
        "<td>" +
        data[i].nombre +
        "</td>" +
        "<td>" +
        data[i].apellido +
        "</td>" +
        "<td>" +
        data[i].cui +
        "</td>" +
        "<td>" +
        data[i].departamento +
        "</td>" +
        "</tr>";
      table.innerHTML += row;
    }
  }

  function reset() {
    var table = document.getElementById("myTable");

    table.innerHTML = "";
  }

  //---------------------------------------------------------------------------------

  // Validar campos sign up
  function validateFields() {
    if (
      inputSingUpUser.value == "" ||
      inputSingUpPassword.value == "" ||
      inputSingUpCui.value == ""
    ) {
      mostrarAlertaSignUpIncorrecto();
      console.log("No puede ingresar");
    } else {
      crearUsuario(
        inputSingUpUser.value,
        inputSingUpPassword.value,
        intputSignUpName.value,
        inputSingUpLastName.value,
        inputSingUpCui.value
      );
      console.log(users);
      console.log("password coincide");
      mostrarCorrectoPassword();
      mostrarAlertaSignUpCorrecto();
    }
   
  }

  // validar campos de los clientes

  function validateFieldsClients() {
    if ((inputClientName.value == "") ||
    (inputClientLastName.value == "") ||
      (inputClientCui.value == "") ||
      (inputClientLocation.value == "")
    ) {
      console.log("NO puede ingresar, faltan campos");
    } else {
    
      console.log("Ingreso correcto");
      createClient(
        inputClientName.value,
        inputClientLastName.value,
        inputClientCui.value,
        inputClientLocation.value
      );
      console.log(clients);
    }
  }


};

// funciones
function mostrarRegistro() {
  document.getElementById("createAccount").style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("alertaPasswordNoCoincide").style.display = "none";
}
function mostrarIngreso() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function mostarRegistroCliente() {
  document.getElementById("addClients").style.display = "block";
  document.getElementById("login").style.display = "none";
}

function mostarListaClientes() {
  document.getElementById("listClients").style.display = "block";
  document.getElementById("addClients").style.display = "none";
}
function regresarDeListaClientes() {
  document.getElementById("listClients").style.display = "none";
  document.getElementById("addClients").style.display = "block";
}

function mostarAlertaIncorrectoPassword() {
  document.getElementById("alertaPasswordNoCoincide").style.display = "block";
  document.getElementById("alertaPasswordCorrecto").style.display = "none";
}
function mostrarCorrectoPassword() {
  document.getElementById("alertaPasswordCorrecto").style.display = "block";
  document.getElementById("alertaPasswordNoCoincide").style.display = "none";
}

//...........................................................................

function mostrarAlertaSignUpCorrecto() {
  document.getElementById("alertaIngresoNoCorrecto").style.display = "none";
  document.getElementById("alertaIngresoCorrecto").style.display = "block";
}

function mostrarAlertaSignUpIncorrecto() {
  document.getElementById("alertaIngresoCorrecto").style.display = "none";
  document.getElementById("alertaIngresoNoCorrecto").style.display = "block";
}

//-------------------------------------------------------------
function comprobarPassword() {
  var response = false;

  if (
    document.getElementById("PasswordRegisterSU").value ==
    document.getElementById("ConfirmacionPasswordRegisterSU").value
  ) {
    console.log("es igual");
    return (response = true);
  } else {
    console.log("NO  es igual");
    return response;
  }
}

// Sign Up

// creacion de usuarios
function crearUsuario(usuario, password, nombre, apellido, cui) {
  var user = {
    usuario: usuario,
    password: password,
    nombre: nombre,
    apellido: apellido,
    cui: cui,
  };
  users.push(user);
}

// Add clients
// salir de pantalla cliente
function exitClients() {
  document.getElementById("addClients").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// creacion de clientes
function createClient(nombre, apellido, cui, departamento) {
  var client = {
    nombre: nombre,
    apellido: apellido,
    cui: cui,
    departamento: departamento,
  };
  clients.push(client);
}

