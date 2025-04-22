import { Status } from './Status';


export const Filter = { ...Status, ALL: 'all' } as const;
export type FilterType = typeof Filter[keyof typeof Filter];

