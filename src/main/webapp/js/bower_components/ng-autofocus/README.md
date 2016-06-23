# This package is deprecated!
Please use the newer [ng-focus-if][focus-if-url] instead!

***

## Usage

Include `autofocus.min.js` in your build or directly with a `<script>` tag and require the module in your module definition:

```js
angular  
    .module('App', [  
        'autofocus',  
        ... // other dependencies  
    ]);
```

To immediately focus an element upon rendering:

```html
<input autofocus />
```

To focus an element when a specified conditional `$scope` property becomes truthy:

```html
<input autofocus="focusInput" />
```

To focus an element after a specified delay upon rendering:

```html
<input autofocus autofocus-delay="500" />
```

To focus an element after a specified delay when a specified conditional `$scope` property becomes truthy:

```html
<input autofocus="focusInput" autofocus-delay="500" />
```

[focus-if-url]: https://npmjs.org/package/ng-focus-if
