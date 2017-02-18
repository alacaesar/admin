<?php sleep( rand(0,3) ); ?>
<form method="POST" action="data/submit.php">
	<div class="form-group">
		<label for="exampleInputTitle">Title</label>
		<input name="title" type="text" class="form-control" id="exampleInputTitle" placeholder="Product title">
	</div>
	<div class="form-group">
		<label for="exampleInputDesc">Description</label>
		<textarea name="desc" class="form-control" id="exampleInputDesc" rows="3"></textarea>
	</div>
	<div class="radio">
		<label>
			<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
				Option one is this and that&mdash;be sure to include why it's great
		</label>
	</div>
	<div class="radio">
		<label>
			<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
			Option two can be something else and selecting it will deselect option one
		</label>
	</div>
	<div class="radio">
		<label>
			<input type="radio" name="optionsRadios" id="optionsRadios3" value="option3">
			Option three is disabled
		</label>
	</div>
</form>