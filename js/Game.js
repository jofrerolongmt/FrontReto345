function autoInicioRelacionCategoria() {
    console.log("Se esta ejecutando");
    $.ajax({
        url:"http://152.67.63.83:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);

            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value = ' + name.id +'>' + name.name + '</Option>');
                console.log("select" + name.id)  
            });
        }
    });
}

function traerInformacionGames() {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            pintarRespuestaGames(response);
        }
    });
}

function pintarRespuestaGames(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE</th><th>DESARROLADOR</th><th>AÑO</th><th>DESCRIPCION</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].developer+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarGame("+respuesta[i].id+")'>Actualizar</button></td>";
        myTable+="<td> <button class='ui red button' onclick='cargarDatosGame("+respuesta[i].id+")'>Editar</button></td>";
        myTable+="<td> <button class='ui red button' onclick='borrarGame("+respuesta[i].id+")'>Borrar</button></td>";

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaGames").html(myTable);
}

function cargarDatosGame(id) {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Game/" + id,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            var item = response
            $("#id").val(item.id);
            $("#Gname").val(item.name);
            $("#Gdeveloper").val(item.developer);
            $("#Gyear").val(item.year);
            $("#Gdescription").val(item.description);
            $("#select-category").val(item.category.id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error desconocido");
    
        }
    });
}

function guardarGame() {
    if ($("#Gname").val().length == 0 || $("#Gdeveloper").val().length == 0 || $("#Gyear").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let elemento = {
            name: $("#Gname").val(),
            developer: $("#Gdeveloper").val(),
            year: $("#Gyear").val(),
            description: $("#Gdescription").val(),
            category: { id: + $("#select-category").val() },
        }

        let dataToSend = JSON.stringify(elemento);
        console.log(elemento);

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: dataToSend,
            
            url: "http://152.67.63.83:8080/api/Game/save",
           
            
            success: function (response) {
                console.log(response);
                $("#resultadoGame").empty();
                $("#Gname").val("");
                $("#Gdeveloper").val("");
                $("#Gyear").val("");
                $("#Gdescription").val("");
                $("#select-category").val("");

                alert("Juego guardada correctamente");
        
            },
            
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo correctamente");
        
            }
        });
    }
}

function actualizarGame(idElemento) {
    if ($("#Gname").val().length == 0 || $("#Gdeveloper").val().length == 0 || $("#Gyear").val().length == 0 || $("#Gdescription").val().length == 0) {
        alert("Los campos son obligatorios!")
    }
    else {
        let elemento = {
            id: idElemento,
            name: $("#Gname").val(),
            developer: $("#Gdeveloper").val(),
            year: $("#Gyear").val(),
            description: $("#Gdescription").val(),
            category: { id: + $("#select-category").val() },

        }
        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);
        $.ajax({
            url: "http://152.67.63.83:8080/api/Game/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "json",
            success: function (response) {
                $("#miListaGames").empty();
                traerInformacionGames();
                alert("Se actulizado la informacion");
                $("#miListaGames").empty();
                $("#id").val("");
                $("#Gname").val("");
                $("#Gdeveloper").val("");
                $("#Gyear").val("");
                $("#Gdescription").val("");
                $("#select-category").val("");
                alert("se ha Actualizado correctamente el juego")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
            }
        });
    }
    
}

function borrarGame(idElemento){
    let myData={
        idClient: idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.63.83:8080/api/Game/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#miListaGames").empty();
            traerInformacionGames();
            alert("Se ha Eliminado.")
        }
    });

}