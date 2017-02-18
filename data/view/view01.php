<?php sleep( rand(0,3) ); ?>
<form method="POST" action="data/submit.php">
	<div class="form-group">
		<label for="exampleInputName">Name</label>
		<input name="name" type="text" class="form-control" id="exampleInputName" placeholder="Product name">
	</div>
	<div class="form-group">
		<label for="exampleInputTags">Tags</label>
		<input name="tags" type="text" class="form-control" id="exampleInputTagds" placeholder="Comma separated">
	</div>
	<div class="form-group">
		<label for="exampleInputCategories">Categories</label>
		<input name="categories" type="text" class="form-control" id="exampleInputCategories" placeholder="Categories">
	</div>
	<div class="checkbox">
		<label>
			<input name="check" type="checkbox"> Check this to get an error
		</label>
	</div>
</form>