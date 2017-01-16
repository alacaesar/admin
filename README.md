## Shop Admin Components
grap your :coffee: and :trollface:

### Date picker
```html
<div class="input-group">
	<span class="input-group-addon" id="{ID}">Date: </span>
	<input class="form-control date-picker" itemprop="single" value="2016-03-01" aria-describedby="{ID}">
</div>
```

`itemprop` can take `single` and `range` options.
`id` and `aria-describedby` attributes should match.

### Links
```html
<a title="{link-title}" data-id="{unique-ID}" href="{url}">Link</a>
```
Add `target="blank"` for external links.
```html
<a title="{link-title}" data-id="{unique-ID}" href="{url}" target="blank">Link</a>
```
### Drag and Drop
#### Containers
```html
<div id='left-defaults' class='container col-xs-12 col-md-7'>
    ...panels...
</div>
<div id='right-defaults' class='container col-xs-12 col-md-5'>
    ...panels...
</div>
```
`left-defaults` and `right-defaults` ids are what the code is looking for.

#### Panels
```html
<div class="col-md-12">
	<div class="panel panel-default">
		<div class="panel-heading handle">Panel title</div>
		<div class="panel-body">Panel Content</div>
	</div>
</div>
```
Notice that `handle` class remarks the element that can be grabbed.