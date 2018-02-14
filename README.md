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
  * Not working for proptypes arrayOf (defining props as only those props within the shape of the array objects)
  * Need to fix path of imported component to relative path (and we can drop the jsx suffix)
  * put component rendering inside beforeEach
* Publish as node module
