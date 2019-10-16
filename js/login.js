var usuario;
var pass;
var url;
var isSecretary = false;
var depMunicipios;

$(document).ready(function () {

    $("#isSecretario").change(function () {
        isSecretary = $('#isSecretario').is(":checked");
    });

    $('#btnLogin').on('click', function () {
        usuario = $('#nomUsuario').val();
        pass = document.getElementById("passUsuario").value;
        url = 'profile.php?userName=' + usuario;
        submitForm();

    });
    console.log('Documento login.js cargado');


});


function submitForm() {

    $.ajax({
        url: 'php/login.php',
        type: 'POST',
        data: {
            nomUsuario: usuario,
            passUsuario: pass,
            isSecretary: isSecretary
        },
        beforeSend: function () {
            console.log('Enviando...');
        },
        success: function (response) {
            // if (response == "Password Matches") {

            //     const Toast = Swal.mixin({
            //         toast: true,
            //         position: 'top-end',
            //         showConfirmButton: false,
            //         timer: 3000
            //     });

            //     Toast.fire({
            //         type: 'success',
            //         title: 'Datos de inicio de sesion correctos'
            //     })

            //     //Redireccionamos
            //     setTimeout(function() { window.location = url; }, 3000);


            // } else {

            //     Swal.fire({
            //         position: 'center',
            //         type: 'error',
            //         title: response,
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // }
            console.log(response);
        },
    });

}

function getSecretarios() {

    $.ajax({
        url: 'php/getSecretarios.php',
        type: 'GET',
        data: "",
        beforeSend: function () {
            console.log('Enviando...');
        },
        success: function (response) {
            console.log(response);
        },
    });
}