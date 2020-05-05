<?php

   function GCD (int $mInput, int $nInput) {
       $m = abs($mInput);
       $n = abs($nInput);

       return ($n == 0) ? $m : GCD($n, $m % $n);
   }

   function LCM (int $mInput, int $nInput) {
       return ($mInput == 0 || $nInput == 0) ? 0 : abs($mInput * $nInput) / GCD($mInput, $nInput);
   }

   function sign (int $mInput) {
       return ($mInput >= 0) ? 1 : -1;
   }