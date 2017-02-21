<?php

    $arr = $_REQUEST;
    
    foreach( $arr as $key=>$val)
        print $key . " : " . $val . "<br />\n";
    

sleep( rand(0,1) ); ?>

<form method="POST" action="data/submit.php">
    
<?php if( $arr['int'] == 1 ): ?>
<div class="form-group">
	<label for="exampleInputTitle" class="col-sm-2">Address</label>
    <div class="col-sm-10">
        <input name="title" type="text" class="form-control" id="exampleInputTitle" placeholder="Product title">
    </div>
</div>
<?php endif; ?>

<?php if( $arr['select'] == 1 ): ?>
<div class="form-group">
    <label for="selection" class="col-sm-2">Order type</label>
    <div class="col-sm-10">
        <select class="form-control" id="selection">
            <option>Add criteria</option>
            <option>Range</option>
            <option>Date</option>
            <option>Input</option>
            <option>Select Options</option>
        </select>
    </div>
</div>
<?php endif; ?>

<?php if( $arr['range'] == 1 ): ?>
<div class="form-group">
    <label for="pricerange" class="col-sm-2">Price range</label>
    <div class="input-group col-sm-10" id="pricerange">
        <input type="text" class="form-control" placeholder="Search for...">
        <span class="input-group-addon">to</span>
        <input type="text" class="form-control" placeholder="Search for...">
    </div>
</div>
<?php endif; ?>

</form>