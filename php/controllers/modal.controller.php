<?php

require(__DIR__ . '/../models/database.model.php');
include(__DIR__ . '/../dbconfig.php');

$connectionDB = new Database(DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // Recibir datos del AJAX
        $idEnfermero = $_POST['id'] ?? null;
        $fechaBaja = $_POST['fechaBaja'] ?? null;
    
        // Validar que los datos existen y no están vacíos
        if (empty($idEnfermero) || empty($fechaBaja)) {
            echo "error";
            exit;
        }
    
        // Llamar a la función sendDateTermination
        $result = $connectionDB->sendDateTermination($idEnfermero, $fechaBaja);
    
        // Devolver "success" si la actualización fue exitosa
        if (is_numeric($result) && $result > 0) {
            echo "success";
        } else {
            echo "error";
        }

}


?>