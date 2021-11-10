function traerInformacionCategorias() {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Category/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
        console.log(respuesta);            
            pintarRespuesta(respuesta)
        }
    }
    )
}

function pintarRespuesta(respuesta) {
    
    let myTable = "<table class='ui center aligned celled table'>" + "<thead><tr><th>NAME</th><th colspan='3'>DESCRIPTION</th></tr></thead>"
    for ( i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";        
        myTable += "<td>" + respuesta[i].description + "</td>";  
        myTable += "<td><button class='ui yellow button' onclick='actualizarInformacionCategorias(" + respuesta[i].id + ")'>Actualizar</button></td>";
        myTable += "<td><button class='ui yellow button' onclick='borrarCategorias(" + respuesta[i].id + ")'>Borrar</button></td>";
        myTable += "</tr>";
        
    }
    myTable += "</table>"
    $("#resultado1").html(myTable);
}

function guardarCategorias() {
    let var2 = {
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset = utf-8",
        dataType: "JSON",
        data: JSON.stringify(var2),

        url:"http://152.67.63.83:8080/api/Category/save",
        success:function (response) {
            console.log(response);
            console.log("Se ha guardado correctamente!");
            alert("Categoria guardada correctamente!");
            window.location.reload()
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Ha ocurrido un error :c");
        }
    });
}

function actualizarInformacionCategorias(idElemento) {
    let myData = {
        id:idElemento,
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };

    console.log(myData)
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.63.83:8080/api/Category/update",
        type: "PUT",
        contentType: "application/json",
        dataType: "JSON",
        data: dataToSend,
        success: function(respuesta2) {
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("Categoria actualizada correctamente :)")
        }
        
    });
}

function borrarCategorias(idElemento) {
    let myData = {
        id:idElemento,
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.63.83:8080/api/Category/" + idElemento,
        type: "DELETE",
        contentType: "application/json",
        dataType: "JSON",
        data: dataToSend,
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacionCategorias();
            alert("Categoria eliminada correctamente ✔")
        }
    })   
}