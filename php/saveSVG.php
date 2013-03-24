<?php

  $con = mysql_connect("localhost","freegan6_WebJS","X+cIVCcTL9J!");
  if ($con) {
//    echo("<br><br><br>");

    mysql_select_db("freegan6_WebJS", $con);

    $name = $_POST["name"];
    $svg = $_POST["svg"];

    // Out with the old.
    $qDelete = "DELETE FROM `SVGdata` WHERE `Title` = '$name'";
    $result = mysql_query($qDelete);
//    if ($result) {
//      echo("Deleted old code entry.<br>");
//    }

//    echo("Width: " . $width . "<br>");
//    echo("Height: " . $height . "<br>");
//    echo("Name: " . $name . "<br>");
//    echo("Type: " . $type . "<br>");
//    echo("Modules: " . $modules . "<br>");
//    echo("Code: " . $code . "<br>");

    $qInsert = "INSERT INTO `SVGdata` (`Title`, `Data`) VALUES ('$name', '$svg');";
//    echo($qInsert . "<br>");

    $result = mysql_query($qInsert);
    if (!$result) {
      echo("ERROR: Bad database insertion");
    }
    else {
      echo("Saved " . $name . " to database");
    }
  }
?>
