<?php
class ProjectKeys
{
    private $keys;
    
    function __construct() {
        $this->keys = array(
                "AIzaSyBoPSLsPeGgTJesAl5n-qiywsEkhqGgb-I",
                "AIzaSyCCv2V9wF1cO1uck19H5uuAodJ-Ml0rBgg",
                "AIzaSyBKUYPAcm6Usq9ckxGQV89QUKFrBF5Hg20",
                "AIzaSyA89e9zKcd6MQdtCjaahLz4ak8fgY3fU9s",
                "AIzaSyB0usf8rsxdytArfit5HwL00s-1WPCwyUo"
            );
    }

    public function getRandomKey()
    {
        return $this->keys[rand(0, count($this->keys) - 1)];
    }
}
?>
