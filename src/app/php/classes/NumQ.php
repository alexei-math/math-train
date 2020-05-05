<?php
    require 'math.lib.php';

    class NumQ {

        private $integer_part;
        private $nominator;
        private $denominator;

        function __construct()
        {
            $a = func_get_args();
            $n = func_num_args();
            switch ($n) {
                case 0;
                        $this->nominator = 0;
                        $this->denominator = 1;
                        $this->integer_part = 0;
                        break;
                case 1: $this->nominator = 0;
                        $this->denominator = 1;
                        $this->integer_part = $a[0];
                        break;
                case 2: $this->nominator = $a[0];
                        $this->denominator = $a[1];
                        $this->integer_part = 0;
                        break;
                case 3: $this->nominator = $a[1];
                        $this->denominator = $a[2];
                        $this->integer_part = $a[0];
                        break;

            }
//            $this->nominator = $nominator;
//            $this->denominator = $denominator;
        }

        public function getNominator() {
            return $this->nominator;
        }

        public function getDenominator() {
            return $this->denominator;
        }

        public function getIntegerPart() {
            return $this->integer_part;
        }

        public function setNominator(int $nominator) {
            $this->nominator = $nominator;
        }

        public function setDenominator(int $denominator) {
            $this->nominator = $denominator;
        }

        public function correctSign() {
            if($this->denominator < 0) {
                $this->nominator *= -1;
                $this->denominator *= -1;
            }
        }

        public function reduce() {
            if ($this->nominator == 0) {
                $this->denominator = 1;
            } else {
                $r = GCD ($this->nominator, $this->denominator);
                $this->nominator /= $r;
                $this->denominator /= $r;
            }
        }

        public function properToImproperQ() {
            if ($this->integer_part) {
                $this->nominator = sign($this->integer_part) *
                    (abs($this->integer_part * $this->denominator) + $this->nominator);
                $this->integer_part = 0;
            }
        }

        public function improperToProperQ() {
            $this->correctSign();
            $s = sign($this->nominator);
            $this->integer_part = (int) floor(abs($this->nominator) / $this->denominator);
            $this->integer_part *= $s;

            if (!$this->integer_part) {
                $this->nominator = $this->nominator % $this->denominator;
            } else {
                $this->nominator = abs($this->nominator) % $this->denominator;
            }

        }

        public function add(NumQ $q) {

            $this->properToImproperQ();
            $q->properToImproperQ();

            $denom = LCM($q->getDenominator(), $this->denominator);

            $mul1 = $denom / $this->denominator;
            $mul2 = $denom / $q->getDenominator();

            $this->denominator = $denom;
            $this->nominator = $this->nominator * $mul1 + $q->getNominator() * $mul2;
            $this->correctSign();
            $this->reduce();

            $this->improperToProperQ();
            $q->improperToProperQ();

        }

        public function subtract(NumQ $q) {

            $this->properToImproperQ();
            $q->properToImproperQ();
            $denom = LCM($q->getDenominator(), $this->denominator);

            $mul1 = $denom / $this->denominator;
            $mul2 = $denom / $q->getDenominator();

            $this->denominator = $denom;
            $this->nominator = $this->nominator * $mul1 - $q->getNominator() * $mul2;
            $this->correctSign();
            $this->reduce();
            $this->improperToProperQ();
            $q->improperToProperQ();

        }

        public function multiply(NumQ $q) {
            $this->properToImproperQ();
            $q->properToImproperQ();
            $this->nominator *= $q->getNominator();
            $this->denominator *= $q->getDenominator();
            $this->correctSign();
            $this->reduce();
            $this->improperToProperQ();
            $q->improperToProperQ();
        }

        public function divide(NumQ $q) {
            $this->properToImproperQ();
            $q->properToImproperQ();
            $this->nominator *= $q->getDenominator();
            $this->denominator *= $q->getNominator();
            $this->correctSign();
            $this->reduce();
            $this->improperToProperQ();
            $q->improperToProperQ();
        }
    }