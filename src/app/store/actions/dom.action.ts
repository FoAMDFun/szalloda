import { createAction } from '@ngrx/store';

export const SCROLLED_DOWN = '[DOM] Scrolled Down';
export const SCROLLED_TOP = '[DOM] Scrolled Top';

export const scrolledDown = createAction(SCROLLED_DOWN);
export const scrolledTop = createAction(SCROLLED_TOP);
