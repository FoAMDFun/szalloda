import { RouterState } from '@ngrx/router-store';
import { AuthState } from './auth.reducer';
import { CustomerState } from './customer.reducer';
import { MessageState } from './message.reducer';
import { ReservationState } from './reservation.reducer';
import { RoomState } from './room.reducer';

export interface AppState {
  reservation: ReservationState;
  room: RoomState;
  router: RouterState;
  auth: AuthState;
  customer: CustomerState;
  message: MessageState;
}

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
