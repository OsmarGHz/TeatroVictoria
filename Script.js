let inputRegistro = document.getElementsByClassName('FormSectionInput');

function testVacio(numeroInput){
    if (inputRegistro[numeroInput].value.length >= 1 && inputRegistro[numeroInput].value.length != undefined) {
        inputRegistro[numeroInput].classList.remove('border-danger');
    } else {
        inputRegistro[numeroInput].classList.add('border-danger');
        alert("Favor de no dejar los campos vacíos");
    }
}

function validarTodo(event){
    for (const i of inputRegistro) {
        if (i.value.length >= 1 && i.value.length != undefined) {
            continue; //Todo correcto
        } else {
            alert("¡No dejes los campos vacíos!");
            event.preventDefault();
            break;
        }
    }
}