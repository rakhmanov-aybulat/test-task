import { StatusType } from '../types/Status';

export default interface Task {
    id: number,
    title: string,
    description: string,
    status: StatusType,
}

