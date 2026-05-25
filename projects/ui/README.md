# @identora/ui

Angular UI shell library built on top of [Clarity Design System](https://clarity.design). Provides the full application frame — layout, navigation, routing infrastructure, and a set of built-in feature pages — for Identora applications.

> **Requires `@identora/auth`.**  
> Layout components, the route guard, and all shell pages depend on services provided by `@identora/auth/core` (`AuthorizationService`, `ViewService`, `RealmAppsService`). Both libraries must be registered in the same application.

## Entry Points

| Import path | Purpose |
|---|---|
| `@identora/ui` | Core providers, theme, density, Clarity re-exports |
| `@identora/ui/layout` | Layout, header, sidebar, navigation components |
| `@identora/ui/routing` | Hierarchical router components, view guard, component distributor |
| `@identora/ui/shell` | Route arrays, public/private pages, `provideShell()` |

---

## Installation

```bash
npm install @identora/ui
```

`@identora/auth` must also be installed — it is a peer dependency, not bundled here.

---

## Setup

A minimal `app.config.ts`:

```ts
import { provideAuth }  from '@identora/auth/core';
import { provideUi }    from '@identora/ui';
import { provideShell, APP_ROUTES } from '@identora/ui/shell';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import packageInfo from '../../package.json';
import { components } from './features/features.routes';
import { myAppRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideAuth(environment.auth),
    provideUi(),
    provideRouter([...myAppRoutes, ...APP_ROUTES]),
    provideShell({ appComponents: components, packageInfo }),
  ],
};
```

---

## `@identora/ui`

### `provideUi()`

Registers `ThemeService` and `DensityService` initializers as `APP_INITIALIZER` so the theme and density are applied before the first render.

### `ThemeService`

Manages light/dark theme switching. The active theme is persisted to `localStorage` and restored on startup.

```ts
import { ThemeService } from '@identora/ui';

themeService.toggle();          // switch between light and dark
themeService.set('dark');       // set explicitly
themeService.current            // 'light' | 'dark'
themeService.theme$             // Observable<'light' | 'dark'>
```

### `DensityService`

Controls Clarity's spacing density. Persisted to `localStorage`.

```ts
import { DensityService } from '@identora/ui';

densityService.set('compact');  // 'default' | 'regular' | 'compact'
densityService.current          // DensitySetting
```

### `ClaritySharedModule`

Re-exports `ClarityModule`, `ClrButtonModule`, `ClrIconModule`, and `CdsModule` with all icon sets pre-loaded (Core, Essential, Commerce, Chart, Media, Social, Technology, TextEdit, Travel, Mini). Import this module instead of individual Clarity imports.

```ts
import { ClaritySharedModule } from '@identora/ui';
```

---

## `@identora/ui/layout`

Contains the four visual frame components. They are rendered automatically by `LayoutComponent` — you do not need to place them manually.

### `LayoutComponent` (`purp-layout`)

Top-level shell wrapper. Composes `HeaderComponent`, `SidebarComponent`, and `NavigationComponent`. Used as the wrapper for all private routes in `APP_ROUTES`.

### `HeaderComponent` (`purp-header`)

Top navigation bar. Features:
- Application name from `ViewService`
- App launcher (`AppLauncherComponent`) — lists other Identora apps in the realm
- Theme toggle (light/dark)
- Density toggle
- Fullscreen toggle
- Logout button

Depends on: `AuthorizationService`, `ViewService`, `RealmAppsService`.

### `SidebarComponent` (`purp-sidebar`)

Left-side menu. Renders the navigation hierarchy (header → navigation → menu → items → submenus) derived from `ViewService.currentView$`. Also renders the docs navigation when applicable.

### `NavigationComponent` (`purp-navigation`, `ViewEncapsulation.None`)

Breadcrumb bar + `<router-outlet>`. The component uses `ViewEncapsulation.None` so its container layout styles (`.container-column`, `.container-row`) apply globally — this is intentional and required for content pages to fill the available height correctly.

Depends on: `ViewService` for the breadcrumb trail.

---

## `@identora/ui/routing`

### Hierarchical router components

The routing system maps the view hierarchy from the server into a chain of Angular route levels. Each component renders a `<router-outlet>` that activates the next level.

| Component | Selector | Route level |
|---|---|---|
| `RouterComponent` | `router` | 0 — root |
| `HeaderRouterComponent` | `app-header-router` | 1 |
| `NavigationRouterComponent` | `app-navigation-router` | 2 |
| `MenuRouterComponent` | `app-menu-router` | 3 |
| `ItemRouterComponent` | `app-item-router` | 4 |
| `SubmenuRouterComponent` | `app-submenu-router` | 5 |
| `MultipageRouterComponent` | `app-multipage-router` | 6 |

### `ComponentFactoryComponent` (`app-component-factory`)

Dynamically instantiates the component that matches the current route's `route_id`. Components are registered at startup via `COMPONENT_ROUTES` and lazy-loaded on demand.

### `ViewGuard`

`CanActivate` / `CanActivateChild` guard. On each navigation it:
1. Reads the target URL
2. Looks up the corresponding route in `ViewService`
3. Updates the breadcrumb trail
4. Allows or redirects the navigation

Applied automatically to all private routes inside `APP_ROUTES`.

### `ComponentDistributorService`

Matches a `route_id` to a registered lazy component and renders it. Falls back to `NoContentComponent` if no match is found.

### `COMPONENT_ROUTES` token

Used internally by `provideShell()` to register app-specific components alongside the library's built-in BASE_COMPONENTS.

### `ComponentRoute` interface

```ts
interface ComponentRoute {
  route_id: string;                           // router_id from web.router
  component: () => Promise<Type<any>>;        // dynamic import
}
```

---

## `@identora/ui/shell`

### `provideShell(options: ShellOptions)`

Registers all route components. Call once in `app.config.ts`.

```ts
interface ShellOptions {
  appComponents?: ComponentRoute[];   // app-specific lazy components
  packageInfo?: PackageInfo;          // package.json metadata for About pages
}
```

### `APP_ROUTES`

The complete route array to pass to `provideRouter`. Includes:

- **`PUBLIC_ROUTES`** — `/login`, `/callback`, `/logoff` — no auth required
- **`PRIVATE_ROUTES`** — everything else, wrapped in `LayoutComponent` with `ViewGuard`

### Registering application components

Create `features.routes.ts` and list every lazy component the app can render, keyed by its `router_id` from `web.router`:

```ts
// src/app/features/features.routes.ts
import { ComponentRoute } from '@identora/ui/routing';

export const components: ComponentRoute[] = [
  {
    route_id: 'e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f56789',  // web.router.router_id
    component: async () =>
      (await import('./dashboard/dashboard.component')).DashboardComponent,
  },
];
```

Pass `components` to `provideShell({ appComponents: components })`. The `ComponentDistributorService` will lazy-load the matching component when the route is activated.

> **Important:** the key is `router_id` from `web.router`, **not** `route_id` from `web.routes`. For single-level routes (`page_id` only, no header/menu hierarchy), `buildRouteStructure` sets `route.route_id = view.router_id`, so both point to the same value. For multi-level routes use the `router_id` of the deepest level entry.

### Built-in pages (BASE_COMPONENTS)

The following pages are registered automatically by `provideShell()` and do not need to be declared in `features.routes.ts`:

| Page | Description |
|---|---|
| `HomeComponent` | Default home/dashboard |
| `ProfileComponent` | User profile |
| `ChangePictureComponent` | Profile picture upload |
| `InfoComponent` | Settings — general info |
| `ResourcesComponent` | Settings — resources |
| `TokenComponent` | API token viewer |
| `NotificationsComponent` | Notification preferences |
| `ChatComponent` | Chat interface |
| `AboutInfoComponent` | App info from `PackageInfo` |
| `AboutResourcesComponent` | App resources from `PackageInfo` |

### Public route components

| Component | Path | Description |
|---|---|---|
| `LoginComponent` | `/login` | Initiates the OAuth flow via `AuthorizationService.authorize()` |
| `CallbackComponent` | `/callback` | Handles the authorization code redirect, exchanges code for token |
| `LoggedOutComponent` | `/logoff` | Shown after logout |

---

## Dependency on `@identora/auth`

`@identora/ui` does not re-export or bundle `@identora/auth`. The dependency is **structural**: layout and routing components inject services that must be provided externally by the consuming app.

| UI component / service | Auth dependency injected |
|---|---|
| `HeaderComponent` | `AuthorizationService`, `ViewService`, `RealmAppsService` |
| `SidebarComponent` | `ViewService` |
| `NavigationComponent` | `ViewService` |
| `ViewGuard` | `ViewService`, `AuthorizationService` |
| `CallbackComponent` | `AuthorizationService` |
| `LoginComponent` | `AuthorizationService` |
| `ComponentDistributorService` | `ViewService` (indirectly, via `LoggerService`) |

All of these are provided by `provideAuth()` from `@identora/auth/core`. If `provideAuth()` (or an equivalent `{ provide: AUTH_CONFIG, useValue: ... }` + manual service provision) is missing from the application, the app will throw injection errors at runtime.

The minimum required setup:

```ts
// app.config.ts
providers: [
  provideAuth(environment.auth),  // @identora/auth/core — REQUIRED
  provideUi(),                    // @identora/ui
  provideShell({ appComponents, packageInfo }),
  provideRouter([...appRoutes, ...APP_ROUTES]),
  provideHttpClient(),
  provideAnimations(),
]
```

---

## Peer dependencies

| Package | Version |
|---|---|
| `@angular/common` | `^19.0.0` |
| `@angular/core` | `^19.0.0` |
| `@angular/router` | `^19.0.0` |
| `@angular/platform-browser` | `^19.0.0` |
| `@clr/angular` | `^17.0.0` |
| `@cds/core` | `^17.0.0` |
| `rxjs` | `^7.0.0` |
| `@identora/auth` | `^0.1.0` |
