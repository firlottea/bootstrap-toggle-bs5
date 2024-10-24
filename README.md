# Bootstrap Toggle
Bootstrap Toggle is a highly flexible Bootstrap plugin that converts checkboxes into toggles.

Visit http://www.bootstraptoggle.com for demos.

## Getting Started

### Installation
You can [download](https://github.com/minhur/bootstrap-toggle/archive/master.zip) the latest version of Bootstrap Toggle or use CDN to load the library.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Bower Install
```bash
bower install bootstrap-toggle
```

## Usage

### Basic example
Simply add `data-toggle="toggle"` to convert checkboxes into toggles.

```html
<input type="checkbox" checked data-toggle="toggle">
```

### Stacked checkboxes
Refer to Bootstrap Form Controls documentation to create stacked checkboxes. Simply add `data-toggle="toggle"` to convert checkboxes into toggles.

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" data-toggle="toggle" id="stackedCheck1">
  <label class="form-check-label" for="stackedCheck1">
    Option one is enabled
  </label>
</div>
<div class="form-check disabled">
  <input class="form-check-input" type="checkbox" disabled data-toggle="toggle" id="stackedCheck2">
  <label class="form-check-label" for="stackedCheck2">
    Option two is disabled
  </label>
</div>
```

### Inline Checkboxes
Refer to Bootstrap Form Controls documentation to create inline checkboxes. Simply add `data-toggle="toggle"` to a convert checkboxes into toggles.

```html
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" checked data-toggle="toggle" id="inlineCheck1">
  <label class="form-check-label" for="inlineCheck1">First</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" data-toggle="toggle" id="inlineCheck2">
  <label class="form-check-label" for="inlineCheck2">Second</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" data-toggle="toggle" id="inlineCheck3">
  <label class="form-check-label" for="inlineCheck3">Third</label>
</div>
```

## API

### Initialize by JavaScript
Initialize toggles with id `toggle-one` with a single line of JavaScript.

```html
<input id="toggle-one" checked type="checkbox">
<script>
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#toggle-one').bootstrapToggle();
  });
</script>
```

### Options
Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-on="Enabled"`.

```html
<input type="checkbox" data-toggle="toggle" data-on="Enabled" data-off="Disabled">
<input type="checkbox" id="toggle-two">
<script>
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#toggle-two').bootstrapToggle({
      on: 'Enabled',
      off: 'Disabled'
    });
  });
</script>
```

Name|Type|Default|Description|
---|---|---|---
on|string/html|"On"|Text of the on toggle
off|string/html|"Off"|Text of the off toggle
size|string|"normal"|Size of the toggle. Possible values are `large`, `normal`, `small`, `mini`.
onstyle|string|"primary"|Style of the on toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
offstyle|string|"default"|Style of the off toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
style|string| |Appends the value to the class attribute of the toggle. This can be used to apply custom styles. Refer to Custom Styles for reference.
width|integer|*null*|Sets the width of the toggle. if set to *null*, width will be calculated.
height|integer|*null*|Sets the height of the toggle. if set to *null*, height will be calculated.

### Methods
Methods can be used to control toggles directly.

```html
<input id="toggle-demo" type="checkbox" data-toggle="toggle">
```

Method|Example|Description
---|---|---
initialize|document.querySelector('#toggle-demo').bootstrapToggle()|Initializes the toggle plugin with options
destroy|document.querySelector('#toggle-demo').bootstrapToggle('destroy')|Destroys the toggle
on|document.querySelector('#toggle-demo').bootstrapToggle('on')|Sets the toggle to 'On' state
off|document.querySelector('#toggle-demo').bootstrapToggle('off')|Sets the toggle to 'Off' state
toggle|document.querySelector('#toggle-demo').bootstrapToggle('toggle')|Toggles the state of the toggle
enable|document.querySelector('#toggle-demo').bootstrapToggle('enable')|Enables the toggle
disable|document.querySelector('#toggle-demo').bootstrapToggle('disable')|Disables the toggle

## Events

### Event Propagation
Note All events are propagated to and from input element to the toggle.

You should listen to events from the `<input type="checkbox">` directly rather than look for custom events.

```html
<input id="toggle-event" type="checkbox" data-toggle="toggle">
<div id="console-event"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#toggle-event').addEventListener('change', function() {
      document.querySelector('#console-event').innerHTML = 'Toggle: ' + this.checked;
    });
  });
</script>
```

### API vs Input
This also means that using the API or Input to trigger events will work both ways.

```html
<input id="toggle-trigger" type="checkbox" data-toggle="toggle">
<button class="btn btn-success" onclick="toggleOn()">On by API</button>
<button class="btn btn-danger" onclick="toggleOff()">Off by API</button>
<button class="btn btn-success" onclick="toggleOnByInput()">On by Input</button>
<button class="btn btn-danger" onclick="toggleOffByInput()">Off by Input</button>
<script>
  function toggleOn() {
    document.querySelector('#toggle-trigger').bootstrapToggle('on');
  }
  function toggleOff() {
    document.querySelector('#toggle-trigger').bootstrapToggle('off');
  }
  function toggleOnByInput() {
    document.querySelector('#toggle-trigger').checked = true;
    document.querySelector('#toggle-trigger').dispatchEvent(new Event('change', { bubbles: true }));
  }
  function toggleOffByInput() {
    document.querySelector('#toggle-trigger').checked = false;
    document.querySelector('#toggle-trigger').dispatchEvent(new Event('change', { bubbles: true }));
  }
</script>
```

### Integration

#### [KnockoutJS](http://knockoutjs.com)

A binding for knockout is available here: [aAXEe/knockout-bootstrap-toggle](https://github.com/aAXEe/knockout-bootstrap-toggle)

## Demos

Visit http://www.bootstraptoggle.com for demos.

## Notes on Changes from Bootstrap 4 to 5

Bootstrap 5 introduced several changes that may affect the usage of Bootstrap Toggle. Some of the key changes include:

- Dropped support for Internet Explorer 10 and 11.
- Removed jQuery dependency.
- Updated form controls and utilities.
- Replaced `.form-check` with `.form-switch` for toggle switches.
- Updated grid system and breakpoints.
- Improved documentation and examples.

Please refer to the [Bootstrap 5 migration guide](https://getbootstrap.com/docs/5.1/migration/) for more details on the changes and how to update your code accordingly.
