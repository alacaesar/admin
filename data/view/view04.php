<?php

	$short = $_REQUEST['short'];
	
	$arr = $_GET;
	
	$data = '{';
	
	foreach( $arr as $key=>$val)
	{
		$data .= '"' . $key . '":' . '"' . $val . '",';
	}
	
	$data = substr($data, 0, -1);
	$data .= '}';

sleep( rand(0,3) ); ?>
<h2>I was updated</h2>

<!-- start of table block -->
					<div class="data-table">
						<table id="exampleWithSelect" class="table table-striped table-hover display nowrap" cellspacing="0" width="100%"></table>
						<noscript dir="exampleFX">
							{
								'select': {
									'style': 'os',
									'selector': 'td:nth-child(2)'
								},
								'columns': [{
												title: '',
												target: 0,
												className: 'treegrid-control',
												data: function (item) {
													if (item.children) {
														return '+';
													}
													return '';
												}
											},
											{
												title: '',
												target: 1,
												data: function (item) {
													return item.Chk;
												}
											},
											{
												title: 'Name',
												target: 1,
												data: function (item) {
													return item.name;
												}
											},
											{
												title: 'Position',
												target: 2,
												data: function (item) {
													return item.position;
												}
											},
											{
												title: 'Office',
												target: 3,
												data: function (item) {
													return item.office;
												}
											},
											{
												title: 'Extn.',
												target: 4,
												data: function (item) {
													return item.extn;
												}
											},
											{
												title: 'Start date',
												target: 5,
												data: function (item) {
													return item.start;
												}
											},
											{
												title: 'Salary',
												target: 6,
												data: function (item) {
													return item.salary;
												}
											},
											{
												title: '',
												target: 1,
												data: function (item) {
													return item.Resp;
												}
											},
										],
								"processing": true,
								"serverSide": true,
								'ajax': {'url' : 'data/data.php',
										'type': 'POST',
										'data': <?php echo $data; ?> },
								'treeGrid': {
									'left': 10,
									'expandIcon': '+',
									'collapseIcon': '-'
								},
				
								responsive: {
									details: {
										type: 'column',
										target: -1
									}
								},
								columnDefs: [{
									orderable: true,
									className: 'select-checkbox',
									targets: 1
								},
								{
									orderable: true,
									className: 'control',
									targets: -1
								}],
								select: {
									style: 'os',
									selector: 'td:nth-child(2)'
								},
								order: [[1, 'asc']]
				
							}
						</noscript>
						<script>
							function exampleFX(){
								$('h4').on('click', function () {
									var h4 = $(this);
									if (h4.hasClass('show')) {
										h4.removeClass('show').addClass('showed').html('-hide code');
										h4.next().removeClass('hide');
									}
									else {
										h4.removeClass('showed').addClass('show').html('+show code');
										h4.next().addClass('hide');
									}
								});
							}
						</script>
					</div>
					<!-- end of table block -->