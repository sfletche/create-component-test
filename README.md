# create-component-tests
Automate the creation of automatable component tests

## To Run
```
> git clone https://github.com/sfletche/create-component-tests.git
> cd create-component-tests
> npm install
> npm link
// now from any directory you can type
> componentTests create path/to/myComponent.jsx path/to/__tests__
```

## Next Steps
* Eat your own dogfood
  * make the path to tests optional -- default to same folder as component
  * add more interesting components to test
  * Enable proptypes arrayOf (defining props as only those props within the shape of the array objects)
  * Enable proptypes shape
  * import should destructure in the case of connected components
  * handle long paths (e.g. componentTests create src/long/path/to/my-component.jsx src/long/path/to/__tests__/
* Publish as node module
