let formulario;
let inputs;
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,10}$/, // 7 a 10 numeros.
    numero: /^\d{1,14}$/, // Solo numeros.
    numeroCalle: /^\d{1,5}$/,
    Cp: /^\d{5}$/,
    curp: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
}
const done = {}

const vigilarSubmit = (evento) => {
    evento.preventDefault();
    if(esVerdadero()){
        formulario.reset();
    }
}

if (document.getElementById("formularioIns") != null) {
    formulario = document.getElementById("formularioIns");
    formulario.addEventListener('submit', vigilarSubmit);
    inputs = document.querySelectorAll('#formularioIns input');
}if (document.getElementById("formularioDoc") != null) {
    formulario = document.getElementById("formularioDoc");
    formulario.addEventListener('submit', vigilarSubmit);
    inputs = document.querySelectorAll('#formularioDoc input');
}if (document.getElementById("formularioAlu") != null) {
    formulario = document.getElementById("formularioAlu");
    formulario.addEventListener('submit', vigilarSubmit);
    inputs = document.querySelectorAll('#formularioAlu input');
}

const validarFormulario = (e) => {
    if(e.target.type == "text" && e.target.classList.contains("NOMBRES")){
        validarCampo(expresiones.nombre, e.target);
    }else if(e.target.type == "number" && e.target.classList.contains("NUMEROS")){
        validarCampo(expresiones.numero, e.target);
    }else if(e.target.type == "text" && e.target.classList.contains("CURP")){
        validarCampo(expresiones.curp, e.target);
    }else if(e.target.type == "email" && e.target.classList.contains("EMAIL")){
        validarCampo(expresiones.correo, e.target);
    }else if(e.target.type == "date"){
        if (e.target.value.length >= 1 && e.target.value.length != undefined){
            e.target.classList.remove('border-danger');
            e.target.classList.add('border-success');
            e.target.parentNode.querySelector('.formulario__input-error').classList.add('d-none');
            e.target.parentNode.querySelector('.formulario__input-error').classList.remove('d-block');
            done[e.target.id] = true;
        } else {
            e.target.classList.add('border-danger');
            e.target.classList.remove('border-success');
            e.target.parentNode.querySelector('.formulario__input-error').classList.remove('d-none');
            e.target.parentNode.querySelector('.formulario__input-error').classList.add('d-block');
            done[e.target.id] = false;
        }
    }else if(e.target.type == "number" && e.target.classList.contains("TELEFONOS")){
        validarCampo(expresiones.telefono, e.target);
    }else if(e.target.type == "number" && e.target.classList.contains("NUMCALLE")){
        validarCampo(expresiones.numeroCalle, e.target);
    }else if(e.target.type == "number" && e.target.classList.contains("CP")){
        validarCampo(expresiones.Cp, e.target);
    }
}

const validarCampo = (exp, inp) => {
    if (exp.test(inp.value)) {
        inp.classList.remove('border-danger');
        inp.classList.add('border-success');
        inp.parentNode.querySelector('.formulario__input-error').classList.add('d-none');
        inp.parentNode.querySelector('.formulario__input-error').classList.remove('d-block');
        done[inp.id] = true;
    } else {
        inp.classList.add('border-danger');
        inp.classList.remove('border-success');
        inp.parentNode.querySelector('.formulario__input-error').classList.remove('d-none');
        inp.parentNode.querySelector('.formulario__input-error').classList.add('d-block');
        done[inp.id] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    if (input.type == "number") {
        input.addEventListener('input', validarFormulario);
    }
    done[input.id] = false;
});

const esVerdadero = () => {
    for (const a in done) {
        if(done[a] == true){ //Evalua si el array done, en la posicion a, es igual a true.
            continue;
        }else{
            return false;
        }
    }
    return true;
}

