import type { Method } from './method';
import { type Path, type Pattern, type Resolver, Route } from './route';

export type Routes = Map<Method, Set<Route>>;

export class Router {
  #routes: Routes;

  constructor() {
    this.#routes = new Map<Method, Set<Route>>();
  }

  public add(method: Method, pattern: Pattern, resolver: Resolver): Route {
    const route = new Route(pattern, resolver);
    this.#routes.has(method)
      ? this.#routes.get(method)!.add(route)
      : this.#routes.set(method, new Set([route]));
    return route;
  }

  public get(method: string, path: Path): Route | null {
    for (const [_method, routes] of this.#routes) {
      if (_method === method) {
        for (const route of routes) {
          if (route.matches(path)) {
            return route;
          }
        }
      }
    }
    return null;
  }
}
