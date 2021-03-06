var username = getParameterByName('userName');
var datos;
var lastDoc;
var url = 'profile.php?userName=' + username;
var urlCorreo = 'mail_compose_user.php?userName=' + username;
var selected;
var combo;

$(document).ready(function () {

    console.log('Documento filluserProfile cargado');
    setHrefs();
    getUser();
    $("#departamento").change(function () {
        combo = document.getElementById("departamento");
        selected = combo.options[combo.selectedIndex].text;
        selectMunicipiosPorDep(selected);
    });
});

function linkar() {

    Swal.fire({
        title: 'Estas seguro?',
        text: "Salir, voy a regresar luego a gestionar los regiesgos!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, salir!'
    }).then((result) => {
        if (result.value) {
            window.location.href = 'logout.php';
        }
    })

}

function setHrefs() {

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
            console.log(datos);
            getTiposDeDocumentos();
            selectDepartamentos(datos[0].departamento, datos[0].municipio);
            setSex(datos[0].sexo);
            setUserName(datos);
        },
    });

}

function setSex(sex) {
    console.log(sex);
    if (sex == "Mujer") {
        $("#female").attr('checked', 'checked');
    } else {
        $("#male").attr('checked', 'checked');
    }
}

function setUserName(array) {
    $('#userName').text(array[0].nombre + ' ' + array[0].apellido);
    $('#profileImage').attr('src', array[0].img);
    $('#mainImgProile').attr('src', array[0].img);
    filluserForm();
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function buscarTipoDocumento(tipo_doc) {

    let select = document.getElementById("tipo_doc");
    for (var i = 1; i < select.length; i++) {
        if (select.options[i].text == tipo_doc) {
            select.selectedIndex = i;
            console.log(select.options[i]);
        }
    }
}
function buscarDepartamento(dep) {
    let select = document.getElementById("departamento");
    for (var i = 1; i < select.length; i++) {
        if (select.options[i].text == dep) {
            select.selectedIndex = i;
            console.log(select.options[i]);
        }
    }
}
function buscarMunicipio(municipio) {

    let select = document.getElementById("municipio");
    for (var i = 1; i < select.length; i++) {
        if (select.options[i].text == municipio) {
            select.selectedIndex = i;
            console.log(select.options[i]);
        }
    }
}
function filluserForm() {

    var dialog = bootbox.dialog({
        title: 'Este es tu perfil de Innexu',
        message: '<p><i class="fa fa-spin fa-spinner"></i> Cargando tu perfil...</p>'
    });
    lastDoc = datos[0].num_doc;
    //Datos al principio del form
    $('#secondUserName').text(datos[0].nombre + ' ' + datos[0].apellido);
    $('#Nacimiento').text(datos[0].fecha);
    $('#nomUser').text(datos[0].usuario);
    $('#documento').text(datos[0].num_doc);
    $("#pMunicipio").append("<strong>" + datos[0].municipio + "</strong>");

    //Datos del form
    $('#num_doc').val(datos[0].num_doc);
    $('#tipo_doc').val(datos[0].tipo_doc);
    $('#nombre').val(datos[0].nombre);
    $('#apellido').val(datos[0].apellido);
    $('#telefono').val(datos[0].telefono);
    $('#email').val(datos[0].email);
    $('#fecha').val(datos[0].fecha);
    $('#usuario').val(datos[0].usuario);

    //Vereda
    dialog.init(function () {
        setTimeout(function () {
            dialog.find('.bootbox-body').html('Estas listo para reportar un riesgo!');
        }, 1000);
    });
    setTimeout(function () { dialog.modal('hide') }, 1000);
}
function getTiposDeDocumentos() {

    $('#tipo_doc').empty();
    $.getJSON("https://www.datos.gov.co/resource/shc6-n6i6.json?$select=nomtipodocumento", function (result) {
        $.each(result, function (i, field) {
            $('#tipo_doc').append($('<option>', {
                value: i,
                text: field.nomtipodocumento
            }));
        });
        buscarTipoDocumento(datos[0].tipo_doc);

    });

}
function selectMunicipiosPorDep(departamento) {

    $('#municipio').empty();
    $.getJSON("https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=" + departamento, function (result) {
        $.each(result, function (i, field) {
            $('#municipio').append($('<option>', {
                value: field.municipio,
                text: field.municipio
            }));
        });

    });

}
function selectDepartamentos(dep, mun) {
    $.getJSON("https://www.datos.gov.co/resource/xdk5-pm3f.json?$query=select distinct departamento", function (result) {
        $.each(result, function (i, field) {
            $('#departamento').append($('<option>', {
                value: field.departamento,
                text: field.departamento
            }));
        });
        selectMunicipiosPorDep(dep);
        buscarDepartamento(dep);
        setTimeout(() => {
            buscarMunicipio(mun);
        }, 1000);

    });
}
