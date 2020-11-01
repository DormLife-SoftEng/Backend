import { generalUserInfo } from '../users/users.interface';

export interface LobbyMember {
    user: generalUserInfo;
    ready: boolean;
}