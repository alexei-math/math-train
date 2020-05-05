<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$fd = fopen('visited.txt', 'r') or die('Не удалось открыть файл');
$visited_pages = array();
$i = 0;

while(!feof($fd)){
	$line = trim(fgets($fd));
	list($page, $visited) = explode(":", $line);
	$visited_pages[] = array ('page' => $page, 'visited' =>  $visited);
	$i++;

}

fclose($fd);
$return_arr = array();
$count_changed = false;
for ($j = 0; $j < $i; $j++) {

	if ($visited_pages[$j]['page'] == $_GET['page']) {
		$visited_pages[$j]['visited'] += 1;
		$return_arr = $visited_pages[$j];
		$count_changed = true;
	}
	if(!$count_changed) {
		$return_arr = ['page' => $_GET['page'], 'visited' => 1];
	}
}

$str = '';
for($j = 0; $j < $i; $j++) {
	if($j) 
		$str .= "\n";
	if($visited_pages[$j]['page'])
  $str .= $visited_pages[$j]['page'] . ':' . $visited_pages[$j]['visited'];
	if(!$count_changed) {
		$str .= "\n" . $_GET['page'] . ':' . '1';
	}
}

$fd = fopen('visited.txt', 'w') or die('Не удалось открыть файл');
fwrite($fd, $str);
fclose($fd);

if ($return_arr) {
	http_response_code(201);
	echo json_encode($return_arr);
} else {
	http_response_code(422);
}

?>
