# Test

`yarn build`
`node dist/main.js`

Access [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues), and UI will show error

```
Error: Cannot find module 'ejs'
    at webpackEmptyContext (/Users/luke/Code/queue-dashboard/dist/main.js:2:152345)
    at new View (/Users/luke/Code/queue-dashboard/dist/main.js:2:151535)
    at Function.render (/Users/luke/Code/queue-dashboard/dist/main.js:2:124535)
    at ServerResponse.render (/Users/luke/Code/queue-dashboard/dist/main.js:2:139793)
    at t.entryPoint (/Users/luke/Code/queue-dashboard/dist/main.js:2:16096)
    at Layer.handle [as handle_request] (/Users/luke/Code/queue-dashboard/dist/main.js:2:146194)
    at next (/Users/luke/Code/queue-dashboard/dist/main.js:2:147844)
    at Route.dispatch (/Users/luke/Code/queue-dashboard/dist/main.js:2:147869)
    at Layer.handle [as handle_request] (/Users/luke/Code/queue-dashboard/dist/main.js:2:146194)
    at /Users/luke/Code/queue-dashboard/dist/main.js:2:142896
```

` Stats Do work`
Stats Endpoint [http://localhost:3000/admin/queues/api/queues/](http://localhost:3000/admin/queues/api/queues/)
