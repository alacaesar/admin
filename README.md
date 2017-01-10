## Shop Admin Components

### Date picker
```html
<div class="input-group">
	<span class="input-group-addon" id="{ID}">Date: </span>
	<input class="form-control date-picker" itemprop="single" value="2016-03-01" aria-describedby="{ID}">
</div>
```

`itemprop` can take `single` and `range` options.

### Links
```html
<a title="{link-title}" id="{unique-ID}" href="{url}">Link</a>
```
Add `target="blank"` for external links.
```html
<a title="{link-title}" id="{unique-ID}" href="{url}" target="blank">Link</a>
```
### Drag and Drop Panels
```html
<div class="col-md-12">
	<div class="panel panel-default">
		<div class="panel-heading handle">Panel title</div>
		<div class="panel-body">Panel Content</div>
	</div>
</div>
```
Notice that `handle` class remarks the element that can be grabbed.