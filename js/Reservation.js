function autoInicioRelacionCliente() {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value = ' + name.idClient +'>' + name.name + '</Option>');
            });
        }
    });

}

function autoTraerGame() {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select = $("#select-game");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value = ' + name.id +'>' + name.name + '</Option>');
            });
        }
    });
}

function guardarReservacion() {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            game:{ id: + $("#select-game").val()},
            client:{ idClient: + $("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: dataToSend,
            
            url:"http://152.67.63.83:8080/api/Reservation/save",
           
            
            success:function(response) {
                console.log(response);
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                alert("Reservacion guardada correctamente");
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se guardo correctamente");
        
            }
            });
    }
}

function listarReservaciones() {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            console.log(respuesta)
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>FECHA DE INICIO</th><th>FECHA DE CIERRE</th><th>ESTADO</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+ respuesta[i].startDate.split("T")[0] + "</td>";
        myTable+="<td>"+respuesta[i].devolutionDate.split("T")[0]+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].game.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarReservacion("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button class='ui red button' onclick='borrarReservacion("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="<td> <button class='ui red button' onclick='cargarDatosReservacion("+respuesta[i].idReservation+")'>Detalles</button>";
        myTable+="</tr>";
    };
    myTable+="</table>";
    $("#miListaReservacion").html(myTable);
}

function borrarResevacion(idElemento) {
    let elemento = {
        id:idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        url:"http://152.67.63.83:8080/api/Reservation/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#miListaReservacion").empty();
            alert("Reservacion eliminada correctamente");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se elimino correctamente");
    
        }
        });
}

function cargarDatosReservacion(id) {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Reservation/" + id,
        type:"GET",
        success:function(response){
            
            console.log(response);
            var item = response
            $("#startDate").val(item.startDate.split("T")[0]);
            $("#devolutionDate").val(item.devolutionDate.split("T")[0]);
            $("#status").val(item.status);
            $("#select-client").val(item.client.idClient);
            $("#select-game").val(item.game.id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error desconocido");
    
        }

    });
}

function actualizarReservacion(idElemento) {
    let status = $("#status").val();
    let status1
    if (status == 1) {
        status1 = 'completed'
    } else {
        status1 = 'cancelled'
    }

    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let elemento = {
            idReservation: idElemento,
            startDate: $("#starDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: status1,
            game:{ id: + $("#select-game").val()},
            client:{ idClient: + $("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            url:"http://152.67.63.83:8080/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            success:function(response){
                console.log(Response);
                $("#miListaReservacion").empty();
                alert("se ha Actualizado correctamente el cliente")
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
        
            }

        });
    }
}