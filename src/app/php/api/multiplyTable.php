<?php
    require 'headers.php';

    $first_number = rand(2, 9);
    $second_number = rand(2, 9);
    $problem_text = "$first_number \\times $second_number";
    $ans = $first_number * $second_number;

    $response = array("problemText" => $problem_text, "answer" => $ans);
    if ($response) {
        http_response_code(201);
        echo json_encode($response);
    } else {
        http_response_code(422);
    }