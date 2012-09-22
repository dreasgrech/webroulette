<?php
ini_set('memory_limit', "3M");  
include("projectkeys.php");

function clamp($value, $min, $max) {
    if ($value >= $min && $value <= $max) {
        return $value;
    }

    if ($value < $min) {
        return $min;
    }

    return $max;
} 

$action = $_GET["action"];
if ($action != "") {
    if ($action == "key") {
        $keys = new ProjectKeys();
        echo $keys->getRandomKey();
        return;
    }
}

$MAX_LENGTH = 10;
$DEFAULT_LENGTH = 3;
$fullQuery = "";
$receivedLength = $_GET["length"];
$bias = strtok($_GET["bias"], " "); // take only the first word from the bias
$max = clamp($receivedLength != "" ? $receivedLength : $DEFAULT_LENGTH, 1, $MAX_LENGTH);
if ($bias != "") {
    $max--;
    $fullQuery = $bias . " "; 
}

$lines = file("komuni.txt") ; 
shuffle($lines);

for ($i=0; $i < $max; $i++)
{
    $randomWord = $lines[array_rand($lines)];
    $fullQuery .= substr_replace($randomWord ,"",-2) . " ";
}

echo $fullQuery;
?>
