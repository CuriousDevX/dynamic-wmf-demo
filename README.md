
# Expected Behavior

    - We should able to load Host and Remote1 standalone without error.
    - We should able to browse Remote1 application sub routes on Host. 
    Example : http://localhost:3000/remote1/page2
    - We should able to refresh the page while browse Remote1 applications sub routes on Host.
    Example : http://localhost:3000/remote1/page3 (Hit refresh)


# Problem

1. If **config.output.publicPath = '/'**:
    
    Browsing sub routes are work on the Host application including refreshing page while on sub routes but remote applications standalone throws error.

    **Error** *: Uncaught SyntaxError: Unexpected token '<'*

2. If **config.output.publicPath = 'auto'**, 

    While browsing sub routes on the Host and Remote1 works but when you on sub route on Host and refreshing the page causes error.

    **Error** *: Uncaught SyntaxError: Unexpected token '<'*

3. If we set **config.output.publicPath = 'http://localhost:3000/'** everything works but it's not dynamic.

    - Instead of setting publicPath in config-overrides.js we can try to set __webpack_public_path__ variable dynamically. We cerate a file **./src/dynamicPublicPath.ts** with below content and import as very first item inside the entry point of Host app;
    
        **__webpack_public_path__ = window.location.origin + '/'**

    - Also tried to set config.output.publicPath = 'auto', '/' with **./src/dynamicPublicPath.ts**. Result is same with previous attempts.


# More Information about Project.

- **config-overrides.js**

It's allows us to overwrite webpack config without need to eject the React CRA application. We expose two modules. 

AuthProvider : Wrapper around the applications and make sure user authenticated.
preventCSSCollision : Utility function to prevent CSS collisions.

- **build-config.js**

Depending on development/production build it uses **modules.dev.json**/**modules.prod.json** to build **./public/remote-config.js** file. This way we can dynamically generate and inject configuration in react project on build time and later if we need to change configuration dynamically on runtime.

- **src/remoteComponents.tsx**

Reads list of remote modules from **./public/remote-config.js** file and dynamically loads the shared components.

- **src/hostRouter.tsx**

Gets dynamicRemoteComponents and remoteAppList variables from **src/remoteComponents.tsx** to build routes dynamically.
