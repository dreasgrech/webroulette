<?php
ini_set('memory_limit', "3M");  

function clamp($value, $min, $max) {
    if ($value >= $min && $value <= $max) {
        return $value;
    }

    if ($value < $min) {
        return $min;
    }

    return $max;
} 

$MAX_LENGTH = 10;
$DEFAULT_LENGTH = 3;
$fullQuery = "";
$receivedLength = $_GET["length"];
$max = clamp($receivedLength != "" ? $receivedLength : $DEFAULT_LENGTH, 1, $MAX_LENGTH);
$lines = file("komuni.txt") ; 
shuffle($lines);
for ($i=0; $i < $max; $i++)
{
    $randomWord = $lines[array_rand($lines)];
    $fullQuery .= substr_replace($randomWord ,"",-2) . " ";
}

echo $fullQuery;
?>
