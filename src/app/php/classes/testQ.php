<?php
    require 'NumQ.php';

    $Q1 = new NumQ(2, 7);
    $Q2 = new NumQ(2, 7);
    $Q3 = new NumQ(2, 7);
    $Q4 = new NumQ(3, 7);
    $Q5 = new NumQ(2, 7);

    $Q1->add($Q4);

    var_dump($Q1);

    $Q2->subtract($Q4);

    var_dump($Q2);

    $Q3->multiply($Q4);

    var_dump($Q3);

    $Q5->divide($Q4);

    var_dump($Q5);