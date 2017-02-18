<?php sleep( rand(0,3) ); ?>
<form method="POST" action="data/submit.php" data-toggle="main">
										<div class="form-group">
										  <label for="exampleInputID">ID</label>
										  <input name="id" type="text" class="form-control" id="exampleInputID" placeholder="Product ID">
										</div>
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon2">Date range: </span>
											<input name="date" type="text" class="form-control date-picker" itemprop="range" value="2016-03-01" aria-describedby="basic-addon2">
										</div>
										<div class="checkbox">
										  <label>
											<input name="check" type="checkbox"> Check this to get an error
										  </label>
										</div>
									</form>