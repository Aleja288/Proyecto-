var username = getParameterByName('userName');
var datos;
var lastDoc;
var url = 'profile.php?userName=' + username;
var urlCorreo = 'sendMail.php?userName=' + username;



$(document).ready(function () {

    console.log('Documento filluserProfile cargado');
    getUser();
    setHrefs();

});

function setHrefs() {

    document.getElementById("btnLogout").style.cursor = "pointer";
    $("#btnEditarPerfil").attr("href", url);
    $("#btnCorreo").attr("href", urlCorreo);
    $("#btnLogout").hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(500);
    });

}
function getUser() {

    var dataString = 'userName=' + username;

    $.ajax({
        url: 'php/getUser.php',
        type: 'POST',
        data: dataString,
        beforeSend: function () {
            console.log('Enviando..');
        },
        success: function (response) {
            datos = JSON.parse(response);
            setUserName(datos);
        },
    });

}
function setUserName(array) {

    $('#userName').text(array[0].nombre + ' ' + array[0].apellido);
    $('#profileImage').attr('src', array[0].img);
    $('#mainImgProile').attr('src', array[0].img);
    if ($('#btnEditarPerfil').attr('class') == 'active') {

        filluserForm();

    }


}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function filluserForm() {

    var dialog = bootbox.dialog({
        title: 'Este es tu perfil de Innexu',
        message: '<p><i class="fa fa-spin fa-spinner"></i> Cargando tu perfil...</p>'
    });

    var btnEditarPerfil = $("#btnEditarPerfil").attr("class");

    if (btnEditarPerfil == "active") {
        lastDoc = datos[0].num_doc;
        //Datos al principio del form
        $('#secondUserName').text(datos[0].nombre + ' ' + datos[0].apellido);
        $('#Nacimiento').text(datos[0].fecha);
        $('#nomUser').text(datos[0].usuario);
        $('#documento').text(datos[0].num_doc);
        $("#pMunicipio").append("<strong>" + datos[0].residencia + "</strong>");

        //Datos del form
        $('#num_doc').val(datos[0].num_doc);
        $('#tipo_doc').val(datos[0].tipo_doc);
        $('#nombre').val(datos[0].nombre);
        $('#apellido').val(datos[0].apellido);
        $('#telefono').val(datos[0].telefono);
        $('#email').val(datos[0].email);
        $('#residencia').val(datos[0].residencia);
        $('#fecha').val(datos[0].fecha);
        $('#usuario').val(datos[0].usuario);
        $('#pass').val("Encriptada");

        dialog.init(function () {
            setTimeout(function () {
                dialog.find('.bootbox-body').html('Estas listo para reportar un riesgo!');
            }, 3000);
        });

    }



}
function logout() {

    $.ajax({
        url: 'php/logout.php',
        type: 'POST',
        data: "",
        beforeSend: function () {
            console.log('Saliendo..');
        },
        success: function (response) {

            window.location = response;

        },
    });


}

function mainPorfileImg() {

    jq

}




