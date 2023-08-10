import { AccountsService } from '@/lib/modules/accounts/service';
import * as trpcNext from '@trpc/server/adapters/next';
import {
    directoryService,
    DirectoryService,
} from '@/lib/modules/directory/service';
import { membersService, MembersService } from '@/lib/modules/members/service';
import {
    notificationsService,
    NotificationsService,
} from '@/lib/modules/notifications/service';
import { ProvidersService } from '@/lib/modules/providers/service';
import { SchedulingService } from '@/lib/modules/scheduling/service';

// The app's context - is generated for each incoming request
export interface Context {
    accounts: AccountsService;
    members: MembersService;
    notifications: NotificationsService;
    providers: ProvidersService;
    directory: DirectoryService;
    scheduling: SchedulingService;
}
export async function createContext(
    opts?: trpcNext.CreateNextContextOptions
): Promise<Context> {
    // Create your context based on the request object
    // Will be available as `ctx` in all your resolvers

    // This is just an example of something you'd might want to do in your ctx fn
    async function getUserFromHeader() {
        if (opts?.req.headers.authorization) {
            // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
            // return user;
        }
        return null;
    }
    const user = await getUserFromHeader();

    return {
        // user,
        notifications: notificationsService,
        accounts: AccountsService,
        members: membersService,
        providers: ProvidersService,
        directory: directoryService,
        scheduling: SchedulingService,
    };
}
