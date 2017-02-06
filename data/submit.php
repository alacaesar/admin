<?php
    $check = $_REQUEST['check'];
    $formID = $_REQUEST['formID'];
    if( $check == "on" ):
?>
{"result": "Error", "id": "<?php echo $formID; ?>", "data": {"name": "You have to enter name", "tags": "Add some tags", "date": "Enter a valid date"}}
<?php else: ?>
{"result": "OK", "id": "<?php echo $formID; ?>"}
<?php endif; ?>