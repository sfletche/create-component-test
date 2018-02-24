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
* ~~read contents of jsx file and return list of rendered components~~
* ~~read contents of jsx file and return list of components with their props~~
* ~~identify necessary props for jsx file~~
* Eat your own dogfood
  * add more interesting components to test
  * Not working for proptypes arrayOf (defining props as only those props within the shape of the array objects)
  * and props are not properly spaced (using tabs instead of spaces?)
  * Need to fix path of imported component to relative path (and we can drop the jsx suffix)
  * ~~put component rendering inside beforeEach~~
  * import should destructure in the case of connected components
  * ~~use spaces instead of tabs~~
  * include trailing commas in `expectedProps`
  * ~~leave off the `.jsx` when importing component into test file~~
* Publish as node module
