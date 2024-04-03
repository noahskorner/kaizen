---
title: 'Safeguard Your Angular App: Learn the Secrets of Running Functional Guards in Order!'
author: 'Noah Korner'
preview: 'Recently, my team ran into a niche problem with Angular guards. We had a set of route guards that had to run in a specific order, and different combinations of guards that needed to run.'
date: '2023-09-19'
tags:
  - 'Angular'
---

# Safeguard Your Angular App: Learn the Secrets of Running Functional Guards in Order!

## The Problem

Recently, my team ran into a niche problem with Angular guards. We had a set of route guards that had to run in a specific order, and different combinations of guards that needed to run. For example, some routes need to run guards A, B, and C, others just A and C, and so on.

Prior to discovering this problem, we were using Angular's class based guards to inherit from other guards and run them in order. For example

```ts
export class LoginGuard {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Promise.resolve(true);
  }
}

export class RoleGuard extends LoginGuard {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = await super.canActivate(route, state);

    if (!result) {
      return false;
    }

    return Promise.resolve(true);
  }
}
```

Would run the `LoginGuard` first and then the `RoleGuard`.

This worked fine when we only had a few guards. As the number of guards grew, we found that we had to create a lot of classes to handle all the different combinations of guards. This was not only tedious, but also error prone. Additionally, Angular deprecated the use of class based guards in favor of functional guards.

## The Solution

Our team created a solution that works for all return types of guards (`Observable<boolean>`, `boolean`, etc.), but for simplicity, let's just focus on `Promise<boolean>` guards.

```ts
type CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Promise<boolean>;
```

Let's put our business logic in a `UserService`

```ts
@Injectable()
export class UserService {
  private authenticated = false;
  private role = 'teacher';
  private superAdmin = false;

  public async isLoggedIn() {
    if (!this.authenticated) await this.login();

    return this.authenticated;
  }

  public isInRole(role: string) {
    return Promise.resolve(role === this.role);
  }

  public isSuperAdmin() {
    return Promise.resolve(this.superAdmin);
  }

  private login(): Promise<void> {
    return Promise.resolve().then(() => {
      this.authenticated = true;
    });
  }
}
```

Great, now we have business logic that we can use in our guards. Now, let's convert our guards to functional guards:

```ts
const isLoggedInGuard = () => {
  return inject(USER_SERVICE).isLoggedIn();
};

const isInRoleGuard = (role: string) => () => {
  return inject(USER_SERVICE).isInRole(role);
};

const isSuperAdminGuard = () => {
  return inject(USER_SERVICE).isSuperAdmin();
};
```

Awesome! Now let's create some pages that use different combinations of these guards:

```ts
export const routes: Routes = [
  {
    path: 'page-1',
    canActivate: [isLoggedInGuard],
    loadComponent: () =>
      import('./page-1/page-1.component').then((m) => m.Page1Component)
  },
  {
    path: 'page-2',
    canActivate: [isLoggedInGuard, isInRoleGuard('student')],
    loadComponent: () =>
      import('./page-2/page-2.component').then((m) => m.Page2Component)
  },
  {
    path: 'page-3',
    canActivate: [isLoggedInGuard, isInRoleGuard('student'), isSuperAdminGuard],
    loadComponent: () =>
      import('./page-3/page-3.component').then((m) => m.Page3Component)
  }
];
```

Uh oh! We have a problem. How do we first ensure the user is logged in (`isLoggedInGuard`), before checking if they are in a role (`isInRoleGuard`)? Angular runs the guards in parallel, so we can't rely on the order of the guards in the array. Let's create a function that will run the guards in order:

```ts
export const runGuardsInOrder = (...guards: Array<CanActivateFn>) => {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const injector = inject(EnvironmentInjector);
    let result = true;

    for (let i = 0; i < guards.length; i++) {
      // Short-circuit if the previous guard returned false
      if (result === false) break;

      const currentGuard = guards[i];

      // Run the current guard in the injection context
      const currentGuardResult = runInInjectionContext(injector, () => {
        return currentGuard(route, state);
      });

      // Update our result
      result = await currentGuardResult;
    }

    return result;
  };
};
```

Now we can use this function to run our guards in order:

```ts
export const routes: Routes = [
  {
    path: 'page-1',
    canActivate: [isLoggedInGuard],
    loadComponent: () =>
      import('./page-1/page-1.component').then((m) => m.Page1Component)
  },
  {
    path: 'page-2',
    canActivate: [runGuardsInOrder(isLoggedInGuard, isInRoleGuard('student'))],
    loadComponent: () =>
      import('./page-2/page-2.component').then((m) => m.Page2Component)
  },
  {
    path: 'page-3',
    canActivate: [
      runGuardsInOrder(
        isLoggedInGuard,
        isInRoleGuard('student'),
        isSuperAdminGuard
      )
    ],
    loadComponent: () =>
      import('./page-3/page-3.component').then((m) => m.Page3Component)
  }
];
```

That's it! Now we have the power of composition instead of inheritance, and can utilize any combination of these guards, and run them in a specific order.

Want to run the application yourself? The repo can be found here: https://github.com/noahskorner/angular-functional-guards-in-order
