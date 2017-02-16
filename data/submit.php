<?php
    $check = $_REQUEST['check'];
    $formID = $_REQUEST['formID'];
    if( $check == "on" ):
?>
{"result": "Error", "data": {"name": "You have to enter name", "tags": "Add some tags", "date": "Enter a valid date"}}
<?php else: ?>
<?php sleep( rand(0,3) ); ?>
{"result": "OK", "redirect": "gird.html"}
<?php endif; ?>