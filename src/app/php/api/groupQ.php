<?php
    require 'headers.php';
    require '../classes/NumQ.php';

    $level = (int) $_GET['level'];
    $nom1 = 0;
    $nom2 = 0;
    $den1 = 0;
    $den2 = 0;
    $op_type = 0; // 0 - add, 1 - subtract, 2 - multiply, 3 - divide

    $primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    switch ($level) {
        case 1:
        case 2: $den1 = $primes[rand(1, count($primes) - 1)];
                $den2 = $den1;
                if ($level == 1) {
                    $nom1 = rand(1, floor((float) $den1 / 2.0));
                    $nom2 = rand(1, floor((float) $den2 / 2.0));
                    $op_type = 0;
                } else {
                    $nom1 = rand( ceil((float) $den1 / 2.0), $den1 - 1);
                    $nom2 = rand(1, floor((float) $den2 / 2.0));
                    $op_type = 1;
                }
                break;
        case 3:
        case 4: $d1 = $primes[rand(3, 7)];
                $d2 = $primes[rand(0, 2)];
                do {
                    if (rand(0, 9) & 1) {
                        $den1 = $d1;
                        $den2 = $d2 * $d1;
                    } else {
                        $den1 = $d2 * $d1;
                        $den2 = $d1;
                    }
                    if($level == 3) {
                        $nom1 = rand(1, floor( (float) $den1 / 2.0));
                        $nom2 = rand(1, floor( (float) $den2 / 2.0));
                        $op_type = 0;
                    } else {
                        $nom1 = rand(ceil((float)$den1 / 2.0), $den1 - 1);
                        $nom2 = rand(1, floor( (float) $den2 / 2.0));
                        $op_type = 1;
                    }
                } while(GCD($nom1, $den1) * GCD($nom2, $den2) != 1);
                break;
        case 5: $den1 = $primes[rand(0, 9)];
                do {
                    $den2 = $primes[rand(0, 5)];
                } while (GCD($den1, $den2) != 1);
                $nom1 = rand(1, floor( (float) $den1 / 2.0));
                $nom2 = rand(1, floor( (float) $den2 / 2.0));
                $op_type = 0;
                break;
        case 6: $den1 = $primes[rand(0, 9)];
                do {
                    $den2 = $primes[rand(0, 5)];
                } while (GCD($den1, $den2) != 1);
                $nom1 = rand(1, $den1 -1);
                do {
                    $nom2 = rand(1, $den2 - 1);
                } while ($nom1 * $den2 == $nom2 * $den1);
                if ($nom1 * $den2 - $nom2 * $den1 < 0) {
                    $t = $nom1;
                    $nom1 = $nom2;
                    $nom2 = $t;
                    $t = $den1;
                    $den1 = $den2;
                    $den2 = $t;
                }
                $op_type = 1;
                break;
        case 7: $op_type = rand(0, 9) % 2;
                $a = $primes[rand(0, 3)];
                $b = $primes[rand(0, 3)];
                $c = $primes[rand(0, 4)];

                do {
                    $d = $primes[rand(0, 4)];
                } while ($d == $c);
                $den1 = $a * $b * $c;
                $den2 = $a * $b * $d;
                break;
        case 8: $op_type = rand(0, 19) % 2;
                $arr = [2, 3, 5, 7];
                $i = rand(0, 3);
                $den1 = $arr[$i];
                array_splice($arr, $i, 1);
                $i = rand(0, 2);
                $den1 *= $arr[$i];
                array_splice($arr, $i, 1);
                $i = rand(0, 1);
                $den2 = $arr[$i];
                array_splice($arr, $i, 1);
                $den2 *= $arr[0];
                $c = $primes[rand(0, 2)];
                $den1 *= $c;
                $den2 *= $c;
                break;
        default: $nom1 = $nom2 = $den1 = $den2 = 1;
    }

    if($level == 7 || $level == 8) {
        if (!$op_type) {
            do {
                $nom1 = rand(1, floor((float) $den1 / 2.0));
            } while (GCD($nom1, $den1) != 1);
            do {
                $nom2 = rand(1, floor((float) $den2 / 2.0));
            } while (GCD($nom2, $den2) != 1);

        } else {
            do {
                $nom1 = rand(ceil((float) $den1 / 2.0), $den1 - 1);
            } while (GCD($nom1, $den1) != 1);
            do {
                $nom2 = rand(1, floor((float) $den2 / 2.0));
            } while (GCD($nom2, $den2) != 1);
        }
    }

    $operation = '';

    $Q1 = new NumQ($nom1, $den1);
    $Q2 = new NumQ($nom2, $den2);

    switch ($op_type) {
        case 0: $operation = " + ";
                $Q1->add($Q2);
                break;
        case 1: $operation = " - ";
                $Q1->subtract($Q2);
                break;
        case 2: $operation = " \\cdot ";
                $Q1->multiply($Q2);
                break;
        case 3: $operation = " : ";
                $Q1->divide($Q2);
                break;
    }

    $problem_text = "\\frac{" . $nom1 . "}{" . $den1 . "}";
    $problem_text .= $operation;
    $problem_text .= "\\frac{" . $nom2 . "}{" . $den2 . "}";

    $ans = array("nominator" => $Q1->getNominator(), "denominator" => $Q1->getDenominator());

    $response = array("problemText" => $problem_text, "answer" => $ans);

    if ($response) {
        http_response_code(201);
        echo json_encode($response);
    } else {
        http_response_code(422);
    }