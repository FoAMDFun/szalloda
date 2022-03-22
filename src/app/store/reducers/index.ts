// import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
// import { environment } from '../../../environments/environment';
// import * as fromRouter from '@ngrx/router-store';

// export interface State {
//   router: fromRouter.RouterReducerState<any>;
// }

// export function logger(
//   reducer: ActionReducer<RootStoreState.State>
// ): ActionReducer<RootStoreState.State> {
//   return (state, action) => {
//     const result = reducer(state, action);
//     if (action.type.startsWith("["))
//       console.groupCollapsed(action.type);
//       console.log("prev state", state);
//       console.log("action", action);
//       console.log("next state", result);
//       console.groupEnd();
//     }

//     return result;
//   };
// }

// // fromReservation.ReservationState;
// export const reducers: ActionReducerMap<State> = {
//   routerReducer: fromRouter.routerReducer,
// };

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? [logger]
//   : [];
