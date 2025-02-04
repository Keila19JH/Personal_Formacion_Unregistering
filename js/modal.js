
import { setAlerts } from "./plugins/alerts.plugin.js"

$(document).on( "click", ".baja-formal", function() {

    let idEnfermero = $( this ).data( "id" );

    //console.log(setAlerts);
    
    //Primer Modal para Seleccionar Fecha de baja
    Swal.fire({
        title: "Selecciona la fecha de formalización de la baja",
        html:  `<input type="date" id="fechaBaja" class="swal2-input">`,
        confirmButtonText: "Confirmar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",

        preConfirm: () => { 
            let fechaSelect = document.getElementById( "fechaBaja" ).value;

            if( !fechaSelect ){
                Swal.showValidationMessage( "Debes seleccionar una fecha" );
                return false;
            }

            return fechaSelect;
        }
        
    }).then( ( result ) =>{

        if( result.isConfirmed ){

            let fechaBaja = result.value;

            // Segundo modal para Confirmación de baja
            setAlerts.confirmAlert(
                "¿Estás seguro?",
                "Está acción dará de baja al enfermero"
            ).then( ( confirmResult ) => {
                if( confirmResult.isConfirmed ){
                    // Send the AJAX request with the date termination
                    $.ajax({
                        url: "/formation_staff/php/controllers/modal.controller.php",
                        type: "POST",
                        data: { id:idEnfermero, fechaBaja:fechaBaja },
                        success: function( response ){
                            setAlerts.successAlert("Se ha dado de baja correctamente.",)
                            .then( () =>{
                                location.reload();  //Refresh page for update the table
                            });
                        },
                        error: function(){
                            setAlerts.errorAlert( "No fue posible darlo de baja. Inténtelo de nuevo." );
                        }
                    });
                }
            });
        }
    });
});


