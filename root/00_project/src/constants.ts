import { InjectionToken } from "tsyringe";

export const constants = {
  routes: {} as { [key: string]: { target: InjectionToken, paths: { [path: string]: { method: 'GET'|'POST', property: string }}, url: string }},
}
