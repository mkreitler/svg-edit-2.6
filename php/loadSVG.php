<?php

  $con = mysql_connect("localhost","freegan6_WebJS","X+cIVCcTL9J!");
  if ($con) {
//    echo("<br><br><br>");

    mysql_select_db("freegan6_WebJS", $con);

    $name = $_POST["name"];

    // Out with the old.
    $qDelete = "SELECT * FROM `SVGdata` WHERE `Title` = '$name' LIMIT 1";
    $result = mysql_query($qDelete);

    if ($result) {
      $row = mysql_fetch_array($result);
      echo($row["Data"]);
    }
    else {
      echo("Error: failed to load " . $name);
    }
  }
?>
