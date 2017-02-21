<?php sleep( rand(0,3) ); ?>
<form method="POST" action="data/submit.php" class="form-inline">
	<!--
	<div class="form-group">
		<select class="form-control">
			<option>Add criteria</option>
			<option>Range</option>
			<option>Date</option>
			<option>Input</option>
			<option>Select Options</option>
		</select>
	</div>
	-->
	
	<!-- multiselect -->
	<div class="well well-sm multiselect">
		<button type="button" class="btn-sm btn-info">Nanay</button>
		<button type="button" class="btn-sm btn-primary"><span class="badge">E</span> something else</button>
		<button type="button" class="btn-sm btn-default pull-right toggle" data-toggle="modal" data-target="#myModal" data-source="data/menu.php" columns="Criteria|Type">
			<span class="glyphicon glyphicon-menu-hamburger"></span>
		</button>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Modal title</h4>
					</div>
					<div class="modal-body">
						...
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Add</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end of multiselect -->
	
	<div class="form-group">
		<input type="text" class="form-control" id="exampleInputName2" placeholder="Type to search">
	</div>
	<button type="submit" class="btn btn-default">Save this search</button>
</form>