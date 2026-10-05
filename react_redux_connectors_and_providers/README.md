# React Redux Connectors and Providers

Progressive dashboard implementations for ALU project 2369, based on the final React Redux reducer and selector project.

| Folder | Assignment tasks | Focus |
| --- | --- | --- |
| task_0 | 0–2 | mapStateToProps, store, Provider |
| task_1 | 3–6 | Redux notification drawer actions |
| task_2 | 7–12 | Thunk login, connected Header and Footer |
| task_3 | 13 | Redux DevTools with middleware |
| task_4 | 14–16 | Combined root reducer |
| task_5 | 17–21 | Fetch and normalize notifications |
| task_6 | 22 | Select and mark unread notifications |
| task_7 | 23–25 | Fetch and select courses |
| task_8 | 26–28 | Memoized notification filters |
| task_9 | 29 | Separate notification container and view |

Each dashboard is independent. From the desired `task_N/dashboard` folder:

```sh
npm ci
npm test -- --runInBand
npm run build
npm start
```

Open the localhost URL printed by webpack-dev-server. The static API fixtures live in `dist`. Login uses a local demonstration response, not a real authentication service; use dummy credentials.

For task_3 onward, Redux DevTools can inspect drawer and authentication actions. The store uses the extension compose enhancer when available and Redux compose otherwise. With the Chrome Redux DevTools extension installed, open its Redux panel, log in/out, inspect LOGIN/LOGIN_SUCCESS/LOGOUT, and jump between recorded states. The app also works without the extension.

## Verification

All ten dashboards pass their Jest suites and webpack builds on Node 12.22.12.
The final dashboard includes a connected Provider/store integration test covering login success/failure, logout, course selection, drawer toggling, filtering, and marking notifications read.

The lockfiles use npm 6 format (version 1). webpack-cli is pinned to 4.10.0 to support the installed webpack serve helper.
