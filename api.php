<?php
	switch($_SERVER['REQUEST_METHOD']){
		case 'POST':
			// create new item
			break;
		case 'GET':
			// get item(s)
			break;
		case 'PUT':
			// update item
			break;
		case 'DELETE':
			// delete item
			echo json_encode(array("error"=>"Deleting is disabled for this user."));
			break;
	}
?>