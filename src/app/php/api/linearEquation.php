<?php
include 'headers.php';

$level = (int) $_GET['level'];
$ans = 0;
$right_coefficients = [];
$left_coefficients = [0, 1];
$left_add_coefficients = [0, 0, 0]; // [n, m, k] k(mx+n)
$right_add_coefficients = [0, 0, 0];

switch ($level) {
    case 1:
    case 2: $ans = ($level == 1) ? rand(1, 10) : rand(-10, -1);
            $right_coefficients = [$ans, 0];
            $k = rand(2, 10);
            if($level == 2) {
                $k = (rand(0, 1)) ? $k : -1 * $k;
            }
            for($i = 0; $i < 2; $i++) {
                $left_coefficients[$i] *= $k;
                $right_coefficients[$i] *= $k;
            }
            break;
    case 3:
    case 4:
    case 5:
    case 6: $ans = rand(3, 12);
            $ans = (rand(0, 1)) ? $ans : -1 * $ans;
            $right_coefficients = [$ans, 0];
            $k = rand(2, 9);
            $k = (rand(0, 1)) ? $k : -1 * $k;
            for($i = 0; $i < 2; $i++) {
                $left_coefficients[$i] *= $k;
                $right_coefficients[$i] *= $k;
            }
            $k = rand(1, 15);
            $k = (rand(0, 1)) ? $k : -1 * $k;
            $left_coefficients[0] += $k;
            $right_coefficients[0] += $k;
            if($level >= 4) {
                $k = rand(1, 9);
                $k = (rand(0, 1)) ? $k : -1 * $k;
                $left_coefficients[1] += $k;
                $right_coefficients[1] += $k;
            }
            break;
}

if ($level >= 5 ) {
    $tmp = rand(2, 5);
    $right_add_coefficients[2] = (rand(0, 1)) ? $tmp : -1 * $tmp;
    $tmp = rand(1, 6);
    $right_add_coefficients[1] = (rand(0, 1)) ? $tmp : -1 * $tmp;
    $tmp = rand(1, 7);
    $right_add_coefficients[0] = (rand(0, 1)) ? $tmp : -1 * $tmp;

    $right_coefficients[0] -= $right_add_coefficients[2] * $right_add_coefficients[0];
    $right_coefficients[1] -= $right_add_coefficients[2] * $right_add_coefficients[1];

    if ($level == 6) {
        $tmp = rand(2, 5);
        $left_add_coefficients[2] = (rand(0, 1)) ? $tmp : -1 * $tmp;
        $tmp = rand(1, 6);
        $left_add_coefficients[1] = (rand(0, 1)) ? $tmp : -1 * $tmp;
        $tmp = rand(1, 7);
        $left_add_coefficients[0] = (rand(0, 1)) ? $tmp : -1 * $tmp;

        $left_coefficients[0] -= $left_add_coefficients[2] * $left_add_coefficients[0];
        $left_coefficients[1] -= $left_add_coefficients[2] * $left_add_coefficients[1];
    }
}
$problem_text = "";
$left_expression = "";
$right_expression = "";
$left_add_expression = "";
$right_add_expression = "";

if ($level >= 5) {
    $right_add_expression .= ($right_add_coefficients[2] > 0) ? " + " : "";
    $right_add_expression .= $right_add_coefficients[2];
    $right_add_expression .= " ( $right_add_coefficients[1] x ";
    $right_add_expression .= ($right_add_coefficients[0] > 0) ? " + " : "";
    $right_add_expression .= " $right_add_coefficients[0] )";
    $right_add_expression = preg_replace("/ 1 x /", " x ", $right_add_expression);
    $right_add_expression = preg_replace("/ -1 x /", " -x ", $right_add_expression);
    if ($level == 6) {
        $left_add_expression .= ($left_add_coefficients[2] > 0) ? " + " : "";
        $left_add_expression .= $left_add_coefficients[2];
        $left_add_expression .= " ( $left_add_coefficients[1] x ";
        $left_add_expression .= ($left_add_coefficients[0] > 0) ? " + " : "";
        $left_add_expression .= " $left_add_coefficients[0] )";
        $left_add_expression = preg_replace("/ 1 x /", " x ", $left_add_expression);
        $left_add_expression = preg_replace("/ -1 x /", " -x ", $left_add_expression);
    }
}

$left_expression .= ($left_coefficients[1]) ? " $left_coefficients[1] x " : "";
if ($left_coefficients[0] > 0) {
    $left_expression .= "+ $left_coefficients[0]";
} elseif ($left_coefficients[0] < 0) {
    $left_expression .= "$left_coefficients[0]";
}
$right_expression .= ($right_coefficients[1]) ? " $right_coefficients[1] x " : "";
if ($right_coefficients[0] > 0) {
    $right_expression .= "+ $right_coefficients[0]";
} elseif ($right_coefficients[0] < 0) {
    $right_expression .= "$right_coefficients[0]";
}
$left_expression = preg_replace("/ 1 x /", " x ", $left_expression);
$left_expression = preg_replace("/ -1 x /", " -x ", $left_expression);
$right_expression = preg_replace("/ 1 x /", " x ", $right_expression);
$right_expression = preg_replace("/ -1 x /", " -x ", $right_expression);
$left_expression = preg_replace("/^\+/", "", $left_expression);
$right_expression = preg_replace("/^\+/", "", $right_expression);
if ($level >= 5) {
    $right_expression .= $right_add_expression;
    if ($level == 6) {
        $left_expression .= $left_add_expression;
    }
}

if ($level < 5) {
    $problem_text = trim("$left_expression = $right_expression");
} else {
    $problem_text = trim("$left_expression = \\\\ $right_expression");
}



$response = array("problemText" => $problem_text, "answer" => $ans);
if ($response) {
    http_response_code(201);
    echo json_encode($response);
} else {
    http_response_code(422);
}

