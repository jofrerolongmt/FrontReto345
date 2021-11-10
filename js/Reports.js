function traerReporteStatus() {
    console.log("Test");
    $.ajax({
        url:"http://152.67.63.83:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>ESTADO</th><th>TOTAL</th><th colspan='3'></th></tr></thead>";
        myTable+="<tr>";
        myTable+="<td>completadas</td>";
        myTable+="<td>"+ respuesta.completed + "</td>";
        myTable+="<td>canceladas</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";

    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

function traerReporteDate() {
    var fechaInicio = document.getElementById("RstartDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url:"http://152.67.63.83:8080/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            console.log(respuesta)
            pintarRespuestaDate(respuesta);
        }
    });
}

function pintarRespuestaDate(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>FECHA DE INICIO</th><th>FECHA DE CIERRE</th><th>ESTADO</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+ respuesta[i].startDate.split("T")[0] + "</td>";
        myTable+="<td>"+respuesta[i].devolutionDate.split("T")[0]+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
    };
    myTable+="</table>";
    $("#resultadoDate").html(myTable);
}

function traerReporteClientes() {
    $.ajax({
        url:"http://152.67.63.83:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>TOTAL CLIENTES</th><th>NOMBRE CLIENTE</th><th>CORREO CLIENTE</th><th>EDAD CLIENTE</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+ respuesta[i].total + "</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="</tr>";
    };
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}