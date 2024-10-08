<?php
$servername = "mysql.webcindario.com";
    $username = "meuapp";
    $password = "desenho2109";
    $dbname = "meuapp";
    //conexão ao banco de dados
    $conn = new mysqli($servername, $username, $password, $dbname);
    //consulta a tabela Artistas onde spotify_popularity é menor que 20 no total de 7 registros
    $consulta = "SELECT * FROM teste";

    $result = $conn->query($consulta);

    $i=1;
    echo '<div id="container">';

    while($dados = $result->fetch_array()){
        echo "<div id='box-".$i."' class='box'>";
       
        echo "<br>";
        echo "<span>". $dados["Nome"]. "</span>"; 
        echo "</div>";
        $i++;
    }

    echo '</div>';
?>